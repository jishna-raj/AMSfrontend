import { faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { allWorkerApi, deleteWorkerApi } from '../../services/allapi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Staff.css';

function Staff() {
    const [workers, setWorkers] = useState([]);

    useEffect(() => {
        fetchWorkers();
    }, []);

    const fetchWorkers = async () => {
        try {
            const response = await allWorkerApi();
            if (response.status === 200) {
                setWorkers(response.data.workers);
            } else {
                toast.error(response.message || 'Failed to fetch workers.');
            }
        } catch (error) {
            console.error('Error fetching workers:', error);
            toast.error('An error occurred while fetching workers.');
        }
    };

    const handleDeleteWorker = async (workerId) => {
        if (window.confirm('Are you sure you want to delete this worker?')) {
            try {
                const response = await deleteWorkerApi(workerId);
                
                if (response.status === 200) {
                    setWorkers(workers.filter(worker => worker._id !== workerId));
                    toast.success('Worker deleted successfully!');
                } else {
                    toast.error(response.data?.message || 'Failed to delete worker');
                }
            } catch (error) {
                console.error('Error deleting worker:', error);
                toast.error(error.response?.data?.message || 'An error occurred while deleting worker');
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <>
            <div className="staff-container">
                {/* Header Section */}
                <div className="p-3 text-white" style={{ backgroundImage: "linear-gradient(180deg, #083b14, #0a551a)" }}>
                    <div className='cont5'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                               <Link to={'/admin'} style={{textDecoration:"none",color:"white"}}> <h2 className="fw-bold mb-0">Staff Management</h2></Link>
                            </div>
                            <div>
                                <Link to="/add-worker">
                                    <button className="btn text-light rounded p-2">
                                        <FontAwesomeIcon icon={faPlus} size="lg" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Staff Cards */}
                <Row className="mt-5 justify-content-center">
                    {workers.map((worker) => (
                        <Col key={worker._id} md={4} lg={3} className="mb-4">
                            <Card className="staff-card shadow-sm h-100">
                                <Card.Body>
                                    <div className="staff-details">
                                        <h5 className="fw-bold mb-3">{worker.username}</h5>
                                        <p className="mb-1"><strong>Email:</strong> {worker.email}</p>
                                        <p className="mb-1"><strong>Role:</strong> {worker.role}</p>
                                        <p className="mb-1"><strong>Phone:</strong> {worker.phone}</p>
                                        <p className="mb-1"><strong>Address:</strong> {worker.address}</p>
                                        <p className="mb-1"><strong>Worker ID:</strong> {worker.workerId}</p>
                                        <p className="mb-0"><strong>Joining Date:</strong> {formatDate(worker.joiningDate)}</p>
                                    </div>
                                    <div className="d-flex justify-content-end mt-3">
                                        <Link to={`/update-worker/${worker._id}`}>
                                            <Button variant="outline-success" className="me-2">
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </Button>
                                        </Link>
                                        <Button 
                                            variant="outline-danger"
                                            onClick={() => handleDeleteWorker(worker._id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            <ToastContainer 
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
}

export default Staff;