import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import './form.css';

export default function Signup() {
  const emailRef = useRef();
  const passRef = useRef();
  const passConfirmRef = useRef();

  // Destructure the 'value' object passed into the provider within the AuthContext, accessible through the custom useAuth hook
  const { signup } = useAuth();

  // Create state for error messages which is initially empty
  const [error, setError] = useState('');

  // Create state variable to manage loading and to prevent certain actions during loading
  const [isLoading, setLoading] = useState(false);

  // handleSubmit method passed into form onSubmit
  // Async method to wait for user sign in process
  async function handleSubmit(e) {
    // Prevent our form from refreshing
    e.preventDefault();

    // Check that both passwords are matching (password -> passwordConfirm)
    if (passRef.current.value !== passConfirmRef.current.value) {
      // Passwords DON'T match - setError message and Return out of this function because there was an error.
      return setError('Passwords do not match!');
    }

    try {
      // Clear error messages
      setError('');
      // Loading is true until the signup method is done
      setLoading(true);
      // Use the signup method destructured from AuthContext.js
      // to sign in the user with the email and password provided.
      await signup(emailRef.current.value, passRef.current.value);
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          {/* If there IS an error, use bootstrap Alert element to display the error state variable message */}
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder='Your email address'
                autoComplete='username'
                type='email'
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group id='password' style={{ marginTop: '1rem' }}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder='Choose a secure password'
                autoComplete='new-password'
                type='password'
                ref={passRef}
                required
              />
            </Form.Group>
            <Form.Group
              id='password-confirmation'
              style={{ marginTop: '1rem' }}
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder='Re-type secure password'
                autoComplete='new-password'
                type='password'
                ref={passConfirmRef}
                required
              />
            </Form.Group>
            <Button
              // Disable the buton with a bool value that correlates with isLoading
              disabled={isLoading}
              className='w-100'
              // type=submit to submit the form data, triggering the handleSubmit method
              type='submit'
              style={{ marginTop: '2rem' }}
            >
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
