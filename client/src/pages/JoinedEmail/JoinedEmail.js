import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { Box, Card, CardContent, Typography, CardActions, Button } from '@mui/material';

import MainLayout from 'layouts/MainLayout';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

function JoinedEmail() {
    const { t } = useTranslation();
    const { classID, token } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const [user, setUser] = useState({});
    const [classData, setClassData] = useState({});
    const [joined, setJoined] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isInvited, setIsInvited] = useState();
    const axiosPrivate = useAxiosPrivate();

    if (classID && token) {
        const nextURL = window.location.href;
        localStorage.setItem('accept_token', token);
        localStorage.setItem('nextURL', nextURL);
    }

    useEffect(() => {
        const loadAllData = async () => {
            try {
                const data = {
                    accept_token: localStorage.getItem('accept_token'),
                };

                const loadUser = await axiosPrivate.post('/api/check-invitation', { data });

                if (loadUser.data.message === 'User not invited') {
                    // check if user email is equal to email in invitation
                    setIsInvited(false);
                    setLoading(false);
                    return;
                }

                if (loadUser.data.message === 'User invited') {
                    setIsInvited(true);
                    setUser(loadUser.data.userData);
                }

                const loadClass = await axiosPrivate.get(
                    `/api/check-user-class/${classID}/user/${loadUser.data.userData.user_id}`,
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
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        if (localStorage.getItem('accessToken') && !isInvited) {
            loadAllData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!localStorage.getItem('accessToken')) {
        return <Navigate to="/login" />;
    }

    if (isInvited === false) {
        // console.log(isInvited);
        return <Navigate to="/home" />;
    }

    if (joined) {
        localStorage.removeItem('classID');
        localStorage.removeItem('acceptToken');
        return <Navigate to={`/class/${classData.class_id}`} />;
    }

    const handleAddIntoClass = async () => {
        if (!classID || !token) {
            console.log('classid or token not found');
        }

        const data = {
            user,
            classData,
            role: searchParams.get('role') === '2' ? 'teacher' : 'student',
        };

        try {
            if (!joined) {
                await axiosPrivate.post('/api/class/add-member', { data }).then((response) => {
                    if (response.status === 200) {
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
                        <h3 style={{ margin: 0, textAlign: 'left', fontWeight: 400 }}>{t('join class')}?</h3>
                        <Typography style={{ margin: 0, marginTop: 8 }}>
                            {t("you're invited to") + ' '} <strong>{classData.class_name}</strong>.
                            {' ' + t("you're currently signed in as") + ' '}
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

export default JoinedEmail;
