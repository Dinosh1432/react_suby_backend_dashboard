import React,{useState} from 'react'
import { API_URI } from '../../data/Apipath';

const Login = ({showWelcomeHandler}) => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const LoginHandler=async(e)=>{
    e.preventDefault();
   try{ const response= await fetch(`${API_URI}/vendor/login`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
    });
    const data= await response.json();
    if(response.ok){
    
    localStorage.setItem('loginToken',data.token);
    setEmail("");
    setPassword("");
    alert("Login successfully");
    showWelcomeHandler()
  }
  const vendorId=data.vendorId
  const vendorResponse=await fetch(`${API_URI}/vendor/single-vendor/${vendorId}`);
  const vendorData=await vendorResponse.json();
  if(vendorResponse.ok){
    const vendorFirmId=vendorData.vendorFirmId;
    console.log("checking for firmId",vendorFirmId);
    const firmName=vendorData.vendor.firm[0].firmName
    
    localStorage.setItem('firmName',firmName);
    localStorage.setItem('firmId',vendorFirmId);
    window.location.reload();
  }
  else{
    console.log("no vendorfirm")
     window.location.reload();
  }
}
  catch(error){
    console.log(error)
    
  }
  
  }
  return (
   <div className="loginSection">
    <form className='authForm' onSubmit={LoginHandler}>
         <h3>Vendor Login</h3>
        <label >Email:</label><br></br>
        <input type="email" value={email} placeholder='enter your email' onChange={(e)=>setEmail(e.target.value)}></input><br></br>
        <label >Password:</label><br></br>
        <input type="password" value={password} placeholder='enter your password' onChange={(e)=>setPassword(e.target.value)}></input><br></br>
        <div className='btnSubmit'>
            <button type="submit">Submit</button>
        </div>
    </form>
   </div>
  )
}

export default Login