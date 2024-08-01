import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  // const [username, setUsername] = useState("");// we will use Context API here instead of passing in the username and password here directly
  const {setUserInfo, userInfo} = useContext(UserContext)
  useEffect(() => {
    fetch("http://localhost:3000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        // setUsername(userinfo.username);
        setUserInfo(userInfo)
      });
    }); // you can use await here also
  }, []);

  function logout(){
    fetch('http://localhost:3000/logout', {
      credentials: "include",
      method: "POST",
    })
    setUserInfo(null);
  }

  const username = userInfo?.username;// checking if userinfo is present or not, will help if logged out, it will not give an error 

  return (
    <header>
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {username && (
          <>
            <Link to={"/create"}>Create new post</Link>
            <a onClick={logout} id="Logout-link">Logout</a>
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
