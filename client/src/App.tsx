import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import AuthProvider from './components/auth/AuthProvider';
import ApolloProvider from './components/apollo/ApolloProvider';
import Header from './components/header/Header';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ApolloProvider>
          <Header />
          <main className="layout">
            <Routes />
          </main>
        </ApolloProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
