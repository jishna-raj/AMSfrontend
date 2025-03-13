import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserApi } from '../../services/allapi';

function Useredit({ user, updateUserList }) {
    const [show, setShow] = useState(false); // State to control modal visibility
    const [name, setName] = useState(''); // State for user's name
    const [email, setEmail] = useState(''); // State for user's email
    const [role, setRole] = useState(''); // State for user's role
    const [status, setStatus] = useState('active'); // State for user's status

    // Use useEffect to set the form fields when the user prop changes
    useEffect(() => {
        if (user) {
            setName(user.username);
            setEmail(user.email);
            setRole(user.role);
            setStatus(user.status || 'active'); // Default to 'active' if status is not defined
        }
    }, [user]);

    // Function to handle modal close
    const handleClose = () => setShow(false);

    // Function to handle modal open
    const handleShow = () => setShow(true);

    // Function to handle saving updated user data
    const handleSave = async () => {
        try {
            // Prepare the request body
            const reqBody = {
                username: name,
                email: email,
                role: role,
                status: status,
            };

            // Call the update API
            const response = await updateUserApi(user._id, reqBody);

            if (response.status >= 200 && response.status < 300) {
                toast.success('User updated successfully!');

                // Update the user list in the parent component
                const updatedUser = { ...user, ...reqBody }; // Merge the updated fields
                updateUserList(updatedUser);

                handleClose(); // Close the modal
            } else {
                toast.error('Failed to update user.');
            }
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('An error occurred while updating the user.');
        }
    };

    return (
        <>
            {/* Edit Button */}
            <button className="btn btn-edit" onClick={handleShow}>
                <FontAwesomeIcon icon={faEdit} />
            </button>

            {/* Edit User Modal */}
            <Modal show={show} onHide={handleClose} centered backdrop="static" className="transparent-modal">
                <Modal.Header closeButton style={{ border: 'none' }}>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Name Field */}
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                readOnly
                            />
                        </Form.Group>

                        {/* Email Field */}
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                readOnly
                            />
                        </Form.Group>

                        {/* Role Field */}
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                readOnly
                            />
                        </Form.Group>

                        {/* Status Field */}
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{ border: 'none' }}>
                    {/* Close Button */}
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* Save Button */}
                    <Button variant="primary" onClick={handleSave}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Useredit;