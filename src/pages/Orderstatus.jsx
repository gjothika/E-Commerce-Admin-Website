import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_ROUTES } from '../utils/Apiroutes'

const Orderstatus = () => {
 
    const { id } = useParams()
    const [order,setOrder] = useState()
    useEffect(() => {
    axios.get(`${API_ROUTES.GET_ALL_ORDER}/${id}`)
        .then(res => setOrder(res.data))
        .catch(err => console.error("Failed to fetch order:", err))
}, [id])
    const updatedStatus = async (status) => {
    try {
        await axios.put(`${API_ROUTES.PUT_ALL_ORDERSTATUS}/${order._id}`, { status })
        setOrder(prev => ({ ...prev, status }))
    } catch (err) {
        console.error("Failed to update status:", err)
    }
}

  return (
    <div className='bg-light p-2'>
        <h4 className="mt-2 ms-3">Order Details</h4>
        <div className=' card border-0 bg-white ms-3'style={{maxWidth:"800px"}}>

          <div className='d-flex p-3'>
            <div>
                <h5>Product Image</h5>
                <img src={order?.image} width={"150px"}></img>
            </div>
            <div></div>
          </div>

          <div className="d-flex px-3 py-5 gap-5" style={{borderTop:"1px solid gray"}}>
            <div>
                <h5>Product Name</h5>
                <input type="text"style={{color:"gray",outline:"none"}}value={order?.productName} className="border-0 rounded bg-light p-2"></input>
            </div>
            <div>
                <h5>Product Price</h5>
                <input type="text"style={{color:"gray",outline:"none"}} value={order?.price} className="border-0 rounded bg-light p-2"></input>
            </div>
             <div>
                <h5>Product Size</h5>
                <input type="text"style={{color:"gray",outline:"none"}} value={order?.size} className="border-0 rounded bg-light p-2"></input>
            </div>
          </div>

          <div className="d-flex px-3 py-5 gap-5" style={{borderTop:"1px solid gray"}}>
            <div>
                <h5>Order Id</h5>
                <input type="text"style={{color:"gray",outline:"none"}}value={id} className="border-0 rounded bg-light p-2"></input>
            </div>
            <div>
                <h5>Order Date</h5>
                <input type="text"style={{color:"gray",outline:"none"}} value={order?.createdAt} className="border-0 rounded bg-light p-2"></input>
            </div>
             <div>
                <h5>Status</h5>
                <select disabled={order?.status==="Delivered" || order?.status==="cancelled"}
                style={{maxWidth:"200px",cursor:"pointer",backgroundColor:"lightblue",outline:"none"}} className="border-0 rounded p-2"
                value={order?.status}
        onChange={(e)=>updatedStatus(e.target.value)}
        >
            <option className="bg-light" style={{maxWidth:"200px",cursor:"pointer"}}value="Ordered">Ordered</option>
            <option className="bg-light" value="Shipped">Shipped</option>
            <option className="bg-light" value="Out for Delivery">Out for Delivery</option>
            <option className="bg-light" value="Delivered">Delivered</option>
            <option className="bg-light" value="cancelled">Cancelled</option>
        </select>
            </div>
          </div>

           <div className="d-flex px-3 py-5 gap-5" style={{borderTop:"1px solid gray"}}>
            <div >
                <h5>Customer Name</h5>
                <input type="text"style={{color:"gray",outline:"none"}}value={order?.address?.name} className="border-0 rounded bg-light p-2"></input>
            </div>
            <div>
                <h5>Email</h5>
                <input type="text"style={{color:"gray",outline:"none"}} value={order?.address?.email||"--"} className="border-0 rounded bg-light p-2"></input>
            </div>
             <div>
                <h5>Phone No</h5>
                <input type="text"style={{color:"gray",outline:"none"}} value={order?.address?.contact_no} className="border-0 rounded bg-light p-2"></input>
            </div>
          </div>

          <div className="d-flex px-3 py-5 gap-5" style={{borderTop:"1px solid gray"}}>
            <div>
                <h5>Size</h5>
                <input type="text"style={{color:"gray",outline:"none"}}value={order?.size} className="border-0 rounded bg-light p-2"></input>
            </div>
            <div>
                <h5>Quantity</h5>
                <input type="text" style={{color:"gray",outline:"none"}}value={order?.quantity} className="border-0 rounded bg-light p-2"></input>
            </div>
             <div>
                <h5>Payment Method</h5>
                <input type="text" value={order?.paymentMethod} className="border-0 rounded bg-light p-2"style={{color:"green",outline:"none"}}></input>
            </div>
          </div>

           <div className="d-flex px-3 py-5 gap-5" style={{borderTop:"1px solid gray"}}>
            <div>
                <h5>Shipping Address</h5>
                <textarea type="text"rows="4" 
                value={`${order?.address?.house_no} , ${order?.address?.area} , ${order?.address?.city} , ${order?.address?.state} , ${order?.address?.pincode} . Phone:${order?.address?.contact_no}`} 
                className="border-0 rounded bg-light p-4 fs-5"style={{color:"gray",width:"450px",outline:"none"}}></textarea>
            </div>
            <div>
                <h5>Total</h5>
                <input type="text"style={{color:"gray",outline:"none"}} value={order?.price} className="border-0 rounded bg-light p-2"></input>
            </div>
          </div>


        </div>
    </div>
  )
}

export default Orderstatus