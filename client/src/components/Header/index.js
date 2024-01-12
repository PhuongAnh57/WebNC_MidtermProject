import User from './User';
import Guest from './Guest';

export default function Header() {
    const token = localStorage.getItem('accessToken');

    if (token) return <User />;
    return <Guest />;
}
