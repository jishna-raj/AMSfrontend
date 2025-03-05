import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import Useredit from './Useredit';
import { Link } from 'react-router-dom';


function UserManagement() {
  




  return (
    <div className="user-management">
     
      <div className="header p-4 text-white text-center" style={{ backgroundImage: "linear-gradient(180deg, #083b14, #0d3b17)" }}>
        <Link to={'/admin'} style={{textDecoration:'none',color:'white'}}><h2 className="mb-0">User Management</h2></Link>
      </div>

      {/* Search Bar */}
      <div className="search-bar-container p-4">
        <div className="input-group search-bar">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or email"
           
            
          />
          <button className="btn btn-search btn-outline-secondary" type="button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className='p-3'>
            
              <tr>
                <td>anu</td>
                <td>anu@gmail.com</td>
                <td>worker</td>
                <td>
                  <span
                    className={`badge ${
                      "active" === 'Active' ? 'badge-active' : 'badge-inactive'
                    }`}
                  >
                    
                  </span>
                </td>
                <td>
                    <Useredit/>
                  
                  <button
                    className="btn btn-delete"
                  >
                    <FontAwesomeIcon icon={faTrash} style={{color:'red'}} />
                  </button>
                </td>
              </tr>
          
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination-container p-4">
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <button className="page-link" tabIndex="-1">
                Previous
              </button>
            </li>
            <li className="page-item active">
              <button className="page-link">1</button>
            </li>
            <li className="page-item">
              <button className="page-link">2</button>
            </li>
            <li className="page-item">
              <button className="page-link">3</button>
            </li>
            <li className="page-item">
              <button className="page-link">Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default UserManagement;