import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import axios from 'axios';
import { Box, Card, CardContent, Typography, CardActions, Button } from '@mui/material';

import MainLayout from 'layouts/MainLayout';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

function JoinClassViaLink() {
    const { classID } = useParams();

    const [user, setUser] = useState({});
    const [classData, setClassData] = useState({});
    const [joined, setJoined] = useState(false);
    const [isLoading, setLoading] = useState(true);

    if (classID) {
        const storedLink = window.location.href;
        localStorage.setItem('storedLink', storedLink);
    }

    console.log(user);

    useEffect(() => {
        const loadAllData = async () => {
            try {
                const loadUser = await axios.get('/api/get-profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });

                // if (loadUser.data.message === 'User not found') {
                //     // check if user email is equal to email in invitation
                //     // setIsInvited(false);
                //     // setLoading(false);
                //     // return;
                // }

                if (loadUser.data.message === 'User found') {
                    setUser(loadUser.data.userData);
                }

                const loadClass = await axios.get(
                    `/api/check-user-class/${classID}/user/${loadUser.data.userData.user_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')} `,
                        },
                    },
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
        return <Navigate to={`/class/${classData.class_id}/detail`} />;
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
                        <h3 style={{ margin: 0, textAlign: 'left', fontWeight: 400 }}>Join Class?</h3>
                        <Typography style={{ margin: 0, marginTop: 8 }}>
                            You are joining in <strong>{classData.class_name}</strong> class as a student. You're signed in as
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

export default JoinClassViaLink;
