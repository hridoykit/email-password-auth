import {
  createUserWithEmailAndPassword,
  getAuth
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

    const email = e.target.email.value;
    const pass = e.target.password.value;
    console.log(email, pass);

    //validate the password using regular expression
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
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
        console.log(user);
        setSuccess(true);
        // <----after creating a user form will be reset here---->
        e.target.reset();
        // verifyEmail(); 
      })
      .catch((err) => {
        console.log("error", err);
        //set firebase email duplication error
        setPassErr(err.message);
      });
  };

  //<----email address verification---->
  // const verifyEmail = (e) => {
  //   sendEmailVerification(auth.currentUser).then(() => {
  //     //verification email send
  //     alert("please check your email and verify email address");
  //   });
  // };

  return (
    <div className="w-50 mx-auto">
      <h3 className="text-center text-primary">Please Register</h3>
      <Form onSubmit={handleRegisterSubmission} className="mt-3">
        {/* <Row>
      <Col>
          <Form.Control placeholder="First name" />
        </Col>
        <Col>
          <Form.Control placeholder="Last name" />
        </Col>
      </Row> */}

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

        {/* show password validate error mgs */}
        <p className="text-danger text-center">{passErr}</p>

        {/* after creating a user show successfull mgs*/}
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