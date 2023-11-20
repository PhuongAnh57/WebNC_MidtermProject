import User from './User';
import Guest from './Guest';

export default function Header() {
    const token = localStorage.getItem('token');

    //User: đã đăng nhập
    //Guest: chưa đăng nhập

    return token ? <User /> : <Guest />;
}
