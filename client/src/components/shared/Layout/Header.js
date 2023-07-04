import React from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // logout handler
  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successfully");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid ">
          <div className="navbar-brand h1 ">
            <BiDonateBlood color="red" /> Vardaan
          </div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item mx-3">
              <p className="nav-link">
                <BiUserCircle /> Welcome{" "}
                {user?.name || user?.hospitalName}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="badge bg-secondary">{user?.role}</span>
              </p>
            </li>

            {user?.role === "admin" && (
              <li className="nav-item mx-3">
                <Link to="/admin" className="nav-link">
                  Home
                </Link>
              </li>
            )}
            {user?.role === "donar" && (
              <li className="nav-item mx-3">
                <Link to="/donarhome" className="nav-link">
                  Home
                </Link>
              </li>
            )}
            {user?.role === "hospital" && (
              <li className="nav-item mx-3">
                <Link to="/hospitalhome" className="nav-link">
                  Home
                </Link>
              </li>
            )}
            <li className="nav-item mx-3">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;