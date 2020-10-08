import { GoogleLoginResponse } from 'react-google-login';

export interface IGoogleUser {
  googleId: string;
  imageUrl: string;
  email: string;
  name: string;
  givenName: string;
  familyName: string;
}

export interface IAuthContext {
  user: IGoogleUser;
  authenticated: boolean;
  loading: boolean;
  accessToken: string;
  logout: () => void;
  login: (response: GoogleLoginResponse) => void;
}

export interface IAuthState {
  user: IGoogleUser;
  authenticated: boolean;
  loading: boolean;
  accessToken: string;
}
