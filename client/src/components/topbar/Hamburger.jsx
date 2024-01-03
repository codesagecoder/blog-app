import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
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
        disableRipple
        className="button-hamburger"
        id="hamburger-button"
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
          [
            <li key={0} onClick={handleClose} className="nav-link">
              <Link
                className="link"
                to="/settings"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img className="topImg" src={user.profilePic ? PF + user.profilePic : PF + 'no-user.jpg'} alt="" />
                {user.username}
              </Link>
            </li>,
            <li key={1} onClick={handleClose} className="nav-link">
              <Link className="link" to="/write">
                Write
              </Link>
            </li>,
            <li key={2} onClick={handleClose} className="nav-link">
              <Link to={""} className="link">
                Logout
              </Link>
            </li>
          ]
        ) : (
          [
            <li key={0} onClick={handleClose} className="nav-link">
              <Link className="link" to="/login">
                Login
              </Link>
            </li>,
            <li key={1} onClick={handleClose} className="nav-link">
              <Link className="link" to="/register">
                Register
              </Link>
            </li>
          ]
        )}
      </Menu>
    </div>
  );
}
