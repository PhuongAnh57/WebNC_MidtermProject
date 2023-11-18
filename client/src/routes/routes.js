import config from "configs";

//Import Layouts

//Import Pages
import LandingPage from "pages/Landing";
import HomePage from "pages/Home";
import SignUpPage from "pages/SignUp";
import LogInPage from "pages/LogIn";
import EditAccountPage from "pages/EditAccount";

const publicRoutes = [
    {path: config.routes.landing, component: LandingPage},
    {path: config.routes.editAccount},
    {path: config.routes.signup, component: SignUpPage, layout: null},
    {path: config.routes.login, component: LogInPage, layout: null},
];

const privateRoutes = [
    {path: config.routes.login },
    {path: config.routes.signup },
    {path: config.routes.home, component: HomePage},
    {path: config.routes.editAccount, component: EditAccountPage}
];

export { publicRoutes, privateRoutes };