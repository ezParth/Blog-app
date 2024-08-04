import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {Navigate} from 'react-router-dom'
import Editor from "../Editor";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState('');
  const [redirect, setReditect] = useState('');
  async function createNewPost(e) {
    const data = new FormData(); //FormData is a built-in JavaScript object that allows you to create and manage data in the format of a set of key-value pairs.
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0])
    e.preventDefault();
    const response = await fetch("http://localhost:3000/post", {
      method: "POST",
      body: data,
      credentials: "include"// this will snd jwt tokens and other information which will help us to find the users
    });
    if(response.ok){
      setReditect(true)
    }
  }

  if(redirect){
    return <Navigate to={"/"} />
  }

  return (
    <form onSubmit={createNewPost} encType="multipart/form-data">
      <input
        type="title"
        placeholder={"title"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder={"summary"}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file"  onChange={e => setFiles(e.target.files)}/>
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Create Post</button>
    </form>
  );
}

// build a text editor project

/*
Why Use FormData?:
> When sending data to a server (e.g., via an API request), using FormData simplifies the process.
> It automatically handles encoding the data (e.g., URL encoding) and formatting it correctly for the request.
> Additionally, it supports file uploads, which regular JSON objects do not.
*/
