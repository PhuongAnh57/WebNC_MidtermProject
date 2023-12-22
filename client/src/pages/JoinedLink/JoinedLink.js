import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import axios from 'axios';
import { Box, Card, CardContent, Typography, CardActions, Button } from '@mui/material';

import MainLayout from 'layouts/MainLayout';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

function JoinedLink() {
    const { classID } = useParams();

    const [user, setUser] = useState({});
    const [classData, setClassData] = useState({});
    const [joined, setJoined] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();

    if (classID) {
        const storedLink = window.location.href;
        localStorage.setItem('storedLink', storedLink);
    }

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const loadAllData = async () => {
            try {
                const loadUser = await axiosPrivate.get('/api/get-profile', { signal });

                if (loadUser.data.message === 'User found') {
                    setUser(loadUser.data.userData);
                }

                const loadClass = await axiosPrivate.get(
                    `/api/check-user-class/${classID}/user/${loadUser.data.userData.id}`,
                    { signal },
                );

                if (loadClass.status === 200) {
                    setClassData(loadClass.data.classData);
                    console.log(loadClass.data.classData.joined);

                    if (loadClass.data.classData.joined) {
                        setJoined(true);
                    } else {
                        setJoined(false);
                    }
                }
                setLoading(false);

                return () => {
                    controller.abort();
                };
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        if (localStorage.getItem('accessToken')) {
            loadAllData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!localStorage.getItem('accessToken')) {
        return <Navigate to="/login" />;
    }

    if (joined) {
        localStorage.removeItem('classID');
        localStorage.removeItem('acceptToken');
        return <Navigate to={`/class/${classData.class_id}`} />;
    }

    const handleAddIntoClass = () => {
        if (!classID) {
            console.log('classid or token not found');
        }

        const data = {
            user,
            classData,
            role: '3',
        };

        try {
            if (!joined) {
                axios
                    .post(
                        '/api/class/add-member',
                        { data },
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('accessToken')} `,
                            },
                        },
                    )
                    .then((response) => {
                        if (response.status === 200) {
                            console.log('added to class');
                            setJoined(true);
                        } else {
                            console.log('someting went wrong');
                        }
                    });
            }
        } catch (err) {
            console.log(err);
            console.log('someting went wrong');
        }
    };

    const renderLayout = (
        <MainLayout>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Card sx={{ maxWidth: 400, textAlign: 'center' }}>
                    <CardContent>
                        <h3 style={{ margin: 0, textAlign: 'left', fontWeight: 400 }}>Tham gia lớp học này?</h3>
                        <Typography style={{ margin: 0, marginTop: 8 }}>
                            Bạn sẽ tham gia lớp <strong>{classData.class_name}</strong> với tư cách học sinh. Bạn đang
                            đăng nhập với tài khoản
                            <strong>
                                {' '}
                                {user.username} ({user.email})
                            </strong>
                            .
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center', paddingBottom: 2, paddingTop: 0 }}>
                        <Button variant="contained" onClick={handleAddIntoClass}>
                            Tham gia
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </MainLayout>
    );

    return <>{isLoading ? <LoadingSpinner /> : renderLayout}</>;
}

export default JoinedLink;
