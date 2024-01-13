import DefaultLayout from 'layouts/DefaultLayout';
import { Navigate } from 'react-router';
import { BackgroundLanding } from 'assets/images';

export default function Landing() {
    if (localStorage.getItem('accessToken')) {
        return <Navigate to="/home" />;
    }

    return (
        <DefaultLayout>
            <div>
                <img src={BackgroundLanding} alt="background" style={{ width: '100%' }} />
            </div>
        </DefaultLayout>
    );
}
