import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';



function IAdd() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
   <>
   <button className="mb-4 btn mt-3 me-2" onClick={handleShow}>
   <FontAwesomeIcon icon={faPlus} beat style={{color: "#f2f4f8",}} />
            </button>

            {/* Add/Edit Modal */}
            <Modal show={show} onHide={handleClose} className='p-5 mt-1 '>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='p-2' >
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
                                Add
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

export default IAdd