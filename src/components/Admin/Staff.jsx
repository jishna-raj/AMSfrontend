import { faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';



function Staff() {
    return (
        <>
            <div className="staff-container">
                <div className='d-flex justify-contet-between align-items-center' style={{ backgroundImage: "linear-gradient(180deg, #083b14, #0a551a)" }}>

                    <Link to={'/admin'} style={{ textDecoration: 'none', color: 'white' }}><h2 className="ms-3 fw-bold">Staff Management</h2></Link>
                    <button className="mb-4 btn mt-3" style={{ marginLeft: '800px' }}>
                        <Link to={"/add-worker"}><FontAwesomeIcon icon={faPlus} beat style={{ color: "#f2f4f8" }} /></Link>
                    </button>
                </div>
                <div className="row mt-5 p-5">
                    <div className="col-md-3 mb-4">
                        <Card className="staff-card shadow-sm">
                            <Card.Body>
                                <div className="staff-details">
                                    <strong>Username:</strong> johndoe<br />
                                    <strong>Email:</strong> john.doe@example.com<br />
                                    <strong>Role:</strong> Worker<br />
                                    <strong>Phone:</strong> +1234567890<br />
                                    <strong>Address:</strong> 123 Main St, City<br />
                                    <strong>Worker ID:</strong> W12345
                                </div>
                                <div className="d-flex justify-content-end mt-3">
                                    <Link to={'/update-worker'}>
                                        <button className="btn btn-light me-3">
                                            <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#31800f", }} />
                                        </button>
                                    </Link>
                                    <button className="btn">
                                        <FontAwesomeIcon icon={faTrash} style={{ color: "#f93b0b", }} />
                                    </button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="col-md-3 mb-4">
                        <Card className="staff-card shadow-sm">

                            <Card.Body>
                                <div className="staff-details">
                                    <strong>Username:</strong> johndoe<br />
                                    <strong>Email:</strong> john.doe@example.com<br />
                                    <strong>Role:</strong> Worker<br />
                                    <strong>Phone:</strong> +1234567890<br />
                                    <strong>Address:</strong> 123 Main St, City<br />
                                    <strong>Worker ID:</strong> W12345
                                </div>
                                <div className="d-flex justify-content-end mt-3">
                                    <Link to={'/update-worker'}>
                                        <button className="btn me-3">
                                            <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#31800f", }} />
                                        </button>
                                    </Link>
                                    <button className="btn">
                                        <FontAwesomeIcon icon={faTrash} style={{ color: "#f93b0b", }} />
                                    </button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>


                    <div className="col-md-3 mb-4">
                        <Card className="staff-card shadow-sm">

                            <Card.Body>
                                <div className="staff-details">
                                    <strong>Username:</strong> johndoe<br />
                                    <strong>Email:</strong> john.doe@example.com<br />
                                    <strong>Role:</strong> Worker<br />
                                    <strong>Phone:</strong> +1234567890<br />
                                    <strong>Address:</strong> 123 Main St, City<br />
                                    <strong>Worker ID:</strong> W12345
                                </div>
                                <div className="d-flex justify-content-end mt-3">
                                    <Link to={'/update-worker'}>
                                        <button className="btn me-3">
                                            <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#31800f", }} />
                                        </button>
                                    </Link>
                                    <button className="btn">
                                        <FontAwesomeIcon icon={faTrash} style={{ color: "#f93b0b", }} />
                                    </button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>


                    <div className="col-md-3 mb-4">
                        <Card className="staff-card shadow-sm">

                            <Card.Body>
                                <div className="staff-details">
                                    <strong>Username:</strong> johndoe<br />
                                    <strong>Email:</strong> john.doe@example.com<br />
                                    <strong>Role:</strong> Worker<br />
                                    <strong>Phone:</strong> +1234567890<br />
                                    <strong>Address:</strong> 123 Main St, City<br />
                                    <strong>Worker ID:</strong> W12345
                                </div>
                                <div className="d-flex justify-content-end mt-3">
                                    <Link to={'/update-worker'}>
                                        <button className="btn me-3">
                                            <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#31800f", }} />
                                        </button>
                                    </Link>
                                    <button className="btn">
                                        <FontAwesomeIcon icon={faTrash} style={{ color: "#f93b0b", }} />
                                    </button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>


                </div>
            </div>


        </>
    );
}

export default Staff;