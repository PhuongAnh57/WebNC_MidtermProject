import { Navigate } from 'react-router';

import MainLayout from 'layouts/MainLayout';
import CourseCard from './CourseCard'

export default function Home() {
    // const [loggedIn, setLoggedIn] = useState(true);

    const isLoggedIn = localStorage.getItem('token');
    if (!isLoggedIn) {
        // redirect to landing page
        return <Navigate to="/" replace={true}></Navigate>;
    }

    return (
        <MainLayout>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
                <CourseCard />
            </div>
        </MainLayout>
    );
}
