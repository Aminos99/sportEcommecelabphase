import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [searchTerm, setSearchTerm] = useState(""); 
  const navigate = useNavigate()
  const handleCardClick = (id) => {
    navigate(`/ProductDetails/${id}`);
  };
  const token = localStorage.getItem('authToken');
  console.log('JWT Token:', token);


  const fetchProducts = async (selectedSort, searchTerm = "") => {
    setLoading(true);
  
    const params = new URLSearchParams();
  
    if (selectedSort && selectedSort !== "default") {
      params.append("sort", selectedSort);
    }
  
    if (searchTerm.trim()) {
      params.append("search", searchTerm.trim());
    }
  
    const url = `http://localhost:5000/api/products?${params.toString()}`;
  
    try {
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchProducts(sortOption,searchTerm);
  }, [sortOption,searchTerm]); 

    return (
        <div>
            <header style={{
                backgroundColor: '#fff',
                padding: '16px 24px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                position: 'sticky',
                top: '0',
                zIndex: '100'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    <div style={{
                        fontSize: '24px',
                        fontWeight: '700'
                    }}>
                        SPORT<span style={{ color: '#ff4d4d' }}>HUB</span>
                    </div>

                    <nav style={{
                        display: 'flex',
                        gap: '24px'
                    }}>
                        <Link to="/Home" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Home</Link>
                        <Link to="/products" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Products</Link>
                        <Link to="/Contact" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Contact</Link>
                        <Link to="/productManager" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Product manager</Link>
                        <Link to="/orders" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Orders</Link>
                    </nav>

                    <div style={{
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            position: 'relative',
                            width: '240px'
                        }}>
                            <input
                                type="text"
                                placeholder="Search products..."
                                style={{
                                    padding: '8px 12px',
                                    borderRadius: '6px',
                                    border: '1px solid #ddd',
                                    placeholder:"Search products...",
                                    width: '100%',
                                    fontSize: '14px'
                                }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm state on change
                                
                            />
                            <span style={{
                                position: 'absolute',
                                right: '12px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#666'
                            }}>🔍</span>
                        </div>
                        <div style={{ fontSize: '20px' }}>👤</div>
                        <div style={{ fontSize: '20px', position: 'relative', cursor:'pointer' }} onClick={()=>{navigate('/cart')}}>
                            🛒
                            <span style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                backgroundColor: '#ff4d4d',
                                color: 'white',
                                borderRadius: '50%',
                                width: '18px',
                                height: '18px',
                                fontSize: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>2</span>
                        </div>
                    </div>
                </div>
            </header>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '20px'
            }}>
                <h1 style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    marginBottom: '24px',
                    textAlign: 'center'
                }}>Sports Equipment</h1>

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginBottom: '20px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <label htmlFor="sort" style={{
                            fontSize: '14px',
                            fontWeight: '500',
                            color: '#666'
                        }}>Sort by:</label>
                        <select id="sort" style={{
                            padding: '8px 12px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '14px',
                            backgroundColor: 'white',
                            cursor: 'pointer'
                        }} value={sortOption} onChange={(e) => setSortOption(e.target.value)}> 
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="newest">Newest Arrivals</option>
                            <option value="rating">Top Rated</option>
                        </select>
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '20px'
                }}>
                    {/* Product Card 1 */}
                    {products.map((product)=> (
                        <div key={product._id} style={{
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                            backgroundColor: 'white'
                        }} onClick={() => handleCardClick(product._id)}> 
                            <div style={{
                                height: '200px',
                                backgroundImage: `url(${product.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}></div>
                            <div style={{
                                padding: '16px'
                            }}>
                                <p style={{
                                    fontSize: '14px',
                                    color: '#666',
                                    marginBottom: '8px'
                                }}>Running</p>
                                <h3 style={{
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    marginBottom: '8px'
                                }}>{product.name}</h3>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: '12px'
                                }}>
                                    <p style={{
                                        fontSize: '18px',
                                        fontWeight: '700',
                                        color: '#ff4d4d'
                                    }}>{product.price}DT</p>
                                    <button style={{
                                        backgroundColor: '#333',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 12px',
                                        borderRadius: '4px',
                                        fontSize: '14px'
                                    }}>Check product details</button>
                                </div>
                            </div>
                        </div>
                    ))}             
                </div>
            </div>
        </div>
    )
}

export default Product
