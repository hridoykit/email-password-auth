import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import app from "../../firebase-app/firebase.init";

const auth = getAuth(app);

const LoginBootstrap = () => {
  const [success, setSuccess] = useState(false);

  const handleLoginSubmission = (e) => {
    e.preventDefault();
    setSuccess(false);

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then(res =>{
        const user = res.user;
        console.log(user);
        e.target.reset();
        
      })
      .then(err =>{
        console.log('error:', err);
      })
  };

  return (
    <div className="w-50 mx-auto">
      <h3 className="text-center text-primary">Please Login!!</h3>
      <Form onSubmit={handleLoginSubmission}>
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
        {/* <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check label="Remember me" />
          </Col>
        </Form.Group> */}

      {/* successfull mgs */}
      {success && <p className="text-success text-center">Successfully login to the acccout.</p>}
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Login</Button>
          </Col>
        </Form.Group>
      </Form>

      <p className="text-end">
        <small>
          New to this website? Please
          <Link className="text-decoration-none" to="/register">
            {" "}
            Register
          </Link>
        </small>
      </p>
    </div>
  );
};

export default LoginBootstrap;
