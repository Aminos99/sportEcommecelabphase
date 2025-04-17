import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1); // Default quantity to 1
  const [message, setMessage] = useState('');
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_LINK_URL}/api/products/${id}`);
        setProduct(response.data.product);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Handle quantity decrement
  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Prevent going below 1
  };
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  // Handle Add to Cart
  const handleAddToCart = async () => {
    const token = localStorage.getItem('authToken');
    console.log(id); // Log product ID (for debugging)
    console.log(quantity)
  
    // Check if token exists
    if (!token) {
      setMessage('You must be logged in to add to the cart');
      return;
    }
  
    // Check if quantity is valid
    if (quantity <= 0) {
      setMessage('Please select a valid quantity.');
      return;
    }
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LINK_URL}/api/products/addToCart`,
        {
          productId: id,    // The product's ID
          quantity: quantity, // The quantity selected
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Include the Bearer token in the Authorization header
          },
        }
      );
  
      if (response.status === 200) {
        setMessage('Product added to cart successfully!');
        // Optionally, update the cart state in the frontend if needed:
        // setCart(response.data.cart);
      } else {
        setMessage(response.data.message); // Handle any other responses
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setMessage('Failed to add product to cart. Please try again.');
    }
  };
  
  

  return (
    <div>
      <div style={{
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px',
  fontFamily: 'Inter, system-ui, sans-serif'
}}>
  <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '40px',
    marginBottom: '40px'
  }}>
    {/* Product Images */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: '80px 1fr',
      gap: '16px'
    }}>
      {/* Thumbnails */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <div style={{
          border: '2px solid #ff4d4d',
          borderRadius: '8px',
          overflow: 'hidden',
          cursor: 'pointer'
        }}>
          <img 
            src="/placeholder.svg?height=80&width=80" 
            alt="Product thumbnail" 
            style={{
              width: '100%',
              height: 'auto',
              display: 'block'
            }}
          />
        </div>
        <div style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
          cursor: 'pointer'
        }}>
          <img 
            src="/placeholder.svg?height=80&width=80" 
            alt="Product thumbnail" 
            style={{
              width: '100%',
              height: 'auto',
              display: 'block'
            }}
          />
        </div>
        <div style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden',
          cursor: 'pointer'
        }}>
          <img 
            src="/placeholder.svg?height=80&width=80" 
            alt="Product thumbnail" 
            style={{
              width: '100%',
              height: 'auto',
              display: 'block'
            }}
          />
        </div>
      </div>
      
      {/* Main Image */}
      <div style={{
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#f8f9fa'
      }}>
        <img 
          src={product && product.image ? product.image : "Loading..."} 
          alt="Pro Runner X2 Shoes" 
          style={{
            width: '100%',
            height: 'auto',
            display: 'block'
          }}
        />
      </div>
    </div>
    
    {/* Product Info */}
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <div>
        <span style={{
          backgroundColor: '#ff4d4d',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '600',
          display: 'inline-block',
          marginBottom: '8px'
        }}>NEW</span>
        
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          marginBottom: '12px',
          color: '#333'
        }}>{product && product.name ? product.name : "Loading..."}
</h1>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '16px'
        }}>
          <div style={{
            color: '#ff9500',
            fontSize: '16px'
          }}>★★★★☆</div>
          <span style={{
            color: '#666',
            fontSize: '14px'
          }}>4.8 (124 reviews)</span>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <span style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#ff4d4d'
          }}>${product && product.price ? product.price : "Loading..."}
</span>
          <span style={{
            fontSize: '16px',
            textDecoration: 'line-through',
            color: '#999'
          }}>$159.99</span>
        </div>
      </div>
      
      <p style={{
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#555',
        marginBottom: '20px'
      }}>
      {product && product.description ? product.description : "Loading..."}

      </p>
      
      {/* Color Selection */}
      <div style={{
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          marginBottom: '12px'
        }}>Color: <span style={{ fontWeight: '400', color: '#666' }}>Red</span></h3>
        
        <div style={{
          display: 'flex',
          gap: '12px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#ff4d4d',
            border: '2px solid #333',
            cursor: 'pointer'
          }}></div>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#333',
            border: '2px solid transparent',
            cursor: 'pointer'
          }}></div>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#3478F6',
            border: '2px solid transparent',
            cursor: 'pointer'
          }}></div>
        </div>
      </div>
      
      {/* Size Selection */}
      <div style={{
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          marginBottom: '12px'
        }}>Size</h3>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{
            padding: '8px 16px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            textAlign: 'center',
            fontSize: '14px',
            cursor: 'pointer'
          }}>US 8</div>
          <div style={{
            padding: '8px 16px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            textAlign: 'center',
            fontSize: '14px',
            cursor: 'pointer'
          }}>US 9</div>
          <div style={{
            padding: '8px 16px',
            border: '2px solid #333',
            borderRadius: '6px',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>US 10</div>
          <div style={{
            padding: '8px 16px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            textAlign: 'center',
            fontSize: '14px',
            cursor: 'pointer'
          }}>US 11</div>
          <div style={{
            padding: '8px 16px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            textAlign: 'center',
            fontSize: '14px',
            cursor: 'pointer'
          }}>US 12</div>
        </div>
      </div>
      
      {/* Quantity */}
      <div style={{
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          marginBottom: '12px'
        }}>Quantity</h3>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          maxWidth: '140px'
        }}>
          <button style={{
            width: '36px',
            height: '36px',
            border: '1px solid #ddd',
            borderRadius: '6px 0 0 6px',
            backgroundColor: '#f5f5f5',
            fontSize: '16px',
            cursor: 'pointer'
          }} onClick={decreaseQuantity}>-</button>
          <div style={{
            width: '60px',
            height: '36px',
            border: '1px solid #ddd',
            borderLeft: 'none',
            borderRight: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px'
          }}>1</div>
          <button style={{
            width: '36px',
            height: '36px',
            border: '1px solid #ddd',
            borderRadius: '0 6px 6px 0',
            backgroundColor: '#f5f5f5',
            fontSize: '16px',
            cursor: 'pointer'
          }} onClick={increaseQuantity}>+</button>
        </div>
      </div>
      
      {/* Add to Cart */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '20px'
      }}>
        <button style={{
          flex: '1',
          padding: '14px',
          backgroundColor: '#ff4d4d',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer'
        }} onClick={handleAddToCart}>Add to Cart</button>
        
        <button style={{
          width: '48px',
          height: '48px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: 'white',
          fontSize: '20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>♡</button>
      </div>
      
      {/* Features */}
      <div style={{
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        padding: '16px',
        marginTop: '20px'
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          marginBottom: '12px'
        }}>Key Features</h3>
        
        <ul style={{
          paddingLeft: '20px',
          margin: '0',
          fontSize: '14px',
          color: '#555',
          lineHeight: '1.6'
        }}>
          <li>Responsive cushioning system for maximum comfort</li>
          <li>Breathable mesh upper keeps your feet cool</li>
          <li>Reinforced heel for stability on any terrain</li>
          <li>Durable rubber outsole with traction pattern</li>
          <li>Lightweight design (8.5 oz for men's size 10)</li>
        </ul>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default ProductDetails
