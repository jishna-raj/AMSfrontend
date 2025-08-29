import React, { useEffect, useState } from 'react';
import './health.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import {
  getallchildApi,
  getallchildbeneficiaryApi,
  getallmotherApi,
  getAllpregnantApi,
  getAllinventoryApi,
} from '../../services/allapi'; // Import your API functions
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // For PDF table formatting
import * as XLSX from 'xlsx'; // For Excel export

function Health() {
  const [children, setChildren] = useState([]);
  const [childBeneficiaries, setChildBeneficiaries] = useState([]);
  const [mothers, setMothers] = useState([]);
  const [pregnantWomen, setPregnantWomen] = useState([]);
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    // Fetch all data on component mount
    const fetchData = async () => {
      try {
        const childrenData = await getallchildApi();
        setChildren(childrenData.data.children || []);

        const childBeneficiariesData = await getallchildbeneficiaryApi();
        setChildBeneficiaries(childBeneficiariesData.data.data || []);

        const mothersData = await getallmotherApi();
        setMothers(mothersData.data.data || []);

        const pregnantWomenData = await getAllpregnantApi();
        setPregnantWomen(pregnantWomenData.data.data || []);

        const inventoriesData = await getAllinventoryApi();
        setInventories(inventoriesData.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

 

  // Function to export table as Excel
  const exportToExcel = (tableId, fileName) => {
    const table = document.getElementById(tableId);
    if (table) {
      const workbook = XLSX.utils.table_to_book(table);
      XLSX.writeFile(workbook, `${fileName}.xlsx`);
    } else {
      console.error(`Table with ID ${tableId} not found.`);
    }
  };

  return (
    <div className="health-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Health Dashboard</h1>
        <Link to={'/add-complaint'}>
          <button className="btn btn-success">
            complaints
            <FontAwesomeIcon icon={faComments} style={{ color: '#fafcff' }} className="ms-1" />
          </button>
        </Link>
      </div>

      {/* Children Section */}
      <div className="section">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Children</h2>
          <div>
          
            <button className="btn btn-success" onClick={() => exportToExcel('children-table', 'Children')}>
              <FontAwesomeIcon icon={faFileExcel} /> Export as Excel
            </button>
          </div>
        </div>
        <div className="table-container">
          <table id="children-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Address</th>
                <th>Parent Name</th>
                <th>Parent Contact</th>
                <th>Parent Email</th>
                <th>Parent Occupation</th>
                <th>Siblings</th>
                <th>Health Records</th>
                <th>Medical History</th>
                <th>Allergies</th>
                <th>Dietary Preferences</th>
                <th>Emergency Contact</th>
                <th>Nutrition Status</th>
              </tr>
            </thead>
            <tbody>
              {children.map((child) => (
                <tr key={child.id}>
                  <td>{child.id}</td>
                  <td>{child.name}</td>
                  <td>{child.age}</td>
                  <td>{child.gender}</td>
                  <td>{new Date(child.dateOfBirth).toLocaleDateString()}</td>
                  <td>
                    {child.address
                      ? `${child.address.street || 'N/A'}, ${child.address.city || 'N/A'}, ${
                          child.address.state || 'N/A'
                        }, ${child.address.zipCode || 'N/A'}`
                      : 'Address not available'}
                  </td>
                  <td>{child.parentDetails?.parentName || 'N/A'}</td>
                  <td>{child.parentDetails?.parentContact || 'N/A'}</td>
                  <td>{child.parentDetails?.parentEmail || 'N/A'}</td>
                  <td>{child.parentDetails?.parentOccupation || 'N/A'}</td>
                  <td>
                    <ul>
                      {child.siblings?.map((sibling, index) => (
                        <li key={index}>
                          {sibling.name} (Age: {sibling.age}, Relationship: {sibling.relationship})
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {child.healthRecords?.map((record, index) => (
                        <li key={index}>
                          Date: {new Date(record.date).toLocaleDateString()}, Weight: {record.weight}, Height:{' '}
                          {record.height}, Immunizations: {record.immunizations?.join(', ') || 'N/A'}, Illnesses:{' '}
                          {record.illnesses?.join(', ') || 'N/A'}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    Chronic Conditions: {child.medicalHistory?.chronicConditions?.join(', ') || 'N/A'}, Surgeries:{' '}
                    {child.medicalHistory?.surgeries?.join(', ') || 'N/A'}
                  </td>
                  <td>{child.allergies?.join(', ') || 'N/A'}</td>
                  <td>
                    Vegetarian: {child.dietaryPreferences?.vegetarian ? 'Yes' : 'No'}, Lactose Intolerant:{' '}
                    {child.dietaryPreferences?.lactoseIntolerant ? 'Yes' : 'No'}
                  </td>
                  <td>
                    Name: {child.emergencyContact?.name || 'N/A'}, Relationship:{' '}
                    {child.emergencyContact?.relationship || 'N/A'}, Contact:{' '}
                    {child.emergencyContact?.contactNumber || 'N/A'}
                  </td>
                  <td>
                    Date: {new Date(child.nutritionStatus?.date).toLocaleDateString() || 'N/A'}, Status:{' '}
                    {child.nutritionStatus?.status || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Child Beneficiaries Section */}
      <div className="section">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Child Beneficiaries</h2>
          <div>
           
            <button className="btn btn-success" onClick={() => exportToExcel('child-beneficiaries-table', 'ChildBeneficiaries')}>
              <FontAwesomeIcon icon={faFileExcel} /> Export as Excel
            </button>
          </div>
        </div>
        <div className="table-container">
          <table id="child-beneficiaries-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Address</th>
                <th>Parent</th>
                <th>Health Records</th>
                <th>Nutrition Status</th>
                <th>Education Details</th>
                <th>Guardian</th>
                <th>Last Visit Date</th>
                <th>Vaccination Details</th>
              </tr>
            </thead>
            <tbody>
              {childBeneficiaries.map((beneficiary) => (
                <tr key={beneficiary._id}>
                  <td>{beneficiary.name}</td>
                  <td>{beneficiary.age}</td>
                  <td>{beneficiary.gender}</td>
                  <td>{new Date(beneficiary.dateOfBirth).toLocaleDateString()}</td>
                  <td>
                    {beneficiary.address
                      ? `${beneficiary.address.street || 'N/A'}, ${beneficiary.address.city || 'N/A'}, ${
                          beneficiary.address.state || 'N/A'
                        }, ${beneficiary.address.zipCode || 'N/A'}`
                      : 'Address not available'}
                  </td>
                  <td>{beneficiary.parent || 'N/A'}</td>
                  <td>
                    <ul>
                      {beneficiary.healthRecords?.map((record, index) => (
                        <li key={index}>
                          Date: {new Date(record.date).toLocaleDateString()}, Weight: {record.weight}, Height:{' '}
                          {record.height}, Immunizations: {record.immunizations?.join(', ') || 'N/A'}, Illnesses:{' '}
                          {record.illnesses?.join(', ') || 'N/A'}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    Date: {new Date(beneficiary.nutritionStatus?.date).toLocaleDateString() || 'N/A'}, Status:{' '}
                    {beneficiary.nutritionStatus?.status || 'N/A'}
                  </td>
                  <td>
                    Preschool: {beneficiary.educationDetails?.preschoolName || 'N/A'}, Enrollment Date:{' '}
                    {new Date(beneficiary.educationDetails?.enrollmentDate).toLocaleDateString() || 'N/A'}, Progress:{' '}
                    {beneficiary.educationDetails?.progress || 'N/A'}
                  </td>
                  <td>
                    Name: {beneficiary.guardian?.name || 'N/A'}, Relationship:{' '}
                    {beneficiary.guardian?.relationship || 'N/A'}, Contact:{' '}
                    {beneficiary.guardian?.contactNumber || 'N/A'}, Email: {beneficiary.guardian?.email || 'N/A'}, Address:{' '}
                    {beneficiary.guardian?.address
                      ? `${beneficiary.guardian.address.street || 'N/A'}, ${beneficiary.guardian.address.city || 'N/A'}, ${
                          beneficiary.guardian.address.state || 'N/A'
                        }, ${beneficiary.guardian.address.zipCode || 'N/A'}`
                      : 'N/A'}
                  </td>
                  <td>{new Date(beneficiary.lastVisitDate).toLocaleDateString() || 'N/A'}</td>
                  <td>
                    <ul>
                      {beneficiary.vaccinationDetails?.map((vaccine, index) => (
                        <li key={index}>
                          Vaccine: {vaccine.vaccineName}, Date: {new Date(vaccine.dateAdministered).toLocaleDateString()}, Administered By:{' '}
                          {vaccine.administeredBy}, Notes: {vaccine.notes || 'N/A'}
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

      {/* Mothers Section */}
      <div className="section">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Mothers</h2>
          <div>
           
            <button className="btn btn-success" onClick={() => exportToExcel('mothers-table', 'Mothers')}>
              <FontAwesomeIcon icon={faFileExcel} /> Export as Excel
            </button>
          </div>
        </div>
        <div className="table-container">
          <table id="mothers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Guardian Name</th>
                <th>Guardian Phone</th>
                <th>Blood Group</th>
                <th>Registration Date</th>
                <th>Assigned Worker ID</th>
                <th>Last Checkup Date</th>
                <th>Current Status</th>
                <th>Last Delivery Date</th>
                <th>Breastfeeding Status</th>
                <th>Nutritional Support</th>
                <th>Lactation Support Details</th>
                <th>Children</th>
              </tr>
            </thead>
            <tbody>
              {mothers.map((mother) => (
                <tr key={mother.id}>
                  <td>{mother.id}</td>
                  <td>{mother.name}</td>
                  <td>{new Date(mother.dateOfBirth).toLocaleDateString()}</td>
                  <td>{mother.gender}</td>
                  <td>{mother.address || 'N/A'}</td>
                  <td>{mother.guardianName}</td>
                  <td>{mother.guardianPhone}</td>
                  <td>{mother.bloodGroup}</td>
                  <td>{new Date(mother.registrationDate).toLocaleDateString()}</td>
                  <td>{mother.assignedWorkerId}</td>
                  <td>{mother.lastCheckupDate ? new Date(mother.lastCheckupDate).toLocaleDateString() : 'N/A'}</td>
                  <td>{mother.currentStatus}</td>
                  <td>{new Date(mother.lastDeliveryDate).toLocaleDateString()}</td>
                  <td>{mother.breastfeedingStatus}</td>
                  <td>{mother.nutritionalSupport ? 'Yes' : 'No'}</td>
                  <td>{mother.lactationSupportDetails || 'N/A'}</td>
                  <td>
                    <ul>
                      {mother.children?.map((child, index) => (
                        <li key={index}>
                          Name: {child.name}, Date of Birth: {new Date(child.dateOfBirth).toLocaleDateString()}, Gender:{' '}
                          {child.gender}, Birth Weight: {child.birthWeight}, Breastfeeding Status: {child.breastfeedingStatus}
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

      {/* Pregnant Women Section */}
      <div className="section">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Pregnant Women</h2>
          <div>
           
            <button className="btn btn-success" onClick={() => exportToExcel('pregnant-women-table', 'PregnantWomen')}>
              <FontAwesomeIcon icon={faFileExcel} /> Export as Excel
            </button>
          </div>
        </div>
        <div className="table-container">
          <table id="pregnant-women-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Guardian Name</th>
                <th>Guardian Phone</th>
                <th>Blood Group</th>
                <th>Registration Date</th>
                <th>Assigned Worker ID</th>
                <th>Last Checkup Date</th>
                <th>Current Status</th>
                <th>Health Records</th>
                <th>Vaccination Details</th>
                <th>Nutrition Status</th>
                <th>Last Visit Date</th>
                <th>Document</th>
              </tr>
            </thead>
            <tbody>
              {pregnantWomen.map((pregnant) => (
                <tr key={pregnant._id}>
                  <td>{pregnant.name}</td>
                  <td>{new Date(pregnant.dateOfBirth).toLocaleDateString()}</td>
                  <td>{pregnant.gender}</td>
                  <td>
                    {pregnant.address
                      ? `${pregnant.address.street || 'N/A'}, ${pregnant.address.city || 'N/A'}, ${
                          pregnant.address.state || 'N/A'
                        }, ${pregnant.address.zipCode || 'N/A'}`
                      : 'Address not available'}
                  </td>
                  <td>{pregnant.guardianName}</td>
                  <td>{pregnant.guardianPhone}</td>
                  <td>{pregnant.bloodGroup}</td>
                  <td>{new Date(pregnant.registrationDate).toLocaleDateString()}</td>
                  <td>{pregnant.assignedWorkerId}</td>
                  <td>{pregnant.lastCheckupDate ? new Date(pregnant.lastCheckupDate).toLocaleDateString() : 'N/A'}</td>
                  <td>{pregnant.currentStatus}</td>
                  <td>
                    <ul>
                      {pregnant.healthRecords?.map((record, index) => (
                        <li key={index}>
                          Date: {new Date(record.date).toLocaleDateString()}, Weight: {record.weight}, Blood Pressure:{' '}
                          {record.bloodPressure?.systolic || 'N/A'}/{record.bloodPressure?.diastolic || 'N/A'}, Fetal Heart Rate:{' '}
                          {record.fetalHeartRate}, Notes: {record.notes || 'N/A'}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {pregnant.vaccinationDetails?.map((vaccine, index) => (
                        <li key={index}>
                          Vaccine: {vaccine.vaccineName}, Date: {new Date(vaccine.dateAdministered).toLocaleDateString()}, Administered By:{' '}
                          {vaccine.administeredBy}, Notes: {vaccine.notes || 'N/A'}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    Date: {new Date(pregnant.nutritionStatus?.date).toLocaleDateString() || 'N/A'}, Status:{' '}
                    {pregnant.nutritionStatus?.status || 'N/A'}
                  </td>
                  <td>{pregnant.lastVisitDate ? new Date(pregnant.lastVisitDate).toLocaleDateString() : 'N/A'}</td>
                  <td>{pregnant.document || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inventories Section */}
      <div className="section">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Daycare Inventories</h2>
          <div>
           
            <button className="btn btn-success" onClick={() => exportToExcel('inventories-table', 'Inventories')}>
              <FontAwesomeIcon icon={faFileExcel} /> Export as Excel
            </button>
          </div>
        </div>
        <div className="table-container">
          <table id="inventories-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Minimum Threshold</th>
                <th>Unit Price</th>
                <th>Supplier</th>
                <th>Expiry Date</th>
                <th>Last Restocked</th>
                <th>Last Restocked By</th>
                
                <th>Transactions</th>
              </tr>
            </thead>
            <tbody>
              {inventories.map((inventory) => (
                <tr key={inventory._id}>
                  <td>{inventory.itemName}</td>
                  <td>{inventory.category}</td>
                  <td>{inventory.quantity}</td>
                  <td>{inventory.unit}</td>
                  <td>{inventory.minimumThreshold}</td>
                  <td>{inventory.unitPrice}</td>
                  <td>{inventory.supplier}</td>
                  <td>{new Date(inventory.expiryDate).toLocaleDateString()}</td>
                  <td>{new Date(inventory.lastRestocked).toLocaleDateString()}</td>
                  <td>{inventory.lastRestockedBy}</td>
                  
                  <td>
                    <ul>
                      {inventory.transactions?.map((transaction, index) => (
                        <li key={index}>
                          Type: {transaction.type}, Quantity: {transaction.quantity}, Date: {new Date(transaction.date).toLocaleDateString()}, By: {transaction.by}
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
    </div>
  );
}

export default Health;