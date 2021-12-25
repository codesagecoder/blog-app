import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { publicRequest } from "../../requestMethods";
import "./homepage.css";
import { useLocation } from "react-router";

export default function Homepage() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await publicRequest.get("/posts"+search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        {posts.length === 0 ? (
          <span
            style={{
              flex: "9",
              display: "flex",
              flexWrap: "wrap",
              margin: "20px",
            }}
          >
            NO POSTS
          </span>
        ) : (
          <Posts posts={posts} />
        )}
        <Sidebar posts={posts}/>
      </div>
    </>
  );
}
