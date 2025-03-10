import React from 'react';
import './Mother.css';
import { FaBaby, FaHeartbeat, FaVenus, FaPhone, FaHome, FaNotesMedical, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Mother() {
  const mothers = [
    {
      _id: 'LM123',
      name: 'Anika Sharma',
      dateOfBirth: '1990-05-14',
      address: '123 Green Park, New Delhi',
      guardianName: 'Rajesh Sharma',
      guardianPhone: '987-654-3210',
      bloodGroup: 'O+',
      lastDeliveryDate: '2024-01-15',
      breastfeedingStatus: 'Exclusive',
      nutritionalSupport: true,
      currentStatus: 'Active',
      lactationSupportDetails: 'Receiving weekly supplements and lactation counseling'
    },
    {
      _id: 'LM124',
      name: 'Priya Patel',
      dateOfBirth: '1992-11-05',
      address: '456 Lotus Road, Mumbai',
      guardianName: 'Amit Patel',
      guardianPhone: '789-012-3456',
      bloodGroup: 'B+',
      lastDeliveryDate: '2023-12-20',
      breastfeedingStatus: 'Partial',
      nutritionalSupport: false,
      currentStatus: 'Active',
      lactationSupportDetails: 'Attending monthly check-ups'
    },
    {
      _id: 'LM125',
      name: 'Sneha Reddy',
      dateOfBirth: '1988-03-22',
      address: '789 Hills Colony, Hyderabad',
      guardianName: 'Arjun Reddy',
      guardianPhone: '890-123-4567',
      bloodGroup: 'A+',
      lastDeliveryDate: '2024-02-10',
      breastfeedingStatus: 'Exclusive',
      nutritionalSupport: true,
      currentStatus: 'Active',
      lactationSupportDetails: 'On special nutritional diet plan'
    },
    {
      _id: 'LM126',
      name: 'Meera Singh',
      dateOfBirth: '1995-07-18',
      address: '321 River View, Kolkata',
      guardianName: 'Vikram Singh',
      guardianPhone: '901-234-5678',
      bloodGroup: 'AB+',
      lastDeliveryDate: '2023-11-30',
      breastfeedingStatus: 'None',
      nutritionalSupport: true,
      currentStatus: 'Inactive',
      lactationSupportDetails: 'Completed lactation support program'
    }
  ];

  const calculateAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  

  return (
    <div className="mothers-container">
      <div className=" text-light d-flex justify-content-between align-items-center w-100">
                <h1 className="title text-dark mt-3">Lactinating Beneficiaries</h1>
                <button className="btn mt-3" style={{ marginLeft: '80px' }}>
                    <Link to={"/add-lact"}><FontAwesomeIcon icon={faPlus} beat style={{ color: "black" }} /></Link>
                </button>
                </div>


      
      <div className="mothers-grid">
        {mothers.map(mother => (
          <div key={mother._id} className="mother-card">
            <div className="card-header p-2 mb-3">
              <div className="profile-section">
              
                <div className="header-text ps-2">
                  <h3>{mother.name}</h3>
                  <p className="age">{calculateAge(mother.dateOfBirth)} years</p>
                </div>
              </div>

            </div>

            <div className="card-body">
              <div className="info-row">
                <div className="info-item">
                  <FaBaby className="icon" />
                  <div>
                    <label>Last Delivery</label>
                    <p>{mother.lastDeliveryDate}</p>
                  </div>
                </div>
                <div className="info-item">
                  <FaHeartbeat className="icon" />
                  <div>
                    <label>Blood Group</label>
                    <p className="blood-group">{mother.bloodGroup}</p>
                  </div>
                </div>
              </div>

              <div className="info-group">
                <FaHome className="icon" />
                <div>
                  <label>Address</label>
                  <p>{mother.address}</p>
                </div>
              </div>

              <div className="info-row">
                <div className="info-item">
                  <FaVenus className="icon" />
                  <div>
                    <label>Breastfeeding</label>
                    <p className={`status ${mother.breastfeedingStatus.toLowerCase()}`}>
                      {mother.breastfeedingStatus}
                    </p>
                  </div>
                </div>
                <div className="info-item">
                  <FaNotesMedical className="icon" />
                  <div>
                    <label>Nutrition</label>
                    <p className={mother.nutritionalSupport ? 'active' : 'inactive'}>
                      {mother.nutritionalSupport ? 'Supported' : 'Not Supported'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="info-group guardian-info">
                <FaPhone className="icon" />
                <div>
                  <label>Guardian Contact</label>
                  <p>{mother.guardianName} ({mother.guardianPhone})</p>
                </div>
              </div>

              {mother.lactationSupportDetails && (
                <div className="notes p-3">
                  <p className='fw-bold mb-3'>Registration Date:</p>
                  <label>Support Details</label>
                  <p>{mother.lactationSupportDetails}</p>
                  
                </div>
              )}
            </div>

            <div className="card-footer d-flex justify-content-end align-items-center">

           <Link to={'/update-lact'}>
                <button className="btn">
                    <FaEdit className="btn-icon" style={{color:"blueviolet"}}  /> 
                  </button>
    
           </Link>
              <button className="btn">
                <FaTrash className="btn-icon" style={{color:'red'}} /> 
              </button>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Mother;