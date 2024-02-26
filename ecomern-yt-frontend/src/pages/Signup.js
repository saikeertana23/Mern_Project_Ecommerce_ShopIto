// Signup.js
import React from 'react';
import { Container, Row, Col, Button,Alert,  Form as BootstrapForm } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import { useState } from 'react';
import "./Signup.css";
import { useSignupMutation } from '../services/appApi';

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [signup,{error, isLoading, isError}] = useSignupMutation();

    function handleSignup(e) {
        e.preventDefault();
        signup({ name, email, password });
    }

    return (
        <Container>
            <Row>
                <Col md={6} className="signup__form--container">
                    <BootstrapForm style={{ width: "100%" }} onSubmit={handleSignup} >
                        <h1>Create an account</h1>
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <BootstrapForm.Group>
                            <BootstrapForm.Label>Name</BootstrapForm.Label>
                            <BootstrapForm.Control type="text" placeholder="Enter Name" value={name} required onChange={(e) => setName(e.target.value)} />
                        </BootstrapForm.Group>
                        <BootstrapForm.Group>
                            <BootstrapForm.Label>Email Address</BootstrapForm.Label>
                            <BootstrapForm.Control type="email" placeholder="Enter Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                        </BootstrapForm.Group>
                        <BootstrapForm.Group>
                            <BootstrapForm.Label>Password</BootstrapForm.Label>
                            <BootstrapForm.Control type="password" placeholder="Enter Password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group>
                        <Button type="submit" disabled={isLoading}>Create account</Button>
                        </BootstrapForm.Group>
                        <p>Already have an account?<Link to="/login">Login</Link></p>
                    </BootstrapForm>
                </Col>
                <Col md={6} className="signup__image--container"></Col>
            </Row>
        </Container>
    );
}

export default Signup;
