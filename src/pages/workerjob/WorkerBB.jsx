import React from 'react';
import { Link } from 'react-router-dom';
import './WorkerBB.css'; // Import the CSS file

function WorkerBB() {


  return (
    <div className="worker-bb-container">
      {/* Header */}
      <div className="header">
        <Link to={'/admin'} style={{textDecoration:"none"}}><h1>Beneficiary Management</h1></Link>
        
      </div>

      {/* Dynamic Content Based on Selection */}
      <div className="content">
        
          <div className="child-section">
            <h2>Child Beneficiaries</h2>
            <Link to={'/child-beneficiary'}><button className='btn btn-success w-25 '>More Details</button></Link>
           
          </div>
       

   
          <div className="lactating-section">
            <h2>Lactating Beneficiaries</h2>
            <Link to={'/lactating'}><button className='btn btn-success w-25 '>More Details</button></Link>
           
          </div>
       
       
          <div className="pregnant-section">
            <h2>Pregnant Beneficiaries</h2>
            <Link to={'/pregnant'}><button className='btn btn-success w-25 '>More Details</button></Link>
           
          </div>
     
      </div>
    </div>
  );
}

export default WorkerBB;