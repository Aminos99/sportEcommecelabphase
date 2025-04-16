import axios from 'axios'
import React, { useEffect, useState } from 'react'

function ProductManager() {
    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [editingProductId, setEditingProductId] = useState(null)
    const [products,setProducts] = useState([])
    const [selectedImage,setSelectedimage] = useState('')
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [price,setPrice] = useState('')
    const [image,setImage] = useState('')
    const [category,setCategory] = useState('')
    const [stock,setStock] = useState('')
    const [previewImage, setPreviewImage] = useState(null);
    
    const toggleAddForm = () => {
        setShowAddForm(!showAddForm)
        setShowEditForm(false)
        setEditingProductId(null)
    }
    const toggleEditForm = (productId) => {
        const product = products.find((p) => p._id === productId);
        if (product) {
          setEditingProductId(product._id);
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setCategory(product.category);
          setStock(product.stock);
          setShowEditForm(true);
        }
      };
    
    useEffect(()=>{
        const getAllproducts = async () => {
            try {
                const response = await axios.get(`${process.env.LINK_URL}/api/products/`)
                console.log(response.data)
                setProducts(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getAllproducts()
    },[])
    const addProduct = async (e) => {
        e.preventDefault();
        if (!selectedImage) {
          alert('Please upload an image.');
          return;
        }
        console.log("Image URL: ", selectedImage); 
        try {
          const response = await axios.post(`${process.env.LINK_URL}/api/products/addProduct`, {
            name,
            description,
            price,
            category,  
            stock,
            image: selectedImage
          });
          console.log(response.data);
          alert('Product is added to the database');
        } catch (error) {
          if (error.response) {
            alert(error.response.data.message || 'Something went wrong');
          } else {
            alert('Error: Unable to reach the server');
          }
          console.error('Error details:', error);
        }
      };
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
    
        try {
          const res = await axios.put(`${process.env.LINK_URL}/api/products/${editingProductId}`, {
            name,
            description,
            price,
            category,
            stock,
            image,
          });
    
          alert('Product updated successfully!');
          setShowEditForm(false);
          setEditingProductId(null);
    
          // Update state
          const updatedProduct = res.data.product;
          setProducts(products.map(p => (p._id === updatedProduct._id ? updatedProduct : p)));
        } catch (err) {
          console.error('Error updating product:', err);
          alert('Failed to update product');
        }
      };
    
      // Delete product
      const handleDeleteProduct = async (productId) => {
        const token = localStorage.getItem('authToken');
      
        if (!token) {
          alert('You must be logged in to delete a product.');
          return;
        }
      
        try {
          await axios.delete(`${process.env.LINK_URL}/api/products/delete`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: { productId }, // 💡 send productId in the body
          });
      
          alert('Product deleted');
          setProducts(products.filter(p => p._id !== productId));
        } catch (err) {
          console.error('Error deleting product:', err);
          alert('Failed to delete product');
        }
      };
      
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'unsigned_preset');
    
        const res = await axios.post(
          'https://api.cloudinary.com/v1_1/dbrle39lr/image/upload',
          formData
        );
    
        setSelectedimage(res.data.secure_url);
        setPreviewImage(res.data.secure_url);
      };
    
    
    return (
        <div>
            <div
                style={{
                    fontFamily: "Arial, sans-serif",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "20px",
                }}
            >
                <h1
                    style={{
                        color: "#333",
                        borderBottom: "2px solid #eee",
                        paddingBottom: "10px",
                    }}
                >
                    Product Admin Panel
                </h1>

                {/* Product List */}
                <div style={{ marginBottom: "20px" }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "15px",
                        }}
                    >
                        <h2 style={{ margin: 0 }}>Products</h2>
                        <button
                            onClick={toggleAddForm}
                            style={{
                                backgroundColor: "#4CAF50",
                                color: "white",
                                border: "none",
                                padding: "10px 15px",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontWeight: "bold",
                            }}
                        >
                            {showAddForm ? "Cancel" : "Add New Product"}
                        </button>
                    </div>

                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        }}
                    >
                        <thead>
                            <tr
                                style={{
                                    backgroundColor: "#f8f9fa",
                                    borderBottom: "2px solid #dee2e6",
                                }}
                            >
                                <th style={{ padding: "12px 15px", textAlign: "left" }}>ID</th>
                                <th style={{ padding: "12px 15px", textAlign: "left" }}>Name</th>
                                <th style={{ padding: "12px 15px", textAlign: "left" }}>Price</th>
                                <th style={{ padding: "12px 15px", textAlign: "left" }}>Category</th>
                                <th style={{ padding: "12px 15px", textAlign: "left" }}>Stock</th>
                                <th style={{ padding: "12px 15px", textAlign: "center" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id} style={{ borderBottom: "1px solid #dee2e6" }}>
                                    <td style={{ padding: "12px 15px" }}>{product._id}</td>
                                    <td style={{ padding: "12px 15px" }}>{product.name}</td>
                                    <td style={{ padding: "12px 15px" }}>${product.price.toFixed(2)}</td>
                                    <td style={{ padding: "12px 15px" }}>{product.category}</td>
                                    <td style={{ padding: "12px 15px" }}>{product.stock}</td>
                                    <td style={{ padding: "12px 15px", textAlign: "center" }}>
                                        <button
                                            onClick={() => toggleEditForm(product._id)}
                                            style={{
                                                backgroundColor: "#2196F3",
                                                color: "white",
                                                border: "none",
                                                padding: "6px 12px",
                                                borderRadius: "4px",
                                                marginRight: "5px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            {showEditForm && editingProductId === product.id ? "Cancel" : "Edit"}
                                        </button>
                                        <button
                                            style={{
                                                backgroundColor: "#f44336",
                                                color: "white",
                                                border: "none",
                                                padding: "6px 12px",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                            }} onClick={() => handleDeleteProduct(product._id)}

                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {showAddForm && (
                    <div
                        style={{
                            backgroundColor: "#f8f9fa",
                            padding: "20px",
                            borderRadius: "5px",
                            marginBottom: "20px",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        }}
                    >
                        <h2 style={{ marginTop: 0 }}>Add New Product</h2>
                        <form onSubmit={addProduct}>
                            <div style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Product Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        borderRadius: "4px",
                                        border: "1px solid #ddd",
                                    }} value={name} onChange={(e)=>{setName(e.target.value)}}
                                />
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Price:</label>
                                <input
                                    type="number"
                                    name="price"
                                    step="0.01"
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        borderRadius: "4px",
                                        border: "1px solid #ddd",
                                    }} value={price} onChange={(e)=>{setPrice(e.target.value)}}
                                />
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Category:</label>
                                <input
                                    type="text"
                                    name="category"
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        borderRadius: "4px",
                                        border: "1px solid #ddd",
                                    }}  value={category} onChange={(e)=>{setCategory(e.target.value)}}
                                />
                            </div>
                            <div style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Description:</label>
                                <input
                                    type="text"
                                    name="description"
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        borderRadius: "4px",
                                        border: "1px solid #ddd",
                                    }}  value={description} onChange={(e)=>{setDescription(e.target.value)}}
                                />
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Stock:</label>
                                
                            </div><input
                                type="number"
                                name="stock"
                                value={stock}
                                onChange={(e)=>{setStock(e.target.value)}}
                                required
                               style={{
                                width: "100%",
                                padding: "8px",
                                borderRadius: "4px",
                                border: "1px solid #ddd",
                                }}
                            />
                            <input
          type="file"
          onChange={handleImageUpload}
          required
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ddd",
          }}
        />

  {/* Optional preview */}
  {previewImage && (
    <img
      src={previewImage}
      alt="Preview"
      style={{
        marginTop: "10px",
        maxWidth: "150px",
        height: "auto",
        borderRadius: "4px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      }}
    />
  )}
                            {previewImage && <img src={previewImage} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />}
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: "#4CAF50",
                                    color: "white",
                                    border: "none",
                                    padding: "10px 15px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                }}
                            >
                                Add Product
                            </button>
                        </form>
                    </div>
                )}
                {showEditForm && (
                    <div
                        style={{
                            backgroundColor: "#f8f9fa",
                            padding: "20px",
                            borderRadius: "5px",
                            marginBottom: "20px",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        }}
                    >
                        <h2 style={{ marginTop: 0 }}>Edit Product</h2>
                        <form onSubmit={handleUpdateProduct}>
                            <div style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Product Name:</label>
                                <input
                                    type="text"
                                    defaultValue={products.find((p) => p.id === editingProductId)?.name}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        borderRadius: "4px",
                                        border: "1px solid #ddd",
                                    }} value={name} onChange={(e)=>{setName(e.target.value)}}
                                />
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Price:</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    defaultValue={products.find((p) => p.id === editingProductId)?.price}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        borderRadius: "4px",
                                        border: "1px solid #ddd",
                                    }} value={price} onChange={(e)=>{setPrice(e.target.value)}}
                                />
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Category:</label>
                                <input
                                    type="text"
                                    defaultValue={products.find((p) => p.id === editingProductId)?.category}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        borderRadius: "4px",
                                        border: "1px solid #ddd",
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: "15px" }}>
                                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Stock:</label>
                                <input
                                    type="number"
                                    name='stock'
                                    value={stock}
                                    onChange={(e)=>{setStock(e.target.value)}}
                                    required
                                    style={{
                                        width: "100%",
                                        padding: "8px",
                                        borderRadius: "4px",
                                        border: "1px solid #ddd",
                                    }}
                                />
                            </div>

                            <div style={{ display: "flex", gap: "10px" }}>
                                <button
                                    type="submit"
                                    style={{
                                        backgroundColor: "#2196F3",
                                        color: "white",
                                        border: "none",
                                        padding: "10px 15px",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Update Product
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowEditForm(false)
                                        setEditingProductId(null)
                                    }}
                                    style={{
                                        backgroundColor: "#f44336",
                                        color: "white",
                                        border: "none",
                                        padding: "10px 15px",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductManager
