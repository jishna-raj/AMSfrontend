import React, { useState } from 'react';
import './Healthcomplaint.css'; // Import the CSS file
import { addHealthComplaintApi } from '../../services/allapi';


function Healthcomplaint() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve user object from session storage
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user || !user.workerId) {
      setError('Worker ID not found. Please log in again.');
      return;
    }

    // Extract workerId from the user object
    const workerId = user.workerId;

    // Prepare the request body
    const reqBody = {
      ...formData,
      workerId
    };

    try {
      // Call the API to add the complaint
      const response = await addHealthComplaintApi(reqBody);

      console.log(response);
      

      if (response.status>=200 && response.status<300) {
        alert('Complaint submitted successfully!');
        setError('');
        // Reset the form
        setFormData({
          title: '',
          description: '',
          type: ''
        });
      } else {
        setError(response.message || 'Failed to submit complaint.');
      }
    } catch (err) {
      setError('An error occurred while submitting the complaint.');
      console.error('Error submitting complaint:', err);
    }
  };

  return (
    <div className="health-complaint-container">
      <h2>Submit a Complaint</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form className="health-complaint-form" onSubmit={handleSubmit}>
        {/* Complaint Title */}
        <div className="form-group">
          <label htmlFor="title">Complaint Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter complaint title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Complaint Description */}
        <div className="form-group">
          <label htmlFor="description">Complaint Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe your complaint in detail"
            rows="5"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        {/* Complaint Type */}
        <div className="form-group">
          <label htmlFor="type">Complaint Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          >
            <option value="">Select complaint type</option>
            <option value="Health">Health</option>
            <option value="Nutrition">Nutrition</option>
            <option value="Hygiene">Hygiene</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="submit-button">
            Submit Complaint
          </button>
        </div>
      </form>
    </div>
  );
}

export default Healthcomplaint;