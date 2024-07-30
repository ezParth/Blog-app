import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default async function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  try {
    const response = await axios.get("/data");
    const users = response.data;
    if (users) {
      setIsLoggedIn(true);
    }
  } catch (error) {
    console.log("Error in fetching data: ", error);
  }
  if (isLoggedIn) {
    return (
      <header>
        <Link to="/" className="logo">
          MyBlog
        </Link>
      </header>
    );
  }

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
}
