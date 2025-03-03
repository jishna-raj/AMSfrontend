import React, { useState, useEffect } from 'react';

function Updatepregnant() { 
  const [beneficiary, setBeneficiary] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
    guardianName: '',
    guardianPhone: '',
    bloodGroup: '',
    assignedWorkerId: '',
    currentStatus: '',
    lastCheckupDate: '',
    lastVisitDate: '',
    nutritionStatus: {
      date: '',
      status: '',
    },
    healthRecords: [
      {
        date: '',
        weight: '',
        bloodPressure: {
          systolic: '',
          diastolic: '',
        },
        fetalHeartRate: '',
        notes: '',
      },
    ],
    vaccinationDetails: [
      {
        vaccineName: '',
        dateAdministered: '',
        administeredBy: '',
        notes: '',
      },
    ],
  });

  const [healthRecords, setHealthRecords] = useState(beneficiary.healthRecords);
  const [vaccinationDetails, setVaccinationDetails] = useState(beneficiary.vaccinationDetails);

  useEffect(() => {
    // Fetch the beneficiary data from the API or database
    const beneficiaryData = {
      // Replace with actual data
      name: 'John Doe',
      dateOfBirth: '1990-01-01',
      gender: 'Male',
      address: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
      },
      guardianName: 'Jane Doe',
      guardianPhone: '123-456-7890',
      bloodGroup: 'A+',
      assignedWorkerId: '12345',
      currentStatus: 'Active',
      lastCheckupDate: '2022-01-01',
      lastVisitDate: '2022-01-15',
      nutritionStatus: {
        date: '2022-01-01',
        status: 'Normal',
      },
      healthRecords: [
        {
          date: '2022-01-01',
          weight: '60',
          bloodPressure: {
            systolic: '120',
            diastolic: '80',
          },
          fetalHeartRate: '140',
          notes: 'Normal',
        },
      ],
      vaccinationDetails: [
        {
          vaccineName: 'Flu Shot',
          dateAdministered: '2022-01-01',
          administeredBy: 'Dr. Smith',
          notes: 'No reaction',
        },
      ],
    };

    setBeneficiary(beneficiaryData);
    setHealthRecords(beneficiaryData.healthRecords);
    setVaccinationDetails(beneficiaryData.vaccinationDetails);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name.startsWith('healthRecords')) {
      const [field, index, subField, subSubField] = name.split('.');
      const updatedHealthRecords = [...healthRecords];

      if (subSubField) {
        updatedHealthRecords[index][subField][subSubField] = value;
      } else if (subField) {
        updatedHealthRecords[index][subField] = value;
      } else {
        updatedHealthRecords[index][field] = value;
      }

      setHealthRecords(updatedHealthRecords);
    } else if (name.startsWith('vaccinationDetails')) {
      const [field, index, subField] = name.split('.');
      const updatedVaccinationDetails = [...vaccinationDetails];

      if (subField) {
        updatedVaccinationDetails[index][subField] = value;
      } else {
        updatedVaccinationDetails[index][field] = value;
      }

      setVaccinationDetails(updatedVaccinationDetails);
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setBeneficiary((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setBeneficiary((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addHealthRecord = () => {
    setHealthRecords([
      ...healthRecords,
      {
        date: '',
        weight: '',
        bloodPressure: {
          systolic: '',
          diastolic: '',
        },
        fetalHeartRate: '',
        notes: '',
      },
    ]);
  };

  const addVaccinationDetail = () => {
    setVaccinationDetails([
      ...vaccinationDetails,
      {
        vaccineName: '',
        dateAdministered: '',
        administeredBy: '',
        notes: '',
      },
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedBeneficiary = {
      ...beneficiary,
      healthRecords,
      vaccinationDetails,
    };
    console.log(updatedBeneficiary);
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Update Pregnant Beneficiary</h1>
      <form className="beneficiary-form" onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="form-section">
          <h2>Basic Information</h2>
          <label>
            Name:
            <input type="text" name="name" value={beneficiary.name} onChange={handleInputChange} required />
          </label>
          <label>
            Date of Birth:
            <input type="date" name="dateOfBirth" value={beneficiary.dateOfBirth} onChange={handleInputChange} required />
          </label>
          <label>
            Gender:
            <select name="gender" value={beneficiary.gender} onChange={handleInputChange} required>
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
            <input type="text" name="address.street" value={beneficiary.address.street} onChange={handleInputChange} required />
          </label>
          <label>
            City:
            <input type="text" name="address.city" value={beneficiary.address.city} onChange={handleInputChange} required />
          </label>
          <label>
            State:
            <input type="text" name="address.state" value={beneficiary.address.state} onChange={handleInputChange} required />
          </label>
          <label>
            Zip Code:
            <input type="text" name="address.zipCode" value={beneficiary.address.zipCode} onChange={handleInputChange} required />
          </label>
        </div>

        {/* Guardian Information */}
        <div className="form-section">
          <h2>Guardian Information</h2>
          <label>
            Guardian Name:
            <input type="text" name="guardianName" value={beneficiary.guardianName} onChange={handleInputChange} required />
          </label>
          <label>
            Guardian Phone:
            <input type="text" name="guardianPhone" value={beneficiary.guardianPhone} onChange={handleInputChange} required />
          </label>
        </div>

        {/* Medical Information */}
        <div className="form-section">
          <h2>Medical Information</h2>
          <label>
            Blood Group:
            <input type="text" name="bloodGroup" value={beneficiary.bloodGroup} onChange={handleInputChange} required />
          </label>
          <label>
            Assigned Worker ID:
            <input type="text" name="assignedWorkerId" value={beneficiary.assignedWorkerId} onChange={handleInputChange} required />
          </label>
          <label>
            Current Status:
            <select name="currentStatus" value={beneficiary.currentStatus} onChange={handleInputChange} required>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
        </div>

        {/* Dates */}
        <div className="form-section">
          <h2>Dates</h2>
          <label>
            Last Checkup Date:
            <input type="date" name="lastCheckupDate" value={beneficiary.lastCheckupDate} onChange={handleInputChange} />
          </label>
          <label>
            Last Visit Date:
            <input type="date" name="lastVisitDate" value={beneficiary.lastVisitDate} onChange={handleInputChange} />
          </label>
        </div>

        {/* Nutrition Status */}
        <div className="form-section">
          <h2>Nutrition Status</h2>
          <label>
            Date:
            <input type="date" name="nutritionStatus.date" value={beneficiary.nutritionStatus.date} onChange={handleInputChange} required />
          </label>
          <label>
            Status:
            <select name="nutritionStatus.status" value={beneficiary.nutritionStatus.status} onChange={handleInputChange} required>
              <option value="Normal">Normal</option>
              <option value="Underweight">Underweight</option>
              <option value="Overweight">Overweight</option>
            </select>
          </label>
        </div>

        {/* Health Records */}
        <div className="form-section">
          <h2>Health Records</h2>
          {healthRecords.map((record, index) => (
            <div key={index} className="health-record">
              <label>
                Date:
                <input type="date" name={`healthRecords.${index}.date`} value={record.date} onChange={handleInputChange} required />
              </label>
              <label>
                Weight (kg):
                <input type="number" name={`healthRecords.${index}.weight`} value={record.weight} onChange={handleInputChange} required />
              </label>
              <label>
                Blood Pressure (Systolic):
                <input type="number" name={`healthRecords.${index}.bloodPressure.systolic`} value={record.bloodPressure.systolic} onChange={handleInputChange} required />
              </label>
              <label>
                Blood Pressure (Diastolic):
                <input type="number" name={`healthRecords.${index}.bloodPressure.diastolic`} value={record.bloodPressure.diastolic} onChange={handleInputChange} required />
              </label>
              <label>
                Fetal Heart Rate (bpm):
                <input type="number" name={`healthRecords.${index}.fetalHeartRate`} value={record.fetalHeartRate} onChange={handleInputChange} required />
              </label>
              <label>
                Notes:
                <textarea name={`healthRecords.${index}.notes`} value={record.notes} onChange={handleInputChange} rows="3" />
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
                <input type="text" name={`vaccinationDetails.${index}.vaccineName`} value={vaccine.vaccineName} onChange={handleInputChange} required />
              </label>
              <label>
                Date Administered:
                <input type="date" name={`vaccinationDetails.${index}.dateAdministered`} value={vaccine.dateAdministered} onChange={handleInputChange} required />
              </label>
              <label>
                Administered By:
                <input type="text" name={`vaccinationDetails.${index}.administeredBy`} value={vaccine.administeredBy} onChange={handleInputChange} required />
              </label>
              <label>
                Notes:
                <textarea name={`vaccinationDetails.${index}.notes`} value={vaccine.notes} onChange={handleInputChange} rows="3" />
              </label>
            </div>
          ))}
          <button type="button" onClick={addVaccinationDetail} className="add-button">
            Add Vaccination Detail
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">Update Beneficiary</button>
      </form>
    </div>
  );
};

export default Updatepregnant;