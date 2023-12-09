import { Navigate } from 'react-router';

function JoinClass({ props }) {
    if (!localStorage.getItem('accessToken')) {
        return <Navigate to="/login" />;
    }
    return <></>;
}

export default JoinClass;
