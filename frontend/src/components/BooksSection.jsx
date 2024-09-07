import React from "react";

const BooksSection = ({ data }) => {
  console.log(data);
  return (
    <div className="d-flex justify-content-around align-items-center">
      {data &&
        data.map((item, index) => (
          <div
            style={{ border: "1px solid white", borderRadius: "20px" }}
            className="card bg-dark"
          >
            <div>
              <img
                style={{ width: "280px", height: "250px" }}
                className="rounded-corners img-fluid"
                src={item.image}
                alt="/"
              />
            </div>
            <h6 className="d-flex justify-content-center align-items-center text-white m-0 ">
              {item.BookTitle}
            </h6>
            <b className="d-flex justify-content-center align-items-center text-white ">
              By- {item.Author}
            </b>
            <div className="d-flex justify-content-evenly align-items-center m-2">
              <button className="btn btn-primary">Update</button>
              <button className="btn btn-danger">Delete</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BooksSection;
