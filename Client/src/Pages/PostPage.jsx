import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatISO9075 } from "date-fns";

export default function PostPage() {
  const { id } = useParams(); // Allows us to access dynamic parameters
  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/post/${id}`)
      .then((res) => res.json())
      .then((postInfo) => {
        setPostInfo(postInfo);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  if (!postInfo) {
    return "";
  }

  return (
    <div className="post-page">
        <h1>{postInfo.title}</h1>
        <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
        <div className="author">by {postInfo.author.username}</div>
      <div className="image">
        <img src={`http://localhost:3000${postInfo.cover}`} alt="img" />
      </div>
      <h1>{postInfo.title}</h1>

      <div dangerouslySetInnerHTML={{__html: postInfo.content}} className="post-content"/>
      
    </div>
  );
}
