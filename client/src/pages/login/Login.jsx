import "./login.css";
import { login } from "../../redux/apiCalls";
import { setDefault } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useEffect } from "react";

export default function Login() {
  const passwordRef = useRef();
  const usernameRef = useRef();
  const dispatch = useDispatch();
  const { pending, error } = useSelector((state) => state.user);

  useEffect(() => {
    //research this: no rerenders on certain reducers
    dispatch(setDefault());
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(
      {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      },
      dispatch
    );
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          ref={usernameRef}
          className="loginInput"
          type="text"
          placeholder="Enter your username..."
        />
        <label>Password</label>
        <input
          ref={passwordRef}
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
        />
        <button disabled={pending} type="submit" className="loginButton">
          Login
        </button>
        {error && (
          <span style={{ marginTop: "10px", color: "red" }}>
            You did something wrong
          </span>
        )}
      </form>
      <a href="/register" className="link loginRegisterButton">
        Register
      </a>
    </div>
  );
}
