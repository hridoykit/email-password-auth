import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile
} from "firebase/auth";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import app from "../firebase-app/firebase.init";

const auth = getAuth(app);

const RegisterBootstrap = () => {
  const [passErr, setPassErr] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegisterSubmission = (e) => {
    e.preventDefault();
    setSuccess(false);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const pass = e.target.password.value;

    //<----validate password---->
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!regex.test(pass)) {
      setPassErr(
        "password should contain atleast one number and one special character"
      );
      // return false;
      return;
    }

    createUserWithEmailAndPassword(auth, email, pass)
      .then((res) => {
        const user = res.user;
        setSuccess(true);

        e.target.reset();
        
        verifyEmail();
        updateUserName(name); 
      })
      .catch((err) => {
        console.log("error", err);
        //firebase email duplication error
        setPassErr(err.message);
      });
  };

  //<----verify email address---->
  const verifyEmail = (e) => {
    sendEmailVerification(auth.currentUser).then(() => {
      //verification email send
      alert("please check your email and verify email address");
    });
  };

  //<----update user profile---->
  const updateUserName = name =>{
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() =>{
        console.log('display name updated');
      })
      .then(err=>console.log('error:', err));
  };

  return (
    <div className="w-50 mx-auto">

      <h3 className="text-center text-primary">Please Register</h3>
      
      <Form onSubmit={handleRegisterSubmission} className="mt-3">
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control name="name" type="text" placeholder="Full Name" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control name="email" type="email" placeholder="Email" />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
            />
          </Col>
        </Form.Group>

        {/* password validate error mgs */}
        <p className="text-danger text-center">{passErr}</p>

        {/* successfull mgs*/}
        {success && <p className='text-success text-center'> User created successfully </p>}

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Register</Button>
          </Col>
        </Form.Group>
      </Form>

      <p className="text-end">
        <small>
          Already have an account?
          <Link className="text-decoration-none" to="/login">
            {" "}
            Log in{" "}
          </Link>
          here!
        </small>
      </p>
    </div>
  );
};

export default RegisterBootstrap;
