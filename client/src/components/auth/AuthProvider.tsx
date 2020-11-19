import React, { useState } from 'react';
import { IAuthContext, IAuthState } from './auth.types';
import { GoogleLoginResponse } from 'react-google-login';
import Swal from 'sweetalert2';

interface IProps {
  children: React.ReactNode;
}

export const Context = React.createContext<IAuthContext>(null);

const AuthProvider: React.FC<IProps> = ({ children }: IProps) => {
  const initialAuthState = {
    user: null,
    authenticated: false,
    admin: false,
    loading: true,
    evaluator: false,
    convenings: ['Conv1', 'Conv2', 'Conv3'],
  };

  const [state, setState] = useState<IAuthState>(initialAuthState);

  const logout = () => {
    setState({
      user: null,
      authenticated: false,
      admin: false,
      evaluator: false,
      convenings: [],
      loading: false,
    });
    localStorage.removeItem('accessTokenBecas');
    localStorage.removeItem('tokenIdBecas');
  };

  const fetchSession = async (accessToken: string, tokenId: string) => {
    return fetch('http://192.168.10.182:8080/user-log-in/', {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken,
        tokenId,
      }),
      method: 'POST',
    });
  };
  const login = (response: GoogleLoginResponse) => {
    const { profileObj, accessToken, tokenId } = response;
    fetchSession(accessToken, tokenId)
      .then(response => response.json())
      .then(data => {
        if (data.reason) {
          // eslint-disable-next-line
          throw 'Usuario no registrado';
        }
        setState({
          user: profileObj,
          authenticated: true,
          admin: true,
          loading: false,
          evaluator: true,
          convenings: ['Conv1', 'Conv2', 'Conv3'],
        });
        localStorage.setItem('accessTokenBecas', accessToken);
        localStorage.setItem('tokenIdBecas', tokenId);
      })
      .catch(error => {
        Swal.fire({
          title: `Hubo un error: ${error}`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      });
  };

  const context = {
    ...state,
    logout,
    login,
    fetchSession,
    setState,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default AuthProvider;
