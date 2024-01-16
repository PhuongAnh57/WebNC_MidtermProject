import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Box, Card, CardContent, Typography, CardActions, Button } from '@mui/material';

import MainLayout from 'layouts/MainLayout';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { t } from 'i18next';

function JoinedLink() {
    const { classID } = useParams();

    const [user, setUser] = useState({});
    const [classData, setClassData] = useState({});
    const [joined, setJoined] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();

    if (classID) {
        const nextURL = window.location.href;
        localStorage.setItem('nextURL', nextURL);
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

    const handleAddIntoClass = async () => {
        if (!classID) {
            console.log('classid or token not found');
        } else {
            const data = {
                user,
                classData,
                role: 'student',
            };

            try {
                if (!joined) {
                    await axiosPrivate.post('/api/class/add-member', { data }).then((response) => {
                        if (response.status === 200) {
                            // console.log('added to class');
                            setJoined(true);
                        }
                    });
                }
            } catch (err) {
                console.log(err);
                console.log('someting went wrong');
            }
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
                        <h3 style={{ margin: 0, textAlign: 'left', fontWeight: 400 }}>{t('join class')}?</h3>
                        <Typography style={{ margin: 0, marginTop: 8 }}>
                            {t("you're join in class") + ' '} <strong>{classData.class_name}</strong>
                            {' ' + t('as a student')}. {t("you're currently signed in as") + ' '}
                            <strong>
                                {user.username} ({user.email})
                            </strong>
                            .
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center', paddingBottom: 2, paddingTop: 0 }}>
                        <Button variant="contained" onClick={handleAddIntoClass}>
                            {t('join')}
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </MainLayout>
    );

    return <>{isLoading ? <LoadingSpinner /> : renderLayout}</>;
}

export default JoinedLink;
