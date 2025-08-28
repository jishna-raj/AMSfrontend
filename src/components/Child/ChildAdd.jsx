import React, { useState, useEffect } from 'react';
import './childadd.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { addChildApi } from '../../services/allapi';
import 'react-toastify/dist/ReactToastify.css'; 

function ChildAdd() {
  const navigate = useNavigate();

  // State for child details
  const [childDetails, setChildDetails] = useState({
    id:"",
    name: "",
    age: "",
    gender: "",
    dateOfBirth: "",
    childImage: null,
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
    parentDetails: {
      parentName: "",
      parentContact: "",
      parentEmail: "",
      parentOccupation: "",
    },
    siblings: [],
    healthRecords: [],
    medicalHistory: {
      chronicConditions: [],
      surgeries: [],
    },
    allergies: [],
    dietaryPreferences: {
      vegetarian: false,
      lactoseIntolerant: false,
    },
    emergencyContact: {
      name: "",
      relationship: "",
      contactNumber: "",
    },
   
  });

  console.log(childDetails);
  

  const [preview, setPreview] = useState("");
  const [key,setKey] = useState(false)

  // Handle file upload for childImage
  useEffect(() => {
    if (childDetails.childImage) {
      setPreview(URL.createObjectURL(childDetails.childImage));
    }
  }, [childDetails.childImage]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setChildDetails({ ...childDetails, [name]: value });
  };

  // Handle nested object changes (e.g., address, parentDetails)
  const handleNestedChange = (parentField, field, value) => {
    setChildDetails({
      ...childDetails,
      [parentField]: {
        ...childDetails[parentField],
        [field]: value,
      },
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setChildDetails({ ...childDetails, childImage: e.target.files[0] });
  };

  // Handle form submission
  const handleAdd = async () => {
    const {
      id,
      name,
      age,
      gender,
      dateOfBirth,
      childImage,
      address,
      parentDetails,
      siblings,
      healthRecords,
      medicalHistory,
      allergies,
      dietaryPreferences,
      emergencyContact,
      
    } = childDetails;

   
    

    // Validate required fields
    if (
      !id||
      !name ||
      !age ||
      !gender ||
      !dateOfBirth ||
      !childImage ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.zipCode ||
      !parentDetails.parentName ||
      !parentDetails.parentContact ||
      !parentDetails.parentEmail ||
      !parentDetails.parentOccupation ||
      healthRecords.length === 0 ||
      medicalHistory.chronicConditions.length === 0 ||
      medicalHistory.surgeries.length === 0 ||
      !emergencyContact.name ||
      !emergencyContact.relationship ||
      !emergencyContact.contactNumber
      
    ) {
      toast.info("Please fill the form completely");
      return;
    }

    // Prepare form data
    const reqBody = new FormData();
    reqBody.append("id",id);
    reqBody.append("name", name);
    reqBody.append("age", age);
    reqBody.append("gender", gender);
    reqBody.append("dateOfBirth", dateOfBirth);
    reqBody.append("childImage", childImage);
    reqBody.append("address", JSON.stringify(address));
    reqBody.append("parentDetails", JSON.stringify(parentDetails));
    reqBody.append("siblings", JSON.stringify(siblings));
    reqBody.append("healthRecords", JSON.stringify(healthRecords));
    reqBody.append("medicalHistory", JSON.stringify(medicalHistory));
    reqBody.append("allergies", JSON.stringify(allergies));
    reqBody.append("dietaryPreferences", JSON.stringify(dietaryPreferences));
    reqBody.append("emergencyContact", JSON.stringify(emergencyContact));

    // Get token from session storage
    const token = sessionStorage.getItem("token");

    if (token) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`,
      };

      try {
        const result = await addChildApi(reqBody, reqHeader);

        console.log(result);
        
        if (result.status === 200) {
          toast.success("Child added successfully");
          setChildDetails({
            id:"",                
            name: "",
            age: "",
            gender: "",
            dateOfBirth: "",
            childImage: null,
            address: {
              street: "",
              city: "",
              state: "",
              zipCode: "",
            },
            parentDetails: {
              parentName: "",
              parentContact: "",
              parentEmail: "",
              parentOccupation: "",
            },
            siblings: [],
            healthRecords: [],
            medicalHistory: {
              chronicConditions: [],
              surgeries: [],
            },
            allergies: [],
            dietaryPreferences: {
              vegetarian: false,
              lactoseIntolerant: false,
            },
            emergencyContact: {
              name: "",
              relationship: "",
              contactNumber: "",
            },
           
          });
          navigate('/display-child');
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        toast.error("Server error");
        console.error(error);
      }
    }
  };

  const handleClose = () => {

    setChildDetails({
      name: "",
      age: "",
      gender: "",
      dateOfBirth: "",
      childImage: null,
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
      parentDetails: {
        parentName: "",
        parentContact: "",
        parentEmail: "",
        parentOccupation: "",
      },
      siblings: [],
      healthRecords: [],
      medicalHistory: {
        chronicConditions: [],
        surgeries: [],
      },
      allergies: [],
      dietaryPreferences: {
        vegetarian: false,
        lactoseIntolerant: false,
      },
      emergencyContact: {
        name: "",
        relationship: "",
        contactNumber: "",
      },
     
    })
    
    setPreview("")

    if (key == false) {
      setKey(true)
    }
    else {
      setKey(false)
    }
  }

  return (
    <>
      <div className="child-add-container">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Add New Child</h2>
          <Link to={'/display-child'}>
            <FontAwesomeIcon icon={faUserTie} beat style={{ color: "#141414" }} />
          </Link>
        </div>

        <form className="child-add-form">
          {/* Basic Information */}
          <div className="form-section">
            <h3>Basic Information</h3>

            <div className="form-group">
              <label htmlFor="id">ID:</label>
              <input
                type="text"
                id="id"
                name="id"
                value={childDetails.id}
                onChange={handleInputChange}
                placeholder="Enter child's name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={childDetails.name}
                onChange={handleInputChange}
                placeholder="Enter child's name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={childDetails.age}
                onChange={handleInputChange}
                placeholder="Enter child's age"
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                name="gender"
                value={childDetails.gender}
                onChange={handleInputChange}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth:</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={childDetails.dateOfBirth}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="childImage">Child Image:</label>
              <input
                type="file"
                id="childImage"
                name="childImage"
                onChange={handleFileChange}
                key={key}
              />
              {preview && <img src={preview} alt="Child Preview" className="preview-image" height={'300px'} width={'300px'} />}
            </div>
          </div>

          {/* Address */}
          <div className="form-section">
            <h3>Address</h3>
            <div className="form-group">
              <label htmlFor="street">Street:</label>
              <input
                type="text"
                id="street"
                name="street"
                value={childDetails.address.street}
                onChange={(e) => handleNestedChange("address", "street", e.target.value)}
                placeholder="Enter street"
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={childDetails.address.city}
                onChange={(e) => handleNestedChange("address", "city", e.target.value)}
                placeholder="Enter city"
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                name="state"
                value={childDetails.address.state}
                onChange={(e) => handleNestedChange("address", "state", e.target.value)}
                placeholder="Enter state"
              />
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">Zip Code:</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={childDetails.address.zipCode}
                onChange={(e) => handleNestedChange("address", "zipCode", e.target.value)}
                placeholder="Enter zip code"
              />
            </div>
          </div>

          {/* Parent Details */}
          <div className="form-section">
            <h3>Parent Details</h3>
            <div className="form-group">
              <label htmlFor="parentName">Parent Name:</label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                value={childDetails.parentDetails.parentName}
                onChange={(e) => handleNestedChange("parentDetails", "parentName", e.target.value)}
                placeholder="Enter parent's name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="parentContact">Contact Number:</label>
              <input
                type="text"
                id="parentContact"
                name="parentContact"
                value={childDetails.parentDetails.parentContact}
                onChange={(e) => handleNestedChange("parentDetails", "parentContact", e.target.value)}
                placeholder="Enter contact number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="parentEmail">Email:</label>
              <input
                type="email"
                id="parentEmail"
                name="parentEmail"
                value={childDetails.parentDetails.parentEmail}
                onChange={(e) => handleNestedChange("parentDetails", "parentEmail", e.target.value)}
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="parentOccupation">Occupation:</label>
              <input
                type="text"
                id="parentOccupation"
                name="parentOccupation"
                value={childDetails.parentDetails.parentOccupation}
                onChange={(e) => handleNestedChange("parentDetails", "parentOccupation", e.target.value)}
                placeholder="Enter occupation"
              />
            </div>
          </div>

          {/* Siblings */}
          <div className="form-section">
            <h3>Siblings</h3>
            {childDetails.siblings.map((sibling, index) => (
              <div key={index} className="sibling-group">
                <div className="form-group">
                  <label htmlFor={`siblingName${index}`}>Sibling Name:</label>
                  <input
                    type="text"
                    id={`siblingName${index}`}
                    name={`siblingName${index}`}
                    value={sibling.name}
                    onChange={(e) => {
                      const updatedSiblings = [...childDetails.siblings];
                      updatedSiblings[index].name = e.target.value;
                      setChildDetails({ ...childDetails, siblings: updatedSiblings });
                    }}
                    placeholder="Enter sibling's name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`siblingAge${index}`}>Sibling Age:</label>
                  <input
                    type="number"
                    id={`siblingAge${index}`}
                    name={`siblingAge${index}`}
                    value={sibling.age}
                    onChange={(e) => {
                      const updatedSiblings = [...childDetails.siblings];
                      updatedSiblings[index].age = e.target.value;
                      setChildDetails({ ...childDetails, siblings: updatedSiblings });
                    }}
                    placeholder="Enter sibling's age"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`siblingRelationship${index}`}>Relationship:</label>
                  <input
                    type="text"
                    id={`siblingRelationship${index}`}
                    name={`siblingRelationship${index}`}
                    value={sibling.relationship}
                    onChange={(e) => {
                      const updatedSiblings = [...childDetails.siblings];
                      updatedSiblings[index].relationship = e.target.value;
                      setChildDetails({ ...childDetails, siblings: updatedSiblings });
                    }}
                    placeholder="Enter relationship"
                  />
                </div>
                <button
                  type="button"
                  className="remove-sibling-button"
                  onClick={() => {
                    const updatedSiblings = childDetails.siblings.filter((_, i) => i !== index);
                    setChildDetails({ ...childDetails, siblings: updatedSiblings });
                  }}
                >
                  Remove Sibling
                </button>
              </div>
            ))}
            <button
              type="button"
              className="add-sibling-button"
              onClick={() => {
                setChildDetails({
                  ...childDetails,
                  siblings: [...childDetails.siblings, { name: "", age: "", relationship: "" }],
                });
              }}
            >
              Add Another Sibling
            </button>
          </div>

          {/* Health Records */}
          <div className="form-section">
            <h3>Health Records</h3>
            {childDetails.healthRecords.map((record, index) => (
              <div key={index} className="health-record-group">
                <div className="form-group">
                  <label htmlFor={`healthDate${index}`}>Date:</label>
                  <input
                    type="date"
                    id={`healthDate${index}`}
                    name={`healthDate${index}`}
                    value={record.date}
                    onChange={(e) => {
                      const updatedHealthRecords = [...childDetails.healthRecords];
                      updatedHealthRecords[index].date = e.target.value;
                      setChildDetails({ ...childDetails, healthRecords: updatedHealthRecords });
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`weight${index}`}>Weight (kg):</label>
                  <input
                    type="number"
                    id={`weight${index}`}
                    name={`weight${index}`}
                    value={record.weight}
                    onChange={(e) => {
                      const updatedHealthRecords = [...childDetails.healthRecords];
                      updatedHealthRecords[index].weight = e.target.value;
                      setChildDetails({ ...childDetails, healthRecords: updatedHealthRecords });
                    }}
                    placeholder="Enter weight"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`height${index}`}>Height (cm):</label>
                  <input
                    type="number"
                    id={`height${index}`}
                    name={`height${index}`}
                    value={record.height}
                    onChange={(e) => {
                      const updatedHealthRecords = [...childDetails.healthRecords];
                      updatedHealthRecords[index].height = e.target.value;
                      setChildDetails({ ...childDetails, healthRecords: updatedHealthRecords });
                    }}
                    placeholder="Enter height"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`immunizations${index}`}>Immunizations:</label>
                  <input
                    type="text"
                    id={`immunizations${index}`}
                    name={`immunizations${index}`}
                    value={record.immunizations.join(", ")}
                    onChange={(e) => {
                      const updatedHealthRecords = [...childDetails.healthRecords];
                      updatedHealthRecords[index].immunizations = e.target.value.split(", ");
                      setChildDetails({ ...childDetails, healthRecords: updatedHealthRecords });
                    }}
                    placeholder="Enter immunizations (comma-separated)"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`illnesses${index}`}>Illnesses:</label>
                  <input
                    type="text"
                    id={`illnesses${index}`}
                    name={`illnesses${index}`}
                    value={record.illnesses.join(", ")}
                    onChange={(e) => {
                      const updatedHealthRecords = [...childDetails.healthRecords];
                      updatedHealthRecords[index].illnesses = e.target.value.split(", ");
                      setChildDetails({ ...childDetails, healthRecords: updatedHealthRecords });
                    }}
                    placeholder="Enter illnesses (comma-separated)"
                  />
                </div>
                <button
                  type="button"
                  className="remove-health-record-button"
                  onClick={() => {
                    const updatedHealthRecords = childDetails.healthRecords.filter((_, i) => i !== index);
                    setChildDetails({ ...childDetails, healthRecords: updatedHealthRecords });
                  }}
                >
                  Remove Health Record
                </button>
              </div>
            ))}
            <button
              type="button"
              className="add-health-record-button"
              onClick={() => {
                setChildDetails({
                  ...childDetails,
                  healthRecords: [
                    ...childDetails.healthRecords,
                    { date: "", weight: "", height: "", immunizations: [], illnesses: [] },
                  ],
                });
              }}
            >
              Add Another Health Record
            </button>
          </div>

          {/* Medical History */}
          <div className="form-section">
            <h3>Medical History</h3>
            <div className="form-group">
              <label htmlFor="chronicConditions">Chronic Conditions:</label>
              <input
                type="text"
                id="chronicConditions"
                name="chronicConditions"
                value={childDetails.medicalHistory.chronicConditions.join(", ")}
                onChange={(e) => {
                  setChildDetails({
                    ...childDetails,
                    medicalHistory: {
                      ...childDetails.medicalHistory,
                      chronicConditions: e.target.value.split(", "),
                    },
                  });
                }}
                placeholder="Enter chronic conditions (comma-separated)"
              />
            </div>
            <div className="form-group">
              <label htmlFor="surgeries">Surgeries:</label>
              <input
                type="text"
                id="surgeries"
                name="surgeries"
                value={childDetails.medicalHistory.surgeries.join(", ")}
                onChange={(e) => {
                  setChildDetails({
                    ...childDetails,
                    medicalHistory: {
                      ...childDetails.medicalHistory,
                      surgeries: e.target.value.split(", "),
                    },
                  });
                }}
                placeholder="Enter surgeries (comma-separated)"
              />
            </div>
          </div>

          {/* Allergies */}
          <div className="form-section">
            <h3>Allergies</h3>
            <div className="form-group">
              <label htmlFor="allergies">Allergies:</label>
              <input
                type="text"
                id="allergies"
                name="allergies"
                value={childDetails.allergies.join(", ")}
                onChange={(e) => {
                  setChildDetails({
                    ...childDetails,
                    allergies: e.target.value.split(", "),
                  });
                }}
                placeholder="Enter allergies (comma-separated)"
              />
            </div>
          </div>

          {/* Dietary Preferences */}
          <div className="form-section">
            <h3>Dietary Preferences</h3>
            <div className="form-group">
              <label htmlFor="vegetarian">Vegetarian:</label>
              <select
                id="vegetarian"
                name="vegetarian"
                value={childDetails.dietaryPreferences.vegetarian ? "Yes" : "No"}
                onChange={(e) => {
                  setChildDetails({
                    ...childDetails,
                    dietaryPreferences: {
                      ...childDetails.dietaryPreferences,
                      vegetarian: e.target.value === "Yes",
                    },
                  });
                }}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="lactoseIntolerant">Lactose Intolerant:</label>
              <select
                id="lactoseIntolerant"
                name="lactoseIntolerant"
                value={childDetails.dietaryPreferences.lactoseIntolerant ? "Yes" : "No"}
                onChange={(e) => {
                  setChildDetails({
                    ...childDetails,
                    dietaryPreferences: {
                      ...childDetails.dietaryPreferences,
                      lactoseIntolerant: e.target.value === "Yes",
                    },
                  });
                }}
              >
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="form-section">
            <h3>Emergency Contact</h3>
            <div className="form-group">
              <label htmlFor="emergencyContactName">Name:</label>
              <input
                type="text"
                id="emergencyContactName"
                name="emergencyContactName"
                value={childDetails.emergencyContact.name}
                onChange={(e) => handleNestedChange("emergencyContact", "name", e.target.value)}
                placeholder="Enter name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="emergencyContactRelationship">Relationship:</label>
              <input
                type="text"
                id="emergencyContactRelationship"
                name="emergencyContactRelationship"
                value={childDetails.emergencyContact.relationship}
                onChange={(e) => handleNestedChange("emergencyContact", "relationship", e.target.value)}
                placeholder="Enter relationship"
              />
            </div>
            <div className="form-group">
              <label htmlFor="emergencyContactNumber">Contact Number:</label>
              <input
                type="text"
                id="emergencyContactNumber"
                name="emergencyContactNumber"
                value={childDetails.emergencyContact.contactNumber}
                onChange={(e) => handleNestedChange("emergencyContact", "contactNumber", e.target.value)}
                placeholder="Enter contact number"
              />
            </div>
          </div>

          

          {/* Submit Button */}
          <div className="form-actions">
            <button type="button" className="submit-button" onClick={handleAdd}>
              Add Child
            </button>
            <button type="button" className="submit-button" onClick={handleClose}>
              cancel
            </button>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </>
  );
}

export default ChildAdd;