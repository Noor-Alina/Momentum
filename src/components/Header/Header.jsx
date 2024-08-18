import "./Header.scss";
import MomentumLogo from "../../assets/logo/momentum_logo.svg";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import useAuth to access user state

const Header = () => {
    const location = useLocation();
    const { isLoggedIn } = useAuth(); // Get user state from AuthContext

    // Determine which page is currently active
    const isHomePage = location.pathname === '/';
    const isLoginPage = location.pathname === '/LogIn';
    const isSignUpPage = location.pathname === '/SignUp';
    const isProtectedPage = ['/Workouts', '/Tracking', '/MealPlanning', '/Profile'].includes(location.pathname);

    return (
        <div className={`Header ${isLoginPage ? 'Header--login' : ''} ${isSignUpPage ? 'Header--signup' : ''} ${isProtectedPage ? 'Header--protected' : ''}`}>
            <div className="Header__logo">
                <NavLink to="/">
                    <img 
                        className="header__logo-image" 
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
                                        isActive ? "Header__item Header__item--active" : "Header__item"
                                    }
                                >
                                  Workouts
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/Tracking" 
                                    className={({ isActive }) =>
                                        isActive ? "Header__item Header__item--active" : "Header__item"
                                    }
                                >
                                  Tracking
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/MealPlanning" 
                                    className={({ isActive }) =>
                                        isActive ? "Header__item Header__item--active" : "Header__item"
                                    }
                                >
                                  Meal Plans
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/Profile" 
                                    className={({ isActive }) =>
                                        isActive ? "Header__item Header__item--active" : "Header__item"
                                    }
                                >
                                  User Profile
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Header;