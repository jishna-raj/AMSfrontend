import React, { useState, useEffect } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IUpdate from '../Inventory/IUpdate';
import IOut from '../Inventory/IOut';
import IAdd from '../Inventory/IAdd';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { getAllinventoryApi, deleteinventoryApi } from '../../services/allapi'; // Import delete API
import Spinner from 'react-bootstrap/Spinner'; // For loading spinner

function InventoryManagement() {
    const [inventory, setInventory] = useState([]);
    const [allTransactions, setAllTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    
  const [deleteStatus,setDeleteStatus] = useState(false)

    // Fetch inventory and process transactions
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await getAllinventoryApi();
                if (response.data && Array.isArray(response.data)) {
                    setInventory(response.data);
                    console.log(response.data);
                    

                    // Process all transactions
                    const transactions = response.data.flatMap(item => 
                        item.transactions?.map(t => ({
                            ...t,
                            itemId: item._id,
                            itemName: item.itemName,
                            date: t.date ? new Date(t.date) : new Date()
                        })) || []
                    ).sort((a, b) => b.date - a.date);

                    setAllTransactions(transactions);
                }
            } catch (err) {
                setError(err.message);
                toast.error('Failed to load inventory data');
            } finally {
                setLoading(false);
            }
        };
        fetchInventory();
    }, []);

    // Handle item update success
    const handleUpdateSuccess = (updatedItem) => {
        setInventory(prev => prev.map(item => 
            item._id === updatedItem._id ? updatedItem : item
        ));

        const newTransactions = updatedItem.transactions || [];
        if (newTransactions.length > 0) {
            const updatedTransactions = newTransactions.map(t => ({
                ...t,
                itemId: updatedItem._id,
                itemName: updatedItem.itemName,
                date: t.date ? new Date(t.date) : new Date()
            }));

            setAllTransactions(prev => [
                ...updatedTransactions,
                ...prev.filter(t => t.itemId !== updatedItem._id)
            ]);
        }

        toast.success('Item updated successfully!');
    };

    // Handle item deletion
    const handleDeleteItem = async (id) => {
        
        try {
            const response = await deleteinventoryApi(id);

            console.log(response);
            
            if (response.status==200) {
                toast.success(`${response.data.deletedItem.itemName} deleted successfully`);
                const updatedinventory = inventory.filter(inventory=>inventory._id !== id) 
                setInventory(updatedinventory)

                setDeleteStatus(true)
            } else {
                toast.error(response.message || "Failed to delete item");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            toast.error("An error occurred while deleting the item.");
        }
    };

    // Get low stock items
    const getLowStockItems = () => {
        return inventory.filter(item => 
            item.quantity < item.minimumThreshold
        );
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Filter transactions that are less than 10 days old
    const filterTransactions = (transactions) => {
        const tenDaysAgo = new Date();
        tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

        return transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate > tenDaysAgo;
        });
    };

    // Update filtered transactions whenever allTransactions changes
    useEffect(() => {
        const filtered = filterTransactions(allTransactions);
        setFilteredTransactions(filtered.slice(0, 10)); // Keep max 10
    }, [allTransactions]);


    useEffect(()=>{
        setDeleteStatus(false)
    },[deleteStatus,inventory])

    if (loading) return (
        <div className="text-center mt-5">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );

    if (error) return <div className="text-center mt-5 text-danger">Error: {error}</div>;

    return (
        <>
            <div className="invent p-2 text-light d-flex justify-content-between align-items-center">
                <Link to="/admin" className="text-decoration-none text-white">
                    <h2 className="ms-3 fw-bold">Inventory Management</h2>
                </Link>
                <IAdd onAddItem={(newItem) => setInventory(prev => [...prev, newItem])} />
            </div>

            {/* Low Stock Alerts Section */}
            <div className="row mt-4 m-5">
                <div className="col-md-12">
                    <h4 className="mb-3">Low Stock Alerts</h4>
                    {getLowStockItems().length > 0 ? (
                        getLowStockItems().map(item => (
                            <div key={item._id} className="alert alert-warning">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{item.itemName}</strong> - 
                                        Current Stock: {item.quantity} {item.unit} | 
                                        Minimum Threshold: {item.minimumThreshold}
                                    </div>
                                    <IUpdate 
                                        item={item} 
                                        onUpdateSuccess={handleUpdateSuccess} 
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="alert alert-success">
                            All items are within safe stock levels
                        </div>
                    )}
                </div>
            </div>

            {/* Inventory Items */}
            <div className="row ms-5 mt-4">
                {inventory.map((item) => (
                    <div className="col-md-3 ms-3 mt-4" key={item._id}>
                        <div className="card shadow-sm">
                            <div className="card-header2 bg-light">
                                <h5 className="card-title fw-bold text-primary">
                                    {item.itemName}
                                    {item.quantity < item.minimumThreshold && (
                                        <span className="badge bg-danger ms-2">Low Stock</span>
                                    )}
                                </h5>
                                <div className="bg-dark" style={{ height: "1px" }}></div>
                            </div>
                            <div className="card-body">
                                <div className="mb-2">
                                    <span className="fw-medium">Quantity: </span>
                                    {item.quantity} {item.unit}
                                </div>
                                <div className="mb-2">
                                    <span className="fw-medium">Unit Price: </span>
                                    ₹{item.unitPrice?.toFixed(2)}
                                </div>
                                <div className="mb-2">
                                    <span className="fw-medium">Supplier: </span>
                                    {item.supplier}
                                </div>
                                <div className="mb-2">
                                    <span className="fw-medium">Expiry Date: </span>
                                    {formatDate(item.expiryDate)}
                                </div>
                                <div className="mb-2">
                                    <span className="fw-medium">Last Updated: </span>
                                    {formatDate(item.updatedAt)}
                                </div>
                            </div>
                            <div className="card-footer bg-white d-flex justify-content-between">
                                <IUpdate item={item} onUpdateSuccess={handleUpdateSuccess} />
                                <IOut item={item} onUpdateSuccess={handleUpdateSuccess} />
                                <button 
                                    className="btn btn-sm" 
                                    onClick={() => handleDeleteItem(item._id)}
                                >
                                    <FontAwesomeIcon icon={faTrash} className="text-danger" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Transactions Section */}
            <div className="row mt-4 m-5">
                <div className="col-md-12">
                    <h4 className="mb-3">Recent Transactions (Last 10 Days)</h4>
                    <div className="transaction-list">
                        {filteredTransactions.map(transaction => (
                            <div 
                                key={`${transaction.itemId}-${transaction.date}`} 
                                className="alert alert-info mb-2"
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <small className="text-muted d-block">
                                            {formatDate(transaction.date)}
                                        </small>
                                        <span className="d-block">
                                            <strong>{transaction.itemName}</strong> - 
                                            {transaction.type === 'in' ? ' Restocked ' : ' Sold '}
                                            {transaction.quantity} {transaction.unit}
                                        </span>
                                    </div>
                                    <span className={`badge ${
                                        transaction.type === 'in' ? 'bg-success' : 'bg-warning'
                                    }`}>
                                        {transaction.type?.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {filteredTransactions.length === 0 && (
                            <div className="alert alert-secondary">
                                No transactions found
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ToastContainer autoClose={2000} theme="colored" position="top-center" />
        </>
    );
}

export default InventoryManagement;