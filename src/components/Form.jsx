import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getUser } from "../service/authorize";

const Form = () => {
  const [state, setState] = useState({
    title: "",
    content: "",
    author: getUser(),
  });

  const { title, author } = state;

  const [content, setContent] = useState("");

  const inputValue = (name) => (e) => {
    setState({ ...state, [name]: e.target.value });
  };

  const submitContent = (e) => {
    setContent(e);
  };

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/create`, {
        title,
        content,
        author,
      })
      .then((res) => {
        Swal.fire(
          "Congratulations!",
          "Submit the information successfully.",
          "success"
        );
        setState({ ...setState, title: "", author: "" });
        setContent("");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.error,
        });
      });
  };

  return (
    <div className="container p-5">
      <Navbar />
      <br />
      <h1>Write Blog</h1>
      <form onSubmit={submitForm}>
        <br />
        <div className="form-group">
          <label className="mb-3">
            <h5>Blog Name</h5>
          </label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={inputValue("title")}
          />
        </div>
        <br />
        <div className="form-group">
          <label className="mb-3">
            <h5>Content</h5>
          </label>
          <ReactQuill
            value={content}
            theme="snow"
            className="pb-5 mb-3"
            placeholder="Write your blog content."
            onChange={submitContent}
            style={{ border: "2px solid #999", borderRadius: "10px" }}
          />
        </div>
        <div className="form-group">
          <label className="mb-3">
            <h5>Author</h5>
          </label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={inputValue("author")}
          />
        </div>
        <br />
        <input type="submit" value="Submit" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default Form;
