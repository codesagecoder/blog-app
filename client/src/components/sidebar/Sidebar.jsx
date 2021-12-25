import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicRequest } from "../../requestMethods";
import "./sidebar.css";

export default function Sidebar() {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await publicRequest.get("/posts");
      setPosts(res.data.slice(-3));
    };
    fetchPosts();
    const getCategories = async () => {
      const res = await publicRequest.get("/categories");
      setCategories(res.data);
    };
    getCategories();
  }, []);
  return (
    <aside className="sidebar">
      <div className="sidebarItem popular-post">
        <span className="sidebarTitle">NEW POSTS</span>
        {posts?.map((post, i) => (
          <div key={i} className="post-content">
            <div className="post-image">
                <img src={post.photo} className="img-img" alt="blog" />
              <div className="post-info flex-row">
                <span>
                  <i className="fas fa-calendar-alt text-gray"></i>
                  &nbsp;&nbsp;
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>{post?.categories[0] || "Unspecified"}</span>
              </div>
            </div>
            <div className="post-title">
              <Link to={`/post/${post._id}`}>{post.content.slice(0, 50)}</Link>
            </div>
          </div>
        ))}
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {categories.map((cat, i) => (
            <li key={i} className="sidebarListItem">
              <Link className="link" to={"/?cat=" + cat.name}>
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </aside>
  );
}
