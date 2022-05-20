import Navbar from "./components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import parse from "html-react-parser";

function App() {
  const [blogs, setBlogs] = useState([]);

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => alert(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "Comfirm to delete this blog ?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug);
      }
    });
  };

  const deleteBlog = (slug) => {
    axios
      .delete(`${process.env.REACT_APP_API}/blog/${slug}`)
      .then((res) => {
        Swal.fire("Deleted!", res.data.message, "success");
        fetchData();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container p-5">
      <Navbar />
      {blogs.map((blogs, i) => {
        return (
          <div
            className="row"
            key={i}
            style={{ borderBottom: "1px solid silver" }}
          >
            <div className="col pt-3 pb-2">
              <br />
              <Link to={`/blog/${blogs.slug}`}>
                <h2>{blogs.title}</h2>
              </Link>
              <br />
              <p>{parse(blogs.content.substring(0, 180))} . . . </p>
              <p className="text-muted">
                Author :{" "}
                <i>
                  {blogs.author}, Create at :{" "}
                  {new Date(blogs.createdAt).toLocaleString()}
                </i>
              </p>
              <Link
                className="btn btn-outline-success"
                to={`/blog/edit/${blogs.slug}`}
              >
                EDIT
              </Link>{" "}
              &nbsp;
              <button
                className="btn btn-outline-danger"
                onClick={() => confirmDelete(blogs.slug)}
              >
                DELETE
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
