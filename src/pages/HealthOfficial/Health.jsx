import React from 'react';
import './Health.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


function Health() {
  // Sample data (replace with actual data)
  const beneficiaries = [
    {
      id: 1,
      name: "Rahul Sharma",
      age: 5,
      gender: "Male",
      type: "Child",
      lastUpdate: "2023-10-15",
      status: "Active",
      additionalInfo: "Enrolled in Anganwadi center since 2021.",
    },
    {
      id: 2,
      name: "Priya Patel",
      age: 25,
      gender: "Female",
      type: "Pregnant Woman",
      lastUpdate: "2023-10-10",
      status: "Active",
      additionalInfo: "Due date: 2024-02-15.",
    },
    {
      id: 3,
      name: "Neha Singh",
      age: 28,
      gender: "Female",
      type: "Lactating Mother",
      lastUpdate: "2023-09-30",
      status: "Inactive",
      additionalInfo: "Child: Aryan Singh, Age: 6 months.",
    },
  ];

  const childrenInDaycare = [
    {
      id: 1,
      name: "Rahul Sharma",
      age: 5,
      gender: "Male",
      attendance: "Present",
      immunity: "Healthy",
      healthStatus: "Normal",
      vaccinations: [
        { name: "Polio", date: "2023-01-10", completed: true },
        { name: "BCG", date: "2023-02-15", completed: true },
        { name: "MMR", date: "2023-06-20", completed: false },
      ],
    },
    {
      id: 2,
      name: "Priya Patel",
      age: 4,
      gender: "Female",
      attendance: "Absent",
      immunity: "Overweight",
      healthStatus: "Needs Attention",
      vaccinations: [
        { name: "Polio", date: "2023-01-10", completed: true },
        { name: "BCG", date: "2023-02-15", completed: true },
        { name: "MMR", date: "2023-06-20", completed: true },
      ],
    },
    {
      id: 3,
      name: "Aryan Singh",
      age: 6,
      gender: "Male",
      attendance: "Present",
      immunity: "Underweight",
      healthStatus: "Critical",
      vaccinations: [
        { name: "Polio", date: "2023-01-10", completed: true },
        { name: "BCG", date: "2023-02-15", completed: false },
        { name: "MMR", date: "2023-06-20", completed: false },
      ],
    },
  ];

  const inventories = [
    { id: 1, item: "Milk", quantity: 50, unit: "Liters", expiryDate: "2023-12-01" },
    { id: 2, item: "Rice", quantity: 100, unit: "Kg", expiryDate: "2024-01-15" },
    { id: 3, item: "Biscuits", quantity: 200, unit: "Packs", expiryDate: "2023-11-30" },
  ];

  return (
    <div className="health-dashboard">
      <div className='d-flex justify-content-between align-items-center'>
        <h1>Health Dashboard</h1>
        <Link to={'/add-complaint'}>
            <button className='btn btn-success'>
                complaints<FontAwesomeIcon icon={faComments} style={{color: "#fafcff",}} className='ms-1' />
            </button>
        </Link>
        
        </div>
     

      {/* Beneficiaries Section */}
      <div className="section">
        <h2>Beneficiaries</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Type</th>
                <th>Last Update</th>
                <th>Status</th>
                <th>Additional Info</th>
              </tr>
            </thead>
            <tbody>
              {beneficiaries.map((beneficiary) => (
                <tr key={beneficiary.id}>
                  <td>{beneficiary.id}</td>
                  <td>{beneficiary.name}</td>
                  <td>{beneficiary.age}</td>
                  <td>{beneficiary.gender}</td>
                  <td>{beneficiary.type}</td>
                  <td>{beneficiary.lastUpdate}</td>
                  <td>
                    <span className={`status ${beneficiary.status.toLowerCase()}`}>
                      {beneficiary.status}
                    </span>
                  </td>
                  <td>{beneficiary.additionalInfo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Children in Daycare Section */}
      <div className="section">
        <h2>Children in Daycare</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Attendance</th>
                <th>Immunity</th>
                <th>Health Status</th>
                <th>Vaccinations</th>
              </tr>
            </thead>
            <tbody>
              {childrenInDaycare.map((child) => (
                <tr key={child.id}>
                  <td>{child.id}</td>
                  <td>{child.name}</td>
                  <td>{child.age}</td>
                  <td>{child.gender}</td>
                  <td>
                    <span className={`attendance ${child.attendance.toLowerCase()}`}>
                      {child.attendance}
                    </span>
                  </td>
                  <td>
                    <span className={`immunity ${child.immunity.toLowerCase()}`}>
                      {child.immunity}
                    </span>
                  </td>
                  <td>
                    <span className={`health-status ${child.healthStatus.toLowerCase().replace(' ', '-')}`}>
                      {child.healthStatus}
                    </span>
                  </td>
                  <td>
                    <ul className="vaccination-list">
                      {child.vaccinations.map((vaccination, index) => (
                        <li key={index}>
                          {vaccination.name} - {vaccination.date}{' '}
                          <span className={`vaccination-status ${vaccination.completed ? 'completed' : 'pending'}`}>
                            {vaccination.completed ? '✅' : '❌'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inventories Section */}
      <div className="section">
        <h2>Daycare Inventories</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {inventories.map((inventory) => (
                <tr key={inventory.id}>
                  <td>{inventory.id}</td>
                  <td>{inventory.item}</td>
                  <td>{inventory.quantity}</td>
                  <td>{inventory.unit}</td>
                  <td>{inventory.expiryDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Health;