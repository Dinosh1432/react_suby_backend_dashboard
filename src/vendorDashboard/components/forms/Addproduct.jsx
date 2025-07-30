import React,{useState} from 'react'
import { API_URI } from '../../data/Apipath';

const Addproduct = () => {
  const [productName,setProductName]=useState("");
  const [price,setPrice]=useState("");
  const [category,setCategory]=useState([]);
  const [bestSeller,setBestSeller]=useState(false);
  const [image,setImage]=useState(null);
  const [description,setDescription]=useState("");

   const handleCategoryChange=(event)=>{
    const value=event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item!==value));
    }else{
      setCategory([...category,value])
    }
  }
  const handleBestSeller=(e)=>{
    const value=e.target.value==="true";
      setBestSeller(value)
    }

  const handleImageUpload=(event)=>{
    const selectedImage=event.target.files[0];
    setImage(selectedImage);
  }

  const handleAddProduct=async(e)=>{
    e.preventDefault();
    try {
      const loginToken=localStorage.getItem('loginToken');
      const firmId=localStorage.getItem('firmId');
      if(!loginToken || !firmId){
        console.error("User not authenticated")
      }
      const formdata=new FormData();
      formdata.append('productName',productName);
      formdata.append('price',price);
      formdata.append('description',description);
      formdata.append('image',image);
      formdata.append('bestSeller',bestSeller.toString())

      category.forEach(element => {
        formdata.append('category',element)
      });
      
      const response=await fetch(`${API_URI}/product/add-product/${firmId}`,{
        method:'POST',

        body:formdata
      })
      const data=await response.json();
      console.log(data)
      if(response.ok){
        alert("Product added Successfully");
        setCategory([]);
        setDescription("");
        setPrice("");
        setImage(null);
        setProductName("");
        setBestSeller(false);
      }
    } catch (error) {
  
      alert("failed to add Product")
    }
  }
  return (
  <div className="firmSection">
        <form className="tableForm" onSubmit={handleAddProduct}>
          <h2>Add Product</h2>
            <label>Product Name:</label>
            <input type="text" value={productName} onChange={(e)=>{setProductName(e.target.value)}}/>
            <label>Price:</label>
            <input type="text" value={price}  onChange={(e)=>{setPrice(e.target.value)}}/>
            <div className="check-inp">
              <label>Category:</label>
            <div className="inputsContainer">
            <div className='checkboxContainer'>
                <label>Veg</label>
                <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange}></input>
              </div>
              <div className='checkboxContainer'>
                <label>Non-Veg</label>
                <input type="checkbox" value="non-veg"  checked={category.includes('non-veg')}  onChange={handleCategoryChange}></input>
              </div>
            </div>
              
            </div>
            <div className="check-inp">
              <label>BestSeller:</label>
            <div className="inputsContainer">
            <div className='checkboxContainer'>
                <label>Yes</label>
                <input type="radio" value="true" checked={bestSeller===true} onChange={handleBestSeller}></input>
              </div>
              <div className='checkboxContainer'>
                <label>No</label>
                <input type="radio" value="false" checked={bestSeller===false} onChange={handleBestSeller}></input>
              </div>
            </div>
              
            </div>
            <label>Description:</label>
            <input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
            <label>Firm Image:</label>
            <input type="file" onChange={handleImageUpload}/>
            <br/>
         <div className='btnSubmit'>
          <button type="submit">Submit</button>
        </div>
        </form>
    </div>
)
}



export default Addproduct