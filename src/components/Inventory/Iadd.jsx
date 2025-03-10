import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { addInventoryApi } from '../../services/allapi';
import { toast } from 'react-toastify';

function IAdd({ onAddItem = () => {} }) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    quantity: '',
    unit: '',
    minimumThreshold: '',
    unitPrice: '',
    supplier: '',
    expiryDate: '',
  });

  const userRole = sessionStorage.getItem('role') || 'admin';

  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Convert numeric fields
      const numericFields = {
        quantity: parseFloat(formData.quantity),
        unitPrice: parseFloat(formData.unitPrice),
        minimumThreshold: parseFloat(formData.minimumThreshold)
      };

      // Validate numbers
      if (Object.values(numericFields).some(isNaN)) {
        throw new Error('Invalid numeric values in quantity, price, or threshold');
      }

      // Create initial transaction
      const initialTransaction = {
        type: 'in',
        quantity: numericFields.quantity,
        date: new Date(),
        by: userRole
      };

      // Create full item payload
      const newItem = {
        ...formData,
        ...numericFields,
        expiryDate: new Date(formData.expiryDate),
        lastRestocked: new Date(),
        lastRestockedBy: userRole,
        alertTriggered: numericFields.quantity < numericFields.minimumThreshold,
        transactions: [initialTransaction]
      };

      // API call
      const response = await addInventoryApi(newItem);
      
      if (response?.data) {
        onAddItem(response.data);
        handleClose();
        toast.success('Item added successfully!');
        resetForm();
      }
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error(error.message || 'Failed to add item. Please check all fields.');
    }
  };

  const resetForm = () => {
    setFormData({
      itemName: '',
      category: '',
      quantity: '',
      unit: '',
      minimumThreshold: '',
      unitPrice: '',
      supplier: '',
      expiryDate: '',
    });
  };

  return (
    <>
      <button className="mb-4 btn mt-3 me-2" onClick={handleShow}>
        <FontAwesomeIcon icon={faPlus} beat style={{ color: '#f2f4f8' }} />
      </button>

      <Modal show={show} onHide={handleClose} className="p-5 mt-1">
        <Modal.Header closeButton>
          <Modal.Title>Add New Inventory Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="p-2" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Item Name *</label>
              <input
                type="text"
                name="itemName"
                className="form-control"
                value={formData.itemName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Category *</label>
              <select
                name="category"
                className="form-control"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="food">Food</option>
                <option value="medical">Medical</option>
                <option value="stationery">Stationery</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Unit *</label>
                <input
                  type="text"
                  name="unit"
                  className="form-control"
                  value={formData.unit}
                  onChange={handleChange}
                  placeholder="e.g., kg, pieces"
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label>Unit Price (₹) *</label>
                <input
                  type="number"
                  name="unitPrice"
                  className="form-control"
                  value={formData.unitPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Minimum Threshold *</label>
                <input
                  type="number"
                  name="minimumThreshold"
                  className="form-control"
                  value={formData.minimumThreshold}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label>Supplier *</label>
              <input
                type="text"
                name="supplier"
                className="form-control"
                value={formData.supplier}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Expiry Date *</label>
              <input
                type="date"
                name="expiryDate"
                className="form-control"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Add Item
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default IAdd;