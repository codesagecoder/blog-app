import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/sidebar/Sidebar";
import { setDefault, updateFailure, updateStart, updateSuccess } from "../../redux/userSlice";
import { fileUpload, userRequest } from "../../requestMethods";
import "./settings.css";

export default function Settings() {
  const { error, currentUser: user } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [succeeded, setSucceded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => { dispatch(setDefault()) }, [])

  async function handleSubmit(e) {
    e.preventDefault();
    const updatedUser = {};

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (username) updatedUser.username = username;
    if (email) updatedUser.email = email;
    if (password) updatedUser.password = password;
    if (file) updatedUser.profilePic = '/images/' + await fileUpload(file);

    dispatch(updateStart());
    try {
      const rs = await userRequest().put("/users/" + user._id, updatedUser);
      dispatch(updateSuccess(rs.data));
      setSucceded(true);
    } catch {
      dispatch(updateFailure());
      setSucceded(false);
    }
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
          {error && (
            <span
              style={{ marginTop: "20px", textAlign: "center", color: "red" }}
            >
              Something went wrong.
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
