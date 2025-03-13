import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../assets/login.webp';
import '../components/Register.css';
import { HealthLoginApi } from '../services/allapi';


function Login() {
    const navigate = useNavigate();

    // State to manage form inputs and error messages
    const [formData, setFormData] = useState({
        email: '',
        workerId: '',
    });
    const [error, setError] = useState('');

    console.log(formData);
    

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!formData.email || !formData.workerId) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            // Call the HealthLoginApi
            const response = await HealthLoginApi(formData);

            console.log(response);
            

            if (response.status>=200 & response.status<300) {
                // Store user details in sessionStorage
                sessionStorage.setItem('user', JSON.stringify(response.data.worker
                ));

                alert("Login Successfull")

                // Redirect to the dashboard or another page
                navigate('/health-page');
            } else {
                // Display error message
                setError(response.message || 'Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred during login. Please try again.');
        }
    };

    return (
        <>
            <div className="cont" style={{ height: '100vh' }}>
                <div className="row align-items-center h-100">
                    <div className="col-md-5 d-none d-md-flex justify-content-center">
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
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email" id='email'>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="healthId" id='healthid' className='fw-bold'>Health ID</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your Health ID"
                                        name="workerId"
                                        value={formData.workerId}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn text-light fw-bold w-100"
                                    style={{
                                        transition: 'background-color 0.3s',
                                        backgroundColor: '#4a0d5c',
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'black')}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4a0d5c')}
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;