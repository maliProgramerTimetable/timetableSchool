import React, { useEffect, useState } from "react";
import firebase from "../firebase/firebase";
import "./LoginScreen.css";

const LoginScreen = () => {
  const [error, setError] = useState("");
  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email.toString(), password)
      .then((userCredential) => {
        localStorage.setItem("uid", JSON.stringify(userCredential.user.uid));
        window.location.href = "/";
      })
      .catch((error) => {
        if(error.message === "The password is invalid or the user does not have a password."){
          setError("Pogrešna Šifra");
        }else if(error.message === "The email address is badly formatted."){
          setError("Molimo unesite Email");
        }else if(error.message === "There is no user record corresponding to this identifier. The user may have been deleted."){
          setError("Korisnik ne postoji");
        }else{
          setError(error.message);
        }
      });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("uid", JSON.stringify(user.uid));
      } else {
        localStorage.removeItem("uid");
      }
    });
  }, []);

  return (
    <div className="loginScreen">
      <div class="screen-1">
        <div className="email">
          <div className="conatiener"></div>
          <label for="email">Email Address</label>
          <div className="sec-2">
            <ion-icon name="mail-outline"></ion-icon>
            <input
              type="email"
              name="email"
              placeholder="Username@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="password">
          <label for="password">Password</label>
          <div className="sec-2">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input
              className="pas"
              type="password"
              name="password"
              placeholder="············"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="err">{error}</div>
        <button className="login" onClick={handleLogin}>
          Login{" "}
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
