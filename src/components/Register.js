import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React from "react";
import app from "../firebase/firebase.init";

const auth = getAuth(app);

const Register = () => {
  const handleRegisterForm = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;
    // console.log(email, pass);

    createUserWithEmailAndPassword(auth, email, pass)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((err) => {
        console.log(err.massage);
      });
  };
  return (
    <div>
      <form onSubmit={handleRegisterForm}>
        <input type="email" name="email" id="" placeholder="your email" />
        <br />
        <input
          type="password"
          name="password"
          id=""
          placeholder="your password"
        />
        <br />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
