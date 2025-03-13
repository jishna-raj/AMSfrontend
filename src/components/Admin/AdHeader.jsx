import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    
    const userData = sessionStorage.getItem('userData'); 
    const parsedUserData = userData ? JSON.parse(userData) : null; 
    const adminName = parsedUserData ? parsedUserData.username : 'Admin'; 
    

    // Logout function
    const handleLogout = () => {
        // Clear all data from sessionStorage
        sessionStorage.clear();

        // Redirect to the login page
        navigate('/admin-log'); // Adjust the path as needed
    };

    return (
        <header className="text-white p-4 d-flex justify-content-between align-items-center sidebar1">
            <h3 className="mb-0">Anganwadi Management System</h3>
            <div>
                {/* Display the admin name */}
                <span className="me-3 fw-bold">Welcome, {adminName}</span>
                {/* Logout button */}
                <button 
                    className="btn btn-outline-light btn-sm" 
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Header;