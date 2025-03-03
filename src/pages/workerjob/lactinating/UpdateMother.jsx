import React from 'react';
import './AddMother.css';

function UpdateMother() {
    // Hardcoded data for the form (default values)
    const formData = {
        _id: 'LM123',
        name: 'Jane Doe',
        type: 'lactatingMother',
        dateOfBirth: '1990-05-14',
        gender: 'female',
        address: '123 Main St, New York, NY 10001',
        guardianName: 'John Doe',
        guardianPhone: '123-456-7890',
        bloodGroup: 'O+',
        assignedWorkerId: 'W123',
        currentStatus: 'Active',
        lastDeliveryDate: '2024-01-15',
        breastfeedingStatus: 'exclusive',
        nutritionalSupport: true,
        lactationSupportDetails: 'Receiving weekly nutritional supplements.',
    };

    return (
        <div className="add-beneficiary-container">
            <h1 className="page-title">Update Lactating Mother Beneficiary</h1>
            <form className="beneficiary-form">
                <div className="form-grid">
                    {/* ID */}
                    <div className="input-group">
                        <label className="form-label">ID</label>
                        <input
                            type="text"
                            name="_id"
                            defaultValue={formData._id}
                            className="form-input"
                            
                        />
                    </div>

                    {/* Name */}
                    <div className="input-group">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={formData.name}
                            className="form-input"
                            
                        />
                    </div>

                    {/* Date of Birth */}
                    <div className="input-group">
                        <label className="form-label">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            defaultValue={formData.dateOfBirth}
                            className="form-input"
                            
                        />
                    </div>

                    {/* Gender */}
                    <div className="input-group">
                        <label className="form-label">Gender</label>
                        <select
                            name="gender"
                            defaultValue={formData.gender}
                            className="form-input form-select"
                            
                        >
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                        </select>
                    </div>

                    {/* Address */}
                    <div className="input-group">
                        <label className="form-label">Address</label>
                        <input
                            type="text"
                            name="address"
                            defaultValue={formData.address}
                            className="form-input"
                            
                        />
                    </div>

                    {/* Guardian Name */}
                    <div className="input-group">
                        <label className="form-label">Guardian Name</label>
                        <input
                            type="text"
                            name="guardianName"
                            defaultValue={formData.guardianName}
                            className="form-input"
                            
                        />
                    </div>

                    {/* Guardian Phone */}
                    <div className="input-group">
                        <label className="form-label">Guardian Phone</label>
                        <input
                            type="text"
                            name="guardianPhone"
                            defaultValue={formData.guardianPhone}
                            className="form-input"
                            
                        />
                    </div>

                    {/* Blood Group */}
                    <div className="input-group">
                        <label className="form-label">Blood Group</label>
                        <input
                            type="text"
                            name="bloodGroup"
                            defaultValue={formData.bloodGroup}
                            className="form-input"
                            
                        />
                    </div>

                    {/* Assigned Worker ID */}
                    <div className="input-group">
                        <label className="form-label">Assigned Worker ID</label>
                        <input
                            type="text"
                            name="assignedWorkerId"
                            defaultValue={formData.assignedWorkerId}
                            className="form-input"
                            
                        />
                    </div>

                    {/* Current Status */}
                    <div className="input-group">
                        <label className="form-label">Current Status</label>
                        <select
                            name="currentStatus"
                            defaultValue={formData.currentStatus}
                            className="form-input form-select"
                            
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    {/* Last Delivery Date */}
                    <div className="input-group">
                        <label className="form-label">Last Delivery Date</label>
                        <input
                            type="date"
                            name="lastDeliveryDate"
                            defaultValue={formData.lastDeliveryDate}
                            className="form-input"
                            
                        />
                    </div>

                    {/* Breastfeeding Status */}
                    <div className="input-group">
                        <label className="form-label">Breastfeeding Status</label>
                        <select
                            name="breastfeedingStatus"
                            defaultValue={formData.breastfeedingStatus}
                            className="form-input form-select"
                            
                        >
                            <option value="exclusive">Exclusive</option>
                            <option value="partial">Partial</option>
                            <option value="none">None</option>
                        </select>
                    </div>

                    {/* Nutritional Support */}
                    <div className="input-group">
                        <label className="form-label">Nutritional Support</label>
                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                name="nutritionalSupport"
                                defaultChecked={formData.nutritionalSupport}
                                className="checkbox-input"
                                
                            />
                            <span className="form-label">Receiving nutritional support</span>
                        </div>
                    </div>

                    {/* Lactation Support Details */}
                    <div className="input-group">
                        <label className="form-label">Lactation Support Details</label>
                        <textarea
                            name="lactationSupportDetails"
                            defaultValue={formData.lactationSupportDetails}
                            className="form-input form-textarea"
                            
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="submit-button"
                    
                >
                    Update Beneficiary
                </button>
            </form>
        </div>
    );
};

export default UpdateMother;