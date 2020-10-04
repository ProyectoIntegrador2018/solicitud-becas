export interface IUser {
  name: string;
  last_name: string;
  id: number;
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
