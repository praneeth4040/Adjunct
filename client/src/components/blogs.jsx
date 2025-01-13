import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

function Blogs() {
    const handleSubmit = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    };

    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card shadow p-4 text-center" style={{ borderRadius: '10px', maxWidth: '500px' }}>
                <h1 className="text-success mb-4">gmail authentication</h1>
                <p className="text-muted mb-4">
                   give permissions to enable gmail usage
                   
                </p>
                <button
                    className="btn btn-success btn-lg"
                    onClick={handleSubmit}
                    style={{ borderRadius: '5px' }}
                >
                    Grant Permission
                </button>
            </div>
        </div>
    );
}

export default Blogs;
