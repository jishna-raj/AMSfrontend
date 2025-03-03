import React from 'react';
import { Outlet } from 'react-router-dom';
import AdHeader from '../components/Admin/AdHeader'
import Sidebar from '../components/Admin/Sidebar';
import Dashboard from '../components/Admin/Dashboard';


function AdminLayout() {
    return (
        <div className="admin-layout">
            <AdHeader />
            <div className="d-flex">
                <Sidebar />
                <div className="content p-4">
                 
                    <Dashboard/>
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;