import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { fileUpload } from "../../requestMethods";
import { updateUser } from "../../redux/apiCalls";

export default function Settings() {
  const user = useSelector((state) => state.user.currentUser);
  const [file, setFile] = useState(null);
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [succeeded, setSucceded] = useState(false);
  const dispatch = useDispatch();
  async function handleSubmit(e) {
    e.preventDefault();

    const updatedUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    if (file) {
      updatedUser.profilePic = '/images/'+ await fileUpload(file);
    }
    updateUser(updatedUser, user._id, dispatch);
    setSucceded(true);
  }
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
            />
          </div>
          <label>Username</label>
          <input ref={usernameRef} type="text" placeholder="name" name="name" />
          <label>Email</label>
          <input ref={emailRef} type="email" placeholder="email" name="email" />
          <label>Password</label>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            name="password"
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {succeeded && (
            <span
              style={{ marginTop: "20px", textAlign: "center", color: "green" }}
            >
              Profile has been updated.
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
