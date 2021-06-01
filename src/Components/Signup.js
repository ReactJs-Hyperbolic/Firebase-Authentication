import React, { useRef } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useAuth } from './Context/AuthContext';

export default function Signup() {
  const emailRef = useRef();
  const passRef = useRef();
  const passConfirmRef = useRef();
  const { signup } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    signup(emailRef.current.value, passRef.current.value);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign Up</h2>
          <Form>
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
            <Button className='w-100' type='submit'>
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
