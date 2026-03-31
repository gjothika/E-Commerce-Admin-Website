import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { API_ROUTES } from '../utils/Apiroutes'

const Dashboard = () => {
    const [order,setOrder] = useState([])
    const [activeTable, setActiveTable] = useState("total")
    const navigate = useNavigate()

    const completed = order.filter(o => o.status === "Delivered")
    const pending = order.filter(o => o.status === "Ordered"||o.status === "Shipped"||o.status === "Out for Delivery")
    const cancelled = order.filter(o => o.status === "cancelled")

    const statuscolor = (status) => {
  if(status === "Delivered") return "badge bg-success"
  if(status === "cancelled") return "badge bg-danger"
  return "badge bg-warning text-dark"
}

    useEffect(()=>{
        axios.get(API_ROUTES.GET_ALL_ORDER)
        .then(res=>{
            setOrder(res.data)
        })
        .catch(err=>console.log(err))
    },[])
    
  return (
    <div>
        <h3 className="ms-3 mt-3">Dashboard</h3>
    <div className="row row-cols-1 row-cols-md-4 g-4 m-1">
  <div className="col">
    <div className="card h-100" onClick={()=>setActiveTable("total")}
   style={{ border: activeTable === "total" ? "2px solid purple" : "1px solid lightgray",
    cursor: "pointer"}}>
      <div className="card-body">
        <div className='d-flex justify-content-between align-items-center'>
            <div>
                <h6>Total Orders</h6>
                <h5>{order.length}</h5>
            </div>
            <div className="d-flex align-items-center justify-content-center" 
            style={{borderRadius:"10px",backgroundColor:"skyblue",width: "50px",height: "50px"}}>
            <i className="bi bi-bag fs-5"></i></div>
        </div>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100" onClick={()=>setActiveTable("completed")}
      style={{ border: activeTable === "completed" ? "2px solid purple" : "1px solid lightgray",
    cursor: "pointer"}}>
      <div className="card-body">
      <div className='d-flex justify-content-between align-items-center'>
      <div>
        <h6>Completed Orders</h6>
        <h5>{completed.length}</h5>
      </div>
      <div className="d-flex align-items-center justify-content-center"
      style={{borderRadius: "10px",backgroundColor: "lightpink",width: "50px",height: "50px"}}>
      <i className="bi bi-bag-check fs-5"></i>
      </div>
    </div>
    </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100" onClick={()=>setActiveTable("pending")}
      style={{border:activeTable === "pending" ? "2px solid purple":"2px solid lightgray",
        cursor:"pointer"
      }}>
      <div className="card-body">
        <div className='d-flex justify-content-between align-items-center'>
            <div>
            <h6>Pending Orders</h6>
            <h5>{pending.length}</h5>
            </div>
            <div className="d-flex align-items-center justify-content-center" 
            style={{borderRadius:"10px",backgroundColor:"skyblue",width: "50px",height: "50px"}}>
            <i className="bi bi-box fs-5"></i></div>
        </div>
      </div>
    </div>
  </div>
  <div className="col">
    <div className="card h-100" onClick={()=>setActiveTable("cancelled")}
    style={{border: activeTable === "cancelled" ? "2px solid purple" : "1px solid lightgray",
    cursor: "pointer"}}>
      <div className="card-body">
        <div className='d-flex justify-content-between align-items-center'>
            <div>
                <h6>Cancelled Orders</h6>
                <h5>{cancelled.length}</h5>
            </div>
            <div className="d-flex align-items-center justify-content-center" 
            style={{borderRadius:"10px",backgroundColor:"lightpink",width: "50px",height: "50px"}}>
            <i className="bi bi-trash fs-5"></i></div>
        </div>
      </div>
    </div>
  </div>
</div>




<div className="my-4 ms-3">
    <h4 className="m-2">Latest Sales</h4>
    <div className='table-responsive'>
    <table className="table" style={{border:"1px solid lightgray"}}>
     <thead>
           <tr>
      <th style={{backgroundColor:"lightgray"}} scope="col">S.No</th>
      <th style={{backgroundColor:"lightgray"}} scope="col">Order Id</th>
      <th style={{backgroundColor:"lightgray"}} scope="col">Date</th>
      <th style={{backgroundColor:"lightgray"}} scope="col">Status</th>
      <th style={{backgroundColor:"lightgray"}} scope="col">Billing</th>
      <th style={{backgroundColor:"lightgray"}} scope="col">Mobile</th>
      <th style={{backgroundColor:"lightgray"}} scope="col">Amount</th>
    </tr>
    </thead>
       <tbody>
        {(activeTable==="total"?order:
        activeTable==="completed"?completed:
        activeTable==="pending"?pending:
        cancelled).map((order,index)=>(
        <tr key={order._id}
        onClick={() => navigate(`/Orderstatus/${order._id}`)} 
        style={{cursor:"pointer"}}>
        <td>{index + 1}</td> 
        <td>{order._id}</td>
        <td>
  {new Date(order.createdAt).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
      )}
</td>  
        <td><button className={statuscolor(order.status)}style={{border:"none",padding:"10px",width:"120px"}}>{order.status}</button></td>
        <td>{`${order?.address?.house_no},${order?.address?.area}`}</td>
        <td>{order?.address?.contact_no}</td>
        <td>₹{order.price}</td>
        </tr>
    ))}
  </tbody>
</table>
</div>
</div>

    </div>
  )
}

export default Dashboard