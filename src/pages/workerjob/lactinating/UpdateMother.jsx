import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddMother.css';
import { getamotherApi, updatemotherApi } from '../../../services/allapi'; // Import the API functions

import { ToastContainer, toast } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

function UpdateMother() {
    const { id } = useParams(); // Extract the mother's ID from the URL
    const navigate = useNavigate()

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
        currentStatus: 'Active',
        lastDeliveryDate: '',
        breastfeedingStatus: 'exclusive',
        nutritionalSupport: false,
        lactationSupportDetails: '',
        children: [], // Add children array
    });

    // Function to convert ISO date to yyyy-MM-dd format
    const formatDate = (isoDate) => {
        if (!isoDate) return '';
        const date = new Date(isoDate);
        return date.toISOString().split('T')[0]; // Extract yyyy-MM-dd
    };

    // Fetch mother's data when the component mounts
    useEffect(() => {
        const fetchMotherData = async () => {
            try {
                const response = await getamotherApi(id); // Fetch mother's data by ID
                console.log(response);

                if (response.status >= 200 && response.status < 300) {
                    const motherData = response.data.data;
                    setFormData({
                        id: motherData.id,
                        name: motherData.name,
                        dateOfBirth: formatDate(motherData.dateOfBirth), // Format date
                        gender: motherData.gender,
                        address: motherData.address,
                        guardianName: motherData.guardianName,
                        guardianPhone: motherData.guardianPhone,
                        bloodGroup: motherData.bloodGroup,
                        assignedWorkerId: motherData.assignedWorkerId,
                        currentStatus: motherData.currentStatus,
                        lastDeliveryDate: formatDate(motherData.lastDeliveryDate), // Format date
                        breastfeedingStatus: motherData.breastfeedingStatus,
                        nutritionalSupport: motherData.nutritionalSupport,
                        lactationSupportDetails: motherData.lactationSupportDetails,
                        children: motherData.children.map((child) => ({
                            ...child,
                            dateOfBirth: formatDate(child.dateOfBirth), // Format child's date
                        })),
                    });
                } else {
                    console.error('Failed to fetch mother data:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching mother data:', error);
            }
        };

        fetchMotherData();
    }, [id]);

    // Handle input changes for mother details
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Handle input changes for child details
    const handleChildInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedChildren = [...formData.children];
        updatedChildren[index] = {
            ...updatedChildren[index],
            [name]: value,
        };
        setFormData({
            ...formData,
            children: updatedChildren,
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
                    breastfeedingStatus: 'exclusive',
                },
            ],
        });
    };

    // Remove a child input field
    const removeChild = (index) => {
        const updatedChildren = formData.children.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            children: updatedChildren,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Call the API to update the mother's data
            const response = await updatemotherApi(formData.id, formData);

            if (response.status >= 200 && response.status < 300) {
                console.log('Mother updated successfully:', response.data);
                toast.success('Mother updated successfully!');
               setTimeout(() => {
                navigate('/lactating')
               }, 2000);
                

            } else {
                console.error('Failed to update mother:', response.data.message);
                toast.error('Failed to update mother. Please try again.');
            }
        } catch (error) {
            console.error('Error updating mother:', error);
            toast.error('An error occurred while updating the mother. Please try again.');
        }
    };

    return (
        <div className="add-beneficiary-container">
            <h1 className="page-title">Update Lactating Mother Beneficiary</h1>
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
                            readOnly // ID should not be editable
                        />
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
                    </div>

                    {/* Current Status */}
                    <div className="input-group">
                        <label className="form-label">Current Status</label>
                        <select
                            name="currentStatus"
                            value={formData.currentStatus}
                            onChange={handleInputChange}
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
                            value={formData.lastDeliveryDate}
                            onChange={handleInputChange}
                            className="form-input"
                        />
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
                                    className="form-input mt-3 form-select"
                                >
                                    <option value="exclusive">Exclusive</option>
                                    <option value="partial">Partial</option>
                                    <option value="none">None</option>
                                </select>
                                <button
                                    type="button"
                                    className="btn btn-warning mt-4"
                                    onClick={() => removeChild(index)}
                                >
                                    Remove
                                </button>
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

                <button type="submit" className="submit-button">
                    Update Beneficiary
                </button>
            </form>

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

export default UpdateMother;