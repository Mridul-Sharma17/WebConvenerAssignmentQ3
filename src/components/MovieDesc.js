import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { auth } from "../Config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import ConfirmModal from "./ConfirmModal";
import "./styles/MovieDesc.css";
import Header from "./Header";
import Footer from "./Footer";

const adminUID = "YE6xDYNC4RT2JUzR5Ft7V6JYtVR2";

const MovieDesc = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [editReview, setEditReview] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    const selectedMovie = storedMovies.find((movie) => movie.id === id);

    if (!selectedMovie) {
      navigate("/not-found");
      return;
    }

    setMovie(selectedMovie);

    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const movieReviews = storedReviews.filter(
      (review) => review.movieId === id
    );
    setReviews(movieReviews);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);

        if (user.uid === adminUID) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }

        const userReview = movieReviews.find(
          (review) => review.userId === user.uid
        );
        if (userReview) {
          setEditReview(userReview);
          setRating(userReview.rating);
          setComment(userReview.comment);
        } else {
          setEditReview(null);
        }
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [id, navigate]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    try {
      if (editReview) {
        const updatedReviews = reviews.map((review) =>
          review.id === editReview.id ? { ...review, rating, comment } : review
        );
        setReviews(updatedReviews);
        localStorage.setItem("reviews", JSON.stringify(updatedReviews));
        toast.success("Review updated successfully!");
      } else {
        const username =
          localStorage.getItem(`username_${currentUser.uid}`) || "Anonymous";
        const newReview = {
          id: `${id}_${currentUser.uid}`,
          movieId: id,
          userId: currentUser.uid,
          username: username,
          rating,
          comment,
        };
        const updatedReviews = [...reviews, newReview];
        setReviews(updatedReviews);
        localStorage.setItem("reviews", JSON.stringify(updatedReviews));
        toast.success("Review submitted successfully!");
        setEditReview(newReview);
      }
      setRating(1);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Error submitting review. Please try again.");
    }
  };

  const handleDeleteReview = (reviewId) => {
    const updatedReviews = reviews.filter((review) => review.id !== reviewId);
    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    toast.success("Review deleted successfully!");
    setEditReview(null);
    setRating(1);
    setComment("");
    setShowConfirmModal(false);
  };

  const confirmDeleteReview = (reviewId) => {
    setReviewToDelete(reviewId);
    setShowConfirmModal(true);
  };

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <main className="desc-body">
      <Header siteName="Movie Reviews" />
      <div className="container-fluid py-4 desc-custom-container">
        <div className="row">
          <div className="col-lg-4 col-md-12 mb-4 desc-column">
            <h1 className="desc-h1 mb-4">{movie.title}</h1>
            <img
              src={movie.posterImage}
              alt={movie.title}
              className="desc-poster"
            />
            <div className="desc-movie-details">
              <p>
                <strong>Rating:</strong> {movie.rating}
              </p>
              <p>
                <strong>Genre:</strong> {movie.genre}
              </p>
              <p>
                <strong>Release Date:</strong> {movie.releaseDate}
              </p>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 mb-4 desc-column">
            <strong className="desc-description-heading mt-3 mb-2">
              Description:
            </strong>
            <div className="desc-movie-description">{movie.description}</div>
            <hr />
            {editReview === null ? (
              <>
                <h2 id="reviewForm" className="desc-submit-review">
                  Submit a Review
                </h2>
                <form onSubmit={handleReviewSubmit} className="desc-form">
                  <div className="mb-3 desc-form-entry">
                    <label className="desc-form-label rating">Rating:</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={rating}
                      onChange={(e) => setRating(parseInt(e.target.value))}
                      className="desc-form-control"
                      required
                    />
                  </div>
                  <div className="mb-3 desc-form-entry">
                    <label className="desc-form-label">Comments:</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows="3"
                      className="desc-form-control comments"
                      required
                    />
                  </div>
                  <button type="submit" className="desc-btn-primary">
                    Submit Review
                  </button>
                </form>
                <hr />
              </>
            ) : (
              <>
                <h2 id="reviewForm">Edit Your Review</h2>
                <form onSubmit={handleReviewSubmit} className="desc-form">
                  <div className="mb-3 desc-form-entry">
                    <label className="desc-form-label rating">Rating:</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={rating}
                      onChange={(e) => setRating(parseInt(e.target.value))}
                      className="desc-form-control"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="desc-form-label">Comments:</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows="3"
                      className="desc-form-control comments"
                      required
                    />
                  </div>
                  <button type="submit" className="desc-btn-primary">
                    Edit Review
                  </button>
                </form>
                <button
                  onClick={() => confirmDeleteReview(editReview.id)}
                  className="desc-btn-danger mt-3"
                >
                  Delete Review
                </button>
                <hr />
              </>
            )}
          </div>
          <div className="col-lg-4 col-md-12 desc-column">
            <h2 className="mb-5">Ratings and Reviews</h2>
            <div className="desc-reviews-container">
              {reviews.length === 0 ? (
                <p>No reviews yet.</p>
              ) : (
                <ul className="desc-list-unstyled">
                  {reviews.map((review) => (
                    <li key={review.id} className="border p-3 mb-3">
                      <p>
                        <strong>Posted by:</strong> {review.username}
                      </p>
                      <p>
                        <strong>Rating:</strong> {review.rating}
                      </p>
                      <p>
                        <strong>Comments:</strong> {review.comment}
                      </p>
                      {(isAdmin || review.userId === currentUser?.uid) && (
                        <button
                          onClick={() => confirmDeleteReview(review.id)}
                          className="desc-btn-danger"
                        >
                          Delete Review
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <ConfirmModal
          show={showConfirmModal}
          onHide={() => setShowConfirmModal(false)}
          onConfirm={() => handleDeleteReview(reviewToDelete)}
          title="Confirm Delete"
          message="Are you sure you want to delete this review?"
        />
      </div>
      <Footer />
    </main>
  );
};

export default MovieDesc;
