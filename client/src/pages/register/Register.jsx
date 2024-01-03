import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from '../../requestMethods';
import "./register.css";

export default function Register() {
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [error, setError] = useState(false);
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    const username = usernameRef.current;
    const email = emailRef.current;
    const password = passwordRef.current;

    try {
      if (!username && !email && !password) throw Error('Missing fields.');

      await publicRequest.post("/auth/register", { username, email, password });

      nav('/login');
    } catch (err) {
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
            usernameRef.current = e.target.value;
          }}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => {
            emailRef.current = e.target.value;
          }}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => {
            passwordRef.current = e.target.value;
          }}
        />
        <button className="registerButton">Register</button>
      </form>
      <Link to='/login' className="link registerLoginButton">Login</Link>

      {error && <span style={{ marginTop: '10px', color: 'red' }}>Something went wrong.</span>}
    </div>
  );
}
