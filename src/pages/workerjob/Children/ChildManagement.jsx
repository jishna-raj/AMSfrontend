import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';



function ChildManagement() {
  // Hardcoded single child data
  const child = {
    _id: '1',
    name: 'John Doe',
    age: 5,
    gender: 'Male',
    dateOfBirth: new Date('2018-05-15').toLocaleDateString(),
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    parent: 'Jane Doe',
    healthRecords: [{
      date: new Date('2023-01-10').toLocaleDateString(),
      weight: 18.5,
      height: 110,
      immunizations: ['MMR', 'Varicella'],
      illnesses: []
    }],
    nutritionStatus: {
      date: new Date('2023-01-10').toLocaleDateString(),
      status: 'Normal'
    },
    educationDetails: {
      preschoolName: 'Sunshine Preschool',
      enrollmentDate: new Date('2022-09-01').toLocaleDateString(),
      progress: 'Excellent'
    },
    lastVisitDate: new Date('2023-03-15').toLocaleDateString(),
    vaccinationDetails: [{
      vaccineName: 'Flu Shot',
      dateAdministered: new Date('2023-10-15').toLocaleDateString(),
      administeredBy: 'Dr. Smith',
      notes: 'No side effects'
    }]
  };

  const handleDelete = () => {
    console.log('Delete child:', child._id);
  };

  const handleEdit = () => {
    console.log('Edit child:', child._id);
  };

  return (
    <div className="container p-5 mt-4">
     <div className='d-flex justify-content-between align-items-center'>
        <div>
          <h2 className="mb-4 fw-bold">Child Beneficiary Details</h2>
          <p className='text-center text-secondary mb-5 fw-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, natus itaque aperiam adipisci iusto, dolor suscipit minus labore maiores nam officiis. Repellat est possimus nemo molestiae dolores amet debitis quisquam.</p>
    
        </div>
       <Link to={'/add-childbeneficiary'}>
          <button className="btn mt-3" style={{ marginLeft: '80px' }}>
          <FontAwesomeIcon icon={faPlus} />
          </button>
       </Link>
     </div>

      <div className="row">
        <div className="col-md-5 mb-4">
          <div className="card shadow shadow-sm">
            <div className="card-header1 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{child.name}</h5>
              <div>
              <Link to={'/update-childbeneficiary'}>
                  <button
                    className="btn btn-link text-primary"
                    
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </Link>
                <button
                  className="btn btn-link text-danger"
                  onClick={handleDelete}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>

            <div className="card-body">
              <div className="mb-3">
                <h6 className="text-secondary">Basic Information</h6>
                <p className="mb-1">Age: {child.age}</p>
                <p className="mb-1">Gender: {child.gender}</p>
                <p className="mb-1">DOB: {child.dateOfBirth}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Address</h6>
                <p className="mb-0">{child.address.street}</p>
                <p className="mb-0">{child.address.city}, {child.address.state} {child.address.zipCode}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Parent/Guardian</h6>
                <p className="mb-0">{child.parent}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Education</h6>
                <p className="mb-1">Preschool: {child.educationDetails.preschoolName}</p>
                <p className="mb-1">Enrolled: {child.educationDetails.enrollmentDate}</p>
                <p className="mb-0">Progress: {child.educationDetails.progress}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Health Status</h6>
                <p className="mb-1">Nutrition: {child.nutritionStatus.status}</p>
                <p className="mb-1">Last Visit: {child.lastVisitDate}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Health Records</h6>
                <ul className="list-unstyled">
                  {child.healthRecords.map((record, index) => (
                    <li key={index} className="mb-2">
                      <small>
                        Date: {record.date}<br />
                        Weight: {record.weight}kg, Height: {record.height}cm<br />
                        Immunizations: {record.immunizations.join(', ')}
                      </small>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Vaccinations</h6>
                <ul className="list-unstyled">
                  {child.vaccinationDetails.map((vaccine, index) => (
                    <li key={index} className="mb-2">
                      <small>
                        {vaccine.vaccineName} ({vaccine.dateAdministered})<br />
                        Administered by: {vaccine.administeredBy}<br />
                        Notes: {vaccine.notes}
                      </small>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-1"></div>

        <div className="col-md-5 mb-4">
          <div className="card shadow-sm">
            <div className="card-header1 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{child.name}</h5>
              <div>
              <Link to={'/update-childbeneficiary'}>
                  <button
                    className="btn btn-link text-primary"
                    
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </Link>
                <button
                  className="btn btn-link text-danger"
                  onClick={handleDelete}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>

            <div className="card-body">
              <div className="mb-3">
                <h6 className="text-secondary">Basic Information</h6>
                <p className="mb-1">Age: {child.age}</p>
                <p className="mb-1">Gender: {child.gender}</p>
                <p className="mb-1">DOB: {child.dateOfBirth}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Address</h6>
                <p className="mb-0">{child.address.street}</p>
                <p className="mb-0">{child.address.city}, {child.address.state} {child.address.zipCode}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Parent/Guardian</h6>
                <p className="mb-0">{child.parent}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Education</h6>
                <p className="mb-1">Preschool: {child.educationDetails.preschoolName}</p>
                <p className="mb-1">Enrolled: {child.educationDetails.enrollmentDate}</p>
                <p className="mb-0">Progress: {child.educationDetails.progress}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Health Status</h6>
                <p className="mb-1">Nutrition: {child.nutritionStatus.status}</p>
                <p className="mb-1">Last Visit: {child.lastVisitDate}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Health Records</h6>
                <ul className="list-unstyled">
                  {child.healthRecords.map((record, index) => (
                    <li key={index} className="mb-2">
                      <small>
                        Date: {record.date}<br />
                        Weight: {record.weight}kg, Height: {record.height}cm<br />
                        Immunizations: {record.immunizations.join(', ')}
                      </small>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Vaccinations</h6>
                <ul className="list-unstyled">
                  {child.vaccinationDetails.map((vaccine, index) => (
                    <li key={index} className="mb-2">
                      <small>
                        {vaccine.vaccineName} ({vaccine.dateAdministered})<br />
                        Administered by: {vaccine.administeredBy}<br />
                        Notes: {vaccine.notes}
                      </small>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="row">

        <div className="col-md-5 mb-4">
          <div className="card shadow-sm">
            <div className="card-header1 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{child.name}</h5>
              <div>
              <Link to={'/update-childbeneficiary'}>
                  <button
                    className="btn btn-link text-primary"
                    
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </Link>
                <button
                  className="btn btn-link text-danger"
                  onClick={handleDelete}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>

            <div className="card-body">
              <div className="mb-3">
                <h6 className="text-secondary">Basic Information</h6>
                <p className="mb-1">Age: {child.age}</p>
                <p className="mb-1">Gender: {child.gender}</p>
                <p className="mb-1">DOB: {child.dateOfBirth}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Address</h6>
                <p className="mb-0">{child.address.street}</p>
                <p className="mb-0">{child.address.city}, {child.address.state} {child.address.zipCode}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Parent/Guardian</h6>
                <p className="mb-0">{child.parent}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Education</h6>
                <p className="mb-1">Preschool: {child.educationDetails.preschoolName}</p>
                <p className="mb-1">Enrolled: {child.educationDetails.enrollmentDate}</p>
                <p className="mb-0">Progress: {child.educationDetails.progress}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Health Status</h6>
                <p className="mb-1">Nutrition: {child.nutritionStatus.status}</p>
                <p className="mb-1">Last Visit: {child.lastVisitDate}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Health Records</h6>
                <ul className="list-unstyled">
                  {child.healthRecords.map((record, index) => (
                    <li key={index} className="mb-2">
                      <small>
                        Date: {record.date}<br />
                        Weight: {record.weight}kg, Height: {record.height}cm<br />
                        Immunizations: {record.immunizations.join(', ')}
                      </small>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Vaccinations</h6>
                <ul className="list-unstyled">
                  {child.vaccinationDetails.map((vaccine, index) => (
                    <li key={index} className="mb-2">
                      <small>
                        {vaccine.vaccineName} ({vaccine.dateAdministered})<br />
                        Administered by: {vaccine.administeredBy}<br />
                        Notes: {vaccine.notes}
                      </small>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-1"></div>

        <div className="col-md-5 mb-4">
          <div className="card shadow-sm">
            <div className="card-header1 d-flex justify-content-between align-items-center">
              <h5 className="mb-0">{child.name}</h5>
              <div>
                <Link to={'/update-childbeneficiary'}>
                  <button
                    className="btn btn-link text-primary"
                    
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </Link>
                <button
                  className="btn btn-link text-danger"
                  onClick={handleDelete}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>

            <div className="card-body">
              <div className="mb-3">
                <h6 className="text-secondary">Basic Information</h6>
                <p className="mb-1">Age: {child.age}</p>
                <p className="mb-1">Gender: {child.gender}</p>
                <p className="mb-1">DOB: {child.dateOfBirth}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Address</h6>
                <p className="mb-0">{child.address.street}</p>
                <p className="mb-0">{child.address.city}, {child.address.state} {child.address.zipCode}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Parent/Guardian</h6>
                <p className="mb-0">{child.parent}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Education</h6>
                <p className="mb-1">Preschool: {child.educationDetails.preschoolName}</p>
                <p className="mb-1">Enrolled: {child.educationDetails.enrollmentDate}</p>
                <p className="mb-0">Progress: {child.educationDetails.progress}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Health Status</h6>
                <p className="mb-1">Nutrition: {child.nutritionStatus.status}</p>
                <p className="mb-1">Last Visit: {child.lastVisitDate}</p>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Health Records</h6>
                <ul className="list-unstyled">
                  {child.healthRecords.map((record, index) => (
                    <li key={index} className="mb-2">
                      <small>
                        Date: {record.date}<br />
                        Weight: {record.weight}kg, Height: {record.height}cm<br />
                        Immunizations: {record.immunizations.join(', ')}
                      </small>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-3">
                <h6 className="text-secondary">Vaccinations</h6>
                <ul className="list-unstyled">
                  {child.vaccinationDetails.map((vaccine, index) => (
                    <li key={index} className="mb-2">
                      <small>
                        {vaccine.vaccineName} ({vaccine.dateAdministered})<br />
                        Administered by: {vaccine.administeredBy}<br />
                        Notes: {vaccine.notes}
                      </small>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default ChildManagement;