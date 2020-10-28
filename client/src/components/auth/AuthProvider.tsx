import React, { useState } from 'react';
import { IAuthContext, IAuthState } from './auth.types';
import { GoogleLoginResponse } from 'react-google-login';

interface IProps {
  children: React.ReactNode;
}

export const Context = React.createContext<IAuthContext>(null);

const AuthProvider: React.FC<IProps> = ({ children }: IProps) => {
  const initialAuthState = {
    user: {
      googleId: 'prueba',
      imageUrl: 'prueba',
      email: 'prueba',
      name: 'prueba',
      givenName: 'prueba',
      familyName: 'prueba',
    },
    authenticated: true,
    admin: true,
    evaluator: false,
    loading: false,
    accessToken: '',
  };

  const [state, setState] = useState<IAuthState>(initialAuthState);

  const logout = () => {
    // API Call para logout
    setState({
      user: null,
      authenticated: false,
      admin: false,
      evaluator: false,
      loading: false,
      accessToken: '',
    });
  };

  const login = (response: GoogleLoginResponse) => {
    const { profileObj, accessToken } = response;
    // API get call para user
    if (accessToken) {
      setState({
        user: profileObj,
        authenticated: true,
        admin: true,
        evaluator: true,
        loading: false,
        accessToken,
      });
    } else {
      logout();
    }
  };

  const context = {
    ...state,
    logout,
    login,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default AuthProvider;
