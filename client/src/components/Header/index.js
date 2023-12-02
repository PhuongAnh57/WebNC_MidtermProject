import User from './User';
import Guest from './Guest';

export default function Header() {
    const token = localStorage.getItem('accessToken');

    return token ? <User /> : <Guest />;
}
