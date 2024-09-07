import React, { useState } from "react";
import axios from "axios";

const AddBooks = () => {
  const [Data, setData] = useState({
    BookTitle: "",
    Author: "",
    genre: "",
    publicationYear: "",
    image: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/books", Data)
      .then((res) => console.log(res));
  };
  console.log(Data);
  return (
    <div
      className="bg-dark d-flex justify-content-center align-content-center"
      style={{ minHeight: "91.5vh" }}
    >
      <div className="container p-4">
        <div className="mb-3">
          <label
            for="exampleFormControlInput1"
            className="form-label text-white"
          >
            BookTitle
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter Book Title"
            name="BookTitle"
            onChange={change}
            value={Data.BookTitle}
          />
        </div>
        <div className="mb-3">
          <label
            for="exampleFormControlInput1"
            className="form-label text-white"
          >
            Author
          </label>
          <input
            type="text"
            className="form-control"
            id="Author"
            placeholder="Enter Author Name"
            name="Author"
            onChange={change}
            value={Data.Author}
          />
        </div>
        <div className="mb-3">
          <label
            for="exampleFormControlInput1"
            className="form-label text-white"
          >
            genre
          </label>
          <input
            type="text"
            className="form-control"
            id="genre"
            placeholder="Enter genre"
            name="genre"
            onChange={change}
            value={Data.genre}
          />
        </div>
        <div className="mb-3">
          <label
            for="exampleFormControlInput1"
            className="form-label text-white"
          >
            Publication Year
          </label>
          <input
            type="number"
            className="form-control"
            id="Publication"
            placeholder="Enter Publication Year"
            name="publicationYear"
            onChange={change}
            value={Data.publicationYear}
          />
        </div>
        <div className="mb-3">
          <label
            for="exampleFormControlInput1"
            className="form-label text-white"
          >
            image
          </label>
          <input
            type="text"
            className="form-control"
            id="image"
            placeholder="Enter image URL"
            name="image"
            onChange={change}
            value={Data.image}
          />
        </div>
        <button className="btn btn-success" onClick={submit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddBooks;
