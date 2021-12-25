import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  return (
    // {post.categories.map((cat, i) => (
    //   <span key={i} className="postCat">
    //     <Link className="link" to={`/posts?cat=${cat}`}>
    //       {cat}
    //     </Link>
    //   </span>
    // ))}
    <div className="post-content">
      <hr style={{width:'92%'}}/>
      <div className="post-image">
        <div>
          <img src={post?.photo} className="postImg" alt="" />
        </div>
        <div className="post-info flex-row">
          <span>
            <i className="fas fa-user text-gray"></i>&nbsp;&nbsp;{post.username}
          </span>
          <span>
            <i className="fas fa-calendar-alt text-gray"></i>&nbsp;&nbsp;
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className={'category'}>{post?.categories[0] || 'Unspecified'}</span>
        </div>
      </div>
      <div className="post-title">
        <Link to={`/post/${post._id}`} className="link">
          {post.title}
        </Link>
        <p>{post.content.slice(0,200)}...</p>
        <Link to={`/post/${post._id}`}>
        <button className="btn post-btn">
          Read More &nbsp; <i className="fas fa-arrow-right"></i>
        </button>
        </Link>
      </div>
    </div>
  );
}
