import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_ROUTES } from '../utils/Apiroutes'
import { useNavigate } from 'react-router-dom'

const Product = () => {
     const [product,setProduct] = useState([])
     const [loading,setLoading] = useState(true)
     const navigate = useNavigate();

     useEffect(()=>{
      axios.get(API_ROUTES.GET_ALL_PRODUCT)
      .then(res=>{
        setProduct(res.data)
      })
      .catch((err)=>{console.log(err)})
      .finally(()=>{setLoading(false)})
     },[])

      if(loading){
      return <div className="d-flex justify-content-center align-items-center m-5"style={{height:"400px"}}>
          <div className="spinner-border"></div>
        </div>
    }
    
  return (
    <div>
      <div className="mt-4 ms-3">
    <h4 className="ms-1 mt-3">Products</h4>
    <div className="d-flex justify-content-end mb-3">
    <button className="btn text-white px-2 py-1" style={{backgroundColor:"purple"}} onClick={()=>navigate("/Addproduct")}>+ Add Product </button>
    </div>
    <div className='table-responsive'>
    <table className="table" style={{border:"1px solid lightgray"}}>
     <thead>
           <tr>
      <th style={{backgroundColor:"lightgray"}} scope="col">S.No</th>
      <th style={{backgroundColor:"lightgray"}} scope="col">Product Id</th>
      <th style={{backgroundColor:"lightgray"}} scope="col">Product Name</th>
      <th style={{backgroundColor:"lightgray"}} scope="col">product Price</th>
    </tr>
    </thead>
       <tbody>
        {product.map((product,index)=>(
        <tr key={product._id}>
        <td>{index + 1}</td> 
        <td>{product?._id}</td>
        <td>{product?.name}</td>  
        <td>{product?.selling_price||product?.variants[0]?.selling_price}</td>
        </tr>
        ))}
  </tbody>
</table>
</div>
</div>
    </div>
  )
}

export default Product