import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import './form.css';

export default function ForgotPassword() {
  const emailRef = useRef();

  // Destructure the 'value' object passed into the provider within the AuthContext, accessible through the custom useAuth hook
  const { resetPassword } = useAuth();

  // Create state for error messages which is initially empty
  const [error, setError] = useState('');

  const [message, setMessage] = useState('');

  // Create state variable to manage loading and to prevent certain actions during loading
  const [isLoading, setLoading] = useState(false);

  // Redirect to the dashboard within the authentication with useHistory hook from react-router-dom

  // handleSubmit method passed into form onSubmit
  // Async method to wait for user sign in process
  async function handleSubmit(e) {
    // Prevent our form from refreshing
    e.preventDefault();

    // Login Logic
    try {
      setMessage('');
      // Clear error messages
      setError('');
      // Loading is true until the signup method is done
      setLoading(true);
      // Use the signup method destructured from AuthContext.js
      // to sign in the user with the email and password provided.
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions.');
    } catch {
      setError('Failed to reset password.');
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In</h2>
          {/* If there IS an error, use bootstrap Alert element to display the error state variable message */}
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder='Enter your email'
                autoComplete='username'
                type='email'
                ref={emailRef}
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
              Reset Password
            </Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to='/login'>Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/signup'>Sign Up</Link>
      </div>
    </>
  );
}
