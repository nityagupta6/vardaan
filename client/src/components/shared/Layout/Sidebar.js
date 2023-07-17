import React from "react";
// import { userMenu } from "./Menus/userMenu";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../styles/Layout.css";

const Sidebar = () => {
    //GET USER STATE
    const { user } = useSelector((state) => state.auth);

    const location = useLocation();

    return (
        <div>
            <div className="sidebar">
                <div className="menu">
                    {user?.role === "admin" && (
                        <>
                            <div class="menu-head"
                            >
                                Hello {user?.name}!
                            </div>
                            <div
                                className={`menu-item ${location.pathname === "/" && "active"}`}
                            >
                                <i className="fa-solid fa-warehouse"></i>
                                <Link to="/">Inventory</Link>
                            </div>
                            <div
                                className={`menu-item ${location.pathname === "/donar" && "active"
                                    }`}
                            >
                                <i className="fa-solid fa-hand-holding-medical"></i>
                                <Link to="/donar">Donors</Link>
                            </div>
                            <div
                                className={`menu-item ${location.pathname === "/hospital" && "active"
                                    }`}
                            >
                                <i className="fa-solid fa-hospital"></i>
                                <Link to="/hospital">Hospitals</Link>
                            </div>
                        </>
                    )}
                    {user?.role === "donar" && (
                        <>
                            <div class="menu-head"
                            >
                                Hello {user?.name}!
                            </div>
                            <div
                                className={`menu-item ${location.pathname === "/hospital" && "active"
                                    }`}
                            >
                                <i className="fa-solid fa-hospital"></i>
                                <Link to="/hospital">Hospitals</Link>
                            </div>
                            <div
                                className={`menu-item ${location.pathname === "/donation" && "active"
                                    }`}
                            >
                                <i className="fa-sharp fa-solid fa-building-ngo"></i>
                                <Link to="/donation">Donation</Link>
                            </div>
                        </>
                    )}
                    {(user?.role === "hospital") && (
                        <>
                            <div class="menu-head"
                            >
                                Hello {user?.hospitalName}!
                            </div>
                            <div
                                className={`menu-item ${location.pathname === "/donar" && "active"
                                    }`}
                            >
                                <i className="fa-solid fa-hand-holding-medical"></i>
                                <Link to="/donar">Donors</Link>
                            </div>
                            <div
                                className={`menu-item ${location.pathname === "/consumer" && "active"
                                    }`}
                            >
                                <i className="fa-sharp fa-solid fa-building-ngo"></i>
                                <Link to="/consumer">Consumer</Link>
                            </div>
                        </>
                    )}

                    {/* {userMenu.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <div
                className={`menu-item ${isActive && "active"}`}
                key={menu.name}
              >
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            );
          })} */}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;