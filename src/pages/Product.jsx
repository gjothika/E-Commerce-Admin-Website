import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_ROUTES } from '../utils/Apiroutes'

const Product = () => {
     const [product,setProduct] = useState([])

     useEffect(()=>{
      axios.get(API_ROUTES.GET_ALL_PRODUCT)
      .then(res=>{
        setProduct(res.data)
      })
     },[])


  return (
    <div>
      <div className="mt-4 ms-3">
    <h4 className="ms-1 my-3">Products</h4>
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