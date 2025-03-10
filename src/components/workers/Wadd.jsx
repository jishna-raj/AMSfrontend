import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addWorkerApi } from '../../services/allapi'; // Adjust the path to your API file
import '../workers/worker.css';
import { Link, useNavigate } from 'react-router-dom';

function Wadd() {
    // State to manage form inputs
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: 'Worker', // Default role
        phone: '',
        address: '',
        workerId: '',
    });


    const navigate = useNavigate()


   
    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        console.log(name, value); // Log the field name and value
        setFormData({
            ...formData,
            [name]: value,
        });

        // Log the updated formData
        console.log('Updated Form Data:', {
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Log the form data before sending it to the backend
        console.log('Form Data:', formData);

        // Check if all required fields are filled
        if (!formData.username || !formData.email || !formData.role || !formData.phone || !formData.address || !formData.workerId) {
            toast.error('Please fill all required fields.');
            return;
        }

        try {
            // Call the API to add a worker
            const response = await addWorkerApi(formData);

            // Log the API response
            console.log('API Response:', response);

            if (response.data.success) {
                toast.success('Worker added successfully!');
                // Clear the form after successful submission
                setFormData({
                    username: '',
                    email: '',
                    role: 'Worker', // Reset to default role
                    phone: '',
                    address: '',
                    workerId: '',
                });



                navigate('/staff')


            } else {
                toast.error(response.message || 'Failed to add worker.');
            }
        } catch (error) {
            console.error('Error adding worker:', error);
            toast.error('An error occurred while adding the worker.');
        }
    };

    return (
        <div className="background-wrapper">
           
            <div className="container w-50 p-5 mt-5">
               <div className='d-flex justify-content-between align-items-center'>
                    <h2 className="mb-4 fw-bold">Add Worker Details</h2>
                   <Link to={'/staff'} style={{color:'white'}}> <FontAwesomeIcon icon={faBackward} /></Link>
               </div>
                <form onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="Enter username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Role */}
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select
                            name="role"
                            className="form-control"
                            value={formData.role}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="Worker">Worker</option>
                            <option value="Health official">Health Official</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    {/* Phone Number */}
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            placeholder="Enter phone number"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Address */}
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            placeholder="Enter address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Worker ID */}
                    <div className="mb-3">
                        <label htmlFor="workerId" className="form-label">Worker ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="workerId"
                            name="workerId"
                            placeholder="Enter worker ID"
                            value={formData.workerId}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-between align-items-center">
                        <button type="submit" className="btn btn-success button2">
                            Add Worker
                        </button>
                        <button type="button" className="btn btn-danger">
                            <FontAwesomeIcon icon={faXmark} style={{ color: "#f3f4f7" }} />
                        </button>
                    </div>
                </form>
            </div>

            {/* Toast notifications */}
            <ToastContainer autoClose={3000} theme="colored" position="top-center" />
        </div>
    );
}

export default Wadd;