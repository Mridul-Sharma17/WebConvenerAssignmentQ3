import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./styles/AddMovie.css";

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [posterImage, setPosterImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMovie = {
      id: Date.now().toString(),
      title,
      releaseDate,
      genre,
      rating,
      description,
      posterImage,
    };

    const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    storedMovies.push(newMovie);
    localStorage.setItem("movies", JSON.stringify(storedMovies));

    navigate("/admin");
  };

  return (
    <div className="add-movie-body">
      <Header siteName="Movie Reviews" />
      <div className="add-movie-container py-4">
        <h1>Add Movie</h1>
        <form onSubmit={handleSubmit} className="add-movie-form">
          <div className="mb-3">
            <label className="add-movie-label">Title:</label>
            <input
              type="text"
              className="add-movie-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="add-movie-label">Release Date:</label>
            <input
              type="date"
              className="add-movie-control"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="add-movie-label">Genre:</label>
            <input
              type="text"
              className="add-movie-control"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="add-movie-label">Rating:</label>
            <input
              type="number"
              className="add-movie-control"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
              min="0"
              max="5"
              step="0.1"
            />
          </div>
          <div className="mb-3">
            <label className="add-movie-label">Description:</label>
            <textarea
              className="add-movie-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="5"
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="add-movie-label">
              Poster Image URL (optional):
            </label>
            <input
              type="text"
              className="add-movie-control"
              value={posterImage}
              onChange={(e) => setPosterImage(e.target.value)}
            />
          </div>
          <button type="submit" className="add-movie-btn-primary">
            Add Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
