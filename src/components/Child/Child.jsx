import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getaChildByIdApi  } from '../../services/allapi'; // Adjust the import path as needed
import './Child.css'; // Import the CSS file
import { serverUrl } from '../../services/serverurl';

function Child() {
  const { id } = useParams(); // Get the child ID from the URL
  const [child, setChild] = useState(null); // State to store the child's details
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch the child's details when the component mounts
  useEffect(() => {
    const fetchChild = async () => {
      try {
        const response = await getaChildByIdApi(id);
        console.log(response);
         
        if (response && response.data.child) {
          setChild(response.data.child); // Update state with fetched data
        } else {
          setError('Child not found'); // Handle case where no data is returned
        }
      } catch (err) {
        setError('Failed to fetch child details'); // Handle API errors
        console.error('Error fetching child:', err);
      } finally {
        setLoading(false); // Set loading to false after the operation
      }
    };

    fetchChild();
  }, [id]);

  // Display loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error state
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="child-details">
      <div className="child-details-container">
        <h2>Child Details</h2>

        {/* Two-Column Layout */}
        <div className="child-details-content">
          {/* Left Column: Child Image */}
          <div className="child-image-section">
            <img src={`${serverUrl}/uploads/${child.childImage}`} alt="Child" className="child-image" />
          </div>

          {/* Right Column: Child Details */}
          <div className="child-info-section">
            {/* Child ID */}
            <div className="section">
              <h3>Child ID</h3>
              <p className="detail-item">
                <strong>Child ID:</strong> {child.id}
              </p>
            </div>

            {/* Basic Information */}
            <div className="section">
              <h3>Basic Information</h3>
              <p className="detail-item">
                <strong>Name:</strong> {child.name}
              </p>
              <p className="detail-item">
                <strong>Age:</strong> {child.age}
              </p>
              <p className="detail-item">
                <strong>Gender:</strong> {child.gender}
              </p>
              <p className="detail-item">
                <strong>Date of Birth:</strong> {new Date(child.dateOfBirth).toISOString().split('T')[0]}
              </p>
              <p className="detail-item">
                <strong>Address:</strong> {child.address.street}, {child.address.city}, {child.address.state}, {child.address.zipCode}
              </p>
            </div>

            {/* Parent Details */}
            <div className="section">
              <h3>Parent Details</h3>
              <p className="detail-item">
                <strong>Parent Name:</strong> {child.parentDetails.parentName}
              </p>
              <p className="detail-item">
                <strong>Contact Number:</strong> {child.parentDetails.parentContact}
              </p>
              <p className="detail-item">
                <strong>Email:</strong> {child.parentDetails.parentEmail}
              </p>
              <p className="detail-item">
                <strong>Occupation:</strong> {child.parentDetails.parentOccupation}
              </p>
            </div>

            {/* Siblings */}
            <div className="section">
              <h3>Siblings</h3>
              {child.siblings.map((sibling, index) => (
                <div key={index} className="record">
                  <p className="detail-item">
                    <strong>Name:</strong> {sibling.name}
                  </p>
                  <p className="detail-item">
                    <strong>Age:</strong> {sibling.age}
                  </p>
                  <p className="detail-item">
                    <strong>Relationship:</strong> {sibling.relationship}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Health Records */}
        <div className="section">
          <h3>Health Records</h3>
          {child.healthRecords.map((record, index) => (
            <div key={index} className="record">
              <p className="detail-item">
                <strong>Date:</strong> {new Date(record.date).toISOString().split('T')[0]}
              </p>
              <p className="detail-item">
                <strong>Weight:</strong> {record.weight} kg
              </p>
              <p className="detail-item">
                <strong>Height:</strong> {record.height} cm
              </p>
              <p className="detail-item">
                <strong>Immunizations:</strong> {record.immunizations.join(", ")}
              </p>
              <p className="detail-item">
                <strong>Illnesses:</strong> {record.illnesses.join(", ")}
              </p>
            </div>
          ))}
        </div>

        {/* Medical History */}
        <div className="section">
          <h3>Medical History</h3>
          <p className="detail-item">
            <strong>Chronic Conditions:</strong> {child.medicalHistory.chronicConditions.join(", ")}
          </p>
          <p className="detail-item">
            <strong>Surgeries:</strong> {child.medicalHistory.surgeries.join(", ")}
          </p>
        </div>

        {/* Allergies */}
        <div className="section">
          <h3>Allergies</h3>
          <p className="detail-item">
            <strong>Allergies:</strong> {child.allergies.join(", ")}
          </p>
        </div>

        {/* Dietary Preferences */}
        <div className="section">
          <h3>Dietary Preferences</h3>
          <p className="detail-item">
            <strong>Vegetarian:</strong> {child.dietaryPreferences.vegetarian ? "Yes" : "No"}
          </p>
          <p className="detail-item">
            <strong>Lactose Intolerant:</strong> {child.dietaryPreferences.lactoseIntolerant ? "Yes" : "No"}
          </p>
        </div>

        {/* Emergency Contact */}
        <div className="section">
          <h3>Emergency Contact</h3>
          <p className="detail-item">
            <strong>Name:</strong> {child.emergencyContact.name}
          </p>
          <p className="detail-item">
            <strong>Relationship:</strong> {child.emergencyContact.relationship}
          </p>
          <p className="detail-item">
            <strong>Contact Number:</strong> {child.emergencyContact.contactNumber}
          </p>
        </div>

        {/* Nutrition Status */}
        <div className="section">
          <h3>Nutrition Status</h3>
          <p className="detail-item">
            <strong>Date:</strong> {new Date(child.nutritionStatus.date).toISOString().split('T')[0]}
          </p>
          <p className="detail-item">
            <strong>Status:</strong> {child.nutritionStatus.status}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Child;