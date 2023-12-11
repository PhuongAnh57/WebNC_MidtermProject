import * as React from 'react';
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

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList({ classID }) {
    const [openStudentModal, setOpenStudentModal] = React.useState(false);
    const [openTeacherModal, setOpenTeacherModal] = React.useState(false);
    const [classURL, setClassURL] = React.useState('');

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

    React.useEffect(() => {
        const loadClass = async () => {
            try {
                const response = await axios.get(`/api/get-class-data/${classID}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });

                if (response.status === 200) {
                    setClassURL(`${process.env.CLIENT_URL}/class/${classID}/invite`);
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
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={Background} />
                                    </ListItemAvatar>
                                    <ListItemText primary="Mỹ Trinh" />
                                </ListItem>
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
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={Background} />
                                    </ListItemAvatar>
                                    <ListItemText primary="Mỹ Trinh" />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={Background} />
                                    </ListItemAvatar>
                                    <ListItemText primary="Khánh Duy" />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={Background} />
                                    </ListItemAvatar>
                                    <ListItemText primary="Phương Anh" />
                                </ListItem>
                            </List>
                        </Demo>
                    </Grid>
                </Grid>
            </Box>

            <InviteStudentModal url={classURL} open={openStudentModal} handleClose={handleStudentModalClose} />
            <InviteTeacherModal open={openTeacherModal} handleClose={handleTeacherModalClose} />
        </>
    );
}
