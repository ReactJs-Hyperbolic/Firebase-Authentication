import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from './Context/AuthContext';

export default function Signup() {
  const emailRef = useRef();
  const passRef = useRef();
  const passConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    // Validation checks
    if (passRef.current.value !== passConfirmRef.current.value) {
      // Set an error with new state
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passRef.current.value);
    } catch {
      setError('Failed to create user');
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          {error && <Alert variant='danger'>Error</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' ref={passRef} required />
            </Form.Group>
            <Form.Group id='password-confirmation'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='password' ref={passConfirmRef} required />
            </Form.Group>
            {/* Set disabled state to same bool value as 'if loading' */}
            <Button disabled={loading} className='w-100' type='submit'>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? Log In.
      </div>
    </>
  );
}
