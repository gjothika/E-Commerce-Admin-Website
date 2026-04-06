import React, { useState } from "react";
import axios from "axios";
import { API_ROUTES } from "../utils/Apiroutes";
import { useNavigate } from "react-router-dom";

const VariantForm = () => {

    const navigate = useNavigate()

  const [product, setProduct] = useState({
    name: "",
    description: "",
    ratings: "",
    rating:"",
    reviews: "",
  });

  const [variants, setVariants] = useState([
    {
      image: "",
      color: "",
      sizeType: "free", // default
      sizes: [""], // only size
      customSizes: [{ key: "", value: "" }], // size + price
      sku: "",
      stock: "",
      selling_price: "",
      actual_price: "",
      discount: "",
      specsArr: [{ key: "", value: "" }]
    }
  ]);

  // -------- PRODUCT --------
  const handleProduct = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // -------- VARIANT --------
  const handleVariant = (i, e) => {
    const newVar = [...variants];
    newVar[i][e.target.name] = e.target.value;
    setVariants(newVar);
  };

  const handleSizeType = (i, type) => {
    const newVar = [...variants];
    newVar[i].sizeType = type;
    setVariants(newVar);
  };

  // ONLY SIZE
  const handleSize = (i, idx, val) => {
    const newVar = [...variants];
    newVar[i].sizes[idx] = val;
    setVariants(newVar);
  };

  const addSize = (i) => {
    const newVar = [...variants];
    newVar[i].sizes.push("");
    setVariants(newVar);
  };

  // SIZE + PRICE
  const handleCustom = (i, idx, field, val) => {
    const newVar = [...variants];
    newVar[i].customSizes[idx][field] = val;
    setVariants(newVar);
  };

  const addCustom = (i) => {
    const newVar = [...variants];
    newVar[i].customSizes.push({ key: "", value: "" });
    setVariants(newVar);
  };

  // SPECIFICATIONS
  const handleSpec = (i, idx, field, val) => {
    const newVar = [...variants];
    newVar[i].specsArr[idx][field] = val;
    setVariants(newVar);
  };

  const addSpec = (i) => {
    const newVar = [...variants];
    newVar[i].specsArr.push({ key: "", value: "" });
    setVariants(newVar);
  };

  // ADD VARIANT
  const addVariant = () => {
    setVariants([
      ...variants,
      {
        image: "",
        color: "",
        sizeType: "free",
        sizes: [""],
        customSizes: [{ key: "", value: "" }],
        sku: "",
        stock: "",
        selling_price: "",
        actual_price: "",
        discount: "",
        specsArr: [{ key: "", value: "" }]
      }
    ]);
  };

  // -------- SUBMIT --------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalVariants = variants.map(v => {

      let finalSize;

      // FREE
      if (v.sizeType === "free") {
        finalSize = ["Free Size"];
      }
      // ONLY SIZE
      else if (v.sizeType === "standard") {
        finalSize = v.sizes.filter(s => s);
      }
      // SIZE + PRICE
      else {
        let obj = {};
        v.customSizes.forEach(c => {
          if (c.key) obj[c.key] = c.value;
        });
        finalSize = obj;
      }

      // SPECIFICATIONS
      let finalSpecs = {};
      v.specsArr.forEach(s => {
        if (s.key) finalSpecs[s.key] = s.value;
      });

      return {
        image: v.image,
        color: v.color,
        size: finalSize,
        sku: v.sku,
        stock: v.stock,
        selling_price: v.selling_price,
        actual_price: v.actual_price,
        discount: v.discount,
        specifications: finalSpecs
      };
    });

    const finalData = {
      name: product.name,
      description: product.description,
      ratings: product.ratings,
      rating:product.rating,
      reviews: product.reviews,
      variants: finalVariants
    };

    try {
      await axios.post(API_ROUTES.POST_ALL_PRODUCT, finalData);
      alert("Variant Product Added");


       setProduct({
      name: "",
      description: "",
      ratings: "",
      rating: "",
      reviews: "",
    });

    setVariants([
      {
        image: "",
        color: "",
        sizeType: "free",
        sizes: [""],
        customSizes: [{ key: "", value: "" }],
        sku: "",
        stock: "",
        selling_price: "",
        actual_price: "",
        discount: "",
        specsArr: [{ key: "", value: "" }]
      }
    ]);
      console.log(finalData);
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="my-4"style={{ maxWidth: "800px", margin: "auto" }}>
    <form onSubmit={handleSubmit}>
      <h2>Add Product</h2>
      
       <div className="my-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      <input name="name" placeholder="Name" value={product.name} onChange={handleProduct} />
      <input name="description" placeholder="Description" value={product.description} onChange={handleProduct} />
      <input name="ratings" placeholder="Ratings" value={product.ratings} onChange={handleProduct} />
      <input name="rating" placeholder="Rating" value={product.rating} onChange={handleProduct} />
      <input name="reviews" placeholder="Reviews" value={product.reviews} onChange={handleProduct} />
      </div>

      {variants.map((v, i) => (
        <div key={i} style={{ border: "1px solid", margin: "10px", padding: "10px" }}>

          <h3>Variant Product</h3>
          <div className="my-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <input name="image" placeholder="Image URL" value={v.image} onChange={(e)=>handleVariant(i,e)} />
          <input name="color" placeholder="Color" value={v.color} onChange={(e)=>handleVariant(i,e)} />
          <input name="selling_price" placeholder="Selling_price" value={v.selling_price} onChange={(e)=>handleVariant(i,e)} />
          <input name="actual_price" placeholder="Actual_price" value={v.actual_price} onChange={(e)=>handleVariant(i,e)} />
          <input name="discount" placeholder="Discount" value={v.discount} onChange={(e)=>handleVariant(i,e)} />
          <input name="sku" placeholder="SKU" value={v.sku} onChange={(e)=>handleVariant(i,e)} />
          <input name="stock" placeholder="Stock" value={v.stock} onChange={(e)=>handleVariant(i,e)} />
          </div>

          <h4>Size Type</h4>
          <button className="btn m-2"style={{borderColor:"purple"}}type="button" onClick={()=>handleSizeType(i,"free")}>Free Size</button>
          <button className="btn m-2"style={{borderColor:"purple"}}type="button" onClick={()=>handleSizeType(i,"standard")}>Only Size</button>
          <button className="btn "style={{borderColor:"purple"}}type="button" onClick={()=>handleSizeType(i,"custom")}>Size+Price</button>


          {v.sizeType === "free" && (
            <div>
                <h5>Size</h5>
            <button className="btn">Free Size</button>
            </div>
          )}

           {v.sizeType === "standard" && (
          <div>
            <h5>Enter Sizes</h5>
            {v.sizes.map((s, idx) => (
              <input className="p-1 m-2"
                key={idx}
                value={s}
                placeholder="Size (S / Queen / IND-4)"
                onChange={(e) => handleSize(i,idx,e.target.value)}/>
            ))}
            <button className="btn text-white  px-2 py-1 m-2"style={{backgroundColor:"purple"}}type="button" onClick={()=>addSize(i)}>Add Size</button>
          </div>
        )}
        
        {v.sizeType === "custom" && (
          <div>
            <h5>Size + Price</h5>
            {v.customSizes.map((c, idx) => (
              <div key={idx}>
                <input className="p-1 m-2"
                  value={c.key}
                  placeholder="Size (S / IND-5)"
                  onChange={(e) =>
                    handleCustom(i,idx,"key",e.target.value)
                  }/>
                <input className="p-1 m-2"
                value={c.value}
                  placeholder="Price"
                  onChange={(e) =>
                    handleCustom(i,idx,"value",e.target.value)
                  }/>
              </div>
            ))}
            <button className="btn text-white  px-3 py-1 m-2"style={{backgroundColor:"purple"}}type="button" onClick={()=>addCustom(i)}>Add Size</button>
          </div>
        )}

          <h4 className="my-2">Specifications</h4>
          {v.specsArr.map((s, idx)=>(
            <div key={idx}>
              <input className="p-1 m-2"placeholder="Key"value={s.key} onChange={(e)=>handleSpec(i,idx,"key",e.target.value)} />
              <input className="p-1 m-2"placeholder="Value"value={s.value} onChange={(e)=>handleSpec(i,idx,"value",e.target.value)} />
            </div>
          ))}
          <button className="btn text-white  px-3 py-1 m-2"style={{backgroundColor:"purple"}}type="button" onClick={()=>addSpec(i)}>Add Spec</button>

        </div>
      ))}

      <button className="btn text-white  px-3 py-1 m-2"style={{backgroundColor:"purple"}}type="button" onClick={addVariant}>Add Variant</button>
      <br></br>
      <button className="btn text-white  px-4 py-1 m-2"style={{backgroundColor:"purple"}}type="submit">Submit</button>
      <button className="btn text-white  px-5 py-1 m-2"style={{backgroundColor:"purple"}}type="button" onClick={()=>navigate("/Addproduct")}>Back</button>
    </form>
    </div>
  );
};

export default VariantForm;