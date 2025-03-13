import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faUserShield,
  faBox,
  faTasks,
  faBell,
  faChild,
  faVenusMars,
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
  AreaChart,
  Area,
} from 'recharts';
import { Row, Col } from 'react-bootstrap';
import {
  getallchildbeneficiaryApi,
  allWorkerApi,
  getAllinventoryApi,
} from '../../services/allapi'; // Import your API functions

function Dashboard() {
  const [ageDistributionData, setAgeDistributionData] = useState([]);
  const [genderDistributionData, setGenderDistributionData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [totalBeneficiaries, setTotalBeneficiaries] = useState(0);
  const [totalWorkers, setTotalWorkers] = useState(0);
  const [lowStockItems, setLowStockItems] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch beneficiaries data (child beneficiaries)
        const beneficiariesResponse = await getallchildbeneficiaryApi();
        console.log('Beneficiaries Response:', beneficiariesResponse);

        if (beneficiariesResponse.status >= 200 && beneficiariesResponse.status < 300) {
          const beneficiaries = beneficiariesResponse.data?.data || beneficiariesResponse.data;

          if (beneficiaries && Array.isArray(beneficiaries)) {
            setTotalBeneficiaries(beneficiaries.length);

            // Prepare age distribution data
            const ageGroups = {
              '0-5': 0,
              '6-10': 0,
              '11-15': 0,
              '16+': 0,
            };

            beneficiaries.forEach((beneficiary) => {
              const age = beneficiary.age;
              if (age >= 0 && age <= 5) {
                ageGroups['0-5']++;
              } else if (age >= 6 && age <= 10) {
                ageGroups['6-10']++;
              } else if (age >= 11 && age <= 15) {
                ageGroups['11-15']++;
              } else {
                ageGroups['16+']++;
              }
            });

            const formattedAgeData = Object.keys(ageGroups).map((group) => ({
              name: group,
              count: ageGroups[group],
            }));
            setAgeDistributionData(formattedAgeData);

            // Prepare gender distribution data
            const genderGroups = {
              Male: 0,
              Female: 0,
              Other: 0,
            };

            beneficiaries.forEach((beneficiary) => {
              const gender = beneficiary.gender;
              if (gender === 'Male') {
                genderGroups.Male++;
              } else if (gender === 'Female') {
                genderGroups.Female++;
              } else {
                genderGroups.Other++;
              }
            });

            const formattedGenderData = Object.keys(genderGroups).map((gender) => ({
              name: gender,
              count: genderGroups[gender],
            }));
            setGenderDistributionData(formattedGenderData);
          } else {
            console.error('Beneficiaries data is not an array:', beneficiaries);
          }
        }

        // Fetch workers data
        const workersResponse = await allWorkerApi();
        console.log('Workers Response:', workersResponse);

        if (workersResponse.status >= 200 && workersResponse.status < 300) {
          const workers = workersResponse.data?.workers || workersResponse.data;
          if (workers && Array.isArray(workers)) {
            setTotalWorkers(workers.length);
          } else {
            console.error('Workers data is not an array:', workers);
          }
        }

        // Fetch inventory data
        const inventoryResponse = await getAllinventoryApi();
        console.log('Inventory Response:', inventoryResponse);

        if (inventoryResponse.status >= 200 && inventoryResponse.status < 300) {
          const inventory = inventoryResponse.data?.data || inventoryResponse.data;
          if (inventory && Array.isArray(inventory)) {
            const lowStock = inventory.filter((item) => item.quantity < item.minimumThreshold).length;
            setLowStockItems(lowStock);

            // Prepare inventory distribution data
            const distributionData = inventory.map((item) => ({
              name: item.itemName,
              value: item.quantity,
            }));
            setInventoryData(distributionData);
          } else {
            console.error('Inventory data is not an array:', inventory);
          }
        }

        // Fetch tasks data (mock data for now)
        const tasks = [
          { name: 'Task 1', progress: 80 },
          { name: 'Task 2', progress: 50 },
          { name: 'Task 3', progress: 30 },
          { name: 'Task 4', progress: 90 },
        ];
        setTaskData(tasks);
        setPendingTasks(tasks.filter((task) => task.progress < 100).length);

        // Fetch activity data (mock data for now)
        const activities = [
          { id: 1, activity: 'New beneficiary added', time: '2 hours ago' },
          { id: 2, activity: 'Inventory updated', time: '5 hours ago' },
          { id: 3, activity: 'Task completed', time: '1 day ago' },
          { id: 4, activity: 'Report generated', time: '2 days ago' },
        ];
        setActivityData(activities);
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const COLORS = ['#28a745', '#218838', '#1e7e34', '#19692c'];

  if (loading) {
    return <div className="text-center mt-4">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-danger">{error}</div>;
  }

  return (
    <div className="dashboard" style={{ marginLeft: '100px' }}>
      <h2 className="mb-4">Dashboard</h2>

      {/* Cards Section */}
      <div className="row mb-4 w-100">
        <div className="col-md-3">
          <div className="card bg-success text-white p-3 text-center">
            <FontAwesomeIcon icon={faUsers} size="2x" className="mb-2" />
            <h5>Total Beneficiaries</h5>
            <p className="text-dark fw-bold fs-5">{totalBeneficiaries}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white p-3 text-center">
            <FontAwesomeIcon icon={faUserShield} size="2x" className="mb-2" />
            <h5>Total Workers</h5>
            <p className="text-dark fw-bold fs-5">{totalWorkers}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white p-3 text-center">
            <FontAwesomeIcon icon={faBox} size="2x" className="mb-2" />
            <h5>Low Stock Items</h5>
            <p className="text-dark fw-bold fs-5">{lowStockItems}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white text-center">
            <FontAwesomeIcon icon={faTasks} size="2x" className="mb-2" />
            <h5>Pending Tasks</h5>
            <p className="text-dark fw-bold fs-5">{pendingTasks}</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <Row className="mb-4">
        <Col md={7}>
          <div className="card p-3">
            <h5>Beneficiary Age Distribution</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#28a745" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Col>
        <Col md={4}>
          <div className="card p-3">
            <h5>Beneficiary Gender Distribution</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderDistributionData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#28a745"
                  label
                >
                  {genderDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Col>
      </Row>

      {/* Tasks Overview Section */}
      <Row className="mb-4">
        <Col md={6}>
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
        </Col>

        {/* Recent Activities Section */}
        <Col md={5}>
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
        </Col>
      </Row>

      {/* Notifications Section */}
      <Row>
        <Col md={12}>
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
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;