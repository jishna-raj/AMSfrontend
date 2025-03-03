import React from 'react';
import './HealthComplaint.css'; // Import the CSS file

function HealthComplaint() {
  return (
    <div className="health-complaint-container">
      <h2>Submit a Complaint</h2>
      <form className="health-complaint-form">
        {/* Complaint Title */}
        <div className="form-group">
          <label htmlFor="complaintTitle">Complaint Title</label>
          <input
            type="text"
            id="complaintTitle"
            name="complaintTitle"
            placeholder="Enter complaint title"
            required
          />
        </div>

        {/* Complaint Description */}
        <div className="form-group">
          <label htmlFor="complaintDescription">Complaint Description</label>
          <textarea
            id="complaintDescription"
            name="complaintDescription"
            placeholder="Describe your complaint in detail"
            rows="5"
            required
          ></textarea>
        </div>

        {/* Complaint Type */}
        <div className="form-group">
          <label htmlFor="complaintType">Complaint Type</label>
          <select id="complaintType" name="complaintType" required>
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

export default HealthComplaint;