import * as React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";
import "./topbar.css";

export default function Hamburger({ user }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const PF = "/images/";
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="hamburger">
      <Button
        className="button-hamburger"
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <i className="fas fa-bars"></i>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {user ? (
          <li onClick={handleClose} className="nav-link">
            <Link
              className="link"
              to="/settings"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img className="topImg" src={user.profilePic? PF + user.profilePic:PF+'no-user.jpg'} alt="" />
              {user.username}
            </Link>
          </li>
        ) : (
          
            [<li key={0}onClick={handleClose} className="nav-link">
              <Link className="link" to="/login">
                Login
              </Link>
            </li>,
            <li key={1} onClick={handleClose} className="nav-link">
              <Link className="link" to="/register">
                Register
              </Link>
            </li>]
        )}
        <li onClick={handleClose} className="nav-link">
          <Link to="/">Categories</Link>
        </li>
        <li onClick={handleClose} className="nav-link">
          <Link to="/">Authors</Link>
        </li>
        {user && (
          <li onClick={handleClose} className="nav-link">
            <Link className="link" to="/write">
              Write
            </Link>
          </li>
        )}
        {user && (
          <li onClick={handleClose} className="nav-link">
            <Link to={""} className="link">
              Logout
            </Link>
          </li>
        )}
      </Menu>
    </div>
  );
}
