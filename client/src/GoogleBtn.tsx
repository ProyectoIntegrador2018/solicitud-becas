import React, { Component } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

// this isn't private necessarily, just a way to uniquely identify
// the web application, the control panel for this is located in:
// https://console.developers.google.com/apis/credentials?project=solicitud-becas
const CLIENT_ID = '401453194268-j77retfhpocjvd3lhrniu3c35asluk9s.apps.googleusercontent.com';

type State = {
  isLoggedIn: boolean;
  accessToken: string;
};

class GoogleBtn extends Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      accessToken: '',
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(response) {
    console.log(response);
    if (response.accessToken) {
      this.setState(_state => ({
        isLoggedIn: true,
        accessToken: response.accessToken,
      }));
    }
  }

  logout() {
    this.setState(_state => ({
      isLoggedIn: false,
      accessToken: '',
    }));
  }

  render() {
    const { isLoggedIn, accessToken } = this.state;
    return (
      <div>
        {isLoggedIn ? (
          // documentation of what this options do
          // https://github.com/anthonyjgrove/react-google-login#logout-props
          <GoogleLogout clientId={CLIENT_ID} buttonText="Logout" onLogoutSuccess={this.logout} />
        ) : (
          // documentation of what this options do
          // https://github.com/anthonyjgrove/react-google-login#login-props
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Login"
            onSuccess={this.login}
            cookiePolicy="single_host_origin"
            responseType="id_token,token"
          />
        )}
        {accessToken ? (
          <h5>
            Your Access Token: <br />
            <br /> {accessToken}
          </h5>
        ) : null}
      </div>
    );
  }
}

export default GoogleBtn;
