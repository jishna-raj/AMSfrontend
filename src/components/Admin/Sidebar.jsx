import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faUserFriends,
  faBoxOpen,
  faChartLine,
  faClipboardUser,
  faChildren,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';



function Sidebar() {
  return (
    <div className="sidebar bg-success text-white p-4" style={{ width: '200px', minHeight: '240vh' }}>
      <h4 className="text-center mb-4">AMS Admin</h4>
      <ul className="list-unstyled">
        <li className="mb-3">
          <Link to="/users" className="text-white text-decoration-none sidebar-link">
            <FontAwesomeIcon icon={faUsers} className="me-2" />
            User Management
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/admin-beneficiary" className="text-white text-decoration-none sidebar-link">
            <FontAwesomeIcon icon={faUserFriends} className="me-2" />
            Beneficiary Management
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/display-child" className="text-white text-decoration-none sidebar-link">
          <FontAwesomeIcon icon={faChildren} style={{color: "#f1f2f3",}} className='me-2' />
            Child Management
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/inventory" className="text-white text-decoration-none sidebar-link">
            <FontAwesomeIcon icon={faBoxOpen} className="me-2" />
            Inventory Management
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/staff" className="text-white text-decoration-none sidebar-link">
          <FontAwesomeIcon icon={faClipboardUser} className='me-2'/>
            Staff Management
          </Link>
        </li>

        <li className="mb-3">
          <Link to="/complaints" className="text-white text-decoration-none sidebar-link">
          <FontAwesomeIcon icon={faCircleExclamation} style={{color: "#f4f5f5",}} className='me-2' />
            Complaints
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/reports" className="text-white text-decoration-none sidebar-link">
            <FontAwesomeIcon icon={faChartLine} className="me-2" />
            Reports
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;