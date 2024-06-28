import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase";
import Header from "./Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/AdminPage.css";

const AdminPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    setMovies(storedMovies);
  }, []);

  const deleteMovie = (id) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
    toast.success("Movie deleted successfully!");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Error logging out. Please try again.");
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = movies.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.releaseDate.startsWith(searchTerm)
    );
  });

  return (
    <div className="admin-body">
      <Header siteName="Movie Reviews" />
      <div className="admin-page py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="admin-greeting">Welcome, Admin!</h1>
          <div>
            <Link to="/addMovie" className="admin-addMovie admin-btn">
              Add New Movie
            </Link>
          </div>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search movies by title or year..."
            value={searchTerm}
            onChange={handleSearch}
            className="admin-search-bar"
          />
        </div>
        <div className="row mt-4">
          {filteredMovies.length === 0 ? (
            <p className="text-center text-white fw-bold">
              No results found for "{searchTerm}"
            </p>
          ) : (
            filteredMovies.map((movie) => (
              <div key={movie.id} className="col-md-6 col-lg-4 col-xl-3 mb-4">
                <div className="card h-100 admin-movie-card">
                  <Link
                    to={`/movieDesc/${movie.id}`}
                    className="text-decoration-none"
                  >
                    <div className="admin-card-body">
                      <h2 className="admin-card-title">{movie.title}</h2>
                      <div className="admin-movie-card-below">
                        <div className="admin-movie-poster-container">
                          <img
                            src={movie.posterImage}
                            alt={`${movie.title} Poster`}
                            className="admin-movie-poster"
                          />
                        </div>
                        <div className="admin-movie-details">
                          <p>
                            <strong>Release Date:</strong> {movie.releaseDate}
                          </p>
                          <p>
                            <strong>Rating:</strong> {movie.rating}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="admin-card-footer d-flex justify-content-center align-items-center">
                    <button
                      onClick={() => navigate(`/editMovie/${movie.id}`)}
                      className="admin-btn admin-btn-primary me-2 my-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMovie(movie.id)}
                      className="admin-btn admin-btn-danger my-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminPage;
