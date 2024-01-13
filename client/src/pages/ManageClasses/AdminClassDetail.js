import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import AdminLayout from 'layouts/AdminLayout';
import Background from '../../assets/images/classroom.jpg';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function AdminClassDetail() {
    return (
        <AdminLayout>
            <Box sx={{ width: '50%', mx: 'auto', marginTop: '20px' }}>
                <Item>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '97%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <h1>Thông tin chi tiết về lớp học</h1>
                        <TextField
                            disabled
                            id="classname"
                            name="classname"
                            label="Tên lớp học"
                            value=""
                            variant="filled"
                        />
                        <TextField disabled id="part" name="part" label="Phần" value="" variant="filled" />
                        <TextField disabled id="topic" name="topic" label="Chủ đề" value="" variant="filled" />
                        <TextField disabled id="room" name="room" label="Phòng" value="" variant="filled" />
                        <TextField
                            disabled
                            id="numberOfMembers"
                            name="numberOfMembers"
                            label="Số lượng thành viên"
                            value=""
                            variant="filled"
                        />
                        <TextField
                            disabled
                            id="numberOfTeachers"
                            name="numberOfTeachers"
                            label="Số lượng giáo viên"
                            value=""
                            variant="filled"
                        />
                        <TextField
                            disabled
                            id="numberOfStudents"
                            name="numberOfStudents"
                            label="Số lượng học sinh"
                            value=""
                            variant="filled"
                        />
                    </Box>
                </Item>
            </Box>

            <h1>Các thành viên của lớp</h1>
            <Box sx={{ flexGrow: 1, width: '90%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <Typography gutterBottom variant="h5" component="div">
                                    Giáo viên
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Demo>
                            <List>
                                {/* {teachers.map((lecturer, index) => (
                                    <ListItem key={index}>
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={Background} />
                                        </ListItemAvatar>
                                        <ListItemText primary={`${lecturer.firstname} ${lecturer.lastname}`} />
                                    </ListItem>
                                ))} */}
                                <Link to='/manage-accounts/userID'>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={Background} />
                                        </ListItemAvatar>
                                        <ListItemText primary='anh'/>
                                    </ListItem>
                                </Link>
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
                        </Grid>
                        <Divider />
                        <Demo>
                            <List>
                                {/* {students.map((student, index) => (
                                    <ListItem key={index}>
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={Background} />
                                        </ListItemAvatar>
                                        <ListItemText primary={`${student.firstname} ${student.lastname}`} />
                                    </ListItem>
                                ))} */}
                                <Link to='/manage-accounts/userID'>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={Background} />
                                        </ListItemAvatar>
                                        <ListItemText primary='anh' />
                                    </ListItem>
                                </Link>
                            </List>
                        </Demo>
                    </Grid>
                </Grid>
            </Box>
        </AdminLayout>
    );
}
