import React,{useState} from 'react'
import { API_URI } from '../../data/Apipath';
  const Addfirm = () => {
  const [firmName,setFirmName]=useState("");
  const [area,setArea]=useState("");
  const [category,setCategory]=useState([]);
  const [region,setRegion]=useState([]);
  const [offer,setOffer]=useState("");
  const [file,setFile]=useState(null);

  const handleCategoryChange=(event)=>{
    const value=event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item!==value));
    }else{
      setCategory([...category,value])
    }
  }
  const handleRegionChange=(event)=>{
    const value=event.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item)=>item!==value));
    }else{
      setRegion([...region,value])
    }
  }

  const handleImageUpload=(event)=>{
    const selectedImage=event.target.files[0];
    setFile(selectedImage);
  }
  const handleFirmSubmit=async(e)=>{
    e.preventDefault();
    try {
      const loginToken=localStorage.getItem('loginToken');
      if(!loginToken){
        console.error("User not authenticated");
      }
      
      const formdata=new FormData();
      formdata.append('firmName',firmName);
      formdata.append('area',area);
      formdata.append('offer',offer);
      formdata.append('firmImage',file)

      category.forEach(element => {
        formdata.append('category',element)
      });
      region.forEach(element => {
        formdata.append('region',element)
      });
      
      
      
     const response=await fetch(`${API_URI}/firm/add-firm`,{
      method:'POST',
      headers:{
        'token':`${loginToken}`,
        },
      body:formdata
     })
     const data=await response.json();
  
     if(response.ok){
     setFirmName("");
     setArea("");
     setCategory([]);
     setOffer("");
     setRegion([]);
     setFile(null);
     
      alert("Firm added successfully");
     
      
     }else if(data.message==="please add limited firms"){
        alert("Firm exits,only one firm can be added");
        
      }
      else{
        alert("Failed to add firm")
      }
     const firmId=data.firmId
     localStorage.setItem('firmId',firmId)
      
    } catch (error) {
      console.error("Failed to add Firm")
    }
  }
  
  return (
    <div className="firmSection">
        <form className="tableForm" onSubmit={handleFirmSubmit}>
          <h2>Add Firm</h2>
            <label>Firm Name:</label>
            <input type="text" name="firmName" value={firmName} onChange={(e)=>setFirmName(e.target.value)}/>
            <label>Area:</label>
            <input type="text" name="area" value={area} onChange={(e)=>setArea(e.target.value)}/>
            <div className="check-inp">
              <label>Category:</label>
            <div className="inputsContainer">
            <div className='checkboxContainer'>
                <label>Veg</label>
                <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={handleCategoryChange}/>
              </div>
              <div className='checkboxContainer'>
                <label>Non-Veg</label>
                <input type="checkbox" checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange}/>
              </div>
            </div>
              
            </div>
             <label>Offer:</label>
            <input type="text" value={offer} onChange={(e)=>setOffer(e.target.value)}/>
            <div className="check-inp">
              <label>Region:</label>
            <div className="inputsContainer">
            <div className='regBoxContainer'>
                <label>South-Indian</label>
                <input type="checkbox" value="south-indian" checked={region.includes('south-indian')} onChange={handleRegionChange}/>
              </div>
              <div className='regBoxContainer'>
                <label>North-Indian</label>
                <input type="checkbox" value="north-indian" checked={region.includes('north-indian')} onChange={handleRegionChange}/>
              </div>
              <div className='regBoxContainer'>
                <label>Chinese</label>
                <input type="checkbox" value="chinese" checked={region.includes('chinese')} onChange={handleRegionChange}/> 
              </div>
              <div className='regBoxContainer'>
                <label>Bakery</label>
                <input type="checkbox" value="bakery" checked={region.includes('bakery')} onChange={handleRegionChange}/>
              </div>
            </div>
              
            </div>
              <label >Firm Image:</label>
            <input onChange={handleImageUpload} type="file" />
            <br/>

            
         <div className='btnSubmit'>
          <button type="submit">Submit</button>
        </div>
        </form>
    </div>
  )
}

export default Addfirm