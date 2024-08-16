import "./Header.scss";
import MomentumLogo from "../../assets/logo/momentum_logo.svg";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div className="Header">
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
                    <li>
                        <NavLink 
                            to="/LogIn" 
                            className={({isActive}) =>
                                isActive ? "Header__item Header__item--active" : "Header__item"
                            }
                        >
                          LogIn
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/SignUp" 
                            className={({isActive}) =>
                                isActive ? "Header__item Header__item--active" : "Header__item"
                            }
                        >
                          SignUp
                        </NavLink>
                    </li>
                </ul>
            </div>

        </div>
    )
};
export default Header;