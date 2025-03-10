import React, { useState } from 'react';
import './AddMother.css';
import { addmotherApi } from '../../../services/allapi'; // Import the API function
import { ToastContainer, toast } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

function AddMother() {
    // State to manage form data
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        dateOfBirth: '',
        gender: 'female',
        address: '',
        guardianName: '',
        guardianPhone: '',
        bloodGroup: '',
        assignedWorkerId: '',
        lastDeliveryDate: '',
        breastfeedingStatus: 'exclusive',
        nutritionalSupport: false,
        lactationSupportDetails: '',
        currentStatus: 'Active'
    });

    // State to manage form errors
    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.info('Please fill all the required fields.');
            return;
        }

        try {
            // Call the API to add the mother
            const response = await addmotherApi(formData);
            console.log(response);

            if (response.status >= 200 && response.status < 300) {
                toast.success('Lactating mother added successfully!');
                // Reset form after successful submission
                setFormData({
                    id: '',
                    name: '',
                    dateOfBirth: '',
                    gender: 'female',
                    address: '',
                    guardianName: '',
                    guardianPhone: '',
                    bloodGroup: '',
                    assignedWorkerId: '',
                    lastDeliveryDate: '',
                    breastfeedingStatus: 'exclusive',
                    nutritionalSupport: false,
                    lactationSupportDetails: '',
                    currentStatus: 'Active'
                });
                setErrors({});
            } else {
                toast.error(`Error: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Error adding lactating mother:', error);
            toast.error('An error occurred while adding the lactating mother.');
        }
    };

    // Validate form fields
    const validateForm = (data) => {
        const errors = {};
        const requiredFields = [
            'id', 'name', 'dateOfBirth', 'gender', 'address',
            'guardianName', 'guardianPhone', 'bloodGroup',
            'assignedWorkerId', 'lastDeliveryDate', 'breastfeedingStatus'
        ];

        requiredFields.forEach(field => {
            if (!data[field]) {
                errors[field] = `${field} is required`;
            }
        });

        // Validate date formats
        if (data.dateOfBirth && isNaN(new Date(data.dateOfBirth).getTime())) {
            errors.dateOfBirth = 'Invalid date format for date of birth';
        }

        if (data.lastDeliveryDate && isNaN(new Date(data.lastDeliveryDate).getTime())) {
            errors.lastDeliveryDate = 'Invalid date format for last delivery date';
        }

        return errors;
    };

    return (
        <div className="add-beneficiary-container">
            <h1 className="page-title">Add Lactating Mother Beneficiary</h1>
            <form className="beneficiary-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    {/* ID */}
                    <div className="input-group">
                        <label className="form-label">ID</label>
                        <input
                            type="text"
                            name="id"
                            value={formData.id}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                        {errors.id && <span className="error-message">{errors.id}</span>}
                    </div>

                    {/* Name */}
                    <div className="input-group">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    {/* Date of Birth */}
                    <div className="input-group">
                        <label className="form-label">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                        {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
                    </div>

                    {/* Gender */}
                    <div className="input-group">
                        <label className="form-label">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
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
                            value={formData.address}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                        {errors.address && <span className="error-message">{errors.address}</span>}
                    </div>

                    {/* Guardian Name */}
                    <div className="input-group">
                        <label className="form-label">Guardian Name</label>
                        <input
                            type="text"
                            name="guardianName"
                            value={formData.guardianName}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                        {errors.guardianName && <span className="error-message">{errors.guardianName}</span>}
                    </div>

                    {/* Guardian Phone */}
                    <div className="input-group">
                        <label className="form-label">Guardian Phone</label>
                        <input
                            type="text"
                            name="guardianPhone"
                            value={formData.guardianPhone}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                        {errors.guardianPhone && <span className="error-message">{errors.guardianPhone}</span>}
                    </div>

                    {/* Blood Group */}
                    <div className="input-group">
                        <label className="form-label">Blood Group</label>
                        <input
                            type="text"
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                        {errors.bloodGroup && <span className="error-message">{errors.bloodGroup}</span>}
                    </div>

                    {/* Assigned Worker ID */}
                    <div className="input-group">
                        <label className="form-label">Assigned Worker ID</label>
                        <input
                            type="text"
                            name="assignedWorkerId"
                            value={formData.assignedWorkerId}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                        {errors.assignedWorkerId && <span className="error-message">{errors.assignedWorkerId}</span>}
                    </div>

                    {/* Last Delivery Date */}
                    <div className="input-group">
                        <label className="form-label">Last Delivery Date</label>
                        <input
                            type="date"
                            name="lastDeliveryDate"
                            value={formData.lastDeliveryDate}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                        {errors.lastDeliveryDate && <span className="error-message">{errors.lastDeliveryDate}</span>}
                    </div>

                    {/* Breastfeeding Status */}
                    <div className="input-group">
                        <label className="form-label">Breastfeeding Status</label>
                        <select
                            name="breastfeedingStatus"
                            value={formData.breastfeedingStatus}
                            onChange={handleInputChange}
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
                                checked={formData.nutritionalSupport}
                                onChange={handleInputChange}
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
                            value={formData.lactationSupportDetails}
                            onChange={handleInputChange}
                            className="form-input form-textarea"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="submit-button"
                >
                    Add Beneficiary
                </button>
            </form>

            {/* Toast Container */}
<ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
        </div>
    );
}

export default AddMother;