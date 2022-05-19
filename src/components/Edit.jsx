import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Edit = (props) => {
  const [state, setState] = useState({
    title: "",
    author: "",
    slug: "",
  });

  const { title, author, slug } = state;
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
        <div className="form-group">
          <label>Blog Name</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={inputValue("title")}
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <ReactQuill
            value={content}
            theme="snow"
            className="pb-5 mb-3"
            onChange={submitContent}
            style={{ border: "2px solid #999", borderRadius: "10px" }}
          />
        </div>
        <div className="form-group">
          <label>Author</label>
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
      .put(`${process.env.REACT_APP_API}/edit/${props.match.params.slug}`, {
        title,
        content,
        author,
      })
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
      <h1>Edit Blog</h1>
      {showEditForm()}
    </div>
  );
};

export default Edit;
