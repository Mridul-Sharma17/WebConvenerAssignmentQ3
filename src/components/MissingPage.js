import { Link } from "react-router-dom";

const MissingPage = () => {
  return (
    <div className="container py-4">
      <h1>Page Not Found</h1>
      <p>This page does not exist.</p>
      <Link to="/">
        <button className="btn btn-primary">Go to Home Page</button>
      </Link>
    </div>
  );
};

export default MissingPage;
