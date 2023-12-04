import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from 'pages/Landing/Landing';
import SignUp from 'pages/SignUp/SignUp';
import LogIn from 'pages/LogIn/LogIn';
import Home from 'pages/Home/Home';
import EditAccount from 'pages/EditAccount';
import LogOut from 'pages/Logout/LogOut';
import PageNotFound from 'pages/PageNotFound/PageNotFound';
import AuthProvider from 'context/AuthProvider';
import EmailActivated from 'pages/EmailActivated/EmailActivated';
import ResetPassword from 'pages/ResetPassword/ResetPassword';
import NewPassword from 'pages/NewPassword/NewPassword';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="app">
                    <Routes>
                        <Route exact path="/" element={<Landing />} />
                        <Route exact path="/landing" element={<Landing />} />

                        <Route exact path="/signup" element={<SignUp />} />
                        <Route exact path="/register" element={<SignUp />} />

                        <Route exact path="/api/user/email-confirm/:token" element={<EmailActivated />} />

                        <Route exact path="/forgot-password" element={<ResetPassword />} />
                        <Route exact path="/api/user/password-reset/:token" element={<NewPassword />} />

                        <Route exact path="/login" element={<LogIn />} />
                        <Route exact path="/signin" element={<LogIn />} />

                        <Route exact path="/home" element={<Home />} />

                        <Route exact path="/edit-account" element={<EditAccount />} />

                        <Route exact path="/logout" element={<LogOut />} />

                        {/* Nếu người dùng nhập một đường dẫn không khớp, thông báo page not found */}
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
