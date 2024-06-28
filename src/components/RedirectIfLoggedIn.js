import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Config/firebase";

const RedirectIfLoggedIn = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.uid === "YE6xDYNC4RT2JUzR5Ft7V6JYtVR2") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return children;
};

export default RedirectIfLoggedIn;
