
import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard';
import Product from './pages/Product';
import Orderstatus from './pages/Orderstatus';
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header />
      <div className='container-fluid p-0 overflow-hidden'>
        <div className="row">
          <div className="col-2 p-0 position-fixed "style={{backgroundColor:"purple",top:"75px",left:0,height:"calc(100vh-75px)"}}>
            <Sidebar />
          </div>
          <div className="col-10 offset-2" style={{height: "calc(100vh - 75px)",overflowY:"auto"}}>
            <Routes>
              <Route path="/" element={<Dashboard />}/>
              <Route path="/Product" element={<Product />}/>
              <Route path="/Orderstatus/:id" element={<Orderstatus />}/>
            </Routes>
          </div>
        </div>
      </div>
      
    </BrowserRouter>
    </div>
  )
}

export default App