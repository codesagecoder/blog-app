import "./write.css";
import { userRequest, fileUpload } from "../../requestMethods";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";

export default function Write() {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const [file, setFile] = useState(null);
  const user = useSelector((state) => state.user.currentUser);

  async function handleSubmit(e) {
    e.preventDefault();

    const newPost = {
      title: titleRef.current.value,
      content: contentRef.current.value,
      username: user.username,
      categories: [],
    };
    if (file) {
      newPost.photo = '/images/' + await fileUpload(file)
    }
    try {
      const res = await userRequest().post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            ref={titleRef}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            ref={contentRef}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
