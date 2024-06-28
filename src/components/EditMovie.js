import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import "./styles/EditMovie.css";

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [posterImage, setPosterImage] = useState("");

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    const movieToEdit = storedMovies.find((movie) => movie.id === id);

    if (movieToEdit) {
      setTitle(movieToEdit.title);
      setReleaseDate(movieToEdit.releaseDate);
      setGenre(movieToEdit.genre);
      setRating(movieToEdit.rating);
      setDescription(movieToEdit.description || "");
      setPosterImage(movieToEdit.posterImage || "");
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedMovie = {
      id,
      title,
      releaseDate,
      genre,
      rating,
      description,
      posterImage,
    };

    let storedMovies = JSON.parse(localStorage.getItem("movies")) || [];

    const index = storedMovies.findIndex((movie) => movie.id === id);

    storedMovies[index] = updatedMovie;

    localStorage.setItem("movies", JSON.stringify(storedMovies));

    navigate("/admin");
  };

  return (
    <div className="edit-movie-body">
      <Header siteName="Movie Reviews" />
      <div className="edit-movie-container">
        <h1 className="edit-movie-heading">Edit Movie</h1>
        <form onSubmit={handleSubmit} className="edit-movie-form">
          <div className="mb-3">
            <label className="edit-movie-label">Title:</label>
            <input
              type="text"
              className="edit-movie-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="edit-movie-label">Release Date:</label>
            <input
              type="date"
              className="edit-movie-control"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="edit-movie-label">Genre:</label>
            <input
              type="text"
              className="edit-movie-control"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="edit-movie-label">Rating:</label>
            <input
              type="number"
              className="edit-movie-control"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
              min="0"
              max="5"
              step="0.1"
            />
          </div>
          <div className="mb-3">
            <label className="edit-movie-label">Description:</label>
            <textarea
              className="edit-movie-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="5"
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="edit-movie-label">
              Poster Image URL (optional):
            </label>
            <input
              type="text"
              className="edit-movie-control"
              value={posterImage}
              onChange={(e) => setPosterImage(e.target.value)}
            />
          </div>
          <button type="submit" className="edit-movie-btn-primary">
            Update Movie
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMovie;
