import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import './form.css';
import { Link, useHistory } from 'react-router-dom';

export default function UpdateProfile() {
  const emailRef = useRef();
  const passRef = useRef();
  const passConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();

  console.log(currentUser);

  function handleSubmit(e) {
    e.preventDefault();

    if (passRef.current.value !== passConfirmRef.current.value) {
      return setError('Passwords do not match!');
    }

    const promises = [];
    setLoading(true);
    setError('');

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passRef.current.value) {
      promises.push(updatePassword(passRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push('/');
      })
      .catch(() => {
        setError('Failed to update account');
      })
      .finally(() => {
        setLoading(false);
      });

    try {
      setError('');
      setLoading(true);
      //   await signup(emailRef.current.value, passRef.current.value);
      history.push('/');
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Update Profile</h2>
          {/* If there IS an error, use bootstrap Alert element to display the error state variable message */}
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                defaultValue={currentUser.email}
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
                placeholder='Optional'
                autoComplete='new-password'
                type='password'
                ref={passRef}
              />
            </Form.Group>
            <Form.Group
              id='password-confirmation'
              style={{ marginTop: '1rem' }}
            >
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                placeholder='Optional'
                autoComplete='new-password'
                type='password'
                ref={passConfirmRef}
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
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Link to='/'>Cancel</Link>
      </div>
    </>
  );
}
