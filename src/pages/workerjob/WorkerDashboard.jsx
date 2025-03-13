import React, { useState, useEffect } from 'react';
import './WorkerDashboard.css';
import { Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  getallchildApi,
  getallchildbeneficiaryApi,
  getallmotherApi,
  getAllpregnantApi,
  getAllinventoryApi,
} from '../../services/allapi'; // Import your API functions

function WorkerDashboard() {
  const [childrenData, setChildrenData] = useState({ total: 0 });
  const [beneficiariesData, setBeneficiariesData] = useState({
    childBeneficiaries: 0,
    lactatingMothers: 0,
    pregnantWomen: 0,
  });
  const [inventoryData, setInventoryData] = useState({ totalItems: 0, lowStock: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Hook for navigation

  // Fetch all data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch children data
        const childrenResponse = await getallchildApi();
        console.log(childrenResponse);

        if (childrenResponse.status >= 200 && childrenResponse.status < 300) {
          const children = childrenResponse.data?.children || childrenResponse.data;
          if (children && Array.isArray(children)) {
            setChildrenData({
              total: children.length,
            });
          }
        }

        // Fetch child beneficiaries data
        const childBeneficiariesResponse = await getallchildbeneficiaryApi();
        if (childBeneficiariesResponse.status >= 200 && childBeneficiariesResponse.status < 300) {
          const childBeneficiaries = childBeneficiariesResponse.data?.data || childBeneficiariesResponse.data;
          if (childBeneficiaries && Array.isArray(childBeneficiaries)) {
            setBeneficiariesData((prev) => ({
              ...prev,
              childBeneficiaries: childBeneficiaries.length,
            }));
          }
        }

        // Fetch lactating mothers data
        const lactatingMothersResponse = await getallmotherApi();
        if (lactatingMothersResponse.status >= 200 && lactatingMothersResponse.status < 300) {
          const lactatingMothers = lactatingMothersResponse.data?.data || lactatingMothersResponse.data;
          if (lactatingMothers && Array.isArray(lactatingMothers)) {
            setBeneficiariesData((prev) => ({
              ...prev,
              lactatingMothers: lactatingMothers.length,
            }));
          }
        }

        // Fetch pregnant women data
        const pregnantWomenResponse = await getAllpregnantApi();
        if (pregnantWomenResponse.status >= 200 && pregnantWomenResponse.status < 300) {
          const pregnantWomen = pregnantWomenResponse.data?.data || pregnantWomenResponse.data;
          if (pregnantWomen && Array.isArray(pregnantWomen)) {
            setBeneficiariesData((prev) => ({
              ...prev,
              pregnantWomen: pregnantWomen.length,
            }));
          }
        }

        // Fetch inventory data
        const inventoryResponse = await getAllinventoryApi();
        if (inventoryResponse.status >= 200 && inventoryResponse.status < 300) {
          const inventory = inventoryResponse.data?.data || inventoryResponse.data;
          if (inventory && Array.isArray(inventory)) {
            setInventoryData({
              totalItems: inventory.length,
              lowStock: inventory.filter((item) => item.quantity < item.minimumThreshold).length,
            });
          }
        }
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Logout function
  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();

    // Redirect to the home page
    navigate('/');
  };

  if (loading) {
    return <div className="text-center mt-4">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-danger">{error}</div>;
  }

  return (
    <div className="worker-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Worker Dashboard</h1>
        <button className="btn btn-outline-success" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="dashboard-container">
        <Row>
          {/* Children Card */}
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <div className="dashboard-card children-card">
              <h2>Children</h2>
              <p>Total: {childrenData.total}</p>
              <Link to={'/display-child'}>
                <button className="view-button">View Details</button>
              </Link>
            </div>
          </div>

          {/* Beneficiaries Card */}
          <div className="col-md-5">
            <div className="dashboard-card beneficiaries-card">
              <h2>Beneficiaries</h2>
              <p>Child Beneficiaries: {beneficiariesData.childBeneficiaries}</p>
              <p>Lactating Mothers: {beneficiariesData.lactatingMothers}</p>
              <p>Pregnant Women: {beneficiariesData.pregnantWomen}</p>
              <Link to={'/worker-beneficiary'}>
                <button className="view-button">View Details</button>
              </Link>
            </div>
          </div>

          {/* Inventories Card */}
          <div className="col-md-1"></div>
          <div className="col-md-5">
            <div className="dashboard-card inventories-card">
              <h2>Inventories</h2>
              <p>Total Items: {inventoryData.totalItems}</p>
              <p>Low Stock: {inventoryData.lowStock}</p>
              <Link to={'/inventory'}>
                <button className="view-button">View Details</button>
              </Link>
            </div>
          </div>
        </Row>
      </div>
    </div>
  );
}

export default WorkerDashboard;