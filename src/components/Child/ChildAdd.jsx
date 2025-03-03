import React from 'react';
import './childadd.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


function ChildAdd() {
  return (
    <div className="child-add-container">
      <div className='d-flex justify-content-between align-items-center'>
        <h2>Add New Child</h2>
        <Link to={'/display-child'}><FontAwesomeIcon icon={faUserTie} beat style={{color: "#141414",}} /></Link>
        </div>
     
      <form className="child-add-form">
        {/* Child ID */}
        <div className="form-group">
          <label htmlFor="childId">Child ID:</label>
          <input type="text" id="childId" name="childId" placeholder="Enter child ID" />
        </div>

        {/* Basic Information */}
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter child's name" />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input type="number" id="age" name="age" placeholder="Enter child's age" />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select id="gender" name="gender">
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dateOfBirth">Date of Birth:</label>
            <input type="date" id="dateOfBirth" name="dateOfBirth" />
          </div>
        </div>

        {/* Address */}
        <div className="form-section">
          <h3>Address</h3>
          <div className="form-group">
            <label htmlFor="street">Street:</label>
            <input type="text" id="street" name="street" placeholder="Enter street" />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input type="text" id="city" name="city" placeholder="Enter city" />
          </div>
          <div className="form-group">
            <label htmlFor="state">State:</label>
            <input type="text" id="state" name="state" placeholder="Enter state" />
          </div>
          <div className="form-group">
            <label htmlFor="zipCode">Zip Code:</label>
            <input type="text" id="zipCode" name="zipCode" placeholder="Enter zip code" />
          </div>
        </div>

        {/* Parent Details */}
        <div className="form-section">
          <h3>Parent Details</h3>
          <div className="form-group">
            <label htmlFor="parentName">Parent Name:</label>
            <input type="text" id="parentName" name="parentName" placeholder="Enter parent's name" />
          </div>
          <div className="form-group">
            <label htmlFor="parentContact">Contact Number:</label>
            <input type="text" id="parentContact" name="parentContact" placeholder="Enter contact number" />
          </div>
          <div className="form-group">
            <label htmlFor="parentEmail">Email:</label>
            <input type="email" id="parentEmail" name="parentEmail" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label htmlFor="parentOccupation">Occupation:</label>
            <input type="text" id="parentOccupation" name="parentOccupation" placeholder="Enter occupation" />
          </div>
        </div>

        {/* Siblings */}
        <div className="form-section">
          <h3>Siblings</h3>
          <div className="form-group">
            <label htmlFor="siblingName">Sibling Name:</label>
            <input type="text" id="siblingName" name="siblingName" placeholder="Enter sibling's name" />
          </div>
          <div className="form-group">
            <label htmlFor="siblingAge">Sibling Age:</label>
            <input type="number" id="siblingAge" name="siblingAge" placeholder="Enter sibling's age" />
          </div>
          <div className="form-group">
            <label htmlFor="siblingRelationship">Relationship:</label>
            <input type="text" id="siblingRelationship" name="siblingRelationship" placeholder="Enter relationship" />
          </div>
          <button type="button" className="add-sibling-button">Add Another Sibling</button>
        </div>

        {/* Health Records */}
        <div className="form-section">
          <h3>Health Records</h3>
          <div className="form-group">
            <label htmlFor="healthDate">Date:</label>
            <input type="date" id="healthDate" name="healthDate" />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight (kg):</label>
            <input type="number" id="weight" name="weight" placeholder="Enter weight" />
          </div>
          <div className="form-group">
            <label htmlFor="height">Height (cm):</label>
            <input type="number" id="height" name="height" placeholder="Enter height" />
          </div>
          <div className="form-group">
            <label htmlFor="immunizations">Immunizations:</label>
            <input type="text" id="immunizations" name="immunizations" placeholder="Enter immunizations" />
          </div>
          <div className="form-group">
            <label htmlFor="illnesses">Illnesses:</label>
            <input type="text" id="illnesses" name="illnesses" placeholder="Enter illnesses" />
          </div>
        </div>

        {/* Medical History */}
        <div className="form-section">
          <h3>Medical History</h3>
          <div className="form-group">
            <label htmlFor="chronicConditions">Chronic Conditions:</label>
            <input type="text" id="chronicConditions" name="chronicConditions" placeholder="Enter chronic conditions" />
          </div>
          <div className="form-group">
            <label htmlFor="surgeries">Surgeries:</label>
            <input type="text" id="surgeries" name="surgeries" placeholder="Enter surgeries" />
          </div>
        </div>

        {/* Allergies */}
        <div className="form-section">
          <h3>Allergies</h3>
          <div className="form-group">
            <label htmlFor="allergies">Allergies:</label>
            <input type="text" id="allergies" name="allergies" placeholder="Enter allergies" />
          </div>
        </div>

        {/* Dietary Preferences */}
        <div className="form-section">
          <h3>Dietary Preferences</h3>
          <div className="form-group">
            <label htmlFor="vegetarian">Vegetarian:</label>
            <select id="vegetarian" name="vegetarian">
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="lactoseIntolerant">Lactose Intolerant:</label>
            <select id="lactoseIntolerant" name="lactoseIntolerant">
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
            <input type="text" id="emergencyContactName" name="emergencyContactName" placeholder="Enter name" />
          </div>
          <div className="form-group">
            <label htmlFor="emergencyContactRelationship">Relationship:</label>
            <input type="text" id="emergencyContactRelationship" name="emergencyContactRelationship" placeholder="Enter relationship" />
          </div>
          <div className="form-group">
            <label htmlFor="emergencyContactNumber">Contact Number:</label>
            <input type="text" id="emergencyContactNumber" name="emergencyContactNumber" placeholder="Enter contact number" />
          </div>
        </div>

        {/* Nutrition Status */}
        <div className="form-section">
          <h3>Nutrition Status</h3>
          <div className="form-group">
            <label htmlFor="nutritionDate">Date:</label>
            <input type="date" id="nutritionDate" name="nutritionDate" />
          </div>
          <div className="form-group">
            <label htmlFor="nutritionStatus">Status:</label>
            <select id="nutritionStatus" name="nutritionStatus">
              <option value="">Select status</option>
              <option value="Normal">Normal</option>
              <option value="Underweight">Underweight</option>
              <option value="Overweight">Overweight</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="submit-button">Add Child</button>
        </div>
      </form>
    </div>
  );
}

export default ChildAdd;