import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IUpdate from '../Inventory/IUpdate';
import IAdd from '../Inventory/IAdd';
import { Link } from 'react-router-dom';

function InventoryManagement() {
    return (
        <div className="invent">
            <div
                className="p-2 text-light d-flex justify-content-between align-items-center"
                style={{ backgroundImage: "linear-gradient(180deg, #083b14, #0a551a)" }}
            >
                <Link to={'/admin'} style={{ textDecoration: 'none', color: 'white' }}> <h2 className="ms-3 fw-bold">Inventory Management</h2></Link>
                <IAdd />
            </div>

            <div className="row ms-5">

                <div className="col-md-3 ms-3 mt-5 ms-3 mt-5">
                    <div className="card-container1  shadow">
                        <div className="card custom-card">
                            <div className="card-header1">
                                <h5 className="card-title fw-bold">Notebooks</h5>
                            </div>
                            <div className="card-body">
                                <div className="card-item">
                                    <span className="item-label">Category:</span>
                                    <span className="item-value">Stationery</span>
                                </div>
                                <div className="card-item">
                                    <span className="item-label">Quantity:</span>
                                    <span className="item-value">200</span>
                                </div>
                                <div className="card-item">
                                    <span className="item-label">Unit Price:</span>
                                    <span className="item-value">₹5</span>
                                </div>
                                <div className="card-item">
                                    <span className="item-label">Supplier:</span>
                                    <span className="item-value">Supplier C</span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-sm">
                                    <IUpdate />
                                </button>
                                <button className="btn btn-sm ms-3">
                                    <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 ms-3 mt-5">
                    <div className="card-container1 shadow">
                        <div className="card custom-card">
                            <div className="card-header1">
                                <h5 className="card-title fw-bold">Notebooks</h5>
                            </div>
                            <div className="card-body">
                                <div className="card-item">
                                    <span className="item-label">Category:</span>
                                    <span className="item-value">Stationery</span>
                                </div>
                                <div className="card-item">
                                    <span className="item-label">Quantity:</span>
                                    <span className="item-value">200</span>
                                </div>
                                <div className="card-item">
                                    <span className="item-label">Unit Price:</span>
                                    <span className="item-value">₹5</span>
                                </div>
                                <div className="card-item">
                                    <span className="item-label">Supplier:</span>
                                    <span className="item-value">Supplier C</span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-sm">
                                    <IUpdate />
                                </button>
                                <button className="btn btn-sm ms-3">
                                    <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="col-md-3 ms-3 mt-5">
                    <div className="card-container1 shadow">
                        <div className="card custom-card">
                            <div className="card-header1">
                                <h5 className="card-title fw-bold">Notebooks</h5>
                            </div>
                            <div className="card-body">
                                <div className="card-item">
                                    <span className="item-label">Category:</span>
                                    <span className="item-value">Stationery</span>
                                </div>
                                <div className="card-item">
                                    <span className="item-label">Quantity:</span>
                                    <span className="item-value">200</span>
                                </div>
                                <div className="card-item">
                                    <span className="item-label">Unit Price:</span>
                                    <span className="item-value">₹5</span>
                                </div>
                                <div className="card-item">
                                    <span className="item-label">Supplier:</span>
                                    <span className="item-value">Supplier C</span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-sm">
                                    <IUpdate />
                                </button>
                                <button className="btn btn-sm ms-3">
                                    <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 ms-3 mt-5">
                    <div className="card-container1 shadow">
                        <div className="card custom-card">
                            <div className="card-header1">
                                <h5 className="card-title fw-bold">Notebooks</h5>
                            </div>
                            <div className="card-body">
                                <div className="card-item">
                                    <span className="item-label">Category:</span>
                                    <span className="item-value">Stationery</span>
                                </div>
                                <div className="card-item">
                                    <span className="item-label">Quantity:</span>
                                    <span className="item-value">200</span>
                                </div>
                                <div className="card-item">
                                    <span className="item-label">Unit Price:</span>
                                    <span className="item-value">₹5</span>
                                </div>
                                <div className="card-item">
                                    <span className="item-label">Supplier:</span>
                                    <span className="item-value">Supplier C</span>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-sm">
                                    <IUpdate />
                                </button>
                                <button className="btn btn-sm ms-3">
                                    <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>







                <div className="row mt-4 m-5">
                    <div className="col-md-11">
                        <h4>Low Stock Alerts</h4>
                        <div className="alert alert-warning">
                            Rice (Category: Food) is running low. Current stock: 10.
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
        </div>
    );
}

export default InventoryManagement;