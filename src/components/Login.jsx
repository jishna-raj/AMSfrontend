import React from 'react'
import login from '../assets/login.webp'


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

                                <div className="form-group">
                                    <label htmlFor="healthId" id='healthid' className='fw-bold'>HealthId</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your HealthId"
                                        required
                                    />
                                </div>
                                <button type="button" className="btn text-light fw-bold w-100" style={{ transition: 'background-color 0.3s',backgroundColor:'#4a0d5c'}} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'black'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4a0d5c'}>Login</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
