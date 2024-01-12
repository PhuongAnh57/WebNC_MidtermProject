import { useContext } from 'react';
import { AuthContext } from 'context/AuthProvider';
import User from './User';
import Guest from './Guest';

export default function Header() {
    const { user: auth } = useContext(AuthContext);
    const token = localStorage.getItem('accessToken');

    if (token && auth.user) return <User />;

    return <Guest />;
}
