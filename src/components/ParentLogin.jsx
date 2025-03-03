import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faIdCard, faLock } from '@fortawesome/free-solid-svg-icons'; 



function ParentLogin() {
    return (
        <div
            className="cont1 vh-100 d-flex align-items-center justify-content-center"
        >
           
            <div className="blur-overlay"></div>

            <div className="row w-100">
                <div className="col-md-4"></div>
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                    <div className="login-container shadow-lg p-4  rounded position-relative">
                        <div className="login-form">
                            <h2 className="text-center mb-4" style={{ color: '#5a0a72' }}>Parent Login</h2>
                            <form>
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