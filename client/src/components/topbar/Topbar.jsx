import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/userSlice";
import Hamburger from "./Hamburger";
import "./topbar.css";

export default function Topbar() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <nav className="nav">
      <div className="nav-menu flex-row">
        <div className="topLeft nav-brand">
          <Link to="/">Home</Link>
        </div>

        <div className="topCenter">
          {user && (
            <ul className="nav-items">
              <li className="nav-link">
                <Link className="link" to="/write">
                  Write
                </Link>
              </li>
              <li onClick={handleLogout} className="nav-link">
                <Link to={""} className="link">
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
        <Hamburger user={user} />
        <div className="topRight">
          {user ? (
            <Link className="link" to="/settings">
              <img className="topImg" src={user.profilePic ? user.profilePic : '/images/no-user.jpg'} alt="" />
            </Link>
          ) : (
            <ul className="nav-items">
              <li className="nav-link">
                <Link className="link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-link">
                <Link className="link" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          )}
          <i className="topSearchIcon text-gray fas fa-search"></i>
        </div>
      </div>
    </nav>
  );
}
