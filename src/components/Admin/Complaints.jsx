import React, { useState } from 'react';
import { FaExclamationCircle, FaCheckCircle, FaSpinner } from 'react-icons/fa'; // Icons for status
import './complaint.css'; 
function Complaints() {
  // Sample complaints data (replace with actual data)
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: "Late School Bus",
      description: "The school bus has been arriving late for the past week.",
      date: "2023-10-01",
      status: "Pending",
    },
    {
      id: 2,
      title: "Unclean Classrooms",
      description: "The classrooms are not being cleaned properly.",
      date: "2023-10-05",
      status: "Resolved",
    },
    {
      id: 3,
      title: "Lunch Quality",
      description: "The quality of the lunch provided has deteriorated.",
      date: "2023-10-10",
      status: "In Progress",
    },
  ]);

  // Function to handle status change
  const handleStatusChange = (id, newStatus) => {
    const updatedComplaints = complaints.map((complaint) =>
      complaint.id === id ? { ...complaint, status: newStatus } : complaint
    );
    setComplaints(updatedComplaints);
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

  return (
    <div className="complaints-container">
      <h2>Complaints</h2>
      <div className="complaints-list">
        {complaints.map((complaint) => (
          <div key={complaint.id} className="complaint-card">
            <div className="complaint-header">
              <h3 className="complaint-title">{complaint.title}</h3>
              {getStatusIcon(complaint.status)}
            </div>
            <p className="complaint-description">{complaint.description}</p>
            <div className="complaint-details">
              <span className="complaint-date">📅 {complaint.date}</span>
              <div className="status-control">
                <select
                  value={complaint.status}
                  onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
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