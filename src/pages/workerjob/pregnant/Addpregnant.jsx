import React, { useState } from 'react';
import './AddPregnant.css'; // Import the CSS file


function Addpregnant() {

  const [healthRecords, setHealthRecords] = useState([
    { date: '', weight: '', bloodPressure: { systolic: '', diastolic: '' }, fetalHeartRate: '', notes: '' },
  ]);

  const [vaccinationDetails, setVaccinationDetails] = useState([
    { vaccineName: '', dateAdministered: '', administeredBy: '', notes: '' },
  ]);

  const addHealthRecord = () => {
    setHealthRecords([
      ...healthRecords,
      { date: '', weight: '', bloodPressure: { systolic: '', diastolic: '' }, fetalHeartRate: '', notes: '' },
    ]);
  };

  const addVaccinationDetail = () => {
    setVaccinationDetails([
      ...vaccinationDetails,
      { vaccineName: '', dateAdministered: '', administeredBy: '', notes: '' },
    ]);
  };
  return (
    <>


      <div className="form-container">
        <h1 className="form-title">Add Pregnant Beneficiary</h1>
        <form className="beneficiary-form">
          {/* Basic Information */}
          <div className="form-section">
            <h2>Basic Information</h2>
            <label>
              Name:
              <input type="text" name="name" required />
            </label>
            <label>
              Date of Birth:
              <input type="date" name="dateOfBirth" required />
            </label>
            <label>
              Gender:
              <select name="gender" required>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>

          {/* Address */}
          <div className="form-section">
            <h2>Address</h2>
            <label>
              Street:
              <input type="text" name="address.street" required />
            </label>
            <label>
              City:
              <input type="text" name="address.city" required />
            </label>
            <label>
              State:
              <input type="text" name="address.state" required />
            </label>
            <label>
              Zip Code:
              <input type="text" name="address.zipCode" required />
            </label>
          </div>

          {/* Guardian Information */}
          <div className="form-section">
            <h2>Guardian Information</h2>
            <label>
              Guardian Name:
              <input type="text" name="guardianName" required />
            </label>
            <label>
              Guardian Phone:
              <input type="text" name="guardianPhone" required />
            </label>
          </div>

          {/* Medical Information */}
          <div className="form-section">
            <h2>Medical Information</h2>
            <label>
              Blood Group:
              <input type="text" name="bloodGroup" required />
            </label>
            <label>
              Assigned Worker ID:
              <input type="text" name="assignedWorkerId" required />
            </label>
            <label>
              Current Status:
              <select name="currentStatus" required>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Completed">Completed</option>
              </select>
            </label>

            <div className="mb-3">
              <label className='lab'>Related Documents</label>
              <input
                type="file"
                className="form-control"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="form-section">
            <h2>Dates</h2>
            <label>
              Last Checkup Date:
              <input type="date" name="lastCheckupDate" />
            </label>
            <label>
              Last Visit Date:
              <input type="date" name="lastVisitDate" />
            </label>
          </div>

          {/* Nutrition Status */}
          <div className="form-section">
            <h2>Nutrition Status</h2>
            <label>
              Date:
              <input type="date" name="nutritionStatus.date" required />
            </label>
            <label>
              Status:
              <select name="nutritionStatus.status" required>
                <option value="Normal">Normal</option>
                <option value="Underweight">Underweight</option>
                <option value="Overweight">Overweight</option>
              </select>
            </label>
          </div>


          <div className="form-section">
            <h2>Health Records</h2>
            {healthRecords.map((record, index) => (
              <div key={index} className="health-record">
                <label>
                  Date:
                  <input type="date" name={`healthRecords[${index}].date`} required />
                </label>
                <label>
                  Weight (kg):
                  <input type="number" name={`healthRecords[${index}].weight`} required />
                </label>
                <label>
                  Blood Pressure (Systolic):
                  <input type="number" name={`healthRecords[${index}].bloodPressure.systolic`} required />
                </label>
                <label>
                  Blood Pressure (Diastolic):
                  <input type="number" name={`healthRecords[${index}].bloodPressure.diastolic`} required />
                </label>
                <label>
                  Fetal Heart Rate (bpm):
                  <input type="number" name={`healthRecords[${index}].fetalHeartRate`} required />
                </label>
                <label>
                  Notes:
                  <textarea name={`healthRecords[${index}].notes`} rows="3" />
                </label>
              </div>
            ))}
            <button type="button" onClick={addHealthRecord} className="add-button">
              Add Health Record
            </button>
          </div>

          {/* Vaccination Details */}
          <div className="form-section">
            <h2>Vaccination Details</h2>
            {vaccinationDetails.map((vaccine, index) => (
              <div key={index} className="vaccination-detail">
                <label>
                  Vaccine Name:
                  <input type="text" name={`vaccinationDetails[${index}].vaccineName`} required />
                </label>
                <label>
                  Date Administered:
                  <input type="date" name={`vaccinationDetails[${index}].dateAdministered`} required />
                </label>
                <label>
                  Administered By:
                  <input type="text" name={`vaccinationDetails[${index}].administeredBy`} required />
                </label>
                <label>
                  Notes:
                  <textarea name={`vaccinationDetails[${index}].notes`} rows="3" />
                </label>
              </div>
            ))}
            <button type="button" onClick={addVaccinationDetail} className="add-button">
              Add Vaccination Detail
            </button>
          </div>




          {/* Submit Button */}
          <button type="submit" className="submit-button">Add Beneficiary</button>
        </form>
      </div>

    </>
  )
}

export default Addpregnant

