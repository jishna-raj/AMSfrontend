import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateWorkerApi, getAWorkerApi } from '../../services/allapi'; // Import the getAWorkerApi
import '../workers/worker.css';


function Wupdate() {
    const { id } = useParams(); // Get the worker ID from the URL
    const navigate = useNavigate(); // For navigation after update
    const [worker, setWorker] = useState({
        username: '',
        email: '',
        role: '',
        phone: '',
        address: '',
        workerId: '',
    });

    // Fetch worker data on component mount
    useEffect(() => {
        const fetchWorkerData = async () => {
            try {
                // Use the getAWorkerApi to fetch worker data by ID
                const response = await getAWorkerApi(id);
                console.log(response);
                
                if (response.status==200) {
                    setWorker(response.data.data); // Set the worker data in state
                } else {
                    toast.error(response.message || 'Failed to fetch worker data.');
                }
            } catch (error) {
                console.error('Error fetching worker data:', error);
                toast.error('An error occurred while fetching worker data.');
            }
        };

        fetchWorkerData();
    }, [id]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setWorker({ ...worker, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const reqBody = {
                username: worker.username,
                email: worker.email,
                role: worker.role,
                phone: worker.phone,
                address: worker.address,
                workerId: worker.workerId
            };


            const response = await updateWorkerApi(id, reqBody);
            console.log(response);
            
            if (response.status==200) {
                toast.success('Worker updated successfully!');
                navigate('/staff'); // Redirect to the staff page after update
            } else {
                toast.error(response.message || 'Failed to update worker.');
            }
        } catch (error) {
            console.error('Error updating worker:', error);
            toast.error('An error occurred while updating worker.');
        }
    };

    return (
        <div className="background-wrapper">
            <div className="container w-50 p-5 mt-5">
               
                 <div className='d-flex justify-content-between align-items-center'>
                        <h2 className="mb-4 fw-bold">Update Worker Details</h2> 
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
                            value={worker.username}
                            onChange={handleInputChange}
                            placeholder="Enter username"
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
                            value={worker.email}
                            onChange={handleInputChange}
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={worker.phone}
                            onChange={handleInputChange}
                            placeholder="Enter phone number"
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
                            value={worker.address}
                            onChange={handleInputChange}
                            placeholder="Enter address"
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
                            value={worker.workerId}
                            onChange={handleInputChange}
                            placeholder="Enter worker ID"
                            required
                        />
                    </div>

                    {/* Role */}
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role</label>
                        <select
                            className="form-control"
                            id="role"
                            name="role"
                            value={worker.role}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select role</option>
                            <option value="Worker">Worker</option>
                            <option value="Health official">Health official</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-between align-items-center">
                        <button type="submit" className="btn btn-success button2">Update</button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => navigate('/staff')}
                        >
                            <FontAwesomeIcon icon={faXmark} style={{ color: "#f3f4f7" }} />
                        </button>
                    </div>
                </form>
            </div>

            {/* Toast Notifications */}
            <ToastContainer autoClose={3000} theme="colored" position="top-center" />
        </div>
    );
}

export default Wupdate;