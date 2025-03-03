import React from 'react';
import { Card, Table, Button, Form } from 'react-bootstrap';

function Report() {
    // Dummy data for demonstration
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Worker' },
    ];

    const beneficiaries = [
        { id: 1, name: 'Alice Johnson', age: 30, gender: 'Female', status: 'Active' },
        { id: 2, name: 'Bob Brown', age: 25, gender: 'Male', status: 'Inactive' },
    ];

    const inventory = [
        { id: 1, item: 'Vaccine A', quantity: 100, location: 'Warehouse 1' },
        { id: 2, item: 'Vaccine B', quantity: 50, location: 'Warehouse 2' },
    ];

    const staff = [
        { id: 1, name: 'John Doe', role: 'Health Official', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', role: 'Worker', email: 'jane@example.com' },
    ];

    const vaccinations = [
        { id: 1, beneficiary: 'Alice Johnson', vaccine: 'Vaccine A', date: '2023-10-01' },
        { id: 2, beneficiary: 'Bob Brown', vaccine: 'Vaccine B', date: '2023-10-02' },
    ];

    const healthHistory = [
        { id: 1, beneficiary: 'Alice Johnson', condition: 'Fever', date: '2023-09-30' },
        { id: 2, beneficiary: 'Bob Brown', condition: 'Cough', date: '2023-09-29' },
    ];

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
                                <button  className="w-100 rounded-pill py-2 butt text-light fw-bold">
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
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
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
                                <tr key={beneficiary.id}>
                                    <td>{beneficiary.id}</td>
                                    <td>{beneficiary.name}</td>
                                    <td>{beneficiary.age}</td>
                                    <td>{beneficiary.gender}</td>
                                    <td>{beneficiary.status}</td>
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
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.item}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.location}</td>
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
                                <tr key={staffMember.id}>
                                    <td>{staffMember.id}</td>
                                    <td>{staffMember.name}</td>
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
                            {vaccinations.map((vaccination) => (
                                <tr key={vaccination.id}>
                                    <td>{vaccination.id}</td>
                                    <td>{vaccination.beneficiary}</td>
                                    <td>{vaccination.vaccine}</td>
                                    <td>{vaccination.date}</td>
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
                            {healthHistory.map((history) => (
                                <tr key={history.id}>
                                    <td>{history.id}</td>
                                    <td>{history.beneficiary}</td>
                                    <td>{history.condition}</td>
                                    <td>{history.date}</td>
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