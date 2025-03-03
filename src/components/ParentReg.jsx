import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faChild, faIdCard } from '@fortawesome/free-solid-svg-icons'; 



function ParentReg() {
    return (
        <div className="cont1 vh-100 d-flex align-items-center justify-content-center">

<div className="blur-overlay"></div>

            <div className="row w-100">
                <div className="col-md-4"></div>
                <div className="col-md-4 mt-5">
                    <div className="login-container shadow-lg p-4 w-100 mt-5 mb-5 rounded">
                        <div className="login-form">
                            <h2 className="text-center mb-4" style={{ color: '#5a0a72' }}>Parent Registration</h2>
                            <form>
                               
                                <div className='mb-3 position-relative'>
                                    <FontAwesomeIcon
                                        icon={faUser}
                                        className="position-absolute top-50 start-0 translate-middle-y ms-3"
                                        
                                    />
                                    <input
                                        type="text"
                                        placeholder="Enter username"
                                        className='form-control form-control-lg ps-5' 
                                        style={{ borderRadius: '20px', border: '1px solid #ced4da' }}
                                    />
                                </div>

                                
                                <div className='mb-3 position-relative'>
                                    <FontAwesomeIcon
                                        icon={faEnvelope}
                                        className="position-absolute top-50 start-0 translate-middle-y ms-3"
                                        
                                    />
                                    <input
                                        type="email"
                                        placeholder="Enter email"
                                        className='form-control form-control-lg ps-5'
                                        style={{ borderRadius: '20px', border: '1px solid #ced4da' }}
                                    />
                                </div>

                                
                                <div className='mb-3 position-relative'>
                                    <FontAwesomeIcon
                                        icon={faLock}
                                        className="position-absolute top-50 start-0 translate-middle-y ms-3"
                                        
                                    />
                                    <input
                                        type="password"
                                        placeholder="Enter password"
                                        className='form-control form-control-lg ps-5' 
                                        style={{ borderRadius: '20px', border: '1px solid #ced4da' }}
                                    />
                                </div>

                                
                                <div className='mb-3 position-relative'>
                                    <FontAwesomeIcon
                                        icon={faChild}
                                        className="position-absolute top-50 start-0 translate-middle-y ms-3"
                                        
                                    />
                                    <input
                                        type="text"
                                        placeholder="Enter child's name"
                                        className='form-control form-control-lg ps-5'
                                        style={{ borderRadius: '20px', border: '1px solid #ced4da' }}
                                    />
                                </div>

                           
                                <div className='mb-3 position-relative'>
                                    <FontAwesomeIcon
                                        icon={faIdCard}
                                        className="position-absolute top-50 start-0 translate-middle-y ms-3"
                                        
                                    />
                                    <input
                                        type="text"
                                        placeholder="Enter child's ID"
                                        className='form-control form-control-lg ps-5'
                                        style={{ borderRadius: '20px', border: '1px solid #ced4da' }}
                                    />
                                </div>

                               
                                <button
                                    type="submit"
                                    className='btn btn-primary w-100 py-2'
                                    style={{ borderRadius: '20px', backgroundColor: '#5a0a72', border: 'none' }}
                                >
                                    Register
                                </button>
                            </form>
                            <p className="text-center mt-3">
                                Already registered?{' '}
                                <Link to="/parent-login" style={{ color: '#5a0a72', textDecoration: 'none', fontWeight: '600' }}>
                                    Please login
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

export default ParentReg;