import React from 'react'
import { Link } from 'react-router-dom'

function ContactPage() {
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
                        <Link to="/product" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Products</Link>
                        <Link to="/Contact" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Contact</Link>
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
                                }}
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
                        <div style={{ fontSize: '20px', position: 'relative' }}>
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
                maxWidth: '800px',
                margin: '0 auto',
                padding: '40px 20px',
                fontFamily: 'Inter, system-ui, sans-serif'
            }}>
                <h1 style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    marginBottom: '16px',
                    textAlign: 'center',
                    color: '#333'
                }}>Contact Us</h1>

                <p style={{
                    fontSize: '16px',
                    color: '#666',
                    textAlign: 'center',
                    marginBottom: '40px'
                }}>
                    Have questions or feedback? We'd love to hear from you.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '40px'
                }}>
                    {/* Contact Form */}
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        padding: '24px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}>
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: '600',
                            marginBottom: '20px',
                            color: '#333'
                        }}>Send us a message</h2>

                        <form>
                            <div style={{
                                marginBottom: '16px'
                            }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    marginBottom: '6px',
                                    color: '#333'
                                }}>
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        fontSize: '14px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <div style={{
                                marginBottom: '16px'
                            }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    marginBottom: '6px',
                                    color: '#333'
                                }}>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="your.email@example.com"
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        fontSize: '14px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <div style={{
                                marginBottom: '16px'
                            }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    marginBottom: '6px',
                                    color: '#333'
                                }}>
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    placeholder="How can we help?"
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        fontSize: '14px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        boxSizing: 'border-box'
                                    }}
                                />
                            </div>

                            <div style={{
                                marginBottom: '24px'
                            }}>
                                <label style={{
                                    display: 'block',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    marginBottom: '6px',
                                    color: '#333'
                                }}>
                                    Message
                                </label>
                                <textarea
                                    placeholder="Your message..."
                                    rows="5"
                                    style={{
                                        width: '100%',
                                        padding: '10px 12px',
                                        fontSize: '14px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        resize: 'vertical',
                                        boxSizing: 'border-box'
                                    }}
                                ></textarea>
                            </div>

                            <button style={{
                                backgroundColor: '#333',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '12px 24px',
                                fontSize: '16px',
                                fontWeight: '500',
                                cursor: 'pointer',
                                width: '100%'
                            }}>
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        padding: '24px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                    }}>
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: '600',
                            marginBottom: '20px',
                            color: '#333'
                        }}>Contact Information</h2>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '12px'
                            }}>
                                <div style={{ fontSize: '20px' }}>📍</div>
                                <div>
                                    <h3 style={{
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        marginBottom: '4px',
                                        color: '#333'
                                    }}>Address</h3>
                                    <p style={{
                                        fontSize: '14px',
                                        color: '#666',
                                        lineHeight: '1.5'
                                    }}>
                                        123 Sport Street<br />
                                        Athleticville, SP 12345<br />
                                        United States
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '12px'
                            }}>
                                <div style={{ fontSize: '20px' }}>📞</div>
                                <div>
                                    <h3 style={{
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        marginBottom: '4px',
                                        color: '#333'
                                    }}>Phone</h3>
                                    <p style={{
                                        fontSize: '14px',
                                        color: '#666'
                                    }}>
                                        +1 (555) 123-4567
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '12px'
                            }}>
                                <div style={{ fontSize: '20px' }}>✉️</div>
                                <div>
                                    <h3 style={{
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        marginBottom: '4px',
                                        color: '#333'
                                    }}>Email</h3>
                                    <p style={{
                                        fontSize: '14px',
                                        color: '#666'
                                    }}>
                                       amineltaief06@gmail.com
                                    </p>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '12px'
                            }}>
                                <div style={{ fontSize: '20px' }}>🕒</div>
                                <div>
                                    <h3 style={{
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        marginBottom: '4px',
                                        color: '#333'
                                    }}>Hours</h3>
                                    <p style={{
                                        fontSize: '14px',
                                        color: '#666',
                                        lineHeight: '1.5'
                                    }}>
                                        Monday - Friday: 9am - 6pm<br />
                                        Saturday: 10am - 4pm<br />
                                        Sunday: Closed
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage
