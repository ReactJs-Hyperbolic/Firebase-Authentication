import React from 'react';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Login from './Login';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
// Bring in routing
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    // Wrap everything in AuthProvider (Custom context provider) to give access to child components
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: '100vh' }}
    >
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path='/' component={Dashboard} />
              <Route path='/signup' component={Signup} />
              <Route path='/login' component={Login} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
