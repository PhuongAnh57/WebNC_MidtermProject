import { react } from 'react';
import Header from './components/Header';
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp';
import EditAccount from './pages/EditAccount';
import Footer from './components/Footer';

function App() {
    return (
        <div>
            {/* <Header/> */}
            {/* <Home/> */}
            {/* <LogIn/>
            <SignUp/> */}
            <EditAccount/>
            <Footer/>
        </div>
    )
}

export default App;
