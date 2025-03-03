import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';



function IUpdate() {

    const [show, setShow] = useState(false);
    
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);


  return (
    <>
     <button onClick={handleShow}>
     <FontAwesomeIcon icon={faPenToSquare} style={{color: "#19629a"}} />
            </button>

            {/* Add/Edit Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label>Item Name</label>
                            <input
                                type="text"
                                placeholder="Item Name"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label>Category</label>
                            <select
                                className="form-control"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Food">Food</option>
                                <option value="Medical">Medical</option>
                                <option value="Stationery">Stationery</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label>Quantity</label>
                            <input
                                type="number"
                                placeholder="Quantity"
                                className="form-control"
                                min={'0'}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label>Unit Price</label>
                            <input
                                type="number"
                                placeholder="Unit Price"
                                className="form-control"
                                min={'0'}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label>Supplier</label>
                            <input
                                type="text"
                                placeholder="Supplier"
                                className="form-control"
                                required
                            />
                        </div>
                        <div className='d-flex justify-content-end align-items-center'>
                            <button type="submit" className="me-2 btn btn-success ">
                                Update
                            </button>
    
                            <button type="submit" className='btn btn-danger'>
                               Cancel
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
    
    </>
  )
}

export default IUpdate