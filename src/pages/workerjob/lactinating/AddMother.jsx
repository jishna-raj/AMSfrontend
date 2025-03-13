import React, { useState } from 'react';
import './AddMother.css';
import { addmotherApi } from '../../../services/allapi'; // Import the API function
import { ToastContainer, toast } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import { Link } from 'react-router-dom';

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
        currentStatus: 'Active',
        children: [] // Add children array
    });

    // State to manage form errors
    const [errors, setErrors] = useState({});

    // Handle input changes for mother details
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Handle input changes for child details
    const handleChildInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedChildren = [...formData.children];
        updatedChildren[index] = {
            ...updatedChildren[index],
            [name]: value
        };
        setFormData({
            ...formData,
            children: updatedChildren
        });
    };

    // Add a new child input field
    const addChild = () => {
        setFormData({
            ...formData,
            children: [
                ...formData.children,
                {
                    name: '',
                    dateOfBirth: '',
                    gender: 'male',
                    birthWeight: '',
                    breastfeedingStatus: 'exclusive'
                }
            ]
        });
    };

    // Remove a child input field
    const removeChild = (index) => {
        const updatedChildren = formData.children.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            children: updatedChildren
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
                    currentStatus: 'Active',
                    children: []
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

        // Validate child details
        data.children.forEach((child, index) => {
            if (!child.name) {
                errors[`childName${index}`] = `Child ${index + 1} name is required`;
            }
            if (!child.dateOfBirth || isNaN(new Date(child.dateOfBirth).getTime())) {
                errors[`childDateOfBirth${index}`] = `Child ${index + 1} date of birth is invalid`;
            }
            if (!child.birthWeight) {
                errors[`childBirthWeight${index}`] = `Child ${index + 1} birth weight is required`;
            }
        });

        return errors;
    };

    return (
        <div className="add-beneficiary-container">
            <Link to={'/lactating'} style={{textDecoration:'none'}}><h1 className="page-title">Add Lactating Mother Beneficiary</h1></Link>
            <form className="beneficiary-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    {/* Mother Details */}
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

                    {/* Child Details */}
                    <div className="input-group">
                        <label className="form-label">Children</label>
                        {formData.children.map((child, index) => (
                            <div key={index} className="child-input-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Child Name"
                                    value={child.name}
                                    onChange={(e) => handleChildInputChange(index, e)}
                                    className="form-input mt-3"
                                />
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    placeholder="Date of Birth"
                                    value={child.dateOfBirth}
                                    onChange={(e) => handleChildInputChange(index, e)}
                                    className="form-input mt-3"
                                />
                                <select
                                    name="gender"
                                    value={child.gender}
                                    onChange={(e) => handleChildInputChange(index, e)}
                                    className="form-input mt-3 form-select"
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                                <input
                                    type="number"
                                    name="birthWeight"
                                    placeholder="Birth Weight (kg)"
                                    value={child.birthWeight}
                                    onChange={(e) => handleChildInputChange(index, e)}
                                    className="form-input mt-3"
                                />
                                <select
                                    name="breastfeedingStatus"
                                    value={child.breastfeedingStatus}
                                    onChange={(e) => handleChildInputChange(index, e)}
                                    className="form-input form-select mt-3"
                                >
                                    <option value="exclusive">Exclusive</option>
                                    <option value="partial">Partial</option>
                                    <option value="none">None</option>
                                </select>
                                <button
                                    type="button"
                                    className="btn btn-danger mb-3 mt-2"
                                    onClick={() => removeChild(index)}
                                >
                                    Remove
                                </button>
                                {errors[`childName${index}`] && (
                                    <span className="error-message">{errors[`childName${index}`]}</span>
                                )}
                                {errors[`childDateOfBirth${index}`] && (
                                    <span className="error-message">{errors[`childDateOfBirth${index}`]}</span>
                                )}
                                {errors[`childBirthWeight${index}`] && (
                                    <span className="error-message">{errors[`childBirthWeight${index}`]}</span>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn"
                            onClick={addChild}
                        >
                            Add Child
                        </button>
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