import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  async function register (e){
    e.preventDefault();
    const response = await fetch('http://localhost:3000/register', {
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: {"Content-Type": "application/json"}
    })
    if(response.status === 200){
      setRedirect(true)
    }else{
      alert("registration Failed :(")
    }
  }
  if(redirect){
    return <Navigate to={"/"} />
  }

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Register</button>
    </form>
  );
}


//Try HMAC Authentication --> To avoid showing Password in the Networks Tabs