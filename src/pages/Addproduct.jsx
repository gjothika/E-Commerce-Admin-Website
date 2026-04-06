import { useNavigate } from "react-router-dom";

const AddProduct = () => {
     const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Select Mode</h2>
      <div className="mt-4">
      <button className="btn text-white me-3"style={{backgroundColor:"purple"}} onClick={()=>navigate("/SingleForm")}>Add Single Product</button>
      <button className="btn text-white"style={{backgroundColor:"purple"}} onClick={()=>navigate("/VariantForm")}>Add Variant Product</button>
      </div>
    </div>
  );
};

export default AddProduct;