import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./components/Home";
import AdminPage from "./components/AdminPage";
import MovieDesc from "./components/MovieDesc";
import AddMovie from "./components/AddMovie";
import EditMovie from "./components/EditMovie";
import MissingPage from "./components/MissingPage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import WelcomePage from "./components/WelcomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import RedirectIfLoggedIn from "./components/RedirectIfLoggedIn";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="/signup"
          element={
            <RedirectIfLoggedIn>
              <Signup />
            </RedirectIfLoggedIn>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectIfLoggedIn>
              <Login />
            </RedirectIfLoggedIn>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/movieDesc/:id" element={<MovieDesc />} />
        </Route>
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/addMovie" element={<AddMovie />} />
          <Route path="/editMovie/:id" element={<EditMovie />} />
        </Route>
        <Route path="*" element={<MissingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
