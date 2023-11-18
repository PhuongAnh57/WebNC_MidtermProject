import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Fragment } from 'react';

import { publicRoutes, privateRoutes } from 'routes';
import DefaultLayout from 'layouts';

function App() {
    localStorage.setItem('isUser', JSON.stringify(false)); // Lưu giá trị boolean vào localStorage
    const user = JSON.parse(localStorage.getItem('isUser')); // Lấy giá trị từ localStorage và chuyển đổi thành boolean

    //user = false: chưa đăng nhập
    //user = true: đã đăng nhập

    return (
        <BrowserRouter>
            <div className="app">
                {user ? (
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
