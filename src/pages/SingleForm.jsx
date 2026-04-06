import React, { useState } from "react";
import axios from "axios";
import { API_ROUTES } from "../utils/Apiroutes";
import { useNavigate } from "react-router-dom";

const SingleForm = () => {
    const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    image: "",
    selling_price: "",
    actual_price: "",
    discount: "",
    ratings: "",
    rating: "",
    reviews: "",
    color: "",
    sizeType: "free",
    size: [],
    specifications: {},
  });

  const [sizes, setSizes] = useState([""]); // for option 2
  const [customSizes, setCustomSizes] = useState([{ key: "", value: "" }]); // option 3
  const [specs, setSpecs] = useState([{ key: "", value: "" }]);

  // normal input
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // size type
  const handleSizeType = (type) => {
    setProduct({ ...product, sizeType: type, size: [] });
  };

  // option 2 (only size)
  const handleSizeChange = (index, value) => {
    const newSizes = [...sizes];
    newSizes[index] = value;
    setSizes(newSizes);
  };

  const addSize = () => {
    setSizes([...sizes, ""]);
  };

  // option 3 (size + price)
  const handleCustomSizeChange = (index, field, value) => {
    const newCustom = [...customSizes];
    newCustom[index][field] = value;
    setCustomSizes(newCustom);
  };

  const addCustomSize = () => {
    setCustomSizes([...customSizes, { key: "", value: "" }]);
  };

  // specifications
  const handleSpecChange = (index, field, value) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const addSpec = () => {
    setSpecs([...specs, { key: "", value: "" }]);
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalSize;

    if (product.sizeType === "free") {
      finalSize = ["Free Size"];
    } 
    else if (product.sizeType === "standard") {
      finalSize = sizes.filter((s) => s !== "");
    } 
    else {
      const obj = {};
      customSizes.forEach((item) => {
        if (item.key) obj[item.key] = item.value;
      });
      finalSize = obj;
    }

    const finalSpecs = {};
    specs.forEach((item) => {
      if (item.key) finalSpecs[item.key] = item.value;
    });

    const finalProduct = {
      name: product.name,
      description: product.description,
      image: product.image,
      selling_price: product.selling_price,
      actual_price: product.actual_price,
      discount: product.discount,
      ratings: product.ratings,
      rating: product.rating,
      reviews: product.reviews,
      color: product.color,
      size: finalSize,
      specifications: finalSpecs,
    };

    try {
      const res = await axios.post(API_ROUTES.POST_ALL_PRODUCT, finalProduct);
      alert("Product Added Successfully");
      console.log(res.data);
       setProduct({
    name: "", description: "", image: "", selling_price: "",
    actual_price: "", discount: "", ratings: "", rating: "",
    reviews: "", color: "", sizeType: "free", size: [], specifications: {},
  });
  setSizes([""]);
  setCustomSizes([{ key: "", value: "" }]);
  setSpecs([{ key: "", value: "" }]);
    } catch (err) {
      console.error(err);
      alert("Error adding product");
    }
  };

  return (
    <div className="my-4"style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>
        <div className="my-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <input name="name" placeholder="Name" value={product.name} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={product.description} onChange={handleChange} required />
        <input name="image" placeholder="Image URL" value={product.image} onChange={handleChange} required />
        <input name="selling_price" placeholder="Selling Price" value={product.selling_price} onChange={handleChange} required />
        <input name="actual_price" placeholder="Actual Price" value={product.actual_price} onChange={handleChange} />
        <input name="discount" placeholder="Discount" value={product.discount} onChange={handleChange} />
        <input name="ratings" placeholder="Ratings" value={product.ratings} onChange={handleChange} />
        <input name="rating" placeholder="Rating" value={product.rating} onChange={handleChange} />
        <input name="reviews" placeholder="Reviews" value={product.reviews} onChange={handleChange} />
        <input name="color" placeholder="Color" value={product.color} onChange={handleChange} />
        </div>

        <h4>Size Type</h4>
        <button className="btn m-2"style={{borderColor:"purple"}} type="button" onClick={() => handleSizeType("free")}>Free Size</button>
        <button className="btn m-2"style={{borderColor:"purple"}}type="button" onClick={() => handleSizeType("standard")}>Only Size</button>
        <button className="btn"style={{borderColor:"purple"}}type="button" onClick={() => handleSizeType("custom")}>Size + Price</button>


        {product.sizeType === "free" && (
          <div>
            <h5>Size</h5>
            <button className="btn">Free Size</button>
          </div>
        )}

        {/* Option 2 */}
        {product.sizeType === "standard" && (
          <div>
            <h5>Enter Sizes</h5>
            {sizes.map((s, i) => (
              <input className="p-1 m-2"
                key={i}
                value={s}
                placeholder="Size (S / Queen / IND-4)"
                onChange={(e) => handleSizeChange(i, e.target.value)}/>
            ))}
            <button className="btn text-white  px-2 py-1 m-2"style={{backgroundColor:"purple"}}type="button" onClick={addSize}>Add Size</button>
          </div>
        )}

        {/* Option 3 */}
        {product.sizeType === "custom" && (
          <div>
            <h5>Size + Price</h5>
            {customSizes.map((item, i) => (
              <div key={i}>
                <input className="p-1 m-2"
                value={item.key}
                  placeholder="Size (S / IND-5)"
                  onChange={(e) =>
                    handleCustomSizeChange(i, "key", e.target.value)
                  }/>
                <input className="p-1 m-2"
                  placeholder="Price"
                  value={item.value}
                  onChange={(e) =>
                    handleCustomSizeChange(i, "value", e.target.value)
                  }/>
              </div>
            ))}
            <button className="btn text-white  px-3 py-1 m-2"style={{backgroundColor:"purple"}}type="button" onClick={addCustomSize}>Add Size</button>
          </div>
        )}


        <h4 className="my-2">Specifications</h4>
        {specs.map((item, i) => (
          <div key={i}>
            <input className="p-1 m-2"
            value={item.key}
              placeholder="Key"
              onChange={(e) => handleSpecChange(i, "key", e.target.value)}/>
            <input className="p-1 m-2"
              placeholder="Value"
              value={item.value}
              onChange={(e) => handleSpecChange(i, "value", e.target.value)}/>
          </div>
        ))}
        <button className="btn text-white  px-3 py-1 m-2"style={{backgroundColor:"purple"}}type="button" onClick={addSpec}>Add Spec</button>

        <br /><br />
        <button className="btn text-white  px-4 py-1 m-2"style={{backgroundColor:"purple"}}type="submit">Submit</button>
        <button className="btn text-white  px-5 py-1 m-2"style={{backgroundColor:"purple"}}type="button" onClick={()=>navigate("/Addproduct")}>Back</button>
      </form>
    </div>
  );
};

export default SingleForm;