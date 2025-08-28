import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getaChildByIdApi } from '../../services/allapi';
import './Child.css';
import { serverUrl } from '../../services/serverurl';

function Child() {
  const { id } = useParams();
  const [child, setChild] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bmiStatus, setBmiStatus] = useState(null);

  // Calculate BMI and status
  const calculateBMIStatus = (healthRecords) => {
    if (!healthRecords || healthRecords.length === 0) return null;
    
    const latestRecord = healthRecords[0];
    if (!latestRecord.weight || !latestRecord.height) return null;

    const heightInMeters = latestRecord.height / 100;
    const bmi = latestRecord.weight / (heightInMeters * heightInMeters);
    const roundedBMI = bmi.toFixed(1);

    let status;
    if (bmi < 18.5) {
      status = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
      status = 'Normal weight';
    } else if (bmi >= 25 && bmi < 30) {
      status = 'Overweight';
    } else {
      status = 'Obese';
    }

    return {
      value: roundedBMI,
      status: status
    };
  };

  useEffect(() => {
    const fetchChild = async () => {
      try {
        const response = await getaChildByIdApi(id);
        console.log(response);
         
        if (response && response.data.child) {
          setChild(response.data.child);
          // Calculate BMI status after setting child data
          const bmiData = calculateBMIStatus(response.data.child.healthRecords);
          setBmiStatus(bmiData);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="child-details">
      <div className="child-details-container">
        <h2>Child Details</h2>

        <div className="child-details-content">
          <div className="child-image-section">
            <img src={`${serverUrl}/uploads/${child.childImage}`} alt="Child" className="child-image" />
          </div>

          <div className="child-info-section">
            <div className="section">
              <h3>Child ID</h3>
              <p className="detail-item">
                <strong>Child ID:</strong> {child.id}
              </p>
            </div>

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

            <div className="section">
              <h3>Siblings</h3>
              {child.siblings.length > 0 ? (
                child.siblings.map((sibling, index) => (
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
                ))
              ) : (
                <p className="detail-item">No siblings recorded</p>
              )}
            </div>
          </div>
        </div>

        {/* Health Records */}
        <div className="section">
          <h3>Health Records</h3>
          {child.healthRecords.length > 0 ? (
            child.healthRecords.map((record, index) => (
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
            ))
          ) : (
            <p className="detail-item">No health records available</p>
          )}
        </div>

        {/* Nutrition Status */}
        <div className="section">
          <h3>Nutrition Status</h3>
          {bmiStatus ? (
            <>
              <p className="detail-item">
                <strong>BMI:</strong> {bmiStatus.value}
              </p>
              <p className="detail-item">
                <strong>Status:</strong> 
                <span className={`bmi-status ${bmiStatus.status.replace(/\s+/g, '-').toLowerCase()}`}>
                  {bmiStatus.status}
                </span>
              </p>
            </>
          ) : (
            <p className="detail-item">No BMI data available (weight and height required)</p>
          )}
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
          {child.allergies.length > 0 ? (
            <p className="detail-item">
              <strong>Allergies:</strong> {child.allergies.join(", ")}
            </p>
          ) : (
            <p className="detail-item">No allergies recorded</p>
          )}
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
      </div>
    </div>
  );
}

export default Child;