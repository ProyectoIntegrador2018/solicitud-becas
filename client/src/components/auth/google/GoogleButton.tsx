import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import useAuth from '../../../utils/hooks/useAuth';
import './googleButton.css';

// this isn't private necessarily, just a way to uniquely identify
// the web application, the control panel for this is located in:
// https://console.developers.google.com/apis/credentials?project=sistema-solicitud-becas

const CLIENT_ID = '216039231926-jsvj7dkaghqhg09teqv5b31gm6elhk8c.apps.googleusercontent.com';

const GoogleButton: React.FC = () => {
  const { login, logout, authenticated } = useAuth();
  return (
    <div>
      {authenticated ? (
        // documentation of what this options do
        // https://github.com/anthonyjgrove/react-google-login#logout-props
        <GoogleLogout clientId={CLIENT_ID} buttonText="Cerrar sesión" onLogoutSuccess={logout} />
      ) : (
        // documentation of what this options do
        // https://github.com/anthonyjgrove/react-google-login#login-props
        <GoogleLogin
          clientId={CLIENT_ID}
          buttonText="Iniciar sesión"
          onSuccess={login}
          cookiePolicy="single_host_origin"
          responseType="id_token,token"
          className="googleButton"
        />
      )}
    </div>
  );
};

export default GoogleButton;
