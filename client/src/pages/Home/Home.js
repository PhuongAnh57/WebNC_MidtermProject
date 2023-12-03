import { Navigate } from 'react-router';

import MainLayout from 'layouts/MainLayout';
import CourseCard from './CourseCard';

export default function Home() {
    // Đọc thông tin người dùng từ cookie
    if(document.cookie) {
        const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        const userJsonEncoded = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        const userJson = decodeURIComponent(userJsonEncoded);
        const user = JSON.parse(userJson);

        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
    }

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
