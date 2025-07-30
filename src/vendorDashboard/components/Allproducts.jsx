import React, { useState, useEffect } from 'react';
import { API_URI } from '../data/Apipath';

const Allproducts = () => {
  const [products, setProducts] = useState([]);
  const [firmId, setFirmId] = useState(null);

  // Set firmId from localStorage when component mounts
  useEffect(() => {
    const storedFirmId = localStorage.getItem('firmId');
    if (storedFirmId) {
      setFirmId(storedFirmId);
    }
  }, []);

  // Fetch products only when firmId is available
  useEffect(() => {
    const productsHandler = async () => {
      try {
        const response = await fetch(`${API_URI}/product/getprodutsByFirm/${firmId}`);
        const newProductsData = await response.json();
        setProducts(newProductsData.product);
      } catch (error) {
        console.error("Failed to fetch products");
        alert("Failed to fetch products");
      }
    };

    if (firmId) {
      productsHandler();
    }
  }, [firmId]);

  const deleteProductById = async (ProductId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URI}/product/${ProductId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== ProductId));
        alert("Product Deleted Successfully");
      }
    } catch (error) {
      console.error("Delete Failed");
      alert("Failed to delete product");
    }
  };

  // Show message if not logged in
  if (!firmId) {
    return <p>Please login to view products.</p>;
  }

  return (
    <div>
      {products.length === 0 ? (
        <p>NO PRODUCTS ADDED</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item._id}>
                <td>{item.productName}</td>
                <td>{item.price}</td>
                <td>
                  {item.image && (
                    <img
                      src={`${API_URI}/uploads/${item.image}`}
                      alt={item.productName}
                      style={{ width: '70px', height: '50px' }}
                    />
                  )}
                </td>
                <td>
                  <button onClick={() => deleteProductById(item._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Allproducts;
