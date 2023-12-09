import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, CardActions, CardContent } from '@mui/material';
import { CheckCircleOutlineOutlined } from '@mui/icons-material';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const NewPassword = () => {
    const [password, setPassword] = useState();
    const [success, setSuccess] = useState();
    const [error, setError] = useState();

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
                    setSuccess(response.data.message);
                } else {
                    setError(response.data.message);
                }
            });
        } catch (err) {
            console.log(err);
            setError('Cannot reset password. Please try later!');
        }
    };

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
                        {success ? (
                            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Card sx={{ maxWidth: 400, textAlign: 'center' }}>
                                    <CardContent>
                                        <CheckCircleOutlineOutlined sx={{ color: '#1976D2' }} />
                                        <Typography style={{ margin: 0, marginTop: 8 }}>
                                            Your password has been updated successfully!
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ justifyContent: 'center', paddingBottom: 2, paddingTop: 0 }}>
                                        <Link to="/login">
                                            <Button variant="contained">GO TO LOGIN</Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            </Box>
                        ) : (
                            <>
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
                                        id="new password"
                                        label="new password"
                                        name="new password"
                                        type="new password"
                                        autoComplete="new password"
                                        autoFocus
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />

                                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}>
                                        Submit
                                    </Button>
                                    {error && <p style={{ color: 'red' }}>{error}</p>}
                                </Box>
                            </>
                        )}
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
};

export default NewPassword;
