import config from 'configs';

//Import Layouts

//Import Pages
import LandingPage from 'pages/Landing/Landing';
import HomePage from 'pages/Home/Home';
import SignUpPage from 'pages/SignUp/SignUp';
import LogInPage from 'pages/LogIn/LogIn';
import EditAccountPage from 'pages/EditAccount';
import EmailActivated from 'pages/EmailActivated/EmailActivated';
import ClassDetailPage from 'pages/ClassDetail';

const publicRoutes = [
    { path: config.routes.landing, component: LandingPage },
    { path: config.routes.editAccount },
    { path: config.routes.signup, component: SignUpPage, layout: null },
    { path: config.routes.login, component: LogInPage, layout: null },
    { path: config.routes.emailActivated, component: EmailActivated, layout: null },
    { path: config.routes.classDetail }
];

const privateRoutes = [
    { path: config.routes.login },
    { path: config.routes.signup },
    { path: config.routes.home, component: HomePage },
    { path: config.routes.editAccount, component: EditAccountPage },
    { path: config.routes.classDetail, component: ClassDetailPage }
];

const allRoutes = [
    { path: config.routes.landing, component: LandingPage },
    { path: config.routes.signup, component: SignUpPage, layout: null },
    { path: config.routes.login, component: LogInPage, layout: null },
    { path: config.routes.home, component: HomePage },
    { path: config.routes.editAccount, component: EditAccountPage },
    { path: config.routes.classDetail, component: ClassDetailPage }
];

export { publicRoutes, privateRoutes, allRoutes };
