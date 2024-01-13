import * as React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
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
import useAxiosPrivate from 'hooks/useAxiosPrivate';

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
    const { classID } = useParams();
    const [Class, setClass] = React.useState([]);
    const [students, setStudents] = React.useState([]);
    const [lecturers, setLecturers] = React.useState([]);
    const axiosPrivate = useAxiosPrivate();

    console.log(Class);

    React.useEffect(() => {
        const getClassByID = async () => {
            try {
                const response = await axiosPrivate.get(`/api/get-class/${classID}`);
                if (response.status === 200) {
                    setClass(response.data.classInfo);
                    setLecturers(response.data.list_lecturers);
                    setStudents(response.data.list_students);
                }
            } catch (err) {
                console.log(err);
                if (err.response.status === 401) {
                    <Navigate to="/login" />;
                }
            }
        };
        getClassByID();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                            value={`${Class.class_name}`}
                            variant="outlined"
                        />
                        <TextField
                            disabled
                            id="part"
                            name="part"
                            label="Phần"
                            value={`${Class.part}`}
                            variant="outlined"
                        />
                        <TextField
                            disabled
                            id="topic"
                            name="topic"
                            label="Chủ đề"
                            value={`${Class.topic}`}
                            variant="outlined"
                        />
                        <TextField
                            disabled
                            id="room"
                            name="room"
                            label="Phòng"
                            value={`${Class.room}`}
                            variant="outlined"
                        />
                        <TextField
                            disabled
                            id="owner"
                            name="owner"
                            label="Giáo viên sở hữu"
                            value={`${Class.owner}`}
                            variant="outlined"
                        />
                        <TextField
                            disabled
                            id="numberOfTeachers"
                            name="numberOfTeachers"
                            label="Số lượng giáo viên"
                            value={`${Class.numberOfLecturers}`}
                            variant="outlined"
                        />
                        <TextField
                            disabled
                            id="numberOfStudents"
                            name="numberOfStudents"
                            label="Số lượng học sinh"
                            value={`${Class.numberOfStudents}`}
                            variant="outlined"
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
                                {lecturers.map((lecturer, index) => (
                                    <Link to={`/manage-accounts/${lecturer.user_id}`}>
                                        <ListItem key={index}>
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={Background} />
                                            </ListItemAvatar>
                                            <ListItemText primary={`${lecturer.last_name} ${lecturer.first_name}`} />
                                        </ListItem>
                                    </Link>
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
                        </Grid>
                        <Divider />
                        <Demo>
                            <List>
                                {students.map((student, index) => (
                                    <Link to={`/manage-accounts/${student.user_id}`}>
                                        <ListItem key={index}>
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={Background} />
                                            </ListItemAvatar>
                                            <ListItemText primary={`${student.last_name} ${student.first_name}`} />
                                        </ListItem>
                                    </Link>
                                ))}
                            </List>
                        </Demo>
                    </Grid>
                </Grid>
            </Box>
        </AdminLayout>
    );
}
