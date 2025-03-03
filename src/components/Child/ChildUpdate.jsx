import React from 'react';
import './childadd.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


function ChildUpdate() {
  // Sample child data (replace with actual data from props or state)
  const child = {
    childId: "12345",
    name: "Rahul Sharma",
    age: 5,
    gender: "Male",
    dateOfBirth: "2018-03-15",
    address: {
      street: "123 Gandhi Road",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400001",
    },
    parentDetails: {
      parentName: "Rajesh Sharma",
      parentContact: "9876543210",
      parentEmail: "rajesh.sharma@example.com",
      parentOccupation: "Engineer",
    },
    siblings: [
      {
        name: "Riya Sharma",
        age: 8,
        relationship: "Sister",
      },
      {
        name: "Aryan Sharma",
        age: 3,
        relationship: "Brother",
      },
    ],
    healthRecords: [
      {
        healthDate: "2023-01-10",
        weight: 18.5,
        height: 105,
        immunizations: ["Polio", "BCG"],
        illnesses: ["Common Cold"],
      },
    ],
    medicalHistory: {
      chronicConditions: ["Asthma"],
      surgeries: ["Tonsillectomy (2022)"],
    },
    allergies: ["Peanuts", "Dust"],
    dietaryPreferences: {
      vegetarian: true,
      lactoseIntolerant: false,
    },
    emergencyContact: {
      name: "Neha Sharma",
      relationship: "Aunt",
      contactNumber: "9876543211",
    },
    nutritionStatus: {
      nutritionDate: "2023-07-01",
      status: "Normal",
    },
    educationDetails: {
      preschoolName: "Little Stars Preschool",
      enrollmentDate: "2022-09-01",
      progress: "Good",
    },
  };

  return (
    <div className="child-add-container">
      <div className='d-flex justify-content-between align-items-center'>
          <h2>Update Child Details</h2>
          <Link to={'/display-child'}><FontAwesomeIcon icon={faUserTie} beat style={{color: "#141414",}} /></Link>
      </div>
      <form className="child-add-form">
        {/* Child ID */}
        <div className="form-group">
          <label htmlFor="childId">Child ID:</label>
          <input
            type="text"
            id="childId"
            name="childId"
            placeholder="Enter child ID"
            value={child.childId}
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
              defaultValue={child.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              placeholder="Enter child's age"
              defaultValue={child.age}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select id="gender" name="gender" defaultValue={child.gender}>
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
              defaultValue={child.dateOfBirth}
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
              defaultValue={child.address.street}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Enter city"
              defaultValue={child.address.city}
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State:</label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="Enter state"
              defaultValue={child.address.state}
            />
          </div>
          <div className="form-group">
            <label htmlFor="zipCode">Zip Code:</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              placeholder="Enter zip code"
              defaultValue={child.address.zipCode}
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
              defaultValue={child.parentDetails.parentName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="parentContact">Contact Number:</label>
            <input
              type="text"
              id="parentContact"
              name="parentContact"
              placeholder="Enter contact number"
              defaultValue={child.parentDetails.parentContact}
            />
          </div>
          <div className="form-group">
            <label htmlFor="parentEmail">Email:</label>
            <input
              type="email"
              id="parentEmail"
              name="parentEmail"
              placeholder="Enter email"
              defaultValue={child.parentDetails.parentEmail}
            />
          </div>
          <div className="form-group">
            <label htmlFor="parentOccupation">Occupation:</label>
            <input
              type="text"
              id="parentOccupation"
              name="parentOccupation"
              placeholder="Enter occupation"
              defaultValue={child.parentDetails.parentOccupation}
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
                  defaultValue={sibling.name}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`siblingAge${index}`}>Sibling Age:</label>
                <input
                  type="number"
                  id={`siblingAge${index}`}
                  name={`siblingAge${index}`}
                  placeholder="Enter sibling's age"
                  defaultValue={sibling.age}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`siblingRelationship${index}`}>Relationship:</label>
                <input
                  type="text"
                  id={`siblingRelationship${index}`}
                  name={`siblingRelationship${index}`}
                  placeholder="Enter relationship"
                  defaultValue={sibling.relationship}
                />
              </div>
            </div>
          ))}
          <button type="button" className="add-sibling-button">Add Another Sibling</button>
        </div>

        {/* Health Records */}
        <div className="form-section">
          <h3>Health Records</h3>
          {child.healthRecords.map((record, index) => (
            <div key={index} className="record">
              <div className="form-group">
                <label htmlFor={`healthDate${index}`}>Date:</label>
                <input
                  type="date"
                  id={`healthDate${index}`}
                  name={`healthDate${index}`}
                  defaultValue={record.healthDate}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`weight${index}`}>Weight (kg):</label>
                <input
                  type="number"
                  id={`weight${index}`}
                  name={`weight${index}`}
                  placeholder="Enter weight"
                  defaultValue={record.weight}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`height${index}`}>Height (cm):</label>
                <input
                  type="number"
                  id={`height${index}`}
                  name={`height${index}`}
                  placeholder="Enter height"
                  defaultValue={record.height}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`immunizations${index}`}>Immunizations:</label>
                <input
                  type="text"
                  id={`immunizations${index}`}
                  name={`immunizations${index}`}
                  placeholder="Enter immunizations"
                  defaultValue={record.immunizations.join(", ")}
                />
              </div>
              <div className="form-group">
                <label htmlFor={`illnesses${index}`}>Illnesses:</label>
                <input
                  type="text"
                  id={`illnesses${index}`}
                  name={`illnesses${index}`}
                  placeholder="Enter illnesses"
                  defaultValue={record.illnesses.join(", ")}
                />
              </div>
            </div>
          ))}
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
              defaultValue={child.medicalHistory.chronicConditions.join(", ")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="surgeries">Surgeries:</label>
            <input
              type="text"
              id="surgeries"
              name="surgeries"
              placeholder="Enter surgeries"
              defaultValue={child.medicalHistory.surgeries.join(", ")}
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
              defaultValue={child.allergies.join(", ")}
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
              defaultValue={child.dietaryPreferences.vegetarian ? "Yes" : "No"}
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
              defaultValue={child.dietaryPreferences.lactoseIntolerant ? "Yes" : "No"}
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
              defaultValue={child.emergencyContact.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="emergencyContactRelationship">Relationship:</label>
            <input
              type="text"
              id="emergencyContactRelationship"
              name="emergencyContactRelationship"
              placeholder="Enter relationship"
              defaultValue={child.emergencyContact.relationship}
            />
          </div>
          <div className="form-group">
            <label htmlFor="emergencyContactNumber">Contact Number:</label>
            <input
              type="text"
              id="emergencyContactNumber"
              name="emergencyContactNumber"
              placeholder="Enter contact number"
              defaultValue={child.emergencyContact.contactNumber}
            />
          </div>
        </div>

        {/* Nutrition Status */}
        <div className="form-section">
          <h3>Nutrition Status</h3>
          <div className="form-group">
            <label htmlFor="nutritionDate">Date:</label>
            <input
              type="date"
              id="nutritionDate"
              name="nutritionDate"
              defaultValue={child.nutritionStatus.nutritionDate}
            />
          </div>
          <div className="form-group">
            <label htmlFor="nutritionStatus">Status:</label>
            <select
              id="nutritionStatus"
              name="nutritionStatus"
              defaultValue={child.nutritionStatus.status}
            >
              <option value="">Select status</option>
              <option value="Normal">Normal</option>
              <option value="Underweight">Underweight</option>
              <option value="Overweight">Overweight</option>
            </select>
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
  );
}

export default ChildUpdate;