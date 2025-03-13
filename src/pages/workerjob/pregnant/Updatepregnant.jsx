import React, { useState, useEffect } from 'react';
import { getApregnantApi, updatepregnantApi } from '../../../services/allapi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

function Updatepregnant() {
  const navigate = useNavigate();
  const { id } = useParams(); // Extract the beneficiary ID from the URL

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
    currentStatus: 'Active',
    lastCheckupDate: '',
    lastVisitDate: '',
    nutritionStatus: {
      date: '',
      status: 'Normal',
    },
    healthRecords: [],
    vaccinationDetails: [],
    document: '',
  });

  const [healthRecords, setHealthRecords] = useState([]);
  const [vaccinationDetails, setVaccinationDetails] = useState([]);

  // Format date to 'yyyy-MM-dd' for input fields
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extract 'yyyy-MM-dd' from ISO string
  };

  // Fetch beneficiary data when the component mounts
  useEffect(() => {
    const fetchBeneficiary = async () => {
      try {
        const response = await getApregnantApi(id); // Fetch beneficiary data by ID
        if (response.data) {
          const formattedData = {
            ...response.data.data,
            dateOfBirth: formatDateForInput(response.data.data.dateOfBirth),
            lastCheckupDate: formatDateForInput(response.data.data.lastCheckupDate),
            lastVisitDate: formatDateForInput(response.data.data.lastVisitDate),
            nutritionStatus: {
              ...response.data.data.nutritionStatus,
              date: formatDateForInput(response.data.data.nutritionStatus.date),
            },
            healthRecords: response.data.data.healthRecords.map((record) => ({
              ...record,
              date: formatDateForInput(record.date),
            })),
            vaccinationDetails: response.data.data.vaccinationDetails.map((vaccine) => ({
              ...vaccine,
              dateAdministered: formatDateForInput(vaccine.dateAdministered),
            })),
          };
          setBeneficiary(formattedData);
          setHealthRecords(formattedData.healthRecords || []);
          setVaccinationDetails(formattedData.vaccinationDetails || []);
        }
      } catch (error) {
        console.error('Error fetching beneficiary data:', error);
        toast.error('Failed to fetch beneficiary data');
      }
    };

    fetchBeneficiary();
  }, [id]);

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle nested fields (e.g., address.street, nutritionStatus.date)
    if (name.includes('.')) {
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

  // Handle health record input changes
  const handleHealthRecordChange = (index, e) => {
    const { name, value } = e.target;

    // Create a copy of the healthRecords array
    const updatedRecords = [...healthRecords];

    // Ensure the index is valid
    if (index < 0 || index >= updatedRecords.length) {
      console.error('Invalid index:', index);
      return;
    }

    // Handle nested fields (e.g., bloodPressure.systolic)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (!updatedRecords[index][parent]) {
        updatedRecords[index][parent] = {}; // Initialize nested object if it doesn't exist
      }
      updatedRecords[index][parent][child] = value;
    } else {
      updatedRecords[index][name] = value;
    }

    // Update the state
    setHealthRecords(updatedRecords);
  };

  // Handle vaccination detail input changes
  const handleVaccinationDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVaccines = [...vaccinationDetails];
    updatedVaccines[index][name] = value;
    setVaccinationDetails(updatedVaccines);
  };

  // Add a new health record
  const addHealthRecord = () => {
    const newRecord = {
      date: '',
      weight: 0,
      bloodPressure: { systolic: 0, diastolic: 0 }, // Ensure nested object is initialized
      fetalHeartRate: 0,
      notes: '',
    };
    setHealthRecords((prev) => [...prev, newRecord]);
    console.log('Added new health record:', newRecord); // Debugging
  };

  // Add a new vaccination detail
  const addVaccinationDetail = () => {
    const newVaccine = {
      vaccineName: '',
      dateAdministered: '',
      administeredBy: '',
      notes: '',
    };
    setVaccinationDetails((prev) => [...prev, newVaccine]);
    console.log('Added new vaccination detail:', newVaccine); // Debugging
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Combine the updated data
      const updatedBeneficiary = {
        ...beneficiary,
        healthRecords,
        vaccinationDetails,
      };

      // Send the updated data to the backend
      const response = await updatepregnantApi(id, updatedBeneficiary);

      console.log('API Response:', response); // Debugging

      if (response.status >= 200 && response.status < 300) {
        toast.success('Beneficiary updated successfully!');
        setTimeout(() => {
          navigate('/pregnant');
        }, 2000);
      } else {
        toast.error('Failed to update beneficiary.');
      }
    } catch (error) {
      console.error('Error updating beneficiary:', error);
      toast.error('An error occurred while updating the beneficiary.');
    }
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
                <input
                  type="date"
                  name={`healthRecords.${index}.date`}
                  value={record.date}
                  onChange={(e) => handleHealthRecordChange(index, e)}
                  required
                />
              </label>
              <label>
                Weight (kg):
                <input
                  type="number"
                  name={`healthRecords.${index}.weight`}
                  value={record.weight}
                  onChange={(e) => handleHealthRecordChange(index, e)}
                  required
                />
              </label>
              <label>
                Blood Pressure (Systolic):
                <input
                  type="number"
                  name={`healthRecords.${index}.bloodPressure.systolic`}
                  value={record.bloodPressure.systolic}
                  onChange={(e) => handleHealthRecordChange(index, e)}
                  required
                />
              </label>
              <label>
                Blood Pressure (Diastolic):
                <input
                  type="number"
                  name={`healthRecords.${index}.bloodPressure.diastolic`}
                  value={record.bloodPressure.diastolic}
                  onChange={(e) => handleHealthRecordChange(index, e)}
                  required
                />
              </label>
              <label>
                Fetal Heart Rate (bpm):
                <input
                  type="number"
                  name={`healthRecords.${index}.fetalHeartRate`}
                  value={record.fetalHeartRate}
                  onChange={(e) => handleHealthRecordChange(index, e)}
                  required
                />
              </label>
              <label>
                Notes:
                <textarea
                  name={`healthRecords.${index}.notes`}
                  value={record.notes}
                  onChange={(e) => handleHealthRecordChange(index, e)}
                  rows="3"
                />
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
                <input
                  type="text"
                  name={`vaccinationDetails.${index}.vaccineName`}
                  value={vaccine.vaccineName}
                  onChange={(e) => handleVaccinationDetailChange(index, e)}
                  required
                />
              </label>
              <label>
                Date Administered:
                <input
                  type="date"
                  name={`vaccinationDetails.${index}.dateAdministered`}
                  value={vaccine.dateAdministered}
                  onChange={(e) => handleVaccinationDetailChange(index, e)}
                  required
                />
              </label>
              <label>
                Administered By:
                <input
                  type="text"
                  name={`vaccinationDetails.${index}.administeredBy`}
                  value={vaccine.administeredBy}
                  onChange={(e) => handleVaccinationDetailChange(index, e)}
                  required
                />
              </label>
              <label>
                Notes:
                <textarea
                  name={`vaccinationDetails.${index}.notes`}
                  value={vaccine.notes}
                  onChange={(e) => handleVaccinationDetailChange(index, e)}
                  rows="3"
                />
              </label>
            </div>
          ))}
          <button type="button" onClick={addVaccinationDetail} className="add-button">
            Add Vaccination Detail
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Update Beneficiary
        </button>
      </form>
      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </div>
  );
}

export default Updatepregnant;