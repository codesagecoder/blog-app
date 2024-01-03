import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import "./singlePost.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { publicRequest, userRequest } from "../../requestMethods";
import Social from "../../components/social/Social";

export default function SinglePost() {
  const location = useLocation();
  const nav = useNavigate()
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    const getPost = async () => {
      const res = await publicRequest.get("/posts/" + path);
      setTitle(res.data.title);
      setContent(res.data.content);
      setPost(res.data);
    };
    getPost();
  }, [path]);

  async function handleDelete() {
    try {
      if (post?.photo) await userRequest().delete("/upload?path=" + post.photo);
    } catch (err) {
      // file does not exist
      if(err?.response?.status !== 409) return;
    }

    try {
      await userRequest().delete("/posts/" + path);
      nav('/');
    } catch (err) {
      console.log(err);
    }
  }
  async function handleUpdate() {
    try {
      await userRequest().put("/posts/" + path, { title, content });
      // window.location.reload();
      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  }

  function author(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return "";
  }
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={post.photo} alt="" />
        )}
        {editMode ? (
          <input
            autoFocus
            className="singlePostTitleInput"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {post.title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setEditMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={"/?user=" + post.username}>
                {author(post?.username)}
              </Link>
            </b>
          </span>
          <span>
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        {editMode ? (
          <textarea
            rows="18"
            cols="50"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="singlePostDescInput"
          />
        ) : (
          <p style={{ whiteSpace: "pre-wrap" }} className="singlePostDesc">
            {post.content}
          </p>
        )}
        {editMode && (
          <button onClick={handleUpdate} className="singlePostButton">
            update
          </button>
        )}
      </div>
      {post?.comments && (
        <Social
          user={user}
          postID={post._id}
          userRequest={userRequest}
          initialComments={post.comments}
        />
      )}
    </div>
  );
}
