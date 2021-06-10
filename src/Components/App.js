import React from 'react';
import Signup from './Signup';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';

function App() {
  return (
    // Wrap everything in AuthProvider (Custom context provider) to give access to child components
    <AuthProvider>
      <Container
        className='d-flex align-items-center justify-content-center'
        style={{ minHeight: '100vh' }}
      >
        <div className='w-100' style={{ maxWidth: '400px' }}>
          <Signup />
        </div>
      </Container>
    </AuthProvider>
  );
}

export default App;
