import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

  const navigate = useNavigate()
  
  return (
    <div>
        <div className="text-white ">
            <h4 className="p-2">Admin</h4>
            <ul className="nav flex-column ms-3 fs-5" style={{cursor:"pointer"}}>
              
                <li className='nav-item mb-3'onClick={()=>navigate("/")}
                onMouseEnter={(e) => e.target.style.color = "pink"}
                onMouseLeave={(e) => e.target.style.color = "white"}
                ><i className="bi bi-grid me-2 fs-5"></i>Dashboard</li>
                <li className='nav-item mb-3' onClick={()=>navigate("/Product")}
                onMouseEnter={(e) => e.target.style.color = "pink"}
                onMouseLeave={(e) => e.target.style.color = "white"}
                ><i className="bi bi-tags me-2 fs-5"></i>Product</li>
                <li className='nav-item mb-3'><i className="bi bi-bag me-2 fs-5"></i>Order</li>
                <li className='nav-item 'style={{marginBottom:"290px"}}><i className="bi bi-person me-2 fs-4"></i>User</li>
                <li className='nav-item mb-3'><i className="bi bi-box-arrow-right me-2"></i>Logout</li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar