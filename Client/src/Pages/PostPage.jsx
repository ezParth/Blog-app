import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

export default function PostPage() {
  const { id } = useParams(); // Allows us to access dynamic parameters
  const [postInfo, setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext);

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
        {userInfo.id === postInfo.author._id && (
            <div className="edit-row">
                <Link className="edit-btn" to={`/edit/${postInfo._id}`}>📝 Edit Post</Link>
            </div>
        )}
      <div className="image">
        <img src={`http://localhost:3000${postInfo.cover}`} alt="img" />
      </div>

      <div dangerouslySetInnerHTML={{__html: postInfo.content}} className="post-content"/>
      
    </div>
  );
}
