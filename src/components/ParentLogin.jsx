import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faIdCard, faLock } from '@fortawesome/free-solid-svg-icons';
import { parentLoginApi } from '../services/allapi';


function ParentLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [childId, setChildId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Validate inputs
        if (!email || !password || !childId) {
            setError('All fields are required');
            return;
        }

        try {
            // Call the parentLoginApi function
            const response = await parentLoginApi({ email, password, childId });

            console.log(response);
            

            // Handle successful login
            if (response.data.token) {
                sessionStorage.setItem('parenttoken', response.data.token); // Save token to localStorage
                navigate(`/child/${childId}`) // Redirect to the parent dashboard
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="cont1 vh-100 d-flex align-items-center justify-content-center">
            <div className="blur-overlay"></div>

            <div className="row w-100">
                <div className="col-md-4"></div>
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <div className="login-container shadow-lg p-4 rounded position-relative">
                        <div className="login-form">
                            <h2 className="text-center mb-4" style={{ color: '#5a0a72' }}>Parent Login</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                {/* Email Field */}
                                <div className='mb-3 position-relative'>
                                    <FontAwesomeIcon
                                        icon={faEnvelope}
                                        className="position-absolute top-50 start-0 translate-middle-y ms-3"
                                        style={{ color: '#5a0a72' }}
                                    />
                                    <input
                                        type="email"
                                        placeholder="Enter email"
                                        className='form-control form-control-lg ps-5'
                                        style={{ borderRadius: '20px', border: '1px solid #ced4da' }}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                {/* Password Field */}
                                <div className='mb-3 position-relative'>
                                    <FontAwesomeIcon
                                        icon={faLock}
                                        className="position-absolute top-50 start-0 translate-middle-y ms-3"
                                        style={{ color: '#5a0a72' }}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Enter password"
                                        className='form-control form-control-lg ps-5'
                                        style={{ borderRadius: '20px', border: '1px solid #ced4da' }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                {/* Child's ID Field */}
                                <div className='mb-3 position-relative'>
                                    <FontAwesomeIcon
                                        icon={faIdCard}
                                        className="position-absolute top-50 start-0 translate-middle-y ms-3"
                                        style={{ color: '#5a0a72' }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Enter child's ID"
                                        className='form-control form-control-lg ps-5'
                                        style={{ borderRadius: '20px', border: '1px solid #ced4da' }}
                                        value={childId}
                                        onChange={(e) => setChildId(e.target.value)}
                                    />
                                </div>

                                {/* Login Button */}
                                <button
                                    type="submit"
                                    className='btn btn-primary w-100 py-2'
                                    style={{ borderRadius: '20px', backgroundColor: '#5a0a72', border: 'none' }}
                                >
                                    Login
                                </button>
                            </form>
                            <p className="text-center mt-3">
                                Don't have an account?{' '}
                                <Link to="/parent-register" style={{ color: '#5a0a72', textDecoration: 'none', fontWeight: '600' }}>
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
    );
}

export default ParentLogin;