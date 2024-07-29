import { useState } from "react";

export default function LoginPage(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    async function login(e){
        e.preventDefault();
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            body: JSON.stringify({username, password}),
            headers: {"Content-Type": "application/json"}
        })
        if(response.status === 200){
            alert(`Hello ${username}, you are logged in Successfully :)`)
          }else{
            alert("Login Failed :(")
          }
    }
    return(
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}/>
            <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
            <button>Login</button>
        </form>    
    )
}