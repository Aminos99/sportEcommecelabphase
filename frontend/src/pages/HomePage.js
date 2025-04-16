import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import basketballbg from '../assets/basketballbg.jpg'
import fitnessbg from '../assets/fitnessbg.jpg'
import mainbg from '../assets/mainbg.jpg'
import outdoorbg from '../assets/outdoorbg.jpg'
import runningbg from '../assets/runnigbg.jpg'
function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchNewestProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products/newest');
        setProducts(res.data.products);
        console.log(res.data.products)
      } catch (err) {
        console.error('Error fetching newest products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewestProducts();
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  if (loading) return <p>Loading newest products...</p>;
  return (
    <div>
      <div style={{
        fontFamily: 'Inter, system-ui, sans-serif',
        color: '#333',
        margin: '0',
        padding: '0',
        backgroundColor: '#f8f9fa'
      }}>
        {/* Header */}
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
                    width: '100%',
                    fontSize: '14px'
                  }} value={searchTerm}  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#666'
                }} onClick={handleSearch}>🔍</span>
              </div>
              <div style={{ fontSize: '20px' }}>👤</div>
              <div style={{ fontSize: '20px', position: 'relative', cursor: 'pointer' }} onClick={() => { navigate('/cart') }}>
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

        {/* Hero Section */}
        <section style={{
          backgroundImage: `url(${mainbg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          padding: '0 20px'
        }}>
          <div style={{
            maxWidth: '800px'
          }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '800',
              marginBottom: '16px'
            }}>GEAR UP FOR GREATNESS</h1>
            <p style={{
              fontSize: '18px',
              marginBottom: '24px',
              fontWeight: '300'
            }}>Premium sports equipment for athletes of all levels</p>
            <button style={{
              backgroundColor: '#ff4d4d',
              color: 'white',
              border: 'none',
              padding: '12px 32px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '6px',
              cursor: 'pointer'
            }} onClick={() => { navigate('/products') }}>SHOP NOW</button>
          </div>
        </section>

        {/* Categories */}
        <section style={{
          padding: '60px 24px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '40px'
          }}>Shop By Category</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px'
          }}>
            {/* Category 1 */}
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              backgroundColor: 'white',
              transition: 'transform 0.3s',
              cursor: 'pointer'
            }}>
              <div style={{
                height: '200px',
                backgroundImage: `url(${runningbg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}></div>
              <div style={{
                padding: '16px',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>Running</h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '16px'
                }}>Shoes, apparel & accessories</p>
                <a href="#" style={{
                  color: '#ff4d4d',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '14px'
                }} onClick={() => { navigate('/products') }}>Shop Collection →</a>
              </div>
            </div>

            {/* Category 2 */}
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              backgroundColor: 'white',
              transition: 'transform 0.3s',
              cursor: 'pointer'
            }}>
              <div style={{
                height: '200px',
                backgroundImage: `url(${basketballbg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}></div>
              <div style={{
                padding: '16px',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>Basketball</h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '16px'
                }}>Balls, hoops & team gear</p>
                <a href="#" style={{
                  color: '#ff4d4d',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '14px'
                }}>Shop Collection →</a>
              </div>
            </div>

            {/* Category 3 */}
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              backgroundColor: 'white',
              transition: 'transform 0.3s',
              cursor: 'pointer'
            }}>
              <div style={{
                height: '200px',
                backgroundImage: `url(${fitnessbg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}></div>
              <div style={{
                padding: '16px',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>Fitness</h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '16px'
                }}>Equipment, weights & more</p>
                <a href="#" style={{
                  color: '#ff4d4d',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '14px'
                }}>Shop Collection →</a>
              </div>
            </div>

            {/* Category 4 */}
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              backgroundColor: 'white',
              transition: 'transform 0.3s',
              cursor: 'pointer'
            }}>
              <div style={{
                height: '200px',
                backgroundImage: `url(${outdoorbg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}></div>
              <div style={{
                padding: '16px',
                textAlign: 'center'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>Outdoor</h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  marginBottom: '16px'
                }}>Hiking, camping & adventure</p>
                <a href="#" style={{
                  color: '#ff4d4d',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '14px'
                }}>Shop Collection →</a>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section style={{
          padding: '60px 24px',
          backgroundColor: 'white'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '40px'
            }}>Newest products</h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px'
            }}>
              {products.map((product) => (
                <div
                  key={product._id}
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#f8f9fa',
                    transition: 'transform 0.3s',
                    cursor: 'pointer'
                  }} onClick={()=>{navigate('/products')}}
                >
                  <div
                    style={{
                      height: '250px',
                      backgroundImage: `url(${product.image || '/placeholder.svg?height=500&width=500'})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative'
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        backgroundColor: '#ff4d4d',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      NEW
                    </span>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                      {product.category}
                    </p>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                      {product.name}
                    </h3>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <p style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#ff4d4d'
                      }}>
                        ${product.price.toFixed(2)}
                      </p>
                      <button style={{
                        backgroundColor: '#333',
                        color: 'white',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}>
                        Check product details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              textAlign: 'center',
              marginTop: '40px'
            }}>
              <button style={{
                backgroundColor: 'transparent',
                color: '#333',
                border: '2px solid #333',
                padding: '12px 32px',
                fontSize: '16px',
                fontWeight: '600',
                borderRadius: '6px',
                cursor: 'pointer'
              }} onClick={() => { navigate('/product') }}>View All Products</button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{
          padding: '60px 24px',
          backgroundColor: '#f8f9fa'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              textAlign: 'center'
            }}>
              <div style={{
                padding: '24px'
              }}>
                <div style={{
                  fontSize: '36px',
                  marginBottom: '16px'
                }}>🚚</div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>Free Shipping</h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666'
                }}>On all orders over $50</p>
              </div>

              <div style={{
                padding: '24px'
              }}>
                <div style={{
                  fontSize: '36px',
                  marginBottom: '16px'
                }}>↩️</div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>Easy Returns</h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666'
                }}>30-day return policy</p>
              </div>

              <div style={{
                padding: '24px'
              }}>
                <div style={{
                  fontSize: '36px',
                  marginBottom: '16px'
                }}>🔒</div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>Secure Payment</h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666'
                }}>100% secure checkout</p>
              </div>

              <div style={{
                padding: '24px'
              }}>
                <div style={{
                  fontSize: '36px',
                  marginBottom: '16px'
                }}>💬</div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>24/7 Support</h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666'
                }}>Dedicated customer service</p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section style={{
          padding: '60px 24px',
          backgroundColor: '#333',
          color: 'white',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              marginBottom: '16px'
            }}>Join Our Newsletter</h2>
            <p style={{
              fontSize: '16px',
              marginBottom: '24px',
              color: '#ccc'
            }}>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>

            <div style={{
              display: 'flex',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  flex: '1',
                  padding: '12px 16px',
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: '6px 0 0 6px'
                }}
              />
              <button style={{
                backgroundColor: '#ff4d4d',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                borderRadius: '0 6px 6px 0',
                cursor: 'pointer'
              }}>Subscribe</button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          backgroundColor: '#222',
          color: '#ccc',
          padding: '60px 24px 24px'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginBottom: '40px'
          }}>
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: 'white',
                marginBottom: '16px'
              }}>SPORT<span style={{ color: '#ff4d4d' }}>HUB</span></h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                marginBottom: '16px'
              }}>Your one-stop destination for premium sports equipment and gear.</p>
              <div style={{
                display: 'flex',
                gap: '12px',
                fontSize: '20px'
              }}>
                <span>📱</span>
                <span>📘</span>
                <span>📸</span>
                <span>📺</span>
              </div>
            </div>

            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                marginBottom: '16px'
              }}>Shop</h4>
              <ul style={{
                listStyle: 'none',
                padding: '0',
                margin: '0'
              }}>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>All Products</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>New Arrivals</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Best Sellers</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Sale Items</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                marginBottom: '16px'
              }}>Categories</h4>
              <ul style={{
                listStyle: 'none',
                padding: '0',
                margin: '0'
              }}>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Running</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Basketball</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Fitness</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Outdoor</a></li>
              </ul>
            </div>

            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                marginBottom: '16px'
              }}>Help</h4>
              <ul style={{
                listStyle: 'none',
                padding: '0',
                margin: '0'
              }}>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Contact Us</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>FAQs</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Shipping & Returns</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: '#ccc', textDecoration: 'none', fontSize: '14px' }}>Track Order</a></li>
              </ul>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid #444',
            paddingTop: '24px',
            textAlign: 'center',
            fontSize: '14px'
          }}>
            <p>&copy; 2025 SPORTHUB. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default HomePage
