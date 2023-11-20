import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from 'pages/Landing/Landing';
import SignUp from 'pages/SignUp/SignUp';
import LogIn from 'pages/LogIn/LogIn';
import Home from 'pages/Home/Home';
import EditAccount from 'pages/EditAccount';
import LogOut from 'pages/Logout/LogOut';
import PageNotFound from 'pages/PageNotFound/PageNotFound';

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route exact path="/" element={<Landing />} />
                    <Route exact path="/landing" element={<Landing />} />

                    <Route exact path="/signup" element={<SignUp />} />
                    <Route exact path="/register" element={<SignUp />} />

                    <Route exact path="/login" element={<LogIn />} />
                    <Route exact path="/signin" element={<LogIn />} />

                    <Route exact path="/home" element={<Home />} />

                    <Route exact path="/editAccount" element={<EditAccount />} />

                    <Route exact path="/logout" element={<LogOut />} />

                    {/* Nếu người dùng nhập một đường dẫn không khớp, thông báo page not found */}
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

{
    /* {token ? (
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
                )} */
}
