import DefaultLayout from 'layouts/DefaultLayout';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router';

export default function Landing() {
    const [token, setToken] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(true);
        }
    }, []);

    if (token) {
        return <Navigate to='/home' replace={true}></Navigate>
    }

    return (
        <DefaultLayout>
            <div>
                LANDING
            </div>
        </DefaultLayout>
    )
}
