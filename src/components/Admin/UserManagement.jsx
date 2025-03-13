import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import Useredit from './Useredit';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteUserApi, getalluserapi } from '../../services/allapi';

function UserManagement() {
    const [users, setUsers] = useState([]); // State to store users
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [currentPage, setCurrentPage] = useState(1); // State for pagination
    const [usersPerPage] = useState(7); // Number of users per page
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for error

    // Fetch all users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getalluserapi(); // Fetch all users
                if (response.data) {
                    setUsers(response.data.data); // Set users in state
                } else {
                    setError('No users found');
                }
            } catch (err) {
                setError('Failed to fetch users');
                console.error('Error fetching users:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Function to update the user list after editing a user
    const updateUserList = async (updatedUser) => {
        try {
            // Update the local state
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === updatedUser._id ? updatedUser : user
                )
            );

            // Re-fetch data from the backend to ensure consistency
            const response = await getalluserapi();
            if (response.data) {
                setUsers(response.data.data);
            }
        } catch (error) {
            console.error('Error re-fetching users:', error);
            toast.error('An error occurred while re-fetching user data.');
        }
    };

    // Handle search input change
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to the first page when searching
    };

    // Filter users based on search query
    const filteredUsers = users.filter(
        (user) =>
            user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle delete user
    const handleDelete = async (id) => {
        try {
            const response = await deleteUserApi(id); // Call delete API

            if (response.status >= 200 && response.status < 300) {
                toast.success('User deleted successfully!');
                // Remove the deleted user from the list
                setUsers((prev) => prev.filter((user) => user._id !== id));
            } else {
                toast.error('Failed to delete user.');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('An error occurred while deleting the user.');
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
        <div className="user-management">
            {/* Header */}
            <div className="header p-4 text-white text-center" style={{ backgroundImage: "linear-gradient(180deg, #083b14, #0d3b17)" }}>
                <Link to={'/admin'} style={{ textDecoration: 'none', color: 'white' }}>
                    <h2 className="mb-0">User Management</h2>
                </Link>
            </div>

            {/* Search Bar */}
            <div className="search-bar-container p-4">
                <div className="input-group search-bar">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name or email"
                        value={searchQuery}
                        onChange={handleSearch}
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
                            <th>Sl.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="p-3">
                        {currentUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td>{(currentPage - 1) * usersPerPage + index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <span
                                        className={`badge ${
                                            user.status === 'Active' ? 'badge-active' : 'badge-inactive'
                                        }`}
                                    >
                                        {user.status || 'Active'}
                                    </span>
                                </td>
                                <td>
                                    <Useredit user={user} updateUserList={updateUserList} /> {/* Pass the update function */}
                                    <button
                                        className="btn btn-delete"
                                        onClick={() => handleDelete(user._id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
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
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button
                                className="page-link"
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                        </li>
                        {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
                            <li
                                key={i + 1}
                                className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                            >
                                <button className="page-link" onClick={() => paginate(i + 1)}>
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                        <li
                            className={`page-item ${
                                currentPage === Math.ceil(filteredUsers.length / usersPerPage) ? 'disabled' : ''
                            }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === Math.ceil(filteredUsers.length / usersPerPage)}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Toast Container for Notifications */}
            <ToastContainer autoClose={2000} theme="colored" position="top-center" />
        </div>
    );
}

export default UserManagement;