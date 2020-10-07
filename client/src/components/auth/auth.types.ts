export interface IUser {
  name: string;
  last_name: string;
  googleProfile: {
    googleId: string;
    imageUrl: string;
    email: string;
    name: string;
    givenName: string;
    familyName: string;
  };
}

export interface IAuthContext {
  user: IUser;
  authenticated: boolean;
  loading: boolean;
  logout: () => void;
  fetchUser: () => void;
}

export interface IAuthState {
  user: IUser;
  authenticated: boolean;
  loading: boolean;
}
