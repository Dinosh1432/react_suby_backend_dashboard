import React,{useState} from 'react'
import { API_URI } from '../../data/Apipath';

const Register = ({showLoginHandler}) => {
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [username,setUsername]=useState("");
const [error,setError]=useState("");
const [loading,setLoading]=useState("");

const handleSubmit=async(e)=>{
  e.preventDefault();
  try{
    const responce=await fetch(`${API_URI}/vendor/register`,{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({username,email,password})
    });
    const data=await responce.json();
  if(responce.ok){ 
    setEmail("");
    setPassword("");
    setUsername("");
    showLoginHandler()
    alert("Vendor successfully Registerd")
  }
  }catch(error){
    console.log(error)
    alert("Registration failed")
  }
}
  return (
    <div className="registerSection">
    <form className='authForm' onSubmit={handleSubmit}>
         <h3>Vendor Register</h3><br></br>
        <label >User Name:</label>
        <input type="text" name="username" value={username} placeholder='enter your user name' onChange={(e)=>setUsername(e.target.value)}></input><br></br>
        <label >Email:</label>
        <input type="email" name="email" value={email} placeholder='enter your email' onChange={(e)=>setEmail(e.target.value)}></input><br></br>
        <label >Password:</label>
        <input type="password" name="password" value={password} placeholder='enter your password' onChange={(e)=>setPassword(e.target.value)}></input><br></br>
        <div className='btnSubmit'>
            <button type="submit">Submit</button>
        </div>
    </form>
    </div>
  )
}

export default Register