import React from 'react';
import './About.css';

function About() {
    return (
        <div className="about-container">
            <div className="row about-row">
                <h1 style={{ fontWeight: '600', textAlign: "center", marginTop: '50px', color: 'rgb(6, 59, 6)' }}>ABOUT US</h1>

                <div className="col-md-5 d-flex justify-content-center align-items-center flex-column">


                    <img src="https://img.freepik.com/free-vector/child-adoption-concept-illustration_114360-8738.jpg" alt="About" className="about-img" />
                </div>
                <div className="col-md-5">

                    <p className="about-text">


                        <br /><br />

                        <strong>Who We Are:</strong> We are a dedicated team committed to improving the lives of children and mothers through technology. Our system is designed to support Anganavadi centers in their crucial role of providing nutrition, health care, and early education.

                        <br /><br />

                        <strong>What We Do:</strong> Our Anganavadi Management System automates and simplifies the administrative tasks of Anganavadi centers. Key features include:

                        <ul>
                            <li><strong>Student Registration:</strong> Easily register and maintain student details.</li>
                            <li><strong>Beneficiary Management:</strong> Organize and manage the Beneficiaries.</li>
                            <li><strong>Event Notifications:</strong> Generate and send notifications for events and important updates.</li>
                            <li><strong>Health and Nutrition Tracking:</strong> Monitor and provide updates on food supplements, immunizations, and other health-related services.</li>

                        </ul>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
