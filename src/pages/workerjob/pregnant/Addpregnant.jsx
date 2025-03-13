import React, { useState, useEffect } from 'react';
import './AddPregnant.css'; // Import the CSS file
import { addPregnantApi } from '../../../services/allapi'; // Adjust the import path
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Addpregnant() {

  const navigate = useNavigate()
  // State for form data
  const [formData, setFormData] = useState({
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
    lastCheckupDate: '',
    currentStatus: 'Active',
    healthRecords: [
      { date: '', weight: '', bloodPressure: { systolic: '', diastolic: '' }, fetalHeartRate: '', notes: '' },
    ],
    vaccinationDetails: [
      { vaccineName: '', dateAdministered: '', administeredBy: '', notes: '' },
    ],
    nutritionStatus: {
      date: '',
      status: 'Normal',
    },
    lastVisitDate: '',
    document: null, // For file upload
  });

  const [preview, setPreview] = useState(''); // For image preview
  const [key, setKey] = useState(false); // For resetting file input

  // Handle file upload for document
  useEffect(() => {
    if (formData.document) {
      setPreview(URL.createObjectURL(formData.document));
    }
  }, [formData.document]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle health record changes
  const handleHealthRecordChange = (index, e) => {
    const { name, value } = e.target;
    const updatedHealthRecords = [...formData.healthRecords];

    // Split the name to handle nested fields (e.g., "bloodPressure.systolic")
    const keys = name.split('.');

    // Traverse the nested structure to update the correct field
    let current = updatedHealthRecords[index];
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    // Update the final field
    current[keys[keys.length - 1]] = value;

    // Update the state
    setFormData({ ...formData, healthRecords: updatedHealthRecords });
  };

  // Handle vaccination detail changes
  const handleVaccinationDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVaccinationDetails = [...formData.vaccinationDetails];
    updatedVaccinationDetails[index][name] = value;
    setFormData({ ...formData, vaccinationDetails: updatedVaccinationDetails });
  };

  // Add a new health record
  const addHealthRecord = () => {
    setFormData({
      ...formData,
      healthRecords: [
        ...formData.healthRecords,
        { date: '', weight: '', bloodPressure: { systolic: '', diastolic: '' }, fetalHeartRate: '', notes: '' },
      ],
    });
  };

  // Add a new vaccination detail
  const addVaccinationDetail = () => {
    setFormData({
      ...formData,
      vaccinationDetails: [
        ...formData.vaccinationDetails,
        { vaccineName: '', dateAdministered: '', administeredBy: '', notes: '' },
      ],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.name ||
      !formData.dateOfBirth ||
      !formData.gender ||
      !formData.address.street ||
      !formData.address.city ||
      !formData.address.state ||
      !formData.address.zipCode ||
      !formData.guardianName ||
      !formData.guardianPhone ||
      !formData.bloodGroup ||
      !formData.assignedWorkerId ||
      !formData.currentStatus ||
      !formData.nutritionStatus.date ||
      !formData.nutritionStatus.status ||
      !formData.document
    ) {
      toast.info('Please fill all required fields.');
      return;
    }

    // Prepare FormData for file upload
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('dateOfBirth', formData.dateOfBirth);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('address', JSON.stringify(formData.address));
    formDataToSend.append('guardianName', formData.guardianName);
    formDataToSend.append('guardianPhone', formData.guardianPhone);
    formDataToSend.append('bloodGroup', formData.bloodGroup);
    formDataToSend.append('assignedWorkerId', formData.assignedWorkerId);
    formDataToSend.append('lastCheckupDate', formData.lastCheckupDate);
    formDataToSend.append('currentStatus', formData.currentStatus);
    formDataToSend.append('healthRecords', JSON.stringify(formData.healthRecords));
    formDataToSend.append('vaccinationDetails', JSON.stringify(formData.vaccinationDetails));
    formDataToSend.append('nutritionStatus', JSON.stringify(formData.nutritionStatus));
    formDataToSend.append('lastVisitDate', formData.lastVisitDate);
    formDataToSend.append('document', formData.document);

    try {
      // Send data to the backend
      const response = await addPregnantApi(formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },

       
        
      });
      console.log(response);
      

      if (response.status === 200) {

        toast.success('Pregnant beneficiary added successfully!');
        // Reset form
        setFormData({
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
          lastCheckupDate: '',
          currentStatus: 'Active',
          healthRecords: [
            { date: '', weight: '', bloodPressure: { systolic: '', diastolic: '' }, fetalHeartRate: '', notes: '' },
          ],
          vaccinationDetails: [
            { vaccineName: '', dateAdministered: '', administeredBy: '', notes: '' },
          ],
          nutritionStatus: {
            date: '',
            status: 'Normal',
          },
          lastVisitDate: '',
          document: null,
        });
        setPreview('');
        setKey(!key); // Reset file input

        setTimeout(() => {
          navigate('/pregnant')


      }, 2000);


      } else {
        toast.error('Failed to add pregnant beneficiary.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Server error. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Add Pregnant Beneficiary</h1>
      <form className="beneficiary-form" onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="form-section">
          <h2>Basic Information</h2>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Gender:
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
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
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            State:
            <input
              type="text"
              name="address.state"
              value={formData.address.state}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Zip Code:
            <input
              type="text"
              name="address.zipCode"
              value={formData.address.zipCode}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        {/* Guardian Information */}
        <div className="form-section">
          <h2>Guardian Information</h2>
          <label>
            Guardian Name:
            <input
              type="text"
              name="guardianName"
              value={formData.guardianName}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Guardian Phone:
            <input
              type="text"
              name="guardianPhone"
              value={formData.guardianPhone}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        {/* Medical Information */}
        <div className="form-section">
          <h2>Medical Information</h2>
          <label>
            Blood Group:
            <input
              type="text"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Assigned Worker ID:
            <input
              type="text"
              name="assignedWorkerId"
              value={formData.assignedWorkerId}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Current Status:
            <select
              name="currentStatus"
              value={formData.currentStatus}
              onChange={handleInputChange}
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
          <label>
            Related Documents:
            <input
              type="file"
              name="document"
              onChange={handleInputChange}
              required
              key={key}
            />
            {preview && <img src={preview} alt="Document Preview" className="preview-image" />}
          </label>
        </div>

        {/* Dates */}
        <div className="form-section">
          <h2>Dates</h2>
          <label>
            Last Checkup Date:
            <input
              type="date"
              name="lastCheckupDate"
              value={formData.lastCheckupDate}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Last Visit Date:
            <input
              type="date"
              name="lastVisitDate"
              value={formData.lastVisitDate}
              onChange={handleInputChange}
            />
          </label>
        </div>

        {/* Nutrition Status */}
        <div className="form-section">
          <h2>Nutrition Status</h2>
          <label>
            Date:
            <input
              type="date"
              name="nutritionStatus.date"
              value={formData.nutritionStatus.date}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Status:
            <select
              name="nutritionStatus.status"
              value={formData.nutritionStatus.status}
              onChange={handleInputChange}
              required
            >
              <option value="Normal">Normal</option>
              <option value="Underweight">Underweight</option>
              <option value="Overweight">Overweight</option>
            </select>
          </label>
        </div>

        {/* Health Records */}
        <div className="form-section">
          <h2>Health Records</h2>
          {formData.healthRecords.map((record, index) => (
            <div key={index} className="health-record">
              <label>
                Date:
                <input
                  type="date"
                  name={`date`}
                  value={record.date}
                  onChange={(e) => handleHealthRecordChange(index, e)}
                  required
                />
              </label>
              <label>
                Weight (kg):
                <input
                  type="number"
                  name={`weight`}
                  value={record.weight}
                  onChange={(e) => handleHealthRecordChange(index, e)}
                  required
                />
              </label>
              <label>
                Blood Pressure (Systolic):
                <input
                  type="number"
                  name={`bloodPressure.systolic`}
                  value={record.bloodPressure.systolic}
                  onChange={(e) => handleHealthRecordChange(index, e)}
                  required
                />
              </label>
              <label>
                Blood Pressure (Diastolic):
                <input
                  type="number"
                  name={`bloodPressure.diastolic`}
                  value={record.bloodPressure.diastolic}
                  onChange={(e) => handleHealthRecordChange(index, e)}
                  required
                />
              </label>
              <label>
                Fetal Heart Rate (bpm):
                <input
                  type="number"
                  name={`fetalHeartRate`}
                  value={record.fetalHeartRate}
                  onChange={(e) => handleHealthRecordChange(index, e)}
                  required
                />
              </label>
              <label>
                Notes:
                <textarea
                  name={`notes`}
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
          {formData.vaccinationDetails.map((vaccine, index) => (
            <div key={index} className="vaccination-detail">
              <label>
                Vaccine Name:
                <input
                  type="text"
                  name={`vaccineName`}
                  value={vaccine.vaccineName}
                  onChange={(e) => handleVaccinationDetailChange(index, e)}
                  required
                />
              </label>
              <label>
                Date Administered:
                <input
                  type="date"
                  name={`dateAdministered`}
                  value={vaccine.dateAdministered}
                  onChange={(e) => handleVaccinationDetailChange(index, e)}
                  required
                />
              </label>
              <label>
                Administered By:
                <input
                  type="text"
                  name={`administeredBy`}
                  value={vaccine.administeredBy}
                  onChange={(e) => handleVaccinationDetailChange(index, e)}
                  required
                />
              </label>
              <label>
                Notes:
                <textarea
                  name={`notes`}
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
          Add Beneficiary
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Addpregnant;