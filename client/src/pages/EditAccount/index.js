import * as React from 'react';
import { Navigate } from 'react-router';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
// import CssBaseline from '@mui/material/CssBaseline';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import Button from '@mui/material/Button';
// import Link from '@mui/material/Link';

import EditForm from './EditForm/EditForm';
import DefaultLayout from 'layouts/DefaultLayout';

export default function EditAccount() {
    const isLoggedIn = localStorage.getItem('token');
    if (!isLoggedIn) {
        // redirect to landing page
        return <Navigate to="/" replace={true}></Navigate>;
    }

    return (
        <DefaultLayout>
            <React.Fragment>
                <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                        <Typography component="h1" variant="h4" align="center" mb={2}>
                            Edit Account
                        </Typography>

                        <EditForm />
                    </Paper>
                </Container>
            </React.Fragment>
        </DefaultLayout>
    );
}
