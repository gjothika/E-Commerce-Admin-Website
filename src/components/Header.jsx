import React from 'react'
import meeshoLogo from "../assets/meeshoLogo.svg"
const Header = () => {
  return (
    <div className="position-sticky top-0">
        <nav class="navbar navbar-light bg-white"style={{boxShadow: "0 2px 4px rgba(0,0,0,0.1)"}}>
  <div className="container-fluid">
      <img src={meeshoLogo} style={{maxWidth:"200px"}} className="p-2 ms-5"></img>
  </div>
</nav>

    </div>
  )
}

export default Header