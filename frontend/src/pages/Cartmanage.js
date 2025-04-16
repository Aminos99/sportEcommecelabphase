import React from 'react'

function Cartmanage() {
  return (
    <div>
      <div style={{
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "40px 20px",
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}}>
  <div style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  }}>
    <h1 style={{
      fontSize: "28px",
      fontWeight: "600",
      color: "#111",
      margin: "0",
    }}>Order Management</h1>
    
    <div style={{
      display: "flex",
      gap: "16px",
    }}>
      <div style={{
        position: "relative",
      }}>
        <input 
          type="text" 
          placeholder="Search orders..." 
          style={{
            padding: "10px 16px",
            paddingLeft: "40px",
            borderRadius: "6px",
            border: "1px solid #ddd",
            fontSize: "14px",
            width: "240px",
          }}
        />
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            left: "14px",
            top: "12px",
            color: "#666",
          }}
        >
          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      
      <select style={{
        padding: "10px 16px",
        borderRadius: "6px",
        border: "1px solid #ddd",
        fontSize: "14px",
        backgroundColor: "white",
      }}>
        <option value="all">All Orders</option>
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
  </div>
  
  <div style={{
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    overflow: "hidden",
  }}>
    <table style={{
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "14px",
    }}>
      <thead>
        <tr style={{
          backgroundColor: "#f9fafb",
          textAlign: "left",
        }}>
          <th style={{
            padding: "16px",
            fontWeight: "500",
            color: "#666",
            borderBottom: "1px solid #eee",
          }}>Order ID</th>
          <th style={{
            padding: "16px",
            fontWeight: "500",
            color: "#666",
            borderBottom: "1px solid #eee",
          }}>Date</th>
          <th style={{
            padding: "16px",
            fontWeight: "500",
            color: "#666",
            borderBottom: "1px solid #eee",
          }}>Customer</th>
          <th style={{
            padding: "16px",
            fontWeight: "500",
            color: "#666",
            borderBottom: "1px solid #eee",
          }}>Total</th>
          <th style={{
            padding: "16px",
            fontWeight: "500",
            color: "#666",
            borderBottom: "1px solid #eee",
          }}>Status</th>
          <th style={{
            padding: "16px",
            fontWeight: "500",
            color: "#666",
            borderBottom: "1px solid #eee",
          }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {/* Order 1 */}
        <tr style={{
          borderBottom: "1px solid #eee",
        }}>
          <td style={{
            padding: "16px",
            fontWeight: "500",
          }}>#ORD-5392</td>
          <td style={{
            padding: "16px",
            color: "#666",
          }}>May 14, 2023</td>
          <td style={{
            padding: "16px",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "500",
                color: "#666",
              }}>JD</div>
              <span>John Doe</span>
            </div>
          </td>
          <td style={{
            padding: "16px",
            fontWeight: "500",
          }}>$129.99</td>
          <td style={{
            padding: "16px",
          }}>
            <select style={{
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "14px",
              backgroundColor: "white",
              width: "100%",
              maxWidth: "140px",
            }}>
              <option value="pending">Pending</option>
              <option value="processing" selected>Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </td>
          <td style={{
            padding: "16px",
          }}>
            <div style={{
              display: "flex",
              gap: "8px",
            }}>
              <button style={{
                backgroundColor: "#f9fafb",
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "6px 12px",
                fontSize: "14px",
                cursor: "pointer",
              }}>View</button>
              <button style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#666",
                cursor: "pointer",
                padding: "6px",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12V12.01M12 6V6.01M12 18V18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
        
        {/* Order 2 */}
        <tr style={{
          borderBottom: "1px solid #eee",
        }}>
          <td style={{
            padding: "16px",
            fontWeight: "500",
          }}>#ORD-5391</td>
          <td style={{
            padding: "16px",
            color: "#666",
          }}>May 13, 2023</td>
          <td style={{
            padding: "16px",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "500",
                color: "#666",
              }}>JS</div>
              <span>Jane Smith</span>
            </div>
          </td>
          <td style={{
            padding: "16px",
            fontWeight: "500",
          }}>$89.50</td>
          <td style={{
            padding: "16px",
          }}>
            <select style={{
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "14px",
              backgroundColor: "white",
              width: "100%",
              maxWidth: "140px",
            }}>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped" selected>Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </td>
          <td style={{
            padding: "16px",
          }}>
            <div style={{
              display: "flex",
              gap: "8px",
            }}>
              <button style={{
                backgroundColor: "#f9fafb",
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "6px 12px",
                fontSize: "14px",
                cursor: "pointer",
              }}>View</button>
              <button style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#666",
                cursor: "pointer",
                padding: "6px",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12V12.01M12 6V6.01M12 18V18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
        
        {/* Order 3 */}
        <tr style={{
          borderBottom: "1px solid #eee",
        }}>
          <td style={{
            padding: "16px",
            fontWeight: "500",
          }}>#ORD-5390</td>
          <td style={{
            padding: "16px",
            color: "#666",
          }}>May 12, 2023</td>
          <td style={{
            padding: "16px",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "500",
                color: "#666",
              }}>RJ</div>
              <span>Robert Johnson</span>
            </div>
          </td>
          <td style={{
            padding: "16px",
            fontWeight: "500",
          }}>$245.00</td>
          <td style={{
            padding: "16px",
          }}>
            <select style={{
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "14px",
              backgroundColor: "white",
              width: "100%",
              maxWidth: "140px",
            }}>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered" selected>Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </td>
          <td style={{
            padding: "16px",
          }}>
            <div style={{
              display: "flex",
              gap: "8px",
            }}>
              <button style={{
                backgroundColor: "#f9fafb",
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "6px 12px",
                fontSize: "14px",
                cursor: "pointer",
              }}>View</button>
              <button style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#666",
                cursor: "pointer",
                padding: "6px",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12V12.01M12 6V6.01M12 18V18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
        
        {/* Order 4 */}
        <tr style={{
          borderBottom: "1px solid #eee",
        }}>
          <td style={{
            padding: "16px",
            fontWeight: "500",
          }}>#ORD-5389</td>
          <td style={{
            padding: "16px",
            color: "#666",
          }}>May 11, 2023</td>
          <td style={{
            padding: "16px",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "500",
                color: "#666",
              }}>EW</div>
              <span>Emily Wilson</span>
            </div>
          </td>
          <td style={{
            padding: "16px",
            fontWeight: "500",
          }}>$67.25</td>
          <td style={{
            padding: "16px",
          }}>
            <select style={{
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "14px",
              backgroundColor: "white",
              width: "100%",
              maxWidth: "140px",
            }}>
              <option value="pending" selected>Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </td>
          <td style={{
            padding: "16px",
          }}>
            <div style={{
              display: "flex",
              gap: "8px",
            }}>
              <button style={{
                backgroundColor: "#f9fafb",
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "6px 12px",
                fontSize: "14px",
                cursor: "pointer",
              }}>View</button>
              <button style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#666",
                cursor: "pointer",
                padding: "6px",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12V12.01M12 6V6.01M12 18V18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
        
        {/* Order 5 */}
        <tr style={{
          borderBottom: "1px solid #eee",
        }}>
          <td style={{
            padding: "16px",
            fontWeight: "500",
          }}>#ORD-5388</td>
          <td style={{
            padding: "16px",
            color: "#666",
          }}>May 10, 2023</td>
          <td style={{
            padding: "16px",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "500",
                color: "#666",
              }}>MB</div>
              <span>Michael Brown</span>
            </div>
          </td>
          <td style={{
            padding: "16px",
            fontWeight: "500",
          }}>$189.99</td>
          <td style={{
            padding: "16px",
          }}>
            <select style={{
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ddd",
              fontSize: "14px",
              backgroundColor: "white",
              width: "100%",
              maxWidth: "140px",
            }}>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled" selected>Cancelled</option>
            </select>
          </td>
          <td style={{
            padding: "16px",
          }}>
            <div style={{
              display: "flex",
              gap: "8px",
            }}>
              <button style={{
                backgroundColor: "#f9fafb",
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "6px 12px",
                fontSize: "14px",
                cursor: "pointer",
              }}>View</button>
              <button style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#666",
                cursor: "pointer",
                padding: "6px",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12V12.01M12 6V6.01M12 18V18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
  <div style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "24px",
  }}>
    <div style={{
      fontSize: "14px",
      color: "#666",
    }}>
      Showing 5 of 24 orders
    </div>
    
    <div style={{
      display: "flex",
      gap: "8px",
    }}>
      <button style={{
        backgroundColor: "#f9fafb",
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "8px 16px",
        fontSize: "14px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Previous
      </button>
      <button style={{
        backgroundColor: "#f9fafb",
        border: "1px solid #ddd",
        borderRadius: "4px",
        padding: "8px 16px",
        fontSize: "14px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "4px",
      }}>
        Next
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Cartmanage
