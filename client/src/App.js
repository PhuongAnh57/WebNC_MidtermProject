import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from 'pages/Landing/Landing';
import SignUp from 'pages/SignUp/SignUp';
import LogIn from 'pages/LogIn/LogIn';
import Home from 'pages/Home/Home';
import EditAccount from 'pages/EditAccount';
import PageNotFound from 'pages/PageNotFound/PageNotFound';
import AuthProvider from 'context/AuthProvider';
import ActivateAccount from 'pages/ActivateAccount/ActivateAccount';
import ResetPassword from 'pages/ResetPassword/ResetPassword';
import NewPassword from 'pages/NewPassword/NewPassword';
import JoinedEmail from 'pages/JoinedEmail/JoinedEmail';
import JoinedLink from 'pages/JoinedLink/JoinedLink';

import ClassDetail from 'pages/ClassDetail/ClassDetail';
import Instruction from 'pages/ClassDetail/Classwork/ClassworkDetail';
import MaterialDetail from 'pages/ClassDetail/Classwork/MaterialDetail';
import GradeDetail from 'pages/ClassDetail/Grade/GradeDetail';

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

                        <Route exact path="/api/user/email-confirm/:token" element={<ActivateAccount />} />

                        <Route exact path="/forgot-password" element={<ResetPassword />} />
                        <Route exact path="/api/user/password-reset/:token" element={<NewPassword />} />

                        <Route exact path="/login" element={<LogIn />} />
                        <Route exact path="/signin" element={<LogIn />} />

                        <Route exact path="/home" element={<Home />} />

                        <Route exact path="/edit-account" element={<EditAccount />} />

                        <Route exact path="/logout" element={<Landing />} />

                        <Route exact path="/class/:classID" element={<ClassDetail />} />

                        <Route exact path="/api/class/:classID/invite/accept-token/:token" element={<JoinedEmail />} />

                        <Route exact path="/class/:classID/invite" element={<JoinedLink />} />

                        <Route exact path="/class/:classID/assignment-instruction" element={<Instruction />} />

                        <Route exact path="/class/:classID/material" element={<MaterialDetail />} />

                        <Route exact path="/class/:classID/:fullname" element={<GradeDetail />} />

                        {/* Nếu người dùng nhập một đường dẫn không khớp, thông báo page not found */}
                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
