import React from 'react';

function Header() {
    return (
        <header className=" text-white p-4 d-flex justify-content-between align-items-center sidebar1">
            <h3 className="mb-0">Anganwadi Management System</h3>
            <div>
                <span className="me-3 fw-bold">Welcome, Admin Name</span>
                <button className="btn btn-outline-light btn-sm">Logout</button>
            </div>
        </header>
    );
}

export default Header;