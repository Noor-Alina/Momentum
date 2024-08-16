import "./Home.scss";
import { Link } from "react-router-dom";
import HeroGraphic from "../../assets/images/Momentum_hero.svg";
import Animate from "../Animate/Animate";

const Home = () => {

    return(
        <>
        <div className="Home">
            <div className="Home__hero">
                <div className="Home__hero-heading">
                    <h1 className="Home__hero-heading-text">
                        Momentum Fitness Hub
                    </h1>
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