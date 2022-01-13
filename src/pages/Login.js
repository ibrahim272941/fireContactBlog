import React, { useState } from "react";
import { auth, provider } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      let user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <div className="register">
      {/* <div className="form-image">
        <img src={"https://picsum.photos/800/800"} alt="sample-movie" />
      </div> */}
      <div className="register-form">
        <h1 className="form-title display-3">Login</h1>
        <form id="login" className="form-control">
          <div className="mb-3">
            <label for="email" className="form-label display-4">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email address..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="password" className="form-label display-4">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="button"
            className="btn btn-primary form-control"
            value="Login"
            onClick={handleSubmit}
          />
          <button onClick={signInWithGoogle} className="login-with-google-btn">
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
