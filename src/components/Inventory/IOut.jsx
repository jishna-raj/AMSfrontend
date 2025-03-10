import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { updateInventoryApi } from '../../services/allapi';

function IOut({ item, onUpdateSuccess }) {
    const [show, setShow] = useState(false);
    const [quantitySold, setQuantitySold] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const userRole = sessionStorage.getItem('role') || 'admin';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (quantitySold <= 0 || quantitySold > item.quantity) {
            toast.error('Invalid quantity sold');
            return;
        }

        try {
            // Prepare the updates
            const updates = {
                quantity: item.quantity - quantitySold, // Deduct the sold quantity
                $push: {
                    transactions: {
                        type: 'out',
                        quantity: quantitySold,
                        date: new Date(),
                        by: userRole // Use the user's role or ID
                    }
                }
            };

            // Update the inventory item
            const response = await updateInventoryApi(item._id, updates);

            if (response.status === 200) {
               

                onUpdateSuccess(response.data); 
                handleClose();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update item');
        }
    };

    return (
        <>
            <Button variant="outline-warning" onClick={handleShow} className="ms-2">
                <FontAwesomeIcon icon={faRightLeft} />
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Deduct Quantity - {item.itemName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">
                                Available Quantity: {item.quantity} {item.unit}
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                value={quantitySold}
                                onChange={(e) => setQuantitySold(Number(e.target.value))}
                                min="1"
                                max={item.quantity}
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="warning" type="submit">
                                Confirm Deduction
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default IOut;