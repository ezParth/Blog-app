import { format } from "date-fns";
import {Link} from 'react-router-dom'

export default function Post({
  title,
  summary,
  cover,
  content,
  createdAt,
  author,
}) {
  return (
    <div className="post">
      <div className="image">
        <Link to={"/post/id"}>
          <img src={`http://localhost:3000${cover}`} alt="img" />
        </Link>
      </div>
      <div className="content">
        <Link to={"/post/id"}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a href="" className="author">
            {author.username}
          </a>
          <time>{format(new Date(createdAt), "MMM d yyyy HH:mm")}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
