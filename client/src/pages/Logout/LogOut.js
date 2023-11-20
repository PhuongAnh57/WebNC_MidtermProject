import { Navigate } from 'react-router-dom';

function LogOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

    return <Navigate to="/" />;
}

export default LogOut;
