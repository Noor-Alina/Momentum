import './Animate.scss'; 
import AnimateSVG from "../../assets/images/Momentum_animate.svg";

const Animate = () => {
  return (
    <div className="Rotating-svg-container">
      <img className="Rotating-svg-container__content" src={AnimateSVG} alt="Bouncing SVG" />
    </div>
  )
};

export default Animate;