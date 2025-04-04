import React from 'react';

function Blogs() {
    const handleSubmitGoogle = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    };

    return (
        <div
            className="container-fluid d-flex flex-column align-items-center justify-content-start min-vh-100"
            style={{ backgroundColor: 'black', paddingTop: '50px' }}
        >
            <div
                className="card shadow d-flex flex-column p-4 position-relative"
                style={{
                    borderRadius: '10px',
                    maxWidth: '95%',
                    width: '100%',
                    backgroundColor: '#1c1c1c',
                    color: 'white',
                    border: '2px dashed white',
                }}
            >
                {/* Text on the Border */}
                <span
                    style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '20px',
                        backgroundColor: '#2c2c2c', // Subtle dark gray background
                        color: 'white',
                        padding: '0 10px',
                        fontSize: '1rem',
                        borderRadius: '5px', // Rounded corners
                    }}
                >
                    Email Services
                </span>

                {/* Gmail Section */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="mb-2" style={{ color: '#007bff', fontSize: '1.2rem' }}>
                            Mail Sending Services Via Google
                        </h2>
                        <p style={{ color: '#b3b3b3', fontSize: '0.9rem' }}>
                            By granting permission, you allow us to send emails on your behalf. This is necessary for the app to function correctly.
                        </p>
                    </div>
                    <button
                        className="btn"
                        onClick={handleSubmitGoogle}
                        style={{
                            backgroundColor: '#ff9900',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '8px 15px',
                            fontSize: '0.9rem',
                        }}
                    >
                        Grant Permission
                    </button>
                </div>

                {/* Horizontal Line */}
                <hr style={{ borderColor: '#444', margin: '20px 0' }} />

                {/* Outlook Section */}
                <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ opacity: 0.5 }} // Makes the section appear dull
                >
                    <div>
                        <h2 className="mb-2" style={{ color: '#007bff', fontSize: '1.2rem' }}>
                            Mail Sending Services Via Outlook
                        </h2>
                        <p style={{ color: '#b3b3b3', fontSize: '0.9rem' }}>
                            This feature is currently unavailable.
                        </p>
                    </div>
                    <button
                        className="btn"
                        disabled // Disables the button
                        style={{
                            backgroundColor: '#ff9900',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '8px 15px',
                            fontSize: '0.9rem',
                            cursor: 'not-allowed', // Indicates the button is disabled
                        }}
                    >
                        Grant Permission
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Blogs;
