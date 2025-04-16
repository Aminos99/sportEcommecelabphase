import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Displayorders() {
    const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${process.env.LINK_URL}/api/orders/getOrders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data.orders);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  return (
    <div>
    {orders.map((order) => (
      <div
        key={order._id}
        style={{
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          maxWidth: "800px",
          margin: "2rem auto",
          padding: "2rem",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#111827", margin: "0 0 0.5rem 0" }}>
              Order #{order._id.slice(-5)}
            </h1>
            <p style={{ fontSize: "0.875rem", color: "#6B7280", margin: "0" }}>
              Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <div
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#ECFDF5",
              color: "#065F46",
              borderRadius: "9999px",
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            {order.status}
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid #E5E7EB",
            borderBottom: "1px solid #E5E7EB",
            padding: "1.5rem 0",
            marginBottom: "1.5rem",
          }}
        >
          <h2 style={{ fontSize: "1rem", fontWeight: "600", color: "#111827", marginBottom: "1rem" }}>
            Items
          </h2>

          {order.products.map((product, idx) => (
            <div key={idx} style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem" }}>
              <div style={{ width: "80px", height: "80px", backgroundColor: "#F3F4F6", borderRadius: "8px" }}></div>
              <div style={{ flex: "1" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: "500", color: "#111827", margin: "0" }}>
                    {product.productId?.name || 'Product'}
                  </h3>
                  <span style={{ fontWeight: "600", color: "#111827" }}>
                    ${product.price}
                  </span>
                </div>
                <p style={{ fontSize: "0.875rem", color: "#6B7280", margin: "0 0 0.5rem 0" }}>
                  Quantity: {product.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: "600", color: "#111827", marginBottom: "1rem" }}>
            Shipping Address
          </h2>
          <p style={{ fontSize: "0.875rem", color: "#4B5563", margin: "0", lineHeight: "1.5" }}>
            {order.contactDetails?.fullName}<br />
            {order.shippingAddress}
          </p>
        </div>

        <div style={{ backgroundColor: "#F9FAFB", borderRadius: "8px", padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: "600", color: "#111827", marginBottom: "1rem" }}>
            Order Summary
          </h2>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "#4B5563", marginBottom: "0.75rem" }}>
            <span>Subtotal</span>
            <span>${order.totalAmount.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "#4B5563", marginBottom: "0.75rem" }}>
            <span>Shipping</span>
            <span>$0.00</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "#4B5563", marginBottom: "1.5rem" }}>
            <span>Tax</span>
            <span>$0.00</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1rem", fontWeight: "600", color: "#111827", paddingTop: "1rem", borderTop: "1px solid #E5E7EB" }}>
            <span>Total</span>
            <span>${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default Displayorders
