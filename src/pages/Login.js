import React from "react";
import { auth, provider } from "../firebase/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };
  return (
    <div className="loginPage">
      <p>Sign In With Google to Continue</p>
      <button onClick={signInWithGoogle} className="login-with-google-btn">
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
