import "./Header.scss";
import MomentumLogo from "../../assets/logo/momentum_logo.svg";
import Momentum_avatar from "../../assets/images/Momentum_avatar.svg";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext"; 


const Header = () => {
    const location = useLocation();
    const { isLoggedIn, logOut} = useAuth(); // Get user state from AuthContext
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    // Determine which page is currently active
    const isHomePage = location.pathname === '/';
    const isLoginPage = location.pathname === '/LogIn';
    const isSignUpPage = location.pathname === '/SignUp';
    const isProtectedPage = ['/Workouts', '/Tracking', '/MealPlanning', '/Profile'].includes(location.pathname);
    const isProfilePage = location.pathname === '/Profile';

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    }


    return (
        <div className={`Header ${isLoginPage ? 'Header--login' : ''} ${isSignUpPage ? 'Header--signup' : ''} ${isProtectedPage ? 'Header--protected' : ''}`}>
            <div className="Header__logo">
                <NavLink to={isLoggedIn() ? "/Workouts" : "/"}>
                    <img 
                        className="Header__logo-image" 
                        src={MomentumLogo} 
                        alt="Momentum logo" 
                    />
                </NavLink>
            </div>
            <div className="Header__links">
                <ul className="Header__links-list">
                    {/* Show login and signup links only if the user is not logged in */}
                    {!isLoggedIn() ? (
                        <>
                            <li>
                                <NavLink 
                                    to="/LogIn" 
                                    className={({ isActive }) =>
                                       `${isActive ? "Header__item-auth  Header__item-auth--active" : ""} ${isSignUpPage ? "Header__item-auth" : ''} ${isHomePage ? "Header__item Header__item--home" : ""}`
                                    }
                                >
                                  LogIn
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/SignUp" 
                                    className={({ isActive }) =>
                                        ` ${isActive ? "Header__item-auth Header__item-auth--active" : ""} ${isLoginPage ? "Header__item-auth" : ''} ${isHomePage ? "Header__item Header__item--home" : ""}`
                                    }
                                >
                                  SignUp
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        // Show protected links only if the user is logged in
                        <>
                            <li>
                                <NavLink 
                                    to="/Workouts" 
                                    className={({ isActive }) =>
                                        isActive ? "Header__protected-item Header__protected-item--active" : "Header__protected-item"
                                    }
                                >
                                  Workouts
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/Tracking" 
                                    className={({ isActive }) =>
                                        isActive ? "Header__protected-item Header__protected-item--active" : "Header__protected-item"
                                    }
                                >
                                  Tracking
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/MealPlanning" 
                                    className={({ isActive }) =>
                                        isActive ? "Header__protected-item Header__protected-item--active" : "Header__protected-item"
                                    }
                                >
                                  Meal Plans
                                </NavLink>
                            </li>
                            <li className="Header__avatar-container">

                                <div className="Header__avatar"  onClick={toggleDropdown}>
                                    <img 
                                        className={isProfilePage? "Header__avatar-image Header__avatar-image--active" : "Header__avatar-image"}
                                        src={Momentum_avatar} 
                                        alt="User avatar" 
                                    />
                                </div>
                                {isDropdownOpen && (
                                    <div className="Header__dropdown">
                                        <NavLink to="/Profile" className="Header__dropdown-item">
                                            Profile
                                        </NavLink>
                                        <button onClick={logOut} className="Header__dropdown-item Header__dropdown-item--button">
                                            Logout
                                        </button>
                                    </div>
                                )}
                                {/* <NavLink 
                                    to="/Profile" 
                                    className={({ isActive }) =>
                                        isActive ? "Header__item Header__item--active" : "Header__item"
                                    }
                                >
                                  User Profile
                                </NavLink> */}


                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Header;