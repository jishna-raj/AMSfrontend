import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { getallchildbeneficiaryApi, deleteChildBeneficiaryApi } from '../../../services/allapi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChildManagement() {
  const [childBeneficiaries, setChildBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChildBeneficiaries = async () => {
      try {
        const response = await getallchildbeneficiaryApi();
        console.log('API Data:', response);

        // Add explicit array check
        if (Array.isArray(response.data.data)) {
          setChildBeneficiaries(response.data.data);
        } else {
          throw new Error('Received data is not an array');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch child beneficiaries');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChildBeneficiaries();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this beneficiary?');
      if (!confirmDelete) return;

      await deleteChildBeneficiaryApi(id);
      setChildBeneficiaries(prev => prev.filter(child => child._id !== id));
      toast.success('Beneficiary deleted successfully');
    } catch (error) {
      toast.error('Failed to delete beneficiary');
      console.error('Delete error:', error);
    }
  };

  if (loading) {
    return <div className="container p-5 text-center">Loading child beneficiaries...</div>;
  }

  if (error) {
    return <div className="container p-5 text-center text-danger">{error}</div>;
  }

  return (
    <div className="child-beneficiary-container p-5 mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Child Beneficiary Management</h2>
          <p className="text-muted">Manage and view all child beneficiary records</p>
        </div>
        <Link to="/add-childbeneficiary" className="btn btn-primary">
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add New
        </Link>
      </div>

      <div className="row w-100">
        {childBeneficiaries.map((child) => (
          <div className="m-4 col-md-2 col-lg-3" key={child?._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-header3 d-flex justify-content-between align-items-center bg-light">
                <h5 className="card-title mb-0">{child?.name}</h5>

                <div>
                  <Link
                    to={`/update-childbeneficiary/${child?._id}`}
                    className="btn btn-sm btn-outline-primary me-2"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <button
                    onClick={() => handleDelete(child?._id)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>

              <div className='mt-2' style={{ height: "1px", backgroundColor: "green" }}></div>

              <div className="card-body">
                {/* Basic Information */}
                <div className="mb-3">
                  <h6 className="text-muted small">Basic Information</h6>
                  <ul className="list-unstyled mb-0">
                    <li>Age: {child?.age}</li>
                    <li>Gender: {child?.gender}</li>
                    <li>DOB: {new Date(child?.dateOfBirth).toLocaleDateString()}</li>
                  </ul>
                </div>

                {/* Address */}
                <div className="mb-3">
                  <h6 className="text-muted small">Address</h6>
                  <p className="mb-0">
                    {child?.address?.street}, {child?.address?.city}<br />
                    {child?.address?.state}, {child?.address?.zipCode}
                  </p>
                </div>

                {/* Guardian Details */}
                <div className="mb-3">
                  <h6 className="text-muted small">Guardian Details</h6>
                  <ul className="list-unstyled mb-0">
                    <li>Name: {child?.guardian?.name}</li>
                    <li>Relationship: {child?.guardian?.relationship}</li>
                    <li>Contact: {child?.guardian?.contactNumber}</li>
                    {child?.guardian?.email && <li>Email: {child.guardian.email}</li>}
                  </ul>
                </div>

                {/* Health Records */}
                {Array.isArray(child?.healthRecords) && child.healthRecords.length > 0 && (
                  <div className="mb-3">
                    <h6 className="text-muted small">Health Records</h6>
                    <ul className="list-unstyled">
                      {child.healthRecords.map((record, index) => (
                        <li key={`health-${index}`} className="small">
                          Date: {new Date(record?.date).toLocaleDateString()}<br />
                          Weight: {record?.weight} kg<br />
                          Height: {record?.height} cm  <br /> <br />
                          immunization: {record?.immunizations}<br />
                          recentIllness:{record?.illnesses}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Vaccination Details */}
                {Array.isArray(child?.vaccinationDetails) && child.vaccinationDetails.length > 0 && (
                  <div className="mb-3">
                    <h6 className="text-muted small">Vaccinations</h6>
                    <ul className="list-unstyled">
                      {child.vaccinationDetails.map((vaccine, index) => (
                        <li key={`vaccine-${index}`} className="small">
                          {vaccine?.vaccineName} - {new Date(vaccine?.dateAdministered).toLocaleDateString()}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <p className='fw-bold'> Last visit: {child?.lastVisitDate && new Date(child.lastVisitDate).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>

      {childBeneficiaries.length === 0 && !loading && (
        <div className="text-center mt-5">
          <h4 className="text-muted">No child beneficiaries found</h4>
          <p className="text-secondary">Start by adding a new beneficiary</p>
        </div>
      )}
    </div>
  );
}

export default ChildManagement;