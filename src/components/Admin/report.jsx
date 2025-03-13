import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Form } from 'react-bootstrap';
import {
  getalluserapi,
  getallchildApi,
  getAllinventoryApi,
  allWorkerApi,
  getallchildbeneficiaryApi,
  getallmotherApi,
  getAllpregnantApi,
} from '../../services/allapi'

function Report() {
  const [users, setUsers] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [staff, setStaff] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [healthHistory, setHealthHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch users
        const usersResponse = await getalluserapi();
      /*   console.log(usersResponse); */
        if (usersResponse.status >= 200 && usersResponse.status < 300) {
          setUsers(usersResponse.data.data);
        }

        // Fetch beneficiaries (child beneficiaries)
        const beneficiariesResponse = await getallchildbeneficiaryApi();
        console.log(beneficiariesResponse);
        if (beneficiariesResponse.status >= 200 && beneficiariesResponse.status < 300) {
          setBeneficiaries(beneficiariesResponse.data.data);
        }

        // Fetch inventory
        const inventoryResponse = await getAllinventoryApi();
        console.log(inventoryResponse);
        if (inventoryResponse.status >= 200 && inventoryResponse.status < 300) {
          setInventory(inventoryResponse.data);
        }

        // Fetch staff (workers)
        const staffResponse = await allWorkerApi();
        console.log(staffResponse);
        if (staffResponse.status >= 200 && staffResponse.status < 300) {
          setStaff(staffResponse.data.workers);
        }

        // Fetch vaccinations (from child beneficiaries)
        const vaccinationsResponse = await getallchildbeneficiaryApi();
        console.log(vaccinationsResponse);
        if (vaccinationsResponse.status >= 200 && vaccinationsResponse.status < 300) {
          const allVaccinations = vaccinationsResponse.data.data.flatMap((child) =>
            child.vaccinationDetails.map((vaccine) => ({
              id: child._id,
              beneficiary: child.name,
              vaccine: vaccine.vaccineName,
              date: vaccine.dateAdministered,
            }))
          );
          setVaccinations(allVaccinations);
        }

        // Fetch health history (from child beneficiaries)
        const healthHistoryResponse = await getallchildbeneficiaryApi();
        console.log(healthHistoryResponse);
        if (healthHistoryResponse.status >= 200 && healthHistoryResponse.status < 300) {
          const allHealthHistory = healthHistoryResponse.data.data.flatMap((child) =>
            child.healthRecords.map((record) => ({
              id: child._id,
              beneficiary: child.name,
              condition: record.illnesses.join(', '),
              date: record.date,
            }))
          );
          setHealthHistory(allHealthHistory);
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

  if (loading) {
    return <div className="text-center mt-4">Loading reports...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-danger">{error}</div>;
  }

  return (
    <div className="report-container">
      <h2 className="text-center mb-4 text-success fw-bold">Generate Reports</h2>

      {/* Filter Section */}
      <Card className="mb-4 shadow-sm border-0">
        <Card.Body className="p-4">
          <h5 className="mb-4 text-secondary fw-bold">Filter Reports</h5>
          <Form>
            <div className="row g-3">
              <div className="col-md-3">
                <Form.Group>
                  <Form.Label className="text-muted">Report Type</Form.Label>
                  <Form.Select className="rounded-pill">
                    <option value="users">Users</option>
                    <option value="beneficiaries">Beneficiaries</option>
                    <option value="inventory">Inventory</option>
                    <option value="staff">Staff</option>
                    <option value="vaccinations">Vaccinations</option>
                    <option value="healthHistory">Health History</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-3">
                <Form.Group>
                  <Form.Label className="text-muted">Start Date</Form.Label>
                  <Form.Control type="date" className="rounded-pill" />
                </Form.Group>
              </div>
              <div className="col-md-3">
                <Form.Group>
                  <Form.Label className="text-muted">End Date</Form.Label>
                  <Form.Control type="date" className="rounded-pill" />
                </Form.Group>
              </div>
              <div className="col-md-3 d-flex align-items-end">
                <button className="w-100 rounded-pill py-2 butt text-light fw-bold">
                  Generate Report
                </button>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Users Report */}
      <Card className="mb-4 shadow-sm border-0">
        <Card.Body className="p-4">
          <h5 className="mb-4 text-secondary fw-bold">Users Report</h5>
          <Table striped bordered hover className="rounded">
            <thead className="bg-primary text-white">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Beneficiaries Report */}
      <Card className="mb-4 shadow-sm border-0">
        <Card.Body className="p-4">
          <h5 className="mb-4 text-secondary fw-bold">Beneficiaries Report</h5>
          <Table striped bordered hover className="rounded">
            <thead className="bg-primary text-white">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {beneficiaries.map((beneficiary) => (
                <tr key={beneficiary._id}>
                  <td>{beneficiary._id}</td>
                  <td>{beneficiary.name}</td>
                  <td>{beneficiary.age}</td>
                  <td>{beneficiary.gender}</td>
                  <td>{beneficiary.currentStatus}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Inventory Report */}
      <Card className="mb-4 shadow-sm border-0">
        <Card.Body className="p-4">
          <h5 className="mb-4 text-secondary fw-bold">Inventory Report</h5>
          <Table striped bordered hover className="rounded">
            <thead className="bg-primary text-white">
              <tr>
                <th>ID</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.supplier}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Staff Report */}
      <Card className="mb-4 shadow-sm border-0">
        <Card.Body className="p-4">
          <h5 className="mb-4 text-secondary fw-bold">Staff Report</h5>
          <Table striped bordered hover className="rounded">
            <thead className="bg-primary text-white">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((staffMember) => (
                <tr key={staffMember._id}>
                  <td>{staffMember._id}</td>
                  <td>{staffMember.username}</td>
                  <td>{staffMember.role}</td>
                  <td>{staffMember.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Vaccinations Report */}
      <Card className="mb-4 shadow-sm border-0">
        <Card.Body className="p-4">
          <h5 className="mb-4 text-secondary fw-bold">Vaccinations Report</h5>
          <Table striped bordered hover className="rounded">
            <thead className="bg-primary text-white">
              <tr>
                <th>ID</th>
                <th>Beneficiary</th>
                <th>Vaccine</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {vaccinations.map((vaccination, index) => (
                <tr key={index}>
                  <td>{vaccination.id}</td>
                  <td>{vaccination.beneficiary}</td>
                  <td>{vaccination.vaccine}</td>
                  <td>{new Date(vaccination.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Health History Report */}
      <Card className="mb-4 shadow-sm border-0">
        <Card.Body className="p-4">
          <h5 className="mb-4 text-secondary fw-bold">Health History Report</h5>
          <Table striped bordered hover className="rounded">
            <thead className="bg-primary text-white">
              <tr>
                <th>ID</th>
                <th>Beneficiary</th>
                <th>Condition</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {healthHistory.map((history, index) => (
                <tr key={index}>
                  <td>{history.id}</td>
                  <td>{history.beneficiary}</td>
                  <td>{history.condition}</td>
                  <td>{new Date(history.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Report;