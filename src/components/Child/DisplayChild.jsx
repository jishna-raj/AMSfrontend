import React from 'react';
import { faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';




function DisplayChild() {
  
  const children = [
    {
      id: "12345",
      name: "Rahul Sharma",
      age: 5,
      gender: "Male",
      dateOfBirth: "2018-03-15",
      address: {
        street: "123 Gandhi Road",
        city: "Mumbai",
        state: "Maharashtra",
        zipCode: "400001",
      },
      healthRecords: [
        {
          date: "2023-01-10",
          weight: 18.5,
          height: 105,
          immunizations: ["Polio", "BCG"],
          illnesses: ["Common Cold"],
        },
      ],
      nutritionStatus: {
        date: "2023-07-01",
        status: "Normal",
      },
      educationDetails: {
        preschoolName: "Little Stars Preschool",
        enrollmentDate: "2022-09-01",
        progress: "Good",
      },
    },
    {
      id: "67890",
      name: "Priya Patel",
      age: 4,
      gender: "Female",
      dateOfBirth: "2019-05-20",
      address: {
        street: "456 Nehru Road",
        city: "Delhi",
        state: "Delhi",
        zipCode: "110001",
      },
      healthRecords: [
        {
          date: "2023-02-15",
          weight: 17.0,
          height: 102,
          immunizations: ["MMR"],
          illnesses: [],
        },
      ],
      nutritionStatus: {
        date: "2023-07-01",
        status: "Underweight",
      },
      educationDetails: {
        preschoolName: "Tiny Tots Preschool",
        enrollmentDate: "2022-11-01",
        progress: "Average",
      },
    },
  ];

  return (
    <>
      <div className="invent">
        <div
          className="p-2 text-light d-flex justify-content-between align-items-center"
          style={{ backgroundImage: "linear-gradient(180deg, #083b14, #0a551a)" }}
        >
          <Link to={'/admin'} style={{ textDecoration: 'none', color: 'white' }}>
            <h2 className="ms-3 fw-bold">Child Management</h2>
          </Link>
          
          <Link to={'/add-child'}><FontAwesomeIcon icon={faPlus} beat style={{color: "#edf1f7",}} className='me-5' /></Link>
        </div>

        <div className="row w-100">
          {children.map((child, index) => (
            <div className="col-md-3 ms-4 mt-4" key={index}>
              <div className="card-container1 shadow">
                <div className="card custom-card">
                  <div className="card-header1">
                   <Link to={'/child'} style={{textDecoration:"none",color:"green"}}> <h5 className="card-title fw-bold">{child.name}</h5></Link>
                  </div>
                  <div className="card-body">
                    <div className="card-item">
                      <span className="item-label">Age:</span>
                      <span className="item-value">{child.age}</span>
                    </div>
                    <div className="card-item">
                      <span className="item-label">Gender:</span>
                      <span className="item-value">{child.gender}</span>
                    </div>
                    <div className="card-item">
                      <span className="item-label">Date of Birth:</span>
                      <span className="item-value">{child.dateOfBirth}</span>
                    </div>
                    <div className="card-item">
                      <span className="item-label">Address:</span>
                      <span className="item-value">
                        {child.address.street}, {child.address.city}, {child.address.state}, {child.address.zipCode}
                      </span>
                    </div>
                  </div>
                  <div className="card-footer">
                    <Link to={'/update-child'}>
                        <button className="btn btn-sm">
                        <FontAwesomeIcon icon={faPenToSquare} style={{color: "green",}} />
                        </button>
                    </Link>
                    <button className="btn btn-sm">
                      <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-4 m-5">
          <div className="col-md-11">
            <h4>Health Alerts</h4>
            <div className="alert alert-warning">
              Rahul Sharma (Age: 5) is due for a Polio booster shot.
            </div>
            <div className="alert alert-danger">
              Priya Patel (Age: 4) is underweight. Please monitor nutrition.
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </>
  );
}

export default DisplayChild;