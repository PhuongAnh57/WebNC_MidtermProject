import DefaultLayout from 'layouts/DefaultLayout';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import { BackgroundLanding } from 'assets/images';

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
                <img 
                    src={BackgroundLanding} 
                    alt='background' 
                    style={{ width: '100%' }}/>
            </div>
        </DefaultLayout>
    )
}
