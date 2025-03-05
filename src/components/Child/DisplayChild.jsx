import React, { useEffect, useState } from 'react';
import { faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { deleteChildApi, getallchildApi } from '../../services/allapi';
import { toast, ToastContainer } from 'react-toastify';


function DisplayChild() {
  const [children, setChildren] = useState([]); // State to store the list of children
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors

  // Fetch all children when the component mounts
  useEffect(() => {
    const allChildren = async () => {
      try {
        const response = await getallchildApi();
        /* console.log(response); */
       /*  console.log(children); */
        
         // Call the API
        if (response && response.data.children) {
          setChildren(response.data.children); // Update state with fetched data
        } else {
          setError('No children found'); // Handle case where no data is returned
        }
      } catch (err) {
        setError('Failed to fetch children'); // Handle API errors
        console.error('Error fetching children:', err);
      } finally {
        setLoading(false); // Set loading to false after the operation
      }
    };
allChildren();
  }, []);



  // Display loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display error state
  if (error) {
    return <div>{error}</div>;
  }


  const handleDeleteChild = async (id) => {
    try {
      const response = await deleteChildApi(id)
      if (response.status === 200) {
        toast.success('Child deleted successfully');
        fetchChildren(); // Refresh the list of children
      } else {
        toast.error('Failed to delete child');
      }
    } catch (err) {
      console.error('Error deleting child:', err);
      toast.error('Failed to delete child');
    }
  };

  return (
    <>
      <div className="invent">
        <div
          className="p-2 text-light d-flex justify-content-between align-items-center"
          style={{ backgroundImage: "linear-gradient(180deg, #083b14, #0a551a)" }}
        >
          <Link to={'/admin'} style={{ textDecoration: 'none', color: 'white' }}>
            <h2 className="ms-3 fw-bold">Child Management</h2>
          </Link>
          <Link to={'/add-child'}>
            <FontAwesomeIcon icon={faPlus} beat style={{ color: '#edf1f7' }} className="me-5" />
          </Link>
        </div>

        <div className="row w-100">
          {children.map((child) => (
            <div className="col-md-3 ms-4 mt-4" key={child.id}>
              <div className="card-container1 shadow">
                <div className="card custom-card">
                  <div className="card-header1">
                    <Link to={`/child/${child.id}`} style={{ textDecoration: 'none', color: 'green' }}>
                      <h5 className="card-title fw-bold">{child.name}</h5>
                    </Link>
                  </div>
                  <div className="card-body">
                    <div className="card-item">
                      <span className="item-label">Age:</span>
                      <span className="item-value">{child.age}</span>
                    </div>
                    <div className="card-item">
                      <span className="item-label">Gender:</span>
                      <span className="item-value">{child.gender}</span>
                    </div>
                    <div className="card-item">
                      <span className="item-label">Date of Birth:</span>
                      <span className="item-value">{new Date(child.dateOfBirth).toLocaleDateString()}</span>
                    </div>
                    <div className="card-item">
                      <span className="item-label">Address:</span>
                      <span className="item-value">
                        {child.address.street}, {child.address.city}
                      </span>
                    </div>
                  </div>
                  <div className="card-footer">
                    <Link to={`/update-child/${child.id}`}>
                      <button className="btn btn-sm">
                        <FontAwesomeIcon icon={faPenToSquare} style={{ color: 'green' }} />
                      </button>
                    </Link>
                    <button className="btn btn-sm" onClick={() => handleDeleteChild(child.id)}> 
                      <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row mt-4 m-5">
          <div className="col-md-11">
            <h4>Health Alerts</h4>
            <div className="alert alert-warning">
              Rahul Sharma (Age: 5) is due for a Polio booster shot.
            </div>
            <div className="alert alert-danger">
              Priya Patel (Age: 4) is underweight. Please monitor nutrition.
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </>
  );
}

export default DisplayChild;