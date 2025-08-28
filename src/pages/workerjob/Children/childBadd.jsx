import React, { useState } from 'react';
import { addchildbeneficiaryApi } from '../../../services/allapi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  age: '',
  gender: '',
  dateOfBirth: '',
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
  },
  parent: '',
  healthRecords: {
    date: '',
    weight: '',
    height: '',
    immunizations: '',
    recentIllnesses: '',
  },
  nutritionStatus: {
    date: '',
    status: '',
  },
  AdharNumber: '',
  guardian: {
    name: '',
    relationship: '',
    contactNumber: '',
    email: '',
  },
  lastVisitDate: '',
  vaccinationDetails: {
    vaccineName: '',
    dateAdministered: '',
    administeredBy: '',
    notes: '',
  },
};

function ChildBAdd() {
  const [childBeneficiary, setChildBeneficiary] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    setChildBeneficiary(prevState => {
      const newState = { ...prevState };
      let current = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Required fields validation
    const requiredFields = [
      childBeneficiary.name,
      childBeneficiary.age,
      childBeneficiary.gender,
      childBeneficiary.dateOfBirth,
      childBeneficiary.address.street,
      childBeneficiary.address.city,
      childBeneficiary.address.state,
      childBeneficiary.address.zipCode,
      childBeneficiary.parent,
      childBeneficiary.guardian.name,
      childBeneficiary.guardian.relationship,
      childBeneficiary.guardian.contactNumber,
      childBeneficiary.nutritionStatus.date,
      childBeneficiary.nutritionStatus.status,
      childBeneficiary.AdharNumber,
      childBeneficiary.lastVisitDate
    ];

    if (requiredFields.some(field => !field)) {
      toast.error('Please fill all required fields.');
      return;
    }

    // Validate age
    if (isNaN(childBeneficiary.age) || childBeneficiary.age <= 0) {
      toast.error('Age must be a positive number.');
      return;
    }

    // Validate Aadhar number (assuming 12 digits)
    if (!/^\d{12}$/.test(childBeneficiary.AdharNumber)) {
      toast.error('Aadhar number must be 12 digits.');
      return;
    }

    try {
      const formData = {
        ...childBeneficiary,
        age: Number(childBeneficiary.age),
        healthRecords: {
          ...childBeneficiary.healthRecords,
          weight: childBeneficiary.healthRecords.weight ? Number(childBeneficiary.healthRecords.weight) : null,
          height: childBeneficiary.healthRecords.height ? Number(childBeneficiary.healthRecords.height) : null,
          immunizations: childBeneficiary.healthRecords.immunizations 
            ? childBeneficiary.healthRecords.immunizations.split(',').map(item => item.trim()) 
            : []
        }
      };

      const response = await addchildbeneficiaryApi(formData);

      if (response.status >= 200 && response.status < 300) {
        toast.success('Child beneficiary added successfully!');
        setChildBeneficiary(initialState);
        navigate('/admin');
      } else {
        throw new Error(response.data?.message || 'Failed to add child beneficiary');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        if (error.response.status === 409) {
          toast.error('Child beneficiary already exists!');
        } else {
          toast.error(error.response.data?.message || 'Server error occurred');
        }
      } else {
        toast.error(error.message || 'Network error occurred');
      }
    }
  };

  return (
    <div className="child-beneficiary-container">
      <h1 className="form-title">Add Child Beneficiary</h1>

      <form className="beneficiary-form" onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <fieldset className="form-section">
          <legend className="section-title">Personal Information</legend>
          <div className="form-grid">
            <div className="input-group">
              <label className="form-label">Full Name*</label>
              <input
                type="text"
                className="form-input"
                name="name"
                value={childBeneficiary.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="form-label">Age*</label>
              <input
                type="number"
                className="form-input"
                name="age"
                value={childBeneficiary.age}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="input-group">
              <label className="form-label">Gender*</label>
              <select
                className="form-input"
                name="gender"
                value={childBeneficiary.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label className="form-label">Date of Birth*</label>
              <input
                type="date"
                className="form-input"
                name="dateOfBirth"
                value={childBeneficiary.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="form-label">Aadhar Number*</label>
              <input
                type="text"
                className="form-input"
                name="AdharNumber"
                value={childBeneficiary.AdharNumber}
                onChange={handleChange}
                pattern="\d{12}"
                title="12-digit Aadhar number"
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Address Information */}
        <fieldset className="form-section">
          <legend className="section-title">Address Details*</legend>
          <div className="form-grid">
            <div className="input-group">
              <label className="form-label">Street*</label>
              <input
                type="text"
                className="form-input"
                name="address.street"
                value={childBeneficiary.address.street}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="form-label">City*</label>
              <input
                type="text"
                className="form-input"
                name="address.city"
                value={childBeneficiary.address.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="form-label">State*</label>
              <input
                type="text"
                className="form-input"
                name="address.state"
                value={childBeneficiary.address.state}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="form-label">Zip Code*</label>
              <input
                type="text"
                className="form-input"
                name="address.zipCode"
                value={childBeneficiary.address.zipCode}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Parent and Guardian Information */}
        <fieldset className="form-section">
          <legend className="section-title">Parent & Guardian Information*</legend>
          <div className="form-grid">
            <div className="input-group">
              <label className="form-label">Parent's Name*</label>
              <input
                type="text"
                className="form-input"
                name="parent"
                value={childBeneficiary.parent}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="form-label">Guardian Name*</label>
              <input
                type="text"
                className="form-input"
                name="guardian.name"
                value={childBeneficiary.guardian.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="form-label">Relationship*</label>
              <select
                className="form-input"
                name="guardian.relationship"
                value={childBeneficiary.guardian.relationship}
                onChange={handleChange}
                required
              >
                <option value="">Select Relationship</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Grandparent">Grandparent</option>
                <option value="Guardian">Guardian</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label className="form-label">Contact Number*</label><br />
              <strong> <span className='text-warning me-3'> *Please include country code</span></strong>
              <input
                type="tel"
                className="form-input"
                name="guardian.contactNumber"
                value={childBeneficiary.guardian.contactNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                name="guardian.email"
                value={childBeneficiary.guardian.email}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>

        {/* Health Information */}
        <fieldset className="form-section">
          <legend className="section-title">Health Records</legend>
          <div className="form-grid">
            <div className="input-group">
              <label className="form-label">Assessment Date</label>
              <input
                type="date"
                className="form-input"
                name="healthRecords.date"
                value={childBeneficiary.healthRecords.date}
                onChange={handleChange}
              />
            </div>
            
            <div className="input-group">
              <label className="form-label">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                className="form-input"
                name="healthRecords.weight"
                value={childBeneficiary.healthRecords.weight}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className="input-group">
              <label className="form-label">Height (cm)</label>
              <input
                type="number"
                className="form-input"
                name="healthRecords.height"
                value={childBeneficiary.healthRecords.height}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div className="input-group">
              <label className="form-label">Immunizations</label>
              <input
                type="text"
                className="form-input"
                name="healthRecords.immunizations"
                value={childBeneficiary.healthRecords.immunizations}
                onChange={handleChange}
                placeholder="Comma separated list"
              />
            </div>

            <div className="input-group">
              <label className="form-label">Recent Illnesses</label>
              <input
                type="text"
                className="form-input"
                name="healthRecords.recentIllnesses"
                value={childBeneficiary.healthRecords.recentIllnesses}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>

        {/* Nutrition Status */}
        <fieldset className="form-section">
          <legend className="section-title">Nutrition Status*</legend>
          <div className="form-grid">
            <div className="input-group">
              <label className="form-label">Assessment Date*</label>
              <input
                type="date"
                className="form-input"
                name="nutritionStatus.date"
                value={childBeneficiary.nutritionStatus.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label className="form-label">Status*</label>
              <select
                className="form-input"
                name="nutritionStatus.status"
                value={childBeneficiary.nutritionStatus.status}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                <option value="Normal">Normal</option>
                <option value="Underweight">Underweight</option>
                <option value="Overweight">Overweight</option>
                <option value="Severely Underweight">Severely Underweight</option>
                <option value="Obese">Obese</option>
              </select>
            </div>
          </div>
        </fieldset>

        {/* Vaccination Details */}
        <fieldset className="form-section">
          <legend className="section-title">Vaccination Details</legend>
          <div className="form-grid">
            <div className="input-group">
              <label className="form-label">Vaccine Name</label>
              <input
                type="text"
                className="form-input"
                name="vaccinationDetails.vaccineName"
                value={childBeneficiary.vaccinationDetails.vaccineName}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label className="form-label">Date Administered</label>
              <input
                type="date"
                className="form-input"
                name="vaccinationDetails.dateAdministered"
                value={childBeneficiary.vaccinationDetails.dateAdministered}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label className="form-label">Administered By</label>
              <input
                type="text"
                className="form-input"
                name="vaccinationDetails.administeredBy"
                value={childBeneficiary.vaccinationDetails.administeredBy}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label className="form-label">Notes</label>
              <textarea
                className="form-input"
                rows="2"
                name="vaccinationDetails.notes"
                value={childBeneficiary.vaccinationDetails.notes}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>

        {/* Last Visit Date */}
        <fieldset className="form-section">
          <legend className="section-title">Last Visit Details*</legend>
          <div className="form-grid">
            <div className="input-group">
              <label className="form-label">Last Visit Date*</label>
              <input
                type="date"
                className="form-input"
                name="lastVisitDate"
                value={childBeneficiary.lastVisitDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Save Beneficiary</button>
          <button 
            type="button" 
            className="reset-btn"
            onClick={() => setChildBeneficiary(initialState)}
          >
            Clear Form
          </button>
        </div>
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

export default ChildBAdd;