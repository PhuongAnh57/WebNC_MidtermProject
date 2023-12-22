import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from 'context/AuthProvider';
import { LOGIN, SERVER_URL } from 'utils/constants';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function LogIn() {
    const [user, setUser] = useState({
        username: '',
        password: '',
    });
    const [accountDoesNotExit, setAccountDoesNotExist] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);

    const { dispatch } = useContext(AuthContext);

    if (localStorage.getItem('accessToken')) {
        if (localStorage.getItem('storedLink')) {
            const storedLink = localStorage.getItem('storedLink').split('http://localhost:3000')[1];

            return <Navigate to={storedLink} />;
        }
        return <Navigate to="/home" />;
    }

    const handleChange = (e) => {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (event, type = '') => {
        event.preventDefault();

        if (type !== '') {
            return window.open(`${SERVER_URL}/auth/${type}`, '_self');
        }

        try {
            axios.post('/api/login', { user }).then((response) => {
                if (response.data.message === 'Verification successfully') {
                    dispatch({ type: LOGIN, payload: response.data });
                }

                if (response.data.message === 'This account does not exist') {
                    setAccountDoesNotExist(true);
                    setInvalidPassword(false);
                    setUser({
                        username: '',
                        password: '',
                    });
                }

                if (response.data.message === 'Password is invalid') {
                    setInvalidPassword(true);
                    setAccountDoesNotExist(false);
                    setUser((prev) => ({
                        ...prev,
                        password: '',
                    }));
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Đăng nhập
                    </Typography>
                    <Box component="form" onSubmit={(event) => handleSubmit(event)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Tên đăng nhập"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={user.username}
                            onChange={handleChange}
                        />
                        {accountDoesNotExit && (
                            <>
                                <span style={{ color: 'red' }}>Tên đăng nhập không tồn tại</span>
                            </>
                        )}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mật khẩu"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={user.password}
                            onChange={handleChange}
                        />

                        {invalidPassword && (
                            <>
                                <span style={{ color: 'red' }}>Sai mật khẩu</span>
                            </>
                        )}
                        <div sx={{ marginBottom: -4 }}>
                            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Ghi nhớ" />
                        </div>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1, mb: 0, padding: 1, background: '#000000' }}
                        >
                            Đăng nhập
                        </Button>

                        <div style={{ textAlign: 'center', color: '#6c757dff' }}>
                            <p>Hoặc</p>
                        </div>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 1,
                                mb: 0,
                                background: '#507cc0',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                            }}
                            onClick={(event) => handleSubmit(event, 'facebook')}
                        >
                            <FacebookIcon sx={{ fontSize: '1.8rem' }} />
                            <span style={{ marginLeft: 'auto', marginRight: 'auto' }}>Đăng nhập với Facebook</span>
                        </Button>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 1,
                                mb: 2,
                                background: '#df4930',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                            }}
                            onClick={(event) => handleSubmit(event, 'google')}
                        >
                            <GoogleIcon sx={{ fontSize: '1.8rem' }} />
                            <span style={{ marginLeft: 'auto', marginRight: 'auto' }}>Đăng nhập với google</span>
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/forgot-password" variant="body2" style={{ color: '#1976d2' }}>
                                    Quên mật khẩu?
                                </Link>
                            </Grid>
                            <Grid item>
                                Chưa có tài khoản?
                                <Link to="/signup" variant="body2" style={{ color: '#1976d2' }}>
                                    Đăng ký ngay!
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
