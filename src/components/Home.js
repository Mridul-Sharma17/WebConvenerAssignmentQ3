import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import "./styles/Home.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    setMovies(storedMovies);
  }, []);

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
    <>
      <Header siteName="Movie Reviews" />
      <div className="admin-body">
        <div className="admin-page py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="admin-greeting">Welcome to Movie Reviews</h1>
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
          {filteredMovies.length === 0 && (
            <p className="text-center text-white fw-bold">
              No results found for "{searchTerm}"
            </p>
          )}
          <div className="row mt-4">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="col-md-6 col-lg-4 col-xl-3 mb-4 home-page-movie"
              >
                <div className="card h-100 admin-movie-card">
                  <Link
                    to={`/movieDesc/${movie.id}`}
                    className="text-decoration-none"
                  >
                    <div className="admin-card-body">
                      <h2 className="admin-card-title">{movie.title}</h2>
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
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
