import React, { useState, useEffect } from 'react';
import { FaExclamationCircle, FaCheckCircle, FaSpinner } from 'react-icons/fa'; 
import './complaint.css';
import { getAllComplaintApi, updateComplaintApi } from '../../services/allapi';

function Complaints() {
  const [complaints, setComplaints] = useState([]); // State to store complaints
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(''); // State to handle errors

  // Fetch all complaints when the component mounts
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await getAllComplaintApi();


        console.log(response);
        
        if (response.status>=200 && response.status<300) {
          setComplaints(response.data.data); // Set the fetched complaints
        } else {
          setError(response.message || 'Failed to fetch complaints.');
        }
      } catch (err) {
        setError('An error occurred while fetching complaints.');
        console.error('Error fetching complaints:', err);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchComplaints();
  }, []);

  // Function to handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      // Call the backend API to update the complaint status
      const response = await updateComplaintApi(id, { status: newStatus });
      console.log(response);
      
      if (response.status>=200 && response.status<300) {
        // Update the local state if the API call is successful
        const updatedComplaints = complaints.map((complaint) =>
          complaint._id == id ? { ...complaint, status: newStatus } : complaint
        );
        setComplaints(updatedComplaints);
        
      } else {
        setError(response.message || 'Failed to update complaint status.');
      }
    } catch (err) {
      setError('An error occurred while updating the complaint status.');
      console.error('Error updating complaint status:', err);
    }
  };

  // Function to get status icon
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <FaExclamationCircle className="status-icon pending" />;
      case 'resolved':
        return <FaCheckCircle className="status-icon resolved" />;
      case 'in progress':
        return <FaSpinner className="status-icon in-progress" />;
      default:
        return null;
    }
  };

  // Display loading state
  if (loading) {
    return <div className="loading">Loading complaints...</div>;
  }

  // Display error state
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="complaints-container">
      <h2>Complaints</h2>
      <div className="complaints-list">
        {complaints.map((complaint) => (
          <div key={complaint._id} className="complaint-card">
            <div className="complaint-header">
              <h3 className="complaint-title">{complaint.title}</h3>
              {getStatusIcon(complaint.status)}
            </div>
            <p className="complaint-description">{complaint.description}</p>
            <div className="complaint-details">
              <span className="complaint-date">📅 {new Date(complaint.createdAt).toLocaleDateString()}</span>
              <div className="status-control">
                <select
                  value={complaint.status}
                  onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                  className={`status-select ${complaint.status.toLowerCase()}`}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Complaints;