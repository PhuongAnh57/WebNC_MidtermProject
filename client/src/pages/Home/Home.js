import { Navigate } from 'react-router';
import { useEffect, useState } from 'react';

import MainLayout from 'layouts/MainLayout';
import CourseCard from './CourseCard';
import React from 'react';

import AddIcon from '@mui/icons-material/Add';
import CreateClass from 'components/CreateClass';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { Button, Menu, MenuItem } from '@mui/material';
import JoinCode from 'components/JoinCode/JoinCode';

export default function Home() {
    const [openCreate, setOpenCreate] = useState(false);
    const [openJoin, setOpenJoin] = useState(false);

    const [classes, setClasses] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    const axiosPrivate = useAxiosPrivate();

    const isMenuOpen = Boolean(anchorEl);
    const handleAddMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleCreateOpen = () => setOpenCreate(true);
    const handleCreateClose = () => setOpenCreate(false);
    const handleJoinOpen = () => setOpenJoin(true);
    const handleJoinClose = () => setOpenJoin(false);

    useEffect(() => {
        const getAllClasses = async () => {
            try {
                const response = await axiosPrivate.get('/api/all-classes');

                if (response.status === 200) {
                    setClasses(response.data.classesData);
                }
            } catch (err) {
                if (err.response.status === 401) {
                    console.log(err);
                    return <Navigate to="/landing" />;
                }
            }
        };

        getAllClasses();
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
        return <Navigate to="/landing" />;
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose} style={{ color: 'back' }}>
                <div onClick={handleJoinOpen} style={{ textDecoration: 'none', color: 'inherit' }}>
                    Tham gia
                </div>
            </MenuItem>
            <MenuItem onClick={handleMenuClose} style={{ color: 'back' }}>
                <div onClick={handleCreateOpen} style={{ textDecoration: 'none', color: 'inherit' }}>
                    Tạo lớp
                </div>
            </MenuItem>
        </Menu>
    );

    return (
        <MainLayout>
            <Button
                size="large"
                edge="end"
                aria-label="add or join class"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleAddMenuOpen}
                style={{ float: 'right', marginBottom: '20px' }}
                color="primary"
                variant="outlined"
                startIcon={<AddIcon />}
            >
                Lớp
            </Button>

            <CreateClass open={openCreate} onClose={handleCreateClose} />
            <JoinCode open={openJoin} onClose={handleJoinClose} />

            <div style={{ display: 'flex', flexWrap: 'wrap', clear: 'both' }}>
                {classes &&
                    classes.map((classDetail) => <CourseCard key={classDetail.class_id} classDetail={classDetail}/>)}
            </div>
            {renderMenu}
        </MainLayout>
    );
}
