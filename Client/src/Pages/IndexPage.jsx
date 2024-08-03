import { useEffect, useState } from "react";
import Post from "../Post";

export default function IndexPage() {
    const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/post").then((res) => {
      res.json().then((posts) => {
        setPosts(posts)
      });
    });
  },[]);// making a get request and fetching it
  return (
    <>
      {posts.length > 0 && posts.map(post => (
        <Post{...post}/>
      ))}
    </>
  );
}
