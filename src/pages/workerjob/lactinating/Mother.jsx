import React, { useEffect, useState } from 'react';
import './Mother.css';
import { FaBaby, FaHeartbeat, FaVenus, FaPhone, FaHome, FaNotesMedical, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { getallmotherApi, deletemotherApi } from './../../../services/allapi'; // Import the API functions
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast CSS

function Mother() {
    const [mothers, setMothers] = useState([]); // State to store mothers data

    const userRole = sessionStorage.getItem('userRole'); 

    // Fetch all mothers from the backend
    const fetchMothers = async () => {
        try {
            const response = await getallmotherApi();
            console.log(response);

            if (response.status >= 200 && response.status < 300) {
                setMothers(response.data.data); // Set the fetched data to state
            } else {
                console.error('Failed to fetch mothers:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching mothers:', error);
        }
    };

    // Fetch mothers on component mount
    useEffect(() => {
        fetchMothers();
    }, []);

    // Calculate age from date of birth
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

    // Handle delete mother
    const handleDeleteMother = async (id) => {
        try {
            const response = await deletemotherApi(id); // Call the delete API
            console.log(response);
            
            if (response.status >= 200 && response.status < 300) {
                toast.success('Mother deleted successfully!'); // Show success toast
                fetchMothers(); // Refresh the list of mothers
            } else {
                toast.error('Failed to delete mother. Please try again.'); // Show error toast
            }
        } catch (error) {
            console.error('Error deleting mother:', error);
            toast.error('An error occurred while deleting the mother. Please try again.'); // Show error toast
        }
    };

    return (
        <div className="mothers-container">
            <div className="text-light d-flex justify-content-between align-items-center w-100">
               <Link to={userRole=='admin'?'/admin':'/worker'} style={{textDecoration:"none"}}> <h1 className="title text-dark mt-3">Lactating Beneficiaries</h1></Link>
                <button className="btn mt-3" style={{ marginLeft: '80px' }}>
                    <Link to="/add-lact">
                        <FontAwesomeIcon icon={faPlus} beat style={{ color: "black" }} />
                    </Link>
                </button>
            </div>

            <div className="mothers-grid">
                {mothers.map((mother) => (
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
                            {/* Mother Details */}
                            <div className="info-row">
                                <div className="info-item">
                                    <FaBaby className="icon" />
                                    <div>
                                        <label>Last Delivery</label>
                                        <p>{new Date(mother.lastDeliveryDate).toLocaleDateString()}</p>
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

                            {/* Lactation Support Details */}
                            {mother.lactationSupportDetails && (
                                <div className="notes p-3">
                                    <p className="fw-bold mb-3">Registration Date: {new Date(mother.registrationDate).toLocaleDateString()}</p>
                                    <label>Support Details</label>
                                    <p>{mother.lactationSupportDetails}</p>
                                </div>
                            )}

                            {/* Child Details */}
                            {mother.children && mother.children.length > 0 && (
                                <div className="children-section p-3">
                                    <h5 className="fw-bold mb-3">Children</h5>
                                    {mother.children.map((child, index) => (
                                        <div key={index} className="child-details mb-3">
                                            <div className="info-row">
                                                <div className="info-item">
                                                    <FaBaby className="icon" />
                                                    <div>
                                                        <label>Name</label>
                                                        <p>{child.name}</p>
                                                    </div>
                                                </div>
                                                <div className="info-item">
                                                    <FaVenus className="icon" />
                                                    <div>
                                                        <label>Gender</label>
                                                        <p>{child.gender}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="info-row">
                                                <div className="info-item">
                                                    <FaBaby className="icon" />
                                                    <div>
                                                        <label>Date of Birth</label>
                                                        <p>{new Date(child.dateOfBirth).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className="info-item">
                                                    <FaHeartbeat className="icon" />
                                                    <div>
                                                        <label>Birth Weight</label>
                                                        <p>{child.birthWeight} kg</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="info-item">
                                                <FaNotesMedical className="icon" />
                                                <div>
                                                    <label>Breastfeeding Status</label>
                                                    <p>{child.breastfeedingStatus}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Card Footer with Actions */}
                        <div className="card-footer d-flex justify-content-end align-items-center">
                            <Link to={`/update-lact/${mother.id}`}>
                                <button className="btn">
                                    <FaEdit className="btn-icon" style={{ color: "blueviolet" }} />
                                </button>
                            </Link>
                            <button
                                className="btn"
                                onClick={() => handleDeleteMother(mother.id)} // Add delete handler
                            >
                                <FaTrash className="btn-icon" style={{ color: 'red' }} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Mother;