import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { updateChildApi, getaChildByIdApi } from '../../services/allapi'; // Adjust the import path as needed
import './childadd.css';
import { serverUrl } from '../../services/serverurl';
import { toast, ToastContainer } from 'react-toastify';

function ChildUpdate() {
  const { id } = useParams(); // Get the child ID from the URL
  const navigate = useNavigate(); // For navigation after successful update
  const [child, setChild] = useState({
    id: '',
    name: '',
    age: '',
    gender: '',
    dateOfBirth: '',
    address: { street: '', city: '', state: '', zipCode: '' },
    parentDetails: { parentName: '', parentContact: '', parentEmail: '', parentOccupation: '' },
    siblings: [],
    healthRecords: [],
    medicalHistory: { chronicConditions: [], surgeries: [] },
    allergies: [],
    dietaryPreferences: { vegetarian: '', lactoseIntolerant: '' },
    emergencyContact: { name: '', relationship: '', contactNumber: '' },
    
    
  });
  
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [success, setSuccess] = useState(false); // State to handle success

  // Fetch the child's details when the component mounts
  useEffect(() => {
    const fetchChild = async () => {
      try {
        const response = await getaChildByIdApi(id);
        if (response && response.data.child) {
          setChild(response.data.child); // Update state with fetched data

        } else {
          setError('Child not found');
        }
      } catch (err) {
        setError('Failed to fetch child details');
        console.error('Error fetching child:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChild();
  }, [id]);


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', child.id);
    formData.append('name', child.name);
    formData.append('age', child.age);
    formData.append('gender', child.gender);
    formData.append('dateOfBirth', child.dateOfBirth);
    formData.append('address', JSON.stringify(child.address));
    formData.append('parentDetails', JSON.stringify(child.parentDetails));
    formData.append('siblings', JSON.stringify(child.siblings));
    formData.append('healthRecords', JSON.stringify(child.healthRecords));
    formData.append('medicalHistory', JSON.stringify(child.medicalHistory));
    formData.append('allergies', JSON.stringify(child.allergies));
    formData.append('dietaryPreferences', JSON.stringify(child.dietaryPreferences));
    formData.append('emergencyContact', JSON.stringify(child.emergencyContact));
   
    

    try {
      const response = await updateChildApi(id, formData);
      if (response.status == 200) {
       
        toast.success('Child updated successfully');
        setSuccess(true);
        navigate('/display-child'); // Redirect after successful update
      } else {
        setError('Failed to update child');
      }
    } catch (err) {
      console.error('Error updating child:', err);
      setError('Failed to update child');
    }
  };

  // Handle input changes for nested objects
  const handleNestedChange = (parentKey, key, value) => {
    setChild((prevChild) => ({
      ...prevChild,
      [parentKey]: {
        ...prevChild[parentKey],
        [key]: value
      }
    }));
  };

  // Handle input changes for arrays (e.g., siblings, healthRecords)
  const handleArrayChange = (parentKey, index, key, value) => {
    setChild((prevChild) => {
      const updatedArray = [...prevChild[parentKey]];
      updatedArray[index][key] = value;
      return {
        ...prevChild,
        [parentKey]: updatedArray
      };
    });
  };

  // Add a new sibling
  const addSibling = () => {
    setChild((prevChild) => ({
      ...prevChild,
      siblings: [...prevChild.siblings, { name: '', age: '', relationship: '' }]
    }));
  };

  // Add a new health record
  const addHealthRecord = () => {
    setChild((prevChild) => ({
      ...prevChild,
      healthRecords: [...prevChild.healthRecords, { date: '', weight: '', height: '', immunizations: [], illnesses: [] }]
    }));
  };

  // Display loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error state
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="child-add-container">
        <div className='d-flex justify-content-between align-items-center'>
          <h2>Update Child Details</h2>
          <Link to={'/display-child'}><FontAwesomeIcon icon={faUserTie} beat style={{ color: '#141414' }} /></Link>
        </div>
        <form className="child-add-form" onSubmit={handleSubmit}>
        
  
          {/* Child ID */}
          <div className="form-group">
            <label htmlFor="childId">Child ID:</label>
            <input
              type="text"
              id="childId"
              name="childId"
              placeholder="Enter child ID"
              value={child.id}
              readOnly
            />
          </div>
  
          {/* Basic Information */}
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter child's name"
                value={child.name}
                onChange={(e) => setChild({ ...child, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                placeholder="Enter child's age"
                value={child.age}
                onChange={(e) => setChild({ ...child, age: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                name="gender"
                value={child.gender}
                onChange={(e) => setChild({ ...child, gender: e.target.value })}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth:</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={new Date(child.dateOfBirth).toISOString().split('T')[0]} // Fix here
                onChange={(e) => setChild({ ...child, dateOfBirth: e.target.value })}
              />
            </div>
          </div>
  
          {/* Address */}
          <div className="form-section">
            <h3>Address</h3>
            <div className="form-group">
              <label htmlFor="street">Street:</label>
              <input
                type="text"
                id="street"
                name="street"
                placeholder="Enter street"
                value={child.address.street}
                onChange={(e) => handleNestedChange('address', 'street', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter city"
                value={child.address.city}
                onChange={(e) => handleNestedChange('address', 'city', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="Enter state"
                value={child.address.state}
                onChange={(e) => handleNestedChange('address', 'state', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">Zip Code:</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                placeholder="Enter zip code"
                value={child.address.zipCode}
                onChange={(e) => handleNestedChange('address', 'zipCode', e.target.value)}
              />
            </div>
          </div>
  
          {/* Parent Details */}
          <div className="form-section">
            <h3>Parent Details</h3>
            <div className="form-group">
              <label htmlFor="parentName">Parent Name:</label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                placeholder="Enter parent's name"
                value={child.parentDetails.parentName}
                onChange={(e) => handleNestedChange('parentDetails', 'parentName', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="parentContact">Contact Number:</label>
              <input
                type="text"
                id="parentContact"
                name="parentContact"
                placeholder="Enter contact number"
                value={child.parentDetails.parentContact}
                onChange={(e) => handleNestedChange('parentDetails', 'parentContact', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="parentEmail">Email:</label>
              <input
                type="email"
                id="parentEmail"
                name="parentEmail"
                placeholder="Enter email"
                value={child.parentDetails.parentEmail}
                onChange={(e) => handleNestedChange('parentDetails', 'parentEmail', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="parentOccupation">Occupation:</label>
              <input
                type="text"
                id="parentOccupation"
                name="parentOccupation"
                placeholder="Enter occupation"
                value={child.parentDetails.parentOccupation}
                onChange={(e) => handleNestedChange('parentDetails', 'parentOccupation', e.target.value)}
              />
            </div>
          </div>
  
          {/* Siblings */}
          <div className="form-section">
            <h3>Siblings</h3>
            {child.siblings.map((sibling, index) => (
              <div key={index} className="record">
                <div className="form-group">
                  <label htmlFor={`siblingName${index}`}>Sibling Name:</label>
                  <input
                    type="text"
                    id={`siblingName${index}`}
                    name={`siblingName${index}`}
                    placeholder="Enter sibling's name"
                    value={sibling.name}
                    onChange={(e) => handleArrayChange('siblings', index, 'name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`siblingAge${index}`}>Sibling Age:</label>
                  <input
                    type="number"
                    id={`siblingAge${index}`}
                    name={`siblingAge${index}`}
                    placeholder="Enter sibling's age"
                    value={sibling.age}
                    onChange={(e) => handleArrayChange('siblings', index, 'age', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`siblingRelationship${index}`}>Relationship:</label>
                  <input
                    type="text"
                    id={`siblingRelationship${index}`}
                    name={`siblingRelationship${index}`}
                    placeholder="Enter relationship"
                    value={sibling.relationship}
                    onChange={(e) => handleArrayChange('siblings', index, 'relationship', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <button type="button" className="add-sibling-button" onClick={addSibling}>
              Add Another Sibling
            </button>
          </div>
  
          {/* Health Records */}
          <div className="form-section">
            <h3>Health Records</h3>
            {child.healthRecords.map((record, index) => (
              <div key={index} className="record">
                <div className="form-group">
                  <label htmlFor={`healthDate${index}`}>Date:</label>
                  <input
                    key={index}
                    type="date"
                    id={`healthDate${index}`}
                    name={`healthDate${index}`}
                    value={new Date(record.date).toISOString().split('T')[0]} // Fix here
                    onChange={(e) => handleArrayChange('healthRecords', index, 'date', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`healthWeight${index}`}>Weight (kg):</label>
                  <input
                    type="number"
                    id={`healthWeight${index}`}
                    name={`healthWeight${index}`}
                    placeholder="Enter weight"
                    value={record.weight}
                    onChange={(e) => handleArrayChange('healthRecords', index, 'weight', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`healthHeight${index}`}>Height (cm):</label>
                  <input
                    type="number"
                    id={`healthHeight${index}`}
                    name={`healthHeight${index}`}
                    placeholder="Enter height"
                    value={record.height}
                    onChange={(e) => handleArrayChange('healthRecords', index, 'height', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`healthImmunizations${index}`}>Immunizations:</label>
                  <input
                    type="text"
                    id={`healthImmunizations${index}`}
                    name={`healthImmunizations${index}`}
                    placeholder="Enter immunizations"
                    value={record.immunizations.join(", ")}
                    onChange={(e) => handleArrayChange('healthRecords', index, 'immunizations', e.target.value.split(", "))}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`healthIllnesses${index}`}>Illnesses:</label>
                  <input
                    type="text"
                    id={`healthIllnesses${index}`}
                    name={`healthIllnesses${index}`}
                    placeholder="Enter illnesses"
                    value={record.illnesses.join(", ")}
                    onChange={(e) => handleArrayChange('healthRecords', index, 'illnesses', e.target.value.split(", "))}
                  />
                </div>
              </div>
            ))}
            <button type="button" className="add-health-record-button" onClick={addHealthRecord}>
              Add Another Health Record
            </button>
          </div>
  
          {/* Medical History */}
          <div className="form-section">
            <h3>Medical History</h3>
            <div className="form-group">
              <label htmlFor="chronicConditions">Chronic Conditions:</label>
              <input
                type="text"
                id="chronicConditions"
                name="chronicConditions"
                placeholder="Enter chronic conditions"
                value={child.medicalHistory.chronicConditions.join(", ")}
                onChange={(e) => handleNestedChange('medicalHistory', 'chronicConditions', e.target.value.split(", "))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="surgeries">Surgeries:</label>
              <input
                type="text"
                id="surgeries"
                name="surgeries"
                placeholder="Enter surgeries"
                value={child.medicalHistory.surgeries.join(", ")}
                onChange={(e) => handleNestedChange('medicalHistory', 'surgeries', e.target.value.split(", "))}
              />
            </div>
          </div>
  
          {/* Allergies */}
          <div className="form-section">
            <h3>Allergies</h3>
            <div className="form-group">
              <label htmlFor="allergies">Allergies:</label>
              <input
                type="text"
                id="allergies"
                name="allergies"
                placeholder="Enter allergies"
                value={child.allergies.join(", ")}
                onChange={(e) => setChild({ ...child, allergies: e.target.value.split(", ") })}
              />
            </div>
          </div>
  
          {/* Dietary Preferences */}
          <div className="form-section">
            <h3>Dietary Preferences</h3>
            <div className="form-group">
              <label htmlFor="vegetarian">Vegetarian:</label>
              <select
                id="vegetarian"
                name="vegetarian"
                value={child.dietaryPreferences.vegetarian}
                onChange={(e) => handleNestedChange('dietaryPreferences', 'vegetarian', e.target.value)}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="lactoseIntolerant">Lactose Intolerant:</label>
              <select
                id="lactoseIntolerant"
                name="lactoseIntolerant"
                value={child.dietaryPreferences.lactoseIntolerant}
                onChange={(e) => handleNestedChange('dietaryPreferences', 'lactoseIntolerant', e.target.value)}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
  
          {/* Emergency Contact */}
          <div className="form-section">
            <h3>Emergency Contact</h3>
            <div className="form-group">
              <label htmlFor="emergencyContactName">Name:</label>
              <input
                type="text"
                id="emergencyContactName"
                name="emergencyContactName"
                placeholder="Enter name"
                value={child.emergencyContact.name}
                onChange={(e) => handleNestedChange('emergencyContact', 'name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="emergencyContactRelationship">Relationship:</label>
              <input
                type="text"
                id="emergencyContactRelationship"
                name="emergencyContactRelationship"
                placeholder="Enter relationship"
                value={child.emergencyContact.relationship}
                onChange={(e) => handleNestedChange('emergencyContact', 'relationship', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="emergencyContactNumber">Contact Number:</label>
              <input
                type="text"
                id="emergencyContactNumber"
                name="emergencyContactNumber"
                placeholder="Enter contact number"
                value={child.emergencyContact.contactNumber}
                onChange={(e) => handleNestedChange('emergencyContact', 'contactNumber', e.target.value)}
              />
            </div>
          </div>
  
          {/* Submit Button */}
          <div className="form-actions">
            <button type="submit" className="submit-button">
              Update Child
            </button>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </>
  );
}

export default ChildUpdate;