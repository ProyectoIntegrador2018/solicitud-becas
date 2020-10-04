import { useContext } from 'react';
import { Context } from '../../components/auth/AuthProvider';
import { IAuthContext } from '../../components/auth/auth.types';

const useAuth: () => IAuthContext = () => useContext(Context);

export default useAuth;
