import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Placeorder() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [cart, setCart] = useState([]); // Initialize cart as an empty array
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  
  // Fetch the user's cart when the component mounts
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('authToken'); // Get the auth token from localStorage
      if (!token) {
        setError('No user token found!');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_LINK_URL}/api/products/getCart`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token in the Authorization header
          },
        });

        setCart(response.data.cart); // Set the cart data to state
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching cart');
        setLoading(false);
      }
    };

    fetchCart();
  }, []); // Empty dependency array to only run once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    console.log('Token on form submit:', token);

    if (!token) {
      alert('You must be logged in to place an order.');
      return;
    }

    // Mapping the cart data into the order data format
    const orderData = {
      products: cart.map(item => ({
        productId: item.productId._id || item.productId,  // Ensure productId is correctly populated
        quantity: item.quantity,
      })),
      shippingAddress,
      contactDetails: {
        fullName,
        email,
        phone,
      },
      paymentDetails: {
        cardName,
        cardNumber,
        expiryDate,
        cvv,
      },
    };

    console.log('OrderData Products:', orderData.products);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LINK_URL}/api/orders/create`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Send token in the headers
          },
        }
      );

      alert('Order placed successfully!');
      console.log('Order response:', response.data);
    } catch (err) {
      console.error('Order error:', err);
      alert(err.response?.data?.message || 'Failed to place the order');
    }
  };

  if (loading) {
    return <div>Loading cart...</div>; // Show loading message while the cart is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's an issue with fetching the cart
  }








  const containerStyle = {
    padding: "2.5rem",
    maxWidth: "650px",
    margin: "2rem auto",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05), 0 5px 10px rgba(0, 0, 0, 0.05)",
    fontFamily: "system-ui, -apple-system, sans-serif",
  }

  const headingStyle = {
    fontSize: "1.75rem",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "1.5rem",
    borderBottom: "1px solid #f3f4f6",
    paddingBottom: "0.75rem",
  }

  const formGroupStyle = {
    marginBottom: "1.25rem",
  }

  const labelStyle = {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "0.375rem",
  }

  const inputStyle = {
    width: "100%",
    padding: "0.625rem",
    fontSize: "0.95rem",
    borderRadius: "0.375rem",
    border: "1px solid #d1d5db",
    transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
    outline: "none",
  }

  const focusStyle = {
    borderColor: "#6366f1",
    boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)",
  }

  const textareaStyle = {
    ...inputStyle,
    minHeight: "100px",
    resize: "vertical",
  }

  const sectionDividerStyle = {
    margin: "2rem 0 1.5rem",
    borderTop: "1px solid #e5e7eb",
    position: "relative",
  }

  const sectionHeadingStyle = {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#111827",
    marginBottom: "1.25rem",
  }

  const buttonStyle = {
    display: "block",
    width: "100%",
    padding: "0.75rem 1.5rem",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "0.375rem",
    fontSize: "1rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.15s ease-in-out",
    marginTop: "1.5rem",
  }

  const buttonHoverStyle = {
    backgroundColor: "#4338ca",
  }

  const twoColumnStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1rem",
  }
  return (
    <div style={containerStyle}>
    <h2 style={headingStyle}>Create Order</h2>
    <form onSubmit={handleSubmit}>
      <div style={formGroupStyle}>
        <label style={labelStyle}>Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, focusStyle)}
          onBlur={(e) => {
            e.target.style.borderColor = "#d1d5db"
            e.target.style.boxShadow = "none"
          }}
        />
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, focusStyle)}
          onBlur={(e) => {
            e.target.style.borderColor = "#d1d5db"
            e.target.style.boxShadow = "none"
          }}
        />
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Phone Number</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, focusStyle)}
          onBlur={(e) => {
            e.target.style.borderColor = "#d1d5db"
            e.target.style.boxShadow = "none"
          }}
        />
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Shipping Address</label>
        <textarea
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          required
          style={textareaStyle}
          onFocus={(e) => Object.assign(e.target.style, focusStyle)}
          onBlur={(e) => {
            e.target.style.borderColor = "#d1d5db"
            e.target.style.boxShadow = "none"
          }}
        />
      </div>

      <div style={sectionDividerStyle}></div>
      <h3 style={sectionHeadingStyle}>Card Details (Mock)</h3>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Cardholder Name</label>
        <input
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          required
          style={inputStyle}
          onFocus={(e) => Object.assign(e.target.style, focusStyle)}
          onBlur={(e) => {
            e.target.style.borderColor = "#d1d5db"
            e.target.style.boxShadow = "none"
          }}
        />
      </div>

      <div style={formGroupStyle}>
        <label style={labelStyle}>Card Number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
          style={inputStyle}
          placeholder="•••• •••• •••• ••••"
          onFocus={(e) => Object.assign(e.target.style, focusStyle)}
          onBlur={(e) => {
            e.target.style.borderColor = "#d1d5db"
            e.target.style.boxShadow = "none"
          }}
        />
      </div>

      <div style={twoColumnStyle}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Expiry Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => {
              e.target.style.borderColor = "#d1d5db"
              e.target.style.boxShadow = "none"
            }}
          />
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>CVV</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
            style={inputStyle}
            placeholder="•••"
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => {
              e.target.style.borderColor = "#d1d5db"
              e.target.style.boxShadow = "none"
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        style={buttonStyle}
        onMouseOver={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
      >
        Place Order
      </button>
    </form>
  </div>
  );
}

export default Placeorder;


