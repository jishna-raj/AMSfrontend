import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import Useredit from './Useredit';
import { Link } from 'react-router-dom';


function UserManagement() {
  // Sample data for logged-in users
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Worker', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'Worker', status: 'Inactive' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com', role: 'Worker', status: 'Active' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle delete user
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="user-management">
      {/* Header */}
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span
                    className={`badge ${
                      user.status === 'Active' ? 'badge-active' : 'badge-inactive'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                    <Useredit/>
                  
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(user.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} style={{color:'red'}} />
                  </button>
                </td>
              </tr>
            ))}
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