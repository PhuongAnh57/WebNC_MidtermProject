import { Link, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { EmailActivationNotification } from '../../assets/images/';

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

export default function SignUp() {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
    });

    const [alreadyExists, setAlreadyExists] = useState(false);
    const [emailActivation, setEmailActivation] = useState(false);

    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
    });

    const validateEmail = (email) => {
        // Implement your email validation logic
        // For example, you can use a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        // Implement your password validation logic
        // For example, require a minimum length
        return password.length >= 6;
    };

    const validateForm = () => {
        const errors = {};

        // Validate each field
        if (!user.firstName.trim()) {
            errors.firstName = 'Họ không được để trống';
        }

        if (!user.lastName.trim()) {
            errors.lastName = 'Tên không được để trống';
        }

        if (!user.username.trim()) {
            errors.username = 'Tên đăng nhập không được để trống';
        }

        if (!validatePassword(user.password)) {
            errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        if (!validateEmail(user.email)) {
            errors.email = 'Email không hợp lệ';
        }

        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear the error message when the user starts typing
        setFormErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formErrors = validateForm();
        setFormErrors(formErrors);

        if (Object.keys(formErrors).length > 0) {
            // Display errors to the user or handle them as needed
            console.log('Validation errors:', formErrors);
            return;
        }

        try {
            await axios.post('/api/signup', { user }).then((response) => {
                if (response.status === 200) {
                    return setEmailActivation(true);
                }

                setEmailActivation(false);
                if (response.data.message === 'Username or email already belongs to another user') {
                    setAlreadyExists(true);
                }
            });
        } catch (err) {
            console.log('err', err);
            setAlreadyExists(true);
        }
    };

    if (localStorage.getItem('accessToken')) {
        return <Navigate to="/" />;
    }

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
                    {!emailActivation ? (
                        <>
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Đăng ký
                            </Typography>

                            {alreadyExists && (
                                <>
                                    <span style={{ color: 'red' }}>Username or email already exists!</span>
                                </>
                            )}

                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="lastName"
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Họ"
                                            autoFocus
                                            value={user.lastName}
                                            onChange={handleChange}
                                            error={!!formErrors.lastName}
                                            helperText={formErrors.lastName}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="Tên"
                                            name="firstName"
                                            autoComplete="family-name"
                                            value={user.firstName}
                                            onChange={handleChange}
                                            error={!!formErrors.firstName}
                                            helperText={formErrors.firstName}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="username"
                                            label="Tên đăng nhập"
                                            name="username"
                                            autoComplete="username"
                                            value={user.username}
                                            onChange={handleChange}
                                            error={!!formErrors.username}
                                            helperText={formErrors.username}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Mật khẩu"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            value={user.password}
                                            onChange={handleChange}
                                            error={!!formErrors.password}
                                            helperText={formErrors.password}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="email"
                                            label="Email"
                                            type="email"
                                            id="email"
                                            autoComplete="email"
                                            value={user.email}
                                            onChange={handleChange}
                                            error={!!formErrors.email}
                                            helperText={formErrors.email}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                                            label="Đồng ý với các Điều khoản và Điều kiện"
                                        />
                                    </Grid>
                                </Grid>
                                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                    Đăng ký
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        Đã có tài khoản?
                                        <Link to="/login" variant="body2" style={{ color: '#1976d2' }}>
                                            Đăng nhập
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Copyright sx={{ mt: 5 }} />
                        </>
                    ) : (
                        <Box style={{ textAlign: 'center' }}>
                            <img
                                src={EmailActivationNotification}
                                alt="email activation"
                                style={{
                                    width: 'auto',
                                    height: '300px',
                                }}
                            />
                        </Box>
                    )}
                </Box>
            </Container>
        </ThemeProvider>
    );
}
