import React, { useEffect, useState } from 'react';
import { faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { deleteChildApi, getallchildApi } from '../../services/allapi';
import { toast, ToastContainer } from 'react-toastify';

function DisplayChild() {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [healthAlerts, setHealthAlerts] = useState([]);

  const userRole = sessionStorage.getItem('userRole'); 

  // Fetch all children when the component mounts
  useEffect(() => {
    const allChildren = async () => {
      try {
        const response = await getallchildApi();
        if (response && response.data.children) {
          console.log("Fetched Children Data:", response.data.children); // Log fetched data
          setChildren(response.data.children);
        } else {
          setError('No children found');
        }
      } catch (err) {
        setError('Failed to fetch children');
        console.error('Error fetching children:', err);
      } finally {
        setLoading(false);
      }
    };
    allChildren();
  }, []);

  // Regenerate health alerts whenever `children` changes
  useEffect(() => {
    if (children.length > 0) {
      generateHealthAlerts(children);
    }
  }, [children]); // Run this effect whenever `children` changes

  const calculateBMI = (weight, height) => {
    if (weight && height) {
      const heightInMeters = height / 100; // Convert height from cm to meters
      return (weight / (heightInMeters * heightInMeters)).toFixed(2);
    }
    return null;
  };

  const generateHealthAlerts = (children) => {
    const alerts = [];

    console.log("Generating health alerts for children:", children); // Log children data

    children.forEach(child => {
      const { name, age, healthRecords, allergies } = child;

      // Access the latest health record (first item in the array)
      const latestHealthRecord = healthRecords?.[0];
      const weight = latestHealthRecord?.weight; // Access weight from the latest health record
      const height = latestHealthRecord?.height; // Access height from the latest health record

      // Log weight and height for debugging
      console.log(`Child: ${name}, Weight: ${weight}, Height: ${height}`);

      // Example: Check if a child is due for a Polio booster shot
      if (age === 5) {
        alerts.push({
          type: 'warning',
          message: `${name} (Age: ${age}) is due for a Polio booster shot.`
        });
      }

      // Calculate BMI and add alerts based on BMI categories
      if (weight && height) {
        const bmi = calculateBMI(weight, height);
        console.log(`Child: ${name}, BMI: ${bmi}`); // Log BMI for debugging
        if (bmi < 18.5) {
          alerts.push({
            type: 'danger',
            message: `${name} (Age: ${age}) is underweight (BMI: ${bmi}). Please consult a nutritionist.`
          });
        } else if (bmi >= 25 && bmi < 30) {
          alerts.push({
            type: 'warning',
            message: `${name} (Age: ${age}) is overweight (BMI: ${bmi}). Encourage physical activity.`
          });
        } else if (bmi >= 30) {
          alerts.push({
            type: 'danger',
            message: `${name} (Age: ${age}) is obese (BMI: ${bmi}). Immediate medical attention is required.`
          });
        }
      } else {
        console.log(`Child: ${name}, Weight or Height is missing. Cannot calculate BMI.`);
      }

      // Check for severe allergies
      if (allergies?.length > 0) {
        alerts.push({
          type: 'danger',
          message: `${name} (Age: ${age}) has severe allergies: ${allergies.join(", ")}. Ensure proper precautions.`
        });
      }
    });

    console.log("Generated Health Alerts:", alerts); // Log generated alerts
    setHealthAlerts(alerts);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleDeleteChild = async (id) => {
    try {
      const response = await deleteChildApi(id);
      if (response.status === 200) {
        toast.success('Child deleted successfully');
        const updatedChildren = children.filter(child => child.id !== id);
        setChildren(updatedChildren); // Update the `children` state
      } else {
        toast.error('Failed to delete child');
      }
    } catch (err) {
      console.error('Error deleting child:', err);
      toast.error('Failed to delete child');
    }
  };

  return (
    <>
      <div className="invent">
        <div
          className="p-2 text-light d-flex justify-content-between align-items-center"
          style={{ backgroundImage: "linear-gradient(180deg, #083b14, #0a551a)" }}
        >
          <Link  to={userRole === 'admin' ? '/admin' : '/worker'} 
                     style={{ textDecoration: 'none', color: 'white' }}>
            <h2 className="ms-3 fw-bold">Child Management</h2>
          </Link>
          <Link to={'/add-child'}>
            <FontAwesomeIcon icon={faPlus} beat style={{ color: '#edf1f7' }} className="me-5" />
          </Link>
        </div>

        <div className="row w-100">
          {children.map((child) => (
            <div className="col-md-3 ms-4 mt-4" key={child.id}>
              <div className="card-container1 shadow">
                <div className="card custom-card">
                  <div className="card-header1">
                    <Link to={`/child/${child.id}`} style={{ textDecoration: 'none', color: 'green' }}>
                      <h5 className="card-title fw-bold">{child.name}</h5>
                    </Link>
                  </div>
                  <div className="card-body">
                    <div className="card-item">
                      <span className="item-label">Age:</span>
                      <span className="item-value">{child.age}</span>
                    </div>
                    <div className="card-item">
                      <span className="item-label">Gender:</span>
                      <span className="item-value">{child.gender}</span>
                    </div>
                    <div className="card-item">
                      <span className="item-label">Date of Birth:</span>
                      <span className="item-value">{new Date(child.dateOfBirth).toLocaleDateString()}</span>
                    </div>
                    <div className="card-item">
                      <span className="item-label">Address:</span>
                      <span className="item-value">
                        {child.address.street}, {child.address.city}
                      </span>
                    </div>
                  </div>
                  <div className="card-footer">
                    <Link to={`/update-child/${child.id}`}>
                      <button className="btn btn-sm">
                        <FontAwesomeIcon icon={faPenToSquare} style={{ color: 'green' }} />
                      </button>
                    </Link>
                    <button className="btn btn-sm" onClick={() => handleDeleteChild(child.id)}> 
                      <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-4 m-5">
          <div className="col-md-11">
            <h4>Health Alerts</h4>
            {healthAlerts.length > 0 ? (
              healthAlerts.map((alert, index) => (
                <div key={index} className={`alert alert-${alert.type}`}>
                  {alert.message}
                </div>
              ))
            ) : (
              <div className="alert alert-info">No health alerts to display.</div>
            )}
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </>
  );
}

export default DisplayChild;