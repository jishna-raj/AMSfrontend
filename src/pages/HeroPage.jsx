import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
/* import background from '../assets/anganwadi-banner.webp';  */// Update the background image accordingly

function HeroPage() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center flex-column"
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage:`url(https://t4.ftcdn.net/jpg/05/30/10/03/360_F_530100389_sCIZyhoqhhiv6XP2uTx3xFYuLeMIvFfJ.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
      }}
    >

<Link to={'/parent-register'}><button className="btn btn-light text-dark fw-bold my-5 " style={{marginLeft:'1100px'}}>Parent section <FontAwesomeIcon icon={faArrowRight} className="ms-2" /></button></Link>
      <div className="row p-4">
      
        <div className="col-md-12 text-center">
          <div id="homeHeading" data-aos="fade-down-right">
            <h1
              style={{
                color: "white",
                fontWeight: "800",
                fontSize: "70px",
              }}
            >
              Welcome to Anganwadi Management System
            </h1>
          </div>
          <h3
            style={{ color: "white", fontWeight: "600", fontSize: "30px" }}
          >
            "Empowering Childcare and Motherhood"
          </h3>
          <p
            className="mt-3"
            style={{ color: "white", fontWeight: "600", fontSize: "16px" }}
          >
            Register children, manage attendance, track health records, and monitor nutritional plans with ease.
            <br /> Your journey to efficient Anganwadi management starts here!
          </p>
        </div>
      </div>
     
        <Link to={"/admin-log"}>
            <button className="btn btn-light text-dark fw-bold my-5" style={{marginTop:"170px"}}>
              Get started <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
            </button>
        </Link>

        
     
    </div>
  );
}

export default HeroPage;
