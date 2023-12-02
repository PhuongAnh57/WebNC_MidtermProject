import React, { useContext, useEffect, useState } from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from 'context/AuthProvider';
import { LOGIN } from 'utils/constants';

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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accountDoesNotExit, setAccountDoesNotExist] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);

    const { dispatch } = useContext(AuthContext);


    if (localStorage.getItem('accessToken')) {
        return <Navigate to="/home" />;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = {
            username: data.get('username'),
            password: data.get('password'),
        };

        axios.post('/api/login', { user }).then((response) => {
            if (response.data.message === 'Verification successfully') {
                dispatch({ type: LOGIN, payload: response.data });
            }

            if (response.data.message === 'This account does not exist') {
                setAccountDoesNotExist(true);
                setInvalidPassword(false);
                setUsername('');
                setPassword('');
            }

            if (response.data.message === 'Password is invalid') {
                setInvalidPassword(true);
                setAccountDoesNotExist(false);
                setPassword('');
            }
        });
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
                        Log in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        {accountDoesNotExit && (
                            <>
                                <span>Account does not exit.</span>
                            </>
                        )}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />

                        {invalidPassword && (
                            <>
                                <span sx={{ color: 'red' }}>Password is incorrect.</span>
                            </>
                        )}
                        <div sx={{ marginBottom: -4 }}>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                        </div>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}>
                            Log In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" style={{ color: '#1976d2' }}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/signup" variant="body2" style={{ color: '#1976d2' }}>
                                    Don't have an account? Sign Up
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
