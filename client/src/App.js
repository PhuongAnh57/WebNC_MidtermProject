import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Fragment, useState, useEffect } from 'react';

import { publicRoutes, privateRoutes } from 'routes';
import DefaultLayout from 'layouts';

function App() {
    const [token, setToken] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setToken(true);
        }
    }, []);

    return (
        <BrowserRouter>
            <div className="app">
                {token ? (
                    <Routes>
                        {privateRoutes.map((route, index) => {
                            const Layout = route?.layout === null ? Fragment : DefaultLayout;

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            {route.path === '/login' || route.path === '/signup' ? (
                                                <Navigate to="/" replace={true} />
                                            ) : (
                                                <route.component />
                                            )}
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                ) : (
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Layout = route?.layout === null ? Fragment : DefaultLayout;

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            {route.path === '/editAccount' ? (
                                                <Navigate to="/" replace={true} />
                                            ) : (
                                                <route.component />
                                            )}
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                )}
            </div>
        </BrowserRouter>
    );
}

export default App;
