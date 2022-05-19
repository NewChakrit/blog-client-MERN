import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const SinglePage = (props) => {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container p-5">
      <Navbar />
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p className="text-muted">
        Author :{" "}
        <i>
          {blog.author}, Create at : {new Date(blog.createdAt).toLocaleString()}
        </i>
      </p>
    </div>
  );
};

export default SinglePage;
