import React, { useState, useEffect } from 'react';
import './Pregnant.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { getAllpregnantApi, deletepregnantApi } from '../../../services/allapi'; // Import delete API
import { serverUrl } from '../../../services/serverurl';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Pregnant() {
    const [pregnantBeneficiaries, setPregnantBeneficiaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const userRole = sessionStorage.getItem('userRole'); 

    // Fetch all pregnant beneficiaries when the component mounts
    useEffect(() => {
        fetchPregnantBeneficiaries();
    }, []);

    const fetchPregnantBeneficiaries = async () => {
        try {
            const response = await getAllpregnantApi();
            console.log(response.data.data);

            if (response.data) {
                setPregnantBeneficiaries(response.data.data);
            } else {
                setError('No data found');
            }
        } catch (err) {
            setError('Failed to fetch data');
            console.error('Error fetching pregnant beneficiaries:', err);
        } finally {
            setLoading(false);
        }
    };

    // Handle delete beneficiary
    const handleDelete = async (id) => {
        try {
            const response = await deletepregnantApi(id); // Call the delete API

            if (response.status >= 200 && response.status < 300) {
                toast.success('Beneficiary deleted successfully!');
                // Remove the deleted beneficiary from the list
                setPregnantBeneficiaries((prev) =>
                    prev.filter((beneficiary) => beneficiary._id !== id)
                );
            } else {
                toast.error('Failed to delete beneficiary.');
            }
        } catch (error) {
            console.error('Error deleting beneficiary:', error);
            toast.error('An error occurred while deleting the beneficiary.');
        }
    };

    // Render loading state
    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    // Render error state
    if (error) {
        return <div className="text-center mt-5 text-danger">{error}</div>;
    }

    return (
        <div className="container5">
            <div className="text-light d-flex justify-content-between align-items-center mb-5 w-100" style={{ backgroundColor: "green" }}>
                <Link to={userRole=='admin'?'/admin':'/worker'} style={{textDecoration:"none"}}><h1 className="title animate-fade-in">Pregnant Beneficiaries</h1></Link>
                <button className="mb-4 btn mt-3" style={{ marginLeft: '80px' }}>
                    <Link to={"/add-pregnant"}><FontAwesomeIcon icon={faPlus} beat style={{ color: "white" }} /></Link>
                </button>
            </div>

            {/* Render cards dynamically */}
            <div className="container4" style={{ marginLeft: "150px" }}>
                <div className="row w-100 animate-fade-in-up">
                    {pregnantBeneficiaries.map((beneficiary) => (
                        <div key={beneficiary._id} className="col-md-5">
                            <div className='card shadow p-3'>
                                <h2>{beneficiary.name}</h2>
                                <p><strong>DOB:</strong> {new Date(beneficiary.dateOfBirth).toLocaleDateString()}</p>
                                <p><strong>Address:</strong> {`${beneficiary.address.street}, ${beneficiary.address.city}, ${beneficiary.address.state} ${beneficiary.address.zipCode}`}</p>
                                <p><strong>Guardian:</strong> {beneficiary.guardianName} ({beneficiary.guardianPhone})</p>
                                <p><strong>Blood Group:</strong> {beneficiary.bloodGroup}</p>
                                <p><strong>Worker ID:</strong> {beneficiary.assignedWorkerId}</p>
                                <p className={`status ${beneficiary.currentStatus.toLowerCase()}`}>
                                    <strong>Status:</strong> {beneficiary.currentStatus}
                                </p>
                                <p><strong>Last Checkup:</strong> {new Date(beneficiary.lastCheckupDate).toLocaleDateString()}</p>
                                <p><strong>Last Visit:</strong> {beneficiary.lastVisitDate ? new Date(beneficiary.lastVisitDate).toLocaleDateString() : 'N/A'}</p>
                                <p className={`nutrition-status ${beneficiary.nutritionStatus.status.toLowerCase()}`}>
                                    <strong>Nutrition Status:</strong> {beneficiary.nutritionStatus.status} (on {new Date(beneficiary.nutritionStatus.date).toLocaleDateString()})
                                </p>

                                {/* Health Records */}
                                <div className="health-records">
                                    <h3>Health Records</h3>
                                    {beneficiary.healthRecords.map((record, index) => (
                                        <div key={index}>
                                            <p>{new Date(record.date).toLocaleDateString()}: <br />weight: {record.weight}kg, BP {record.bloodPressure.systolic}/{record.bloodPressure.diastolic}, FHR {record.fetalHeartRate} bpm</p>
                                            <p>Notes: {record.notes}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Vaccination Details */}
                                <div className="vaccination-details">
                                    <h3>Vaccination Details</h3>
                                    {beneficiary.vaccinationDetails.map((vaccine, index) => (
                                        <div key={index} className='mb-2'>
                                            <p>{vaccine.vaccineName} - {new Date(vaccine.dateAdministered).toLocaleDateString()}, by {vaccine.administeredBy}</p>
                                            <p>Notes: {vaccine.notes}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Document Image */}
                                <div className="document-image">
                                    <h3 style={{ color: '#28104b' }} className='ms-4'>Document</h3>
                                    {beneficiary.document ? (
                                        <img
                                            src={`${serverUrl}/uploads/${beneficiary.document}`} // Adjust the path if necessary
                                            alt="Document"
                                            style={{ width: '300px', height: '300px', marginTop: '10px', marginBottom: '10px', marginLeft: '25px' }}
                                        />
                                    ) : (
                                        <p>No document uploaded</p>
                                    )}
                                </div>

                                {/* Card Footer */}
                                <div className="card-footer">
                                    <button className="btn btn-sm">
                                        <Link to={`/update-pregnant/${beneficiary._id}`}><FontAwesomeIcon icon={faPenToSquare} style={{ color: "#19629a" }} /></Link>
                                    </button>
                                    <button
                                        className="btn btn-sm ms-3"
                                        onClick={() => handleDelete(beneficiary._id)} // Add delete handler
                                    >
                                        <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Toast Container for Notifications */}
            <ToastContainer autoClose={2000} theme="colored" position="top-center" />
        </div>
    );
}

export default Pregnant;