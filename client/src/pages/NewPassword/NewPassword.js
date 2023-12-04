import { useState } from 'react';

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
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

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

const NewPassword = () => {
    const [password, setPassword] = useState();
    const [success, setSuccess] = useState();
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const params = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            password,
            token: params.token,
        };
        try {
            axios.post('/api/user/password-reset/confirmation', { data }).then((response) => {
                if (response.status === 200) {
                    setRedirectToLogin(true);
                }
            });
        } catch (err) {
            console.log(err);
        }
    };

    if (redirectToLogin) {
        return <Navigate to="/Login" />;
    }

    return (
        <>
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
                            Reset Password
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="password"
                                name="password"
                                type="password"
                                autoComplete="password"
                                autoFocus
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />

                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}>
                                Submit
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    {success && <p>success</p>}
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
            </ThemeProvider>
        </>
    );
};

export default NewPassword;
