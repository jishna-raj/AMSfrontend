import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Register() {
    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100 cont" style={{ backgroundColor: '#f0f2f5' }}>
                <div className="p-4 border border-3 border-black shadow-lg" style={{ borderRadius: '28px', width: '400px', backgroundColor: 'rgba(255, 255, 255, 0.192)' }}>
                    <h4 className='fw-bold text-center' style={{color:"#5a0a72"}}>Register</h4>

                    <div className='position-relative d-flex mt-3' style={{ borderBottom: '2px solid black' }}>
                        <input type="text" placeholder='Username' className='py-2 px-3 w-100' style={{ border: 'none', backgroundColor: 'transparent', borderRadius: '5px' }} />
                        <FontAwesomeIcon icon={faUser} className='position-absolute top-50 text-black end-0 translate-middle-y me-3' />
                    </div>
                    <div className='position-relative d-flex mt-3' style={{ borderBottom: '2px solid black' }}>
                        <input type="text" placeholder='Email id' className='py-2 px-3 w-100' style={{ border: 'none', backgroundColor: 'transparent', borderRadius: '5px' }} />
                        <FontAwesomeIcon icon={faEnvelope} className='position-absolute top-50 text-black end-0 translate-middle-y me-3' />
                    </div>
                    <div className='position-relative d-flex mt-3' style={{ borderBottom: '2px solid black' }}>
                        <input type="password" placeholder='Password' className='py-2 px-3 w-100' style={{ border: 'none', backgroundColor: 'transparent', borderRadius: '5px' }} />
                        <FontAwesomeIcon icon={faLock} className='position-absolute top-50 text-black end-0 translate-middle-y me-3' />
                    </div>

                    <button className='btn btn-sm text-white w-100 rounded-pill mt-4' type='button' style={{ transition: 'background-color 0.3s',backgroundColor:'#5a0a72'}} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'black'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#5a0a72'}>
                        Sign up
                    </button>
                    <p className='text-center text-black mt-3'>Already a user?<Link to={"/user-login"} style={{textDecoration:"none",color:'#5a0a72',fontWeight:"600"}}>Login</Link></p>
                </div>
            </div>
        </>
    );
}

export default Register;