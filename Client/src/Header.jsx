import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Header() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userinfo) => {
        setUsername(userinfo.username);
      });
    }); // you can use await here also
  }, []);

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link to={"/create"}>Create new post</Link>
            <a>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
