import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import Addfirm from '../components/forms/Addfirm'
import Addproduct from '../components/forms/Addproduct'
import Welcome from '../components/Welcome'
import Allproducts from '../components/Allproducts'

const Landingpage = () => {
  const [showLogin,setShowLogin]=useState(false)
  const [showRegister,setShowRegister]=useState(false)
  const [showFirm,setShowFirm]=useState(false)
  const [showProduct,setShowProduct]=useState(false)
  const [welcome,setWelcome]=useState("");
  const [allproducts,setAllProducts]=useState("");
  const [showlogout,setShowLogout]=useState(false)
  const [showFirmTitle,setShowFirmTitle]=useState(true)
  


  useEffect(()=>{
    const loginToken=localStorage.getItem('loginToken');
    if(loginToken){
      setShowLogout(true)
    }
  },[])
   
  useEffect(()=>{
    const firmName=localStorage.getItem('firmName');
    if(firmName){
      setShowFirmTitle(false)
     
     
    }
  },[])

 
  const logoutHandler=()=>{
    const isConfirm=window.confirm("are you sure to logout")
    if(isConfirm){
    localStorage.removeItem('loginToken')
    localStorage.removeItem('firmId')
    localStorage.removeItem('firmName')
    setShowLogout(false)
    setShowFirmTitle(true)
  }
}

  const showLoginHandler=()=>{
    setShowLogin(true)
    setShowRegister(false)
     setShowFirm(false)
     setShowProduct(false)
     setWelcome(false)
     setAllProducts(false)

  }
   const showRegisterHandler=()=>{

    setShowRegister(true)
     setShowLogin(false)
     setShowFirm(false)
     setShowProduct(false)
    setWelcome(false)
    setAllProducts(false)
  }
  const showFirmHandler=()=>{
     if(showlogout){
    setShowFirm(true)
    setShowRegister(false)
     setShowLogin(false)
     setShowProduct(false)
    setWelcome(false)
    setAllProducts(false)
  }
  else{
      alert("please login")
      setShowLogin(true)
       setShowRegister(false)
  }
}
  const showProductHandler=()=>{
     if(showlogout){
    setShowProduct(true)
   setShowFirm(false)
    setShowRegister(false)
     setShowLogin(false)
     setWelcome(false)
     setAllProducts(false)
  }
   else{
      alert("please login")
      setShowLogin(true)
       setShowRegister(false)
  }
}
  const showWelcomeHandler=()=>{

    setShowProduct(false)
   setShowFirm(false)
    setShowRegister(false)
     setShowLogin(false)
    setWelcome(true)
  setAllProducts(false)}

  const showAllProductHandler=()=>{
    if(showlogout){
    setShowProduct(false)
   setShowFirm(false)
    setShowRegister(false)
     setShowLogin(false)
    setWelcome(false)
  setAllProducts(true)}
    else{
      alert("please login")
      setShowLogin(true)
      setShowRegister(false)
    }
  }

  
  return (
    <>
    <section className="LandingSection">
        <Navbar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showlogout={showlogout} logoutHandler={logoutHandler}/>
        <div className="collectionSection" >
        <Sidebar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} showAllProductHandler={showAllProductHandler} showFirmTitle={showFirmTitle}/>
      {showLogin &&<Login showWelcomeHandler={showWelcomeHandler}/>}
       {showRegister && <Register showLoginHandler={showLoginHandler}/>}
       {showFirm && showlogout && <Addfirm />}
       {showProduct && showlogout && <Addproduct/>}
      {welcome && <Welcome/>}
      {allproducts&& showlogout && <Allproducts/>}
        </div>
    </section>
    </>
  )
}

export default Landingpage