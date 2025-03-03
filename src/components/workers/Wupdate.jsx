import React from 'react';

import '../workers/worker.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';



function Wupdate() {
    return (
       <div className="background-wrapper">
            <div className="container w-50 p-5 mt-5">
                <h2 className="mb-4 fw-bold">Update Worker Details</h2>
                <form>
                    {/* Username */}
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="Enter username"
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
                        />
                    </div>
    
                   
    
                    
                    
    
                    {/* Phone Number */}
                    <div className="mb-3">
                        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Enter phone number"
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
                        />
                    </div>
    
                    <div className="mb-3">
                        <label htmlFor="Role" className="form-label">Role</label>
                        <input
                            type="text"
                            className="form-control"
                            id="role"
                            name="role"
                            placeholder="Enter role"
                        />
                    </div>
    
    
                  
                   <div className='d-flex justify-content-between align-items-center'>
                        <button  className="btn btn-success button2">update</button>
                        <button className='btn btn-danger'><FontAwesomeIcon icon={faXmark} style={{color: "#f3f4f7",}} /></button>
                   </div>
                </form>
            </div>
       </div>
    );
}

export default Wupdate;