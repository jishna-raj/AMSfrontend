import React from 'react'
import login from '../assets/login.webp'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <>
            <div className="cont" style={{ height: '100vh' }}>
                <div className="row align-items-center h-100">
                    <div className="col-md-6 d-none d-md-flex justify-content-center">
                        <img
                            className='rounded img-fluid'
                            src={login}
                            alt="Login"
                            style={{ maxHeight: '390px', width: 'auto', height: 'auto' }}
                        />
                    </div>

                    <div className="col-md-6 d-flex justify-content-center">
                        <div className="form-container shadow p-5" style={{ width: '100%', maxWidth: '400px' }}>
                            <h2 className="form-title text-center">Login</h2>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="email" id='email'>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" id='email'>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>
                                <button type="button" className="button w-100" style={{ transition: 'background-color 0.3s',backgroundColor:'#5a0a72'}} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'black'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#5a0a72'}>Login</button>
                            </form>
                            <div className="text-center mt-3">
                                <p>Are you not a registered user? <Link to={"/user-reg"} style={{textDecoration:"none"}}><span id='reg'>Register</span></Link></p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
