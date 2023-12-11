import { Navigate } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

import MainLayout from 'layouts/MainLayout';
import CourseCard from './CourseCard';
import React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CreateClass from 'components/CreateClass';

export default function Home() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [classes, setClasses] = useState([]);
    useEffect(() => {
        axios
            .get('/api/all-classes', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')} `,
                },
            })
            .then((response) => setClasses(response.data.classesData));
    }, []);

    // Đọc thông tin người dùng từ cookie
    if (document.cookie) {
        const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/, '$1');
        const userJsonEncoded = document.cookie.replace(/(?:(?:^|.*;\s*)user\s*\=\s*([^;]*).*$)|^.*$/, '$1');
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
            <Button
                style={{ float: 'right', marginBottom: '20px' }}
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={handleOpen}
            >
                tạo lớp học
            </Button>
            <CreateClass open={open} onClose={handleClose} />

            <div style={{ display: 'flex', flexWrap: 'wrap', clear: 'both' }}>
                {classes && classes.map(Class => (
                    <CourseCard key={Class.class_id} Class={Class} />
                ))}
            </div>
        </MainLayout>
    );
}
