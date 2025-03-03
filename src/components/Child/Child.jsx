import React from 'react';
import './Child.css'; // Import the CSS file

function Child() {
  // Sample data (replace with actual data)
  const child = {
    id: "12345",
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
        date: "2023-01-10",
        weight: 18.5,
        height: 105,
        immunizations: ["Polio", "BCG"],
        illnesses: ["Common Cold"],
      },
      {
        date: "2023-06-15",
        weight: 20.0,
        height: 108,
        immunizations: ["MMR"],
        illnesses: [],
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
      date: "2023-07-01",
      status: "Normal",
    },
    imageUrl: "https://img.freepik.com/free-photo/stylish-little-smiling-girl-posing-dress-isolated-white-studio-background-caucasian-blonde-female-model-human-emotions-facial-expression-childhood-standing-with-hands-crossed_155003-23028.jpg", // Placeholder image URL
  };

  return (
    <div className="child-details">
      <div className="child-details-container">
        <h2>Child Details</h2>

        {/* Two-Column Layout */}
        <div className="child-details-content">
          {/* Left Column: Child Image */}
          <div className="child-image-section">
            <img src={child.imageUrl} alt="Child" className="child-image" />
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
                <strong>Date of Birth:</strong> {child.dateOfBirth}
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
                <strong>Date:</strong> {record.date}
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
            <strong>Date:</strong> {child.nutritionStatus.date}
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