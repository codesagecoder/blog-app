import { useRef, useState } from "react";
import "./register.css";
import {publicRequest} from '../../requestMethods'

export default function Register() {
  const username = useRef("");
  const email = useRef("");
  const password = useRef("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const rs = await publicRequest.post("/auth/register", {
        username: username.current,
        email: email.current,
        password: password.current,
      });
      rs.data && window.location.replace("/login");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={(e) => {
            username.current = e.target.value;
          }}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => {
            email.current = e.target.value;
          }}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => {
            password.current = e.target.value;
          }}
        />
        <button className="registerButton">Register</button>
      </form>
      <a href="/login" className="link registerLoginButton" type="submit">
        Login
      </a>
      {error && <span style={{marginTop:'10px',color:'red'}}>There was an error</span>}
    </div>
  );
}
