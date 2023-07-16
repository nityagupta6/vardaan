import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // logout handler
  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successfully");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid" style={{ paddingTop: "8px", paddingLeft: "45px", paddingRight: "45px" }}>
          <div className="navbar-brand h1" style={{ fontSize: "28px" }}>
            <img src="/logo192.png" alt="logo" width="43px" height="43px" />
            &nbsp;
            Vardaan
          </div>
          <ul className="navbar-nav flex-row" style={{ fontSize: "17.5px", paddingBottom: "8px" }}>
            {user?.role === "admin" && (
              <>
                <li className="nav-item mx-3">
                  <Link to="/analytics" className="nav-link">
                    Analytics
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <Link to="/admin" className="nav-link">
                    Home
                  </Link>
                </li>
              </>
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
            {/* {location.pathname === "/admin" ||
              location.pathname === "/donarhome" ||
              location.pathname === "/hospitalhome" ? (
              <li className="nav-item mx-3">
                <Link to="/analytics" className="nav-link">
                  Analytics
                </Link>
              </li>
            ) : (
              <>
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
              </>
            )} */}

            <li className="nav-item mx-3">
              <button type="button" class="btn btn-outline-danger btn-sm" style={{ borderRadius: "20px", marginTop: "6px" }} onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </nav >
    </>
  );
};

export default Header;