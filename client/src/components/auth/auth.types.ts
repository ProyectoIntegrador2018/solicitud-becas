import { GoogleLoginResponse } from 'react-google-login';

export interface IGoogleUser {
  googleId: string;
  email: string;
  givenName: string;
  familyName: string;
}

export interface IAuthContext {
  user: IGoogleUser;
  admin: boolean;
  evaluator: boolean;
  authenticated: boolean;
  convenings?: string[];
  loading: boolean;
  logout: () => void;
  login: (response: GoogleLoginResponse) => void;
  fetchSession: (accessToken: string, tokenId: string) => Promise<Response>;
  setState: (value: React.SetStateAction<IAuthState>) => void;
}

export interface IAuthState {
  loading: boolean;
  user: IGoogleUser;
  admin: boolean;
  evaluator: boolean;
  authenticated: boolean;
  convenings?: string[];
}
