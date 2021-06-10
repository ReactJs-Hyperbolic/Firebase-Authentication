import React, { useState } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  //   Function needs to be async since we're awaiting within (for logout() method to return)
  async function handleLogout() {
    setError('');

    try {
      //   await out logout function from context which returns a promise (hence the await)
      await logout();
      history.push('/');
    } catch (error) {
      setError('Failed to log out:', error);
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Profile</h2>
          {/* Alert to handle errors while trying to log out */}
          {error && <Alert variant='danger'>{error}</Alert>}
          <strong>Email: </strong>
          {currentUser.email}
          <Link to='/update-profile' className='btn btn-primary w-100 mt-3'>
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Button variant='link' onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
