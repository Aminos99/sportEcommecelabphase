import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function Usercart() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { userId } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
      const fetchCart = async () => {
        const token = localStorage.getItem('authToken'); // Get the auth token from localStorage
        if (!token) {
          setError('No user token found!');
          setLoading(false);
          return;
        }
  
        try {
          const response = await axios.get('http://localhost:5000/api/products/getCart', {
            headers: {
              Authorization: `Bearer ${token}`, // Send JWT token in the Authorization header
            },
          });
  
          setCart(response.data.cart);
          console.log(response.data);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching cart:', err);
          setError('Failed to fetch cart');
          setLoading(false);
        }
      };
  
      fetchCart();
    }, []);
  
    const handleRemoveItem = (productId) => {
      const token = localStorage.getItem('authToken'); // Get the auth token from localStorage
      if (!token) return;
  
      axios.delete(`http://localhost:5000/api/products/removeFromCart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send JWT token in the Authorization header
        },
      })
        .then(response => {
          setCart(response.data.cart);
        })
        .catch(err => {
          console.error('Error removing item from cart:', err);
        });
    };
  
  return (
    <div>
      <div style={{
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "40px 20px",
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}}>
  <h1 style={{
    fontSize: "32px",
    fontWeight: "600",
    marginBottom: "32px",
    color: "#111",
  }}>Your Cart (3)</h1>
  
  <div style={{
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "40px",
    "@media (min-width: 768px)": {
      gridTemplateColumns: "2fr 1fr",
    },
  }}>
    {/* Cart Items */}
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    }}>
      {cart.map((item) => (
              <div key={item.productId._id} style={{
                display: "flex",
                gap: "16px",
                padding: "16px",
                borderRadius: "8px",
                backgroundColor: "#fff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}>
                <img 
                  src={item.productId.image} 
                  alt={item.productId.name} 
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
                <div style={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}>
                  <div>
                    <h3 style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      margin: "0 0 4px 0",
                      color: "#111",
                    }}>{item.productId.name}</h3>
                    <p style={{
                      fontSize: "14px",
                      color: "#666",
                      margin: "0 0 8px 0",
                    }}>Desc: {item.productId.description || "N/A"}</p>
                  </div>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}>
                      <button style={{
                        border: "none",
                        background: "none",
                        width: "32px",
                        height: "32px",
                        cursor: "pointer",
                        fontSize: "16px",
                      }}>-</button>
                      <span style={{
                        padding: "0 12px",
                        fontSize: "14px",
                      }}>{item.quantity}</span>
                      <button style={{
                        border: "none",
                        background: "none",
                        width: "32px",
                        height: "32px",
                        cursor: "pointer",
                        fontSize: "16px",
                      }}>+</button>
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}>
                      <button style={{
                        background: "none",
                        border: "none",
                        color: "#666",
                        fontSize: "14px",
                        cursor: "pointer",
                        padding: "0",
                      }} onClick={() => handleRemoveItem(item.productId._id)}>Remove</button>
                      <span style={{
                        fontSize: "18px",
                        fontWeight: "500",
                        color: "#111",
                      }}>${item.productId.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      <button style={{
        background: "none",
        border: "none",
        color: "#111",
        fontSize: "16px",
        fontWeight: "500",
        cursor: "pointer",
        padding: "0",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        alignSelf: "flex-start",
      }} onClick={()=>{navigate('/product')}}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L11 6M5 12L11 18" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Continue Shopping
      </button>
    </div>
    
    {/* Order Summary */}
    <div style={{
      backgroundColor: "#f9fafb",
      borderRadius: "8px",
      padding: "24px",
      height: "fit-content",
    }}>
      <h2 style={{
        fontSize: "20px",
        fontWeight: "600",
        marginTop: "0",
        marginBottom: "24px",
        color: "#111",
      }}>Order Summary</h2>
      
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "16px",
          color: "#555",
        }}>
          <span>Subtotal</span>
          <span>$392.00</span>
        </div>
        
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "16px",
          color: "#555",
        }}>
          <span>Shipping</span>
          <span>Free</span>
        </div>
        
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "16px",
          color: "#555",
        }}>
          <span>Tax</span>
          <span>$31.36</span>
        </div>
        
        <div style={{
          height: "1px",
          backgroundColor: "#ddd",
          margin: "8px 0",
        }}></div>
        
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "18px",
          fontWeight: "600",
          color: "#111",
        }}>
          <span>Total</span>
          <span>$423.36</span>
        </div>
        
        <button style={{
          backgroundColor: "#111",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "0 24px",
          height: "48px",
          fontWeight: "500",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "16px",
          transition: "background-color 0.2s",
        }} onClick={()=>{navigate('/Placeorder')}}>
          Proceed to Checkout
        </button>
        
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "16px",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            color: "#666",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 16V12" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 8H12.01" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Free shipping on orders over $50</span>
          </div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            color: "#666",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 14L4 9L9 4M15 4L20 9L15 14" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>30-day return policy</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Usercart
