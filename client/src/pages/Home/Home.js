import { useState, useEffect } from 'react';
import { Navigate } from 'react-router';

import DefaultLayout from 'layouts/DefaultLayout';

export default function Home() {
    // const [loggedIn, setLoggedIn] = useState(true);

    const isLoggedIn = localStorage.getItem('token');
    if(!isLoggedIn) {
      // redirect to landing page
      return <Navigate to='/' replace={true}></Navigate>
    }

    return (
        <DefaultLayout>
            <div>HOME</div>
        </DefaultLayout>
    );
}
