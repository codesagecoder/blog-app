import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess, setDefault } from "../../redux/userSlice";
import { publicRequest } from "../../requestMethods";
import "./login.css";


export default function Login() {
  const passwordRef = useRef();
  const usernameRef = useRef();
  const dispatch = useDispatch();
  const { pending, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setDefault());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (!username && !password) dispatch(loginFailure());
    else {
      dispatch(loginStart());
      try {
        const res = await publicRequest.post("/auth/login", { username, password });
        dispatch(loginSuccess(res.data));
      } catch (err) {
        console.log({ err });
        dispatch(loginFailure());
      }
    }
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
          {pending ? 'Loading...' : 'Login'}
        </button>
        {error && (
          <span style={{ marginTop: "10px", color: "red", textAlign: 'center' }}>
            You did something wrong
          </span>
        )}
      </form>
      <Link to='/register' className="link loginRegisterButton">Register</Link>
    </div>
  );
}
