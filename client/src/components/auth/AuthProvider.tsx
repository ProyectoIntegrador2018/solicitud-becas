import React, { useState } from 'react';
import { IAuthContext, IAuthState } from './auth.types';

interface IProps {
  children: React.ReactNode;
}

export const Context = React.createContext<IAuthContext>(null);

const AuthProvider: React.FC<IProps> = ({ children }: IProps) => {
  const initialAuthState = {
    user: null,
    authenticated: false,
    loading: true,
  };

  const [state, setState] = useState<IAuthState>(initialAuthState);

  const logout = () => {
    // API Call para logout
    setState({
      user: null,
      authenticated: false,
      loading: false,
    });
  };

  const fetchUser = () => {
    // API get call para user
    setState({
      user: null,
      authenticated: false,
      loading: false,
    });
  };

  const context = {
    ...state,
    logout,
    fetchUser,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default AuthProvider;
