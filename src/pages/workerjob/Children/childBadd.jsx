import React from 'react';
import './ChildBeneficiary.css';

const ChildBAdd = () => {
  return (
    <div className="child-beneficiary-container">
      <h1 className="form-title">Add Child Beneficiary</h1>
      
      <form className="beneficiary-form">
        {/* Personal Information Section */}
        <fieldset className="form-section">
          <legend className="section-title">Personal Information</legend>
          <div className="form-grid">
            <div className="input-group">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" required />
            </div>
            
            <div className="input-group">
              <label className="form-label">Age</label>
              <input type="number" className="form-input" required />
            </div>

            <div className="input-group">
              <label className="form-label">Gender</label>
              <select className="form-input" required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label className="form-label">Date of Birth</label>
              <input type="date" className="form-input" required />
            </div>
          </div>
        </fieldset>

        {/* Address Information */}
        <fieldset className="form-section">
          <legend className="section-title">Address Details</legend>
          <div className="form-grid">
            <div className="input-group">
              <label className="form-label">Street</label>
              <input type="text" className="form-input" />
            </div>
            
            <div className="input-group">
              <label className="form-label">City</label>
              <input type="text" className="form-input" />
            </div>

            <div className="input-group">
              <label className="form-label">State</label>
              <input type="text" className="form-input" />
            </div>

            <div className="input-group">
              <label className="form-label">Zip Code</label>
              <input type="text" className="form-input" />
            </div>
          </div>
        </fieldset>

        {/* Parent/Guardian Information */}
        <div className="form-section">
          <div className="input-group">
            <label className="form-label">Parent/Guardian Name</label>
            <input type="text" className="form-input" required />
          </div>
        </div>

        {/* Health Information */}
        <fieldset className="form-section">
          <legend className="section-title">Health Records</legend>
          <div className="form-grid">
            <div className="input-group">
              <label className="form-label">Weight (kg)</label>
              <input type="number" step="0.1" className="form-input" />
            </div>
            
            <div className="input-group">
              <label className="form-label">Height (cm)</label>
              <input type="number" className="form-input" />
            </div>

            <div className="input-group">
              <label className="form-label">Immunizations (comma separated)</label>
              <input type="text" className="form-input" />
            </div>

            <div className="input-group">
              <label className="form-label">Recent Illnesses</label>
              <input type="text" className="form-input" />
            </div>
          </div>
        </fieldset>

        {/* Nutrition Status */}
        <fieldset className="form-section">
          <legend className="section-title">Nutrition Status</legend>
          <div className="form-grid">
            <div className="input-group">
              <label className="form-label">Assessment Date</label>
              <input type="date" className="form-input" required />
            </div>
            
            <div className="input-group">
              <label className="form-label">Status</label>
              <select className="form-input" required>
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
              <input type="text" className="form-input" required />
            </div>
            
            <div className="input-group">
              <label className="form-label">Enrollment Date</label>
              <input type="date" className="form-input" required />
            </div>

            <div className="input-group">
              <label className="form-label">Progress Report</label>
              <textarea className="form-input" rows="4" required></textarea>
            </div>
          </div>
        </fieldset>

        {/* Vaccination Details */}
        <fieldset className="form-section">
          <legend className="section-title">Vaccination Details</legend>
          <div className="form-grid">
            <div className="input-group">
              <label className="form-label">Vaccine Name</label>
              <input type="text" className="form-input" required />
            </div>
            
            <div className="input-group">
              <label className="form-label">Date Administered</label>
              <input type="date" className="form-input" required />
            </div>

            <div className="input-group">
              <label className="form-label">Administered By</label>
              <input type="text" className="form-input" required />
            </div>

            <div className="input-group">
              <label className="form-label">Notes</label>
              <textarea className="form-input" rows="2"></textarea>
            </div>
          </div>
        </fieldset>

        <div className="form-actions">
          <button type="submit" className="submit-btn">Save Beneficiary</button>
          <button type="reset" className="reset-btn">Clear Form</button>
        </div>
      </form>
    </div>
  );
};

export default ChildBAdd;