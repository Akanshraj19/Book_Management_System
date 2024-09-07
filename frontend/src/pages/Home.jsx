import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="Home-page bg-dark text-white container-fluid d-flex justify-content-center align-items-center">
      <div className="row container">
        <div
          className=" col-lg-6 d-flex justify-content-center align-items-start flex-column"
          style={{ height: "91.5vh" }}
        >
          <h2 style={{ fontSize: "70px", color: " blue" }}>BOOK STORE</h2>
          <h3 style={{ fontSize: "40px" }}>FOR YOU</h3>
          <p className="mb-0" style={{ color: "silver" }}>
            Check out the books from here
          </p>
          <Link to="/books" className="viewbook my-3">
            VIEW BOOKS{" "}
          </Link>
        </div>
        <div
          className=" col-lg-6 d-flex justify-content-center align-items-end flex-column"
          style={{ height: "91.5vh" }}
        >
          <img
            style={{ border: "10px solid green", borderRadius: "20px" }}
            className="image-fluid homing "
            src="https://i.pinimg.com/originals/09/cf/82/09cf82ca15144dc7f6f09d3012c0241b.jpg"
            alt="/"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
