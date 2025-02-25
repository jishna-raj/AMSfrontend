import React from 'react'

function ParentReg() {
    return (
        <div className="cont1 vh-100">

            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="login-container ">
                        <div className="login-form">
                            <h2>Parent Registration</h2>
                            <form>
                                <div className='mb-3'>

                                    <input type="text" placeholder="Enter username" className='form-control' />
                                </div>

                                <div className='mb-3'>

                                    <input type="email" placeholder="Enter email" className='form-control' />
                                </div>

                                <div className='mb-3'>

                                    <input type="password" placeholder="Enter password" className='form-control' />
                                </div>

                                <div className='mb-3'>

                                    <input type="text" placeholder="Enter child's name" className='form-control' />
                                </div>

                                <div className='mb-3'>
                                    
                                    <input type="text" placeholder="Enter child's ID" className='form-control'/>
                                </div>

                                <button type="submit" className='btn btn-outline-primary w-100'>Register</button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-md-4"></div>
            </div>
        </div>
    )
}

export default ParentReg