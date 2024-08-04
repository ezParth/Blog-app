import { useEffect, useState } from "react";
import Editor from "../Editor";
import { useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setReditect] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/post/" + id).then((res) => {
      res.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, []);

  async function updatePost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }
    await fetch("http://localhost:3000/post", {
      method: "PUT",
      body: data,
    });
    setReditect(true)
  }

  if (redirect) {
    return <Navigate to={"/post/"+id} />;
  }

  return (
    <form onSubmit={updatePost} encType="multipart/form-data">
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
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: "5px" }}>Update Post</button>
    </form>
  );
}
