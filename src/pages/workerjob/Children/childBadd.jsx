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
  educationDetails: {
    preschoolName: '',
    enrollmentDate: '',
    progress: '',
  },
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

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    setChildBeneficiary((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState)); // Deep clone
      let current = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation to ensure required fields are filled
    if (
      !childBeneficiary.name ||
      !childBeneficiary.age ||
      !childBeneficiary.gender ||
      !childBeneficiary.dateOfBirth ||
      !childBeneficiary.address.street ||
      !childBeneficiary.address.city ||
      !childBeneficiary.address.state ||
      !childBeneficiary.address.zipCode ||
      !childBeneficiary.parent ||
      !childBeneficiary.guardian.name ||
      !childBeneficiary.guardian.relationship ||
      !childBeneficiary.guardian.contactNumber ||
      !childBeneficiary.nutritionStatus.date ||
      !childBeneficiary.nutritionStatus.status ||
      !childBeneficiary.educationDetails.preschoolName ||
      !childBeneficiary.educationDetails.enrollmentDate ||
      !childBeneficiary.educationDetails.progress ||
      !childBeneficiary.lastVisitDate
    ) {
      toast.error('Please fill all required fields.');
      return;
    }

    // Validate age as a positive number
    if (isNaN(childBeneficiary.age) || childBeneficiary.age <= 0) {
      toast.error('Age must be a positive number.');
      return;
    }

    try {
      // Ensure age is a number
      const formData = {
        ...childBeneficiary,
        age: Number(childBeneficiary.age),
      };

      const response = await addchildbeneficiaryApi(formData);

      if (response.status >= 200 && response.status < 300) {
        toast.success('Child beneficiary added successfully!');
        setChildBeneficiary(initialState);
        navigate('/admin'); // Redirect after successful submission
      } else {
        throw new Error(response.data?.message || 'Failed to add child beneficiary');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error('Child beneficiary already exists!');
          setChildBeneficiary(initialState);
          navigate('/admin');
        } else {
          toast.error(`Error adding child beneficiary: ${error.response.data?.message || error.message}`);
        }
      } else {
        toast.error(`Error adding child beneficiary: ${error.message}`);
      }
    }
  };

  return (
    <>
      <div className="child-beneficiary-container">
        <h1 className="form-title">Add Child Beneficiary</h1>

        <form
          className="beneficiary-form"
          onSubmit={handleSubmit}
          onReset={() => setChildBeneficiary(initialState)}
        >
          {/* Personal Information Section */}
          <fieldset className="form-section">
            <legend className="section-title">Personal Information</legend>
            <div className="form-grid">
              <div className="input-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  name="name"
                  value={childBeneficiary.name}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  className="form-input"
                  required
                  name="age"
                  value={childBeneficiary.age}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="form-label">Gender</label>
                <select
                  className="form-input"
                  required
                  name="gender"
                  value={childBeneficiary.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="input-group">
                <label className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-input"
                  required
                  name="dateOfBirth"
                  value={childBeneficiary.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          {/* Address Information */}
          <fieldset className="form-section">
            <legend className="section-title">Address Details</legend>
            <div className="form-grid">
              <div className="input-group">
                <label className="form-label">Street</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  name="address.street"
                  value={childBeneficiary.address.street}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  name="address.city"
                  value={childBeneficiary.address.city}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="form-label">State</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  name="address.state"
                  value={childBeneficiary.address.state}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="form-label">Zip Code</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  name="address.zipCode"
                  value={childBeneficiary.address.zipCode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          {/* Parent's Information */}
          <fieldset className="form-section">
            <legend className="section-title">Parent's Information</legend>
            <div className="form-grid">
              <div className="input-group">
                <label className="form-label">Parent's Name</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  name="parent"
                  value={childBeneficiary.parent}
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          {/* Guardian Information */}
          <fieldset className="form-section">
            <legend className="section-title">Guardian Information</legend>
            <div className="form-grid">
              <div className="input-group">
                <label className="form-label">Guardian Name</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  name="guardian.name"
                  value={childBeneficiary.guardian.name}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="form-label">Relationship</label>
                <select
                  className="form-input"
                  required
                  name="guardian.relationship"
                  value={childBeneficiary.guardian.relationship}
                  onChange={handleChange}
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
                <label className="form-label">Contact Number</label>
                <input
                  type="tel"
                  className="form-input"
                  required
                  name="guardian.contactNumber"
                  value={childBeneficiary.guardian.contactNumber}
                  onChange={handleChange}
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
                <label className="form-label">Date of Assessment</label>
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
                  name="healthRecords.illnesses"
                  value={childBeneficiary.healthRecords.illnesses}
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          {/* Nutrition Status */}
          <fieldset className="form-section">
            <legend className="section-title">Nutrition Status</legend>
            <div className="form-grid">
              <div className="input-group">
                <label className="form-label">Assessment Date</label>
                <input
                  type="date"
                  className="form-input"
                  required
                  name="nutritionStatus.date"
                  value={childBeneficiary.nutritionStatus.date}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="form-label">Status</label>
                <select
                  className="form-input"
                  required
                  name="nutritionStatus.status"
                  value={childBeneficiary.nutritionStatus.status}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="Normal">Normal</option>
                  <option value="Underweight">Underweight</option>
                  <option value="Overweight">Overweight</option>
                </select>
              </div>
            </div>
          </fieldset>

          {/* Education Details */}
          <fieldset className="form-section">
            <legend className="section-title">Education Details</legend>
            <div className="form-grid">
              <div className="input-group">
                <label className="form-label">Preschool Name</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  name="educationDetails.preschoolName"
                  value={childBeneficiary.educationDetails.preschoolName}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="form-label">Enrollment Date</label>
                <input
                  type="date"
                  className="form-input"
                  required
                  name="educationDetails.enrollmentDate"
                  value={childBeneficiary.educationDetails.enrollmentDate}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label className="form-label">Progress Report</label>
                <textarea
                  className="form-input"
                  rows="4"
                  required
                  name="educationDetails.progress"
                  value={childBeneficiary.educationDetails.progress}
                  onChange={handleChange}
                />
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
                  required
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
                  required
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
                  required
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
            <legend className="section-title">Last Visit Details</legend>
            <div className="form-grid">
              <div className="input-group">
                <label className="form-label">Last Visit Date</label>
                <input
                  type="date"
                  className="form-input"
                  required
                  name="lastVisitDate"
                  value={childBeneficiary.lastVisitDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </fieldset>

          <div className="form-actions">
            <button type="submit" className="submit-btn">Save Beneficiary</button>
            <button type="reset" className="reset-btn">Clear Form</button>
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

     
    </>
  );
}

export default ChildBAdd;