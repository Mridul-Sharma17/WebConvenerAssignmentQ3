import { Link } from "react-router-dom";
import "./styles/WelcomePage.css";

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">Movie Reviews</h1>
        <div className="welcome-quote">
          <p className="quote-text">
            "Movies can change the way we see the world."
          </p>
        </div>
        <div className="welcome-explore">
          <p>
            Explore and share your thoughts on the latest movies with Movie
            Reviews.
          </p>
        </div>
        <div className="welcome-button">
          <Link to="/home" className="continue-button">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
