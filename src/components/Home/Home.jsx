import "./Home.scss";
import { Link } from "react-router-dom";
import HeroGraphic from "../../assets/images/Momentum_hero.svg";
import Animate from "../Animate/Animate";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
    const {isLoggedIn} = useAuth();

    return(
        <>
        <div className="Home">
            <div className="Home__hero">
                <div className="Home__hero-heading">
                    <h1 className="Home__hero-heading-text">
                        MOMENTUM
                    </h1>
                    <h3  className="Home__hero-heading-subtext">Your journey to a healthier lifestyle starts here!</h3>
                    <Link to="/LogIn"
                        className="Home__hero-heading-button"
                        >
                        JOIN NOW
                    </Link>
                    
                </div>
                <div className="Home__hero-graphic">
                    <img className="Home__hero-graphic-image" src={HeroGraphic} alt="Momentum_hero_image" />
                </div>
            </div>
        </div>
        <Animate/>
        </>
    )
};
export default Home;