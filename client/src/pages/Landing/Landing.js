import DefaultLayout from 'layouts/DefaultLayout';
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router';
import { BackgroundLanding } from 'assets/images';

import { AuthContext } from 'context/AuthProvider';

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
