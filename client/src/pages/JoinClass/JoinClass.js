import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import axios from 'axios';
import { Box, Card, CardContent, Typography, CardActions, Button, breadcrumbsClasses } from '@mui/material';

import MainLayout from 'layouts/MainLayout';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

function JoinClass() {
    const { classID, token } = useParams();

    const [user, setUser] = useState({});
    const [classData, setClassData] = useState({});
    const [joined, setJoined] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isInvited, setIsInvited] = useState();

    if (classID && token) {
        const storedLink = window.location.href;
        localStorage.setItem('accept_token', token);
        localStorage.setItem('storedLink', storedLink);
    }

    useEffect(() => {
        const loadAllData = async () => {
            try {
                const data = {
                    accept_token: localStorage.getItem('accept_token'),
                };

                const loadUser = await axios.post(
                    '/api/check-invitation',
                    { data },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        },
                    },
                );

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

                const loadClass = await axios.get(`/api/get-class/${classID}/user/${loadUser.data.userData.user_id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')} `,
                    },
                });

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
        console.log(isInvited);
        return <Navigate to="/home" />;
    }

    if (joined) {
        localStorage.removeItem('classID');
        localStorage.removeItem('acceptToken');
        return <Navigate to={`/class/${classData.class_id}`} />;
    }

    const handleAddIntoClass = () => {
        if (!classID || !token) {
            console.log('classid or token not found');
        }

        const data = {
            user_id: user.user_id,
            classData,
            role: 'student',
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
                        <h3 style={{ margin: 0, textAlign: 'left', fontWeight: 400 }}>Join Class?</h3>
                        <Typography style={{ margin: 0, marginTop: 8 }}>
                            You've been invited to join <strong>{classData.class_name}</strong>. You're signed in as
                            <strong>
                                {' '}
                                {user.username} ({user.email})
                            </strong>
                            .
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center', paddingBottom: 2, paddingTop: 0 }}>
                        <Button variant="contained" onClick={handleAddIntoClass}>
                            Join
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </MainLayout>
    );

    return <>{isLoading ? <LoadingSpinner /> : renderLayout}</>;
}

export default JoinClass;
