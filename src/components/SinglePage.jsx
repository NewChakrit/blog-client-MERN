import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import parse from "html-react-parser";

const SinglePage = (props) => {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
      .then((res) => setBlog(res.data))
      .then((data) => {
        setLoading(true);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container p-5">
      <Navbar />
      <br />
      <h1>{blog.title}</h1>
      {loading ? <p>{parse(blog.content)}</p> : <></>}
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
