import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import AuthProvider from './components/auth/AuthProvider';
import ApolloProvider from './components/apollo/ApolloProvider';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ApolloProvider>
          <Routes />
        </ApolloProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
