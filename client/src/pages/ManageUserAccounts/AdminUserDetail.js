import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import * as React from 'react';
import Card from '@mui/material/Card';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Background from '../../assets/images/classroom.jpg';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link, useParams, Navigate } from 'react-router-dom';

import useAxiosPrivate from 'hooks/useAxiosPrivate';

import AdminLayout from 'layouts/AdminLayout';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function AdminUserDetail() {
    const { userID } = useParams();
    const [user, setUser] = React.useState([]);
    const [classes, setClasses] = React.useState([]);
    const axiosPrivate = useAxiosPrivate();

    React.useEffect(() => {
        const getAccountByID = async () => {
            try {
                const response = await axiosPrivate.get(`/api/get-account/${userID}`);
                if (response.status === 200) {
                    setUser(response.data.userAccountData);
                    setClasses(response.data.classesOfUser);
                }
            } catch (err) {
                console.log(err);
                if (err.response.status === 401) {
                    return <Navigate to="/login" />;
                }
            }
        };
        getAccountByID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!localStorage.getItem('accessToken')) {
        // redirect to landing page
        return <Navigate to="/landing" />;
    }

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
                        <h1>Thông tin chi tiết về người dùng</h1>
                        <TextField
                            disabled
                            id="username"
                            name="username"
                            label="Username"
                            value={`${user.username}`}
                            variant="outlined"
                        />
                        <TextField
                            disabled
                            id="name"
                            name="name"
                            label="Họ tên"
                            value={`${user.last_name} ${user.first_name}`}
                            variant="outlined"
                        />
                        <TextField
                            disabled
                            id="email"
                            name="email"
                            label="Email"
                            value={`${user.email}`}
                            variant="outlined"
                        />
                        <TextField
                            disabled
                            id="gender"
                            name="gender"
                            label="Giới tính"
                            value={`${user.gender || ''}`}
                            variant="outlined"
                        />
                        <TextField
                            disabled
                            id="dateOfBirth"
                            name="dateOfBirth"
                            label="Ngày sinh"
                            value={`${user.date_of_birth || ''}`}
                            variant="outlined"
                        />
                        <TextField
                            disabled
                            id="address"
                            name="address"
                            label="Địa chỉ"
                            value={`${user.address || ''}`}
                            variant="outlined"
                        />
                    </Box>
                </Item>
            </Box>

            <Typography component="h1" variant="h5" sx={{ my: 2 }}>
                Các lớp đã tham gia
            </Typography>
            <div style={{ display: 'flex', flexWrap: 'wrap', clear: 'both' }}>
                {classes.map((Class) => {
                    return (
                        <Link
                            key={Class.class_id}
                            to={`/manage-classes/${Class.class_id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <Card
                                sx={{
                                    width: 345,
                                    minHeight: 290,
                                    marginRight: '16px',
                                    marginBottom: '16px',
                                }}
                            >
                                <CardMedia sx={{ height: 140 }} image={Background} title="image" />
                                <CardContent sx={{ padding: '16px 16px 8px' }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {Class.class_name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Vai trò: {user.user_id === Class.lecturer_id ? 'Giáo viên' : 'Học sinh'}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{ flexDirection: 'row-reverse' }}>
                                    <IconButton color="primary" aria-label="add to shopping cart">
                                        <FolderIcon />
                                    </IconButton>
                                    <IconButton color="primary" aria-label="add to shopping cart">
                                        <AssignmentIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </AdminLayout>
    );
}
