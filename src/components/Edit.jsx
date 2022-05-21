import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getToken } from "../service/authorize";

const Edit = (props) => {
  const [state, setState] = useState({
    title: "",
    author: "",
    slug: "",
  });

  const { title, author } = state;
  const [content, setContent] = useState("");

  const submitContent = (e) => {
    setContent(e);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
      .then((res) => {
        const { title, content, author, slug } = res.data;
        setState({ ...state, title, content, author, slug });
        setContent(content);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  const inputValue = (name) => (e) => {
    setState({ ...state, [name]: e.target.value });
  };

  const showEditForm = () => {
    return (
      <form onSubmit={submitEdit}>
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
            onChange={submitContent}
            style={{ border: "2px solid #999", borderRadius: "10px" }}
          />
        </div>
        <br />
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
        <input type="submit" value="UPDATE" className="btn btn-primary" />
      </form>
    );
  };

  const submitEdit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_API}/edit/${props.match.params.slug}`,
        {
          title,
          content,
          author,
        },
        { headers: { authorization: `Bearer ${getToken()}` } }
      )
      .then((res) => {
        Swal.fire(
          "Congratulations!",
          "Edit the information successfully.",
          "success"
        );
        const { title, content, author, slug } = res.data;
        setState({ ...state, title, content, author, slug });
        setContent(content);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="container p-5">
      <Navbar />
      <br />
      <h1>Edit Blog</h1>
      {showEditForm()}
    </div>
  );
};

export default Edit;
