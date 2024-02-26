import React from 'react';
import { Container, Row, Col, Button, Form as BootstrapForm, Alert } from 'react-bootstrap'; // Change the import alias to avoid conflicts
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLoginMutation } from '../services/appApi';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, { isError, isLoading, error }] = useLoginMutation();
    function handleLogin(e) {
        // Handle form submission logic here
        e.preventDefault();
        login({ email, password });
    }

    return (
        <Container>
            <Row>
                <Col md={6} className="login__form--container">
                    <BootstrapForm style={{ width: "100%" }} onSubmit={handleLogin} >
                        <h1>Login to your account</h1>
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <BootstrapForm.Group>
                            <BootstrapForm.Label>Email Address</BootstrapForm.Label>
                            <BootstrapForm.Control type="email" placeholder="Enter Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                        </BootstrapForm.Group>
                        <BootstrapForm.Group className='mb-3'>
                            <BootstrapForm.Label>Password</BootstrapForm.Label>
                            <BootstrapForm.Control type="password" placeholder="Enter Password" value={password} required onChange={(e) => setPassword(e.target.value)} />
                        </BootstrapForm.Group>
                        <BootstrapForm.Group>
                            <Button type="submit" disabled={isLoading} >Login</Button>
                        </BootstrapForm.Group>
                        <p>Don't have an account?<Link to="/signup">Create account</Link></p>
                    </BootstrapForm>
                </Col>
                <Col md={6} className="login__image--container"></Col>
            </Row>
        </Container>
    );
}

export default Login;
