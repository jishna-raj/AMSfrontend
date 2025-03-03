import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faUserShield,
  faBox,
  faTasks,
  faBell,
  faHistory,
} from '@fortawesome/free-solid-svg-icons';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import './Dashboard'
import { Row } from 'react-bootstrap';


function Dashboard() {
  // Data for charts
  const beneficiaryData = [
    { name: 'Jan', count: 100 },
    { name: 'Feb', count: 150 },
    { name: 'Mar', count: 200 },
    { name: 'Apr', count: 250 },
    { name: 'May', count: 300 },
    { name: 'Jun', count: 350 },
  ];

  const inventoryData = [
    { name: 'Rice', value: 400 },
    { name: 'Wheat', value: 300 },
    { name: 'Oil', value: 200 },
    { name: 'Pulses', value: 100 },
  ];

  const taskData = [
    { name: 'Task 1', progress: 80 },
    { name: 'Task 2', progress: 50 },
    { name: 'Task 3', progress: 30 },
    { name: 'Task 4', progress: 90 },
  ];

  const activityData = [
    { id: 1, activity: 'New beneficiary added', time: '2 hours ago' },
    { id: 2, activity: 'Inventory updated', time: '5 hours ago' },
    { id: 3, activity: 'Task completed', time: '1 day ago' },
    { id: 4, activity: 'Report generated', time: '2 days ago' },
  ];

  const COLORS = ['#28a745', '#218838', '#1e7e34', '#19692c'];

  return (
    <div className="dashboard p-4" style={{marginLeft:'80px'}}>
      <h2 className="mb-4">Dashboard</h2>

      {/* Cards Section */}
      <Row className="mb-4">
        <div className="col-md-3">
          <div className="card bg-success text-white p-3 text-center">
            <FontAwesomeIcon icon={faUsers} size="2x" className="mb-2" />
            <h5>Total Beneficiaries</h5>
            <p className="display-4">500</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white p-3 text-center">
            <FontAwesomeIcon icon={faUserShield} size="2x" className="mb-2" />
            <h5>Total Workers</h5>
            <p className="display-4">20</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white p-3 text-center">
            <FontAwesomeIcon icon={faBox} size="2x" className="mb-2" />
            <h5>Low Stock Items</h5>
            <p className="display-4">5</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white p-3 text-center">
            <FontAwesomeIcon icon={faTasks} size="2x" className="mb-2" />
            <h5>Pending Tasks</h5>
            <p className="display-4">10</p>
          </div>
        </div>
      </Row>

      {/* Charts Section */}
      <Row className="mb-4">
        <div className="col-md-7">
          <div className="card p-3">
            <h5>Beneficiary Gth</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={beneficiaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#28a745" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Inventory Distribution</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={inventoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#28a745"
                  label
                >
                  {inventoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Row>

      {/* Tasks Overview Section */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card p-3">
            <h5>Tasks Overview</h5>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={taskData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="progress" stroke="#28a745" fill="#28a745" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activities Section */}
        <div className="col-md-5">
          <div className="card p-3">
            <h5>Recent Activities</h5>
            <ul className="list-unstyled">
              {activityData.map((activity) => (
                <li key={activity.id} className="mb-3">
                  <div className="d-flex justify-content-between">
                    <span>{activity.activity}</span>
                    <small className="text-muted">{activity.time}</small>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="">
        <div className="col-md-12">
          <div className="card p-3">
            <h5>
              <FontAwesomeIcon icon={faBell} className="me-2" />
              Notifications
            </h5>
            <ul className="list-unstyled">
              <li className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>New beneficiary registration request</span>
                  <small className="text-muted">1 hour ago</small>
                </div>
              </li>
              <li className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Low stock alert for Rice</span>
                  <small className="text-muted">3 hours ago</small>
                </div>
              </li>
              <li className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Task deadline approaching</span>
                  <small className="text-muted">1 day ago</small>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;