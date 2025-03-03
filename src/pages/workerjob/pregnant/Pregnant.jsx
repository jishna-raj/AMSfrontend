import React from 'react';
import './Pregnant.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';



function Pregnant() {
    return (
        <div className="container5">
           <div className=" text-light d-flex justify-content-between align-items-center mb-5 w-100" style={{backgroundColor:"green"}}>
                <h1 className="title animate-fade-in">Pregnant Beneficiaries</h1>
                <button className="mb-4 btn mt-3" style={{ marginLeft: '80px' }}>
                    <Link to={"/add-pregnant"}><FontAwesomeIcon icon={faPlus} beat style={{ color: "white" }} /></Link>
                </button>
    
           </div>
            {/* Row 1 */}
           <div className='container4'>
                <div className="row animate-fade-in-up">
                    {/* Card 1 */}
                    <div className="card">
                        <h2>Emily Johnson</h2>
                        <p><strong>DOB:</strong> 1990-05-14</p>
                        <p><strong>Address:</strong> 123 Main St, New York, NY 10001</p>
                        <p><strong>Guardian:</strong> John Johnson (123-456-7890)</p>
                        <p><strong>Blood Group:</strong> O+</p>
                        <p><strong>Worker ID:</strong> W123</p>
                        <p className="status active"><strong>Status:</strong> Active</p>
                        <p><strong>Last Checkup:</strong> 2024-02-15</p>
                        <p><strong>Last Visit:</strong> 2024-03-01</p>
                        <p className="nutrition-status normal"><strong>Nutrition Status:</strong> Normal (on 2024-02-20)</p>
                        <div className="health-records">
                            <h3>Health Records</h3>
                            <p>2024-02-10: 68kg, BP 120/80, FHR 140 bpm</p>
                            <p>Notes: All normal</p>
                            <p>Document</p>
                        </div>
                        <div className="vaccination-details">
                            <h3>Vaccination Details</h3>
                            <p>Tetanus - 2024-01-15, by Dr. Smith</p>
                            <p>Notes: No side effects</p>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-sm">
                                <Link to={'/update-pregnant'}><FontAwesomeIcon icon={faPenToSquare} style={{ color: "#19629a" }} /></Link>
                            </button>
                            <button className="btn btn-sm ms-3">
                                <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
                            </button>
                        </div>
                    </div>
    
                    {/* Card 2 */}
                    <div className="card">
                        <h2>Sophia Martinez</h2>
                        <p><strong>DOB:</strong> 1992-08-22</p>
                        <p><strong>Address:</strong> 456 Oak St, Los Angeles, CA 90001</p>
                        <p><strong>Guardian:</strong> Robert Martinez (987-654-3210)</p>
                        <p><strong>Blood Group:</strong> A-</p>
                        <p><strong>Worker ID:</strong> W456</p>
                        <p className="status inactive"><strong>Status:</strong> Inactive</p>
                        <p><strong>Last Checkup:</strong> 2024-01-10</p>
                        <p><strong>Last Visit:</strong> 2024-02-25</p>
                        <p className="nutrition-status underweight"><strong>Nutrition Status:</strong> Underweight (on 2024-02-18)</p>
                        <div className="health-records">
                            <h3>Health Records</h3>
                            <p>2024-01-05: 55kg, BP 110/70, FHR 135 bpm</p>
                            <p>Notes: Slightly underweight, advised better nutrition</p>
                        </div>
                        <div className="vaccination-details">
                            <h3>Vaccination Details</h3>
                            <p>Flu Shot - 2023-12-10, by Dr. Lee</p>
                            <p>Notes: Recommended annual dose</p>
                        </div>
    
                        <div className="card-footer">
                        <button className="btn btn-sm">
                            <Link to={'/update-pregnant'}><FontAwesomeIcon icon={faPenToSquare} style={{ color: "#19629a" }} /></Link>
                        </button>
                        <button className="btn btn-sm ms-3">
                            <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
                        </button>
                    </div>
                    </div>
                  
                </div>
    
                {/* Row 2 */}
                <div className="row animate-fade-in-up">
                    {/* Card 3 */}
                    <div className="card">
                        <h2>Olivia Brown</h2>
                        <p><strong>DOB:</strong> 1988-11-30</p>
                        <p><strong>Address:</strong> 789 Pine St, Chicago, IL 60601</p>
                        <p><strong>Guardian:</strong> Michael Brown (555-123-4567)</p>
                        <p><strong>Blood Group:</strong> B+</p>
                        <p><strong>Worker ID:</strong> W789</p>
                        <p className="status active"><strong>Status:</strong> Active</p>
                        <p><strong>Last Checkup:</strong> 2024-03-10</p>
                        <p><strong>Last Visit:</strong> 2024-03-25</p>
                        <p className="nutrition-status normal"><strong>Nutrition Status:</strong> Normal (on 2024-03-20)</p>
                        <div className="health-records">
                            <h3>Health Records</h3>
                            <p>2024-03-05: 70kg, BP 115/75, FHR 145 bpm</p>
                            <p>Notes: Healthy pregnancy</p>
                        </div>
                        <div className="vaccination-details">
                            <h3>Vaccination Details</h3>
                            <p>Whooping Cough - 2024-02-15, by Dr. Adams</p>
                            <p>Notes: No adverse reactions</p>
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-sm">
                                <Link to={'/update-pregnant'}><FontAwesomeIcon icon={faPenToSquare} style={{ color: "#19629a" }} /></Link>
                            </button>
                            <button className="btn btn-sm ms-3">
                                <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
                            </button>
                        </div>
                    </div>
    
                    {/* Card 4 */}
                    <div className="card">
                        <h2>Ava Davis</h2>
                        <p><strong>DOB:</strong> 1995-04-18</p>
                        <p><strong>Address:</strong> 321 Elm St, Houston, TX 77001</p>
                        <p><strong>Guardian:</strong> James Davis (333-444-5555)</p>
                        <p><strong>Blood Group:</strong> AB-</p>
                        <p><strong>Worker ID:</strong> W321</p>
                        <p className="status inactive"><strong>Status:</strong> Inactive</p>
                        <p><strong>Last Checkup:</strong> 2024-02-20</p>
                        <p><strong>Last Visit:</strong> 2024-03-05</p>
                        <p className="nutrition-status underweight"><strong>Nutrition Status:</strong> Underweight (on 2024-03-01)</p>
                        <div className="health-records">
                            <h3>Health Records</h3>
                            <p>2024-02-15: 60kg, BP 105/65, FHR 130 bpm</p>
                            <p>Notes: Needs nutritional supplements</p>
                        </div>
                        <div className="vaccination-details">
                            <h3>Vaccination Details</h3>
                            <p>Hepatitis B - 2024-01-20, by Dr. Wilson</p>
                            <p>Notes: Completed first dose</p>
                        </div>
    
                        <div className="card-footer">
                            <button className="btn btn-sm">
                                <Link to={'/update-pregnant'}><FontAwesomeIcon icon={faPenToSquare} style={{ color: "#19629a" }} /></Link>
                            </button>
                            <button className="btn btn-sm ms-3">
                                <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
                            </button>
                        </div>
                    </div>
    
    
                </div>
           </div>
        </div>


    );
}

export default Pregnant;