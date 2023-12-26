import { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import axios from 'axios';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Background from '../../../assets/images/classroom.jpg';
import InviteStudentModal from 'components/InviteModal/InviteStudentModal';
import InviteTeacherModal from 'components/InviteModal/InviteTeacherModal';
import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList({ classDetail }) {
    const [openStudentModal, setOpenStudentModal] = useState(false);
    const [openTeacherModal, setOpenTeacherModal] = useState(false);
    const [lecturers, setLecturers] = useState([]);
    const [students, setStudents] = useState([]);
    const [classURL, setClassURL] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const currentURL = window.location.href;
    const classID = currentURL.split('/').pop();

    useEffect(() => {
        axios
            .get(`/api/all-members/${classID}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then((response) => {
                setLecturers(response.data.lecturerData);
                setStudents(response.data.studentData);
                setIsLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleStudentModalOpen = () => {
        setOpenStudentModal(true);
    };

    const handleStudentModalClose = () => {
        setOpenStudentModal(false);
    };

    const handleTeacherModalOpen = () => {
        setOpenTeacherModal(true);
    };

    const handleTeacherModalClose = () => {
        setOpenTeacherModal(false);
    };

    useEffect(() => {
        const loadClass = async () => {
            try {
                const response = await axios.get(`/api/class/${classDetail.class_id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });

                if (response.status === 200) {
                    setClassURL(`http://localhost:3000/class/${classDetail.class_id}/invite`);
                }
            } catch (err) {
                console.log(err);
            }
        };

        loadClass();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!localStorage.getItem('accessToken')) {
        return <Navigate to="/" />;
    }

    return (
        <>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    <Box sx={{ flexGrow: 1, width: '90%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Grid container alignItems="center">
                                    <Grid item xs>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Giáo viên
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" onClick={handleTeacherModalOpen}>
                                            <PersonAddIcon />
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <Demo>
                                    <List>
                                        {lecturers.map((lecturer, index) => (
                                            <ListItem key={index}>
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src={Background} />
                                                </ListItemAvatar>
                                                <ListItemText primary={`${lecturer.firstname} ${lecturer.lastname}`} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Demo>
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ flexGrow: 1, width: '90%', marginTop: '30px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Grid container alignItems="center">
                                    <Grid item xs>
                                        <Typography gutterBottom variant="h5" component="div">
                                            Sinh viên
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" onClick={handleStudentModalOpen}>
                                            <PersonAddIcon />
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <Demo>
                                    <List>
                                        {students.map((student, index) => (
                                            <ListItem key={index}>
                                                <ListItemAvatar>
                                                    <Avatar alt="Remy Sharp" src={Background} />
                                                </ListItemAvatar>
                                                <ListItemText primary={`${student.firstname} ${student.lastname}`} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Demo>
                            </Grid>
                        </Grid>
                    </Box>

                    <InviteStudentModal
                        url={classURL}
                        classID={classDetail.class_id}
                        open={openStudentModal}
                        handleClose={handleStudentModalClose}
                    />
                    <InviteTeacherModal
                        classID={classDetail.class_id}
                        open={openTeacherModal}
                        handleClose={handleTeacherModalClose}
                    />
                </>
            )}
        </>
    );
}
