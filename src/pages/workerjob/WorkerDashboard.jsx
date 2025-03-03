import React from 'react';
import './WorkerDashboard.css'; 
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function WorkerDashboard() {
  return (
    <div className="worker-dashboard">
      <h1>Worker Dashboard</h1>
      <div className="dashboard-container">
        <Row>
          {/* Children Card */}
          <div className='col-md-1'></div>
          <div className="col-md-5">
            <div className="dashboard-card children-card">
              <h2>Children</h2>
              <p>Total: 50</p>
              <p>Present Today: 45</p>
             <Link to={'/display-child'}> <button className="view-button">View Details</button></Link>
            </div>
          </div>

          {/* Beneficiaries Card */}
          <div className="col-md-5">
            <div className="dashboard-card beneficiaries-card">
              <h2>Beneficiaries</h2>
              <p>Total: 120</p>
              <p>Active: 100</p>
              <Link to={'/worker-beneficiary'}><button className="view-button">View Details</button></Link>
            </div>
          </div>

          {/* Inventories Card */}
          <div className='col-md-1'></div>
          <div className="col-md-5">
            <div className="dashboard-card inventories-card">
              <h2>Inventories</h2>
              <p>Total Items: 15</p>
              <p>Low Stock: 3</p>
              <Link to={'/inventory'}><button className="view-button">View Details</button></Link>
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
}

export default WorkerDashboard;