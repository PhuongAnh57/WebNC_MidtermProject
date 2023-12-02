import { Navigate } from 'react-router';

import MainLayout from 'layouts/MainLayout';
import CourseCard from './CourseCard';

export default function Home() {
    if (!localStorage.getItem('accessToken')) {
        // redirect to landing page
        return <Navigate to="/" />;
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
