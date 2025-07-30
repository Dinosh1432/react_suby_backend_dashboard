import React from 'react'

const Navbar = ({showLoginHandler,showRegisterHandler,showlogout,logoutHandler}) => {
const firmName=localStorage.getItem('firmName')
  return (
    <div className='navSection'>
      <div className="company">
        Vendor Dashboard
      </div>
      <div className="firmname">
        <h3>FirmName:{firmName}</h3>
      </div>
      <div className="userAuth">
        {!showlogout ?<>
        <span onClick={showLoginHandler}>Login /</span>
        <span onClick={showRegisterHandler}>Register</span>
        </> :<span onClick={logoutHandler}>Logout</span>}
      </div>
    </div>
  )
}

export default Navbar