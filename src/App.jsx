import Navbar from "./components/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";

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

  console.log(blogs);
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
              <h2>{blogs.title}</h2>
              <br />
              <p>{blogs.content.substring(0, 180)} . . . </p>
              <p className="text-muted">
                Author :{" "}
                <i>
                  {blogs.author}, Create at :{" "}
                  {new Date(blogs.createdAt).toLocaleString()}
                </i>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
