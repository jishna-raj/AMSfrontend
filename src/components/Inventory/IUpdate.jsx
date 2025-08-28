import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { updateInventoryApi } from '../../services/allapi';
import { toast } from 'react-toastify';

function IUpdate({ item, onUpdateSuccess }) {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        itemName: '',
        category: '',
        quantity: '',
        supplier: '',
        unit: 'units',
        minimumThreshold: '',
        expiryDate: '',
        lastRestocked: '',
        transactions: []
    });

    const parseBackendDate = (dateString) => {
        if (!dateString) return '';
        
        // Handle ISO format
        if (dateString.includes('T')) {
            return dateString.split('T')[0];
        }
        
        // Handle "25 Oct 2023" format
        if (dateString.match(/[a-zA-Z]{3}/)) {
            const date = new Date(dateString);
            if (!isNaN(date)) {
                return date.toISOString().split('T')[0];
            }
        }
        
        return dateString;
    };

    useEffect(() => {
        if (item) {
            setFormData({
                itemName: item.itemName || '',
                category: item.category || '',
                quantity: item.quantity || '',
                supplier: item.supplier || '',
                unit: item.unit || 'units',
                minimumThreshold: item.minimumThreshold || '',
                expiryDate: parseBackendDate(item.expiryDate),
                lastRestocked: parseBackendDate(item.lastRestocked) || new Date().toISOString().split('T')[0],
                transactions: item.transactions || []
            });
        }
    }, [item]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const userRole = sessionStorage.getItem('role') || 'admin';

    const validateFormData = () => {
        const { quantity, minimumThreshold, expiryDate, lastRestocked } = formData;

        // Check if quantity, unitPrice, and minimumThreshold are valid numbers
        if (isNaN(quantity) || quantity < 0) {
            toast.error('Quantity must be a valid number');
            return false;
        }
        
        if (isNaN(minimumThreshold) || minimumThreshold < 0) {
            toast.error('Minimum threshold must be a valid number');
            return false;
        }

        // Check if expiryDate and lastRestocked are valid dates
        if (isNaN(new Date(expiryDate))) {
            toast.error('Invalid expiry date');
            return false;
        }
        if (isNaN(new Date(lastRestocked))) {
            toast.error('Invalid restock date');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data before proceeding
        if (!validateFormData()) return;

        try {
            // Calculate the difference between the new quantity and the previous quantity
            const previousQuantity = item.quantity;
            const newQuantity = formData.quantity;
            const quantityDifference = newQuantity - previousQuantity;

            // Create a new transaction object
            const newTransaction = {
                type:'in',
                quantity:quantityDifference,
                date: new Date().toISOString(),
                by:userRole
                
            };

            // Add the new transaction to the transactions array
            const updatedTransactions = [...formData.transactions, newTransaction];
            console.log(formData.transactions);
            

            // Prepare the payload for the API call
            const reqBody = {
                ...formData,
                transactions: updatedTransactions,
                expiryDate: new Date(formData.expiryDate).toISOString(),
                lastRestocked: new Date(formData.lastRestocked).toISOString(),
                quantity: Number(formData.quantity),
                minimumThreshold: Number(formData.minimumThreshold)
            };

            // Log the payload for debugging
           /*  console.log("Payload being sent:", reqBody);
            console.log(item._id); */
            

            // Make the API call to update the inventory
            const response = await updateInventoryApi(item._id, reqBody);
            console.log(response);
            

            if (response.status === 200) {
                toast.info(`Quantity changed by ${quantityDifference}. New quantity: ${newQuantity}`);
                onUpdateSuccess(response.data);
                handleClose();
            }
        } catch (error) {
            console.error("Error response from server:", error.response?.data);
            toast.error(error.response?.data?.message || 'Failed to update item');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quantity'|| name === 'minimumThreshold' 
                   ? Number(value) 
                   : value
        }));
    };

    return (
        <>
            <button onClick={handleShow} className="btn btn-sm">
                <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#19629a" }} />
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit {item.itemName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>Item Name</label>
                            <input
                                type="text"
                                name="itemName"
                                className="form-control"
                                value={formData.itemName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Category</label>
                            <select
                                name="category"
                                className="form-control"
                                value={formData.category}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="food">Food</option>
                                <option value="medical">Medical</option>
                                <option value="stationery">Stationery</option>
                            </select>
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    className="form-control"
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Unit</label>
                                <select
                                    name="unit"
                                    className="form-control"
                                    value={formData.unit}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="kg">kg</option>
                                    <option value="liters">liters</option>
                                    <option value="units">units</option>
                                    <option value="packets">packets</option>
                                </select>
                            </div>
                        </div>

                       
                        <div className="mb-3">
                            <label>Supplier</label>
                            <input
                                type="text"
                                name="supplier"
                                className="form-control"
                                value={formData.supplier}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label>Minimum Threshold</label>
                            <input
                                type="number"
                                name="minimumThreshold"
                                className="form-control"
                                value={formData.minimumThreshold}
                                onChange={handleInputChange}
                                min="0"
                                required
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label>Expiry Date</label>
                                <input
                                    type="date"
                                    name="expiryDate"
                                    className="form-control"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label>Last Restocked</label>
                                <input
                                    type="date"
                                    name="lastRestocked"
                                    className="form-control"
                                    value={formData.lastRestocked}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-end gap-2">
                            <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-secondary"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
  
export default IUpdate;