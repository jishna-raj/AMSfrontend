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
          setChildren(response.data.children);
        } else {
          setError('No children found');
        }
      } catch (err) {
  
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
  }, [children]);

  const calculateBMI = (weight, height) => {
    if (weight && height) {
      const heightInMeters = height / 100;
      return (weight / (heightInMeters * heightInMeters)).toFixed(2);
    }
    return null;
  };

  const generateHealthAlerts = (children) => {
    const alerts = [];

    children.forEach(child => {
      const { id, name, age, healthRecords, allergies } = child;
      const childAlerts = [];
      let highestAlertType = 'info';

      // 1. Vaccination Alert
      if (age === 5) {
        childAlerts.push('due for Polio booster shot');
        highestAlertType = 'warning';
      }

      // 2. BMI Alert
      const latestHealthRecord = healthRecords?.[0];
      const weight = latestHealthRecord?.weight;
      const height = latestHealthRecord?.height;
      const bmi = calculateBMI(weight, height);

      if (bmi) {
        if (bmi < 18.5) {
          childAlerts.push(`underweight (BMI: ${bmi})`);
          highestAlertType = 'danger';
        } else if (bmi >= 25 && bmi < 30) {
          childAlerts.push(`overweight (BMI: ${bmi})`);
          if (highestAlertType !== 'danger') highestAlertType = 'warning';
        } else if (bmi >= 30) {
          childAlerts.push(`obese (BMI: ${bmi})`);
          highestAlertType = 'danger';
        }
      }

      // 3. Allergy Alert
      const allergyList = Array.isArray(allergies) 
        ? allergies 
        : allergies?.split(/,\s*/) || [''];
      
      if (allergyList.length > 0 && allergyList[0] !== '' && allergyList[0] !== "nill"  && allergyList[0] !== "Nill" ) {
        childAlerts.push(`has allergies: ${allergyList.join(', ')}`);
        highestAlertType = 'danger';
      }

      // Create combined alert if any issues exist
      if (childAlerts.length > 0) {
        alerts.push({
          type: highestAlertType,
          message: `${name} (Age: ${age}): ${childAlerts.join(', ')}.`
        });
      }
    });

    setHealthAlerts(alerts);
  };

  if (loading) {
    return <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-3">{error}</div>;
  }

  const handleDeleteChild = async (id) => {
    try {
      const response = await deleteChildApi(id);
      if (response.status === 200) {
        toast.success('Child deleted successfully');
        const updatedChildren = children.filter(child => child.id !== id);
        setChildren(updatedChildren);
      } else {
        toast.error('Failed to delete child');
      }
    } catch (err) {
      console.error('Error deleting child:', err);
      toast.error('Failed to delete child');
    }
  };

  console.log(children);
  

  return (
    <>
      <div className="invent vh-100">
        <div
          className="p-2 text-light d-flex justify-content-between align-items-center"
          style={{ backgroundImage: "linear-gradient(180deg, #083b14, #0a551a)" }}
        >
          <Link to={userRole === 'admin' ? '/admin' : '/worker'} 
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
                        {child.address?.street}, {child.address?.city}
                      </span>
                    </div>
                  </div>
                  <div className="card-footer">
                    <Link to={`/update-child/${child.id}`}>
                      <button className="btn btn-sm">
                        <FontAwesomeIcon icon={faPenToSquare} style={{ color: 'green' }} />
                      </button>
                    </Link>
                    <button 
                      className="btn btn-sm" 
                      onClick={() => handleDeleteChild(child.id)}
                    >
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
            <h4 className='text-light mb-4'>Health Alerts</h4>
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
        </div>
      </div>
      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </>
  );
}

export default DisplayChild;