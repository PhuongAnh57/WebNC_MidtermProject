import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Guest() {

    return (
        <Box sx={{ flexGrow: 1, mb: 2 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                            Google Classroom
                        </Link>
                    </Typography>

                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <Button style={{ color: '#ffffff', marginRight: 12 }} variant="contained">
                            Log in
                        </Button>
                    </Link>

                    <Link to="/signup" style={{ textDecoration: 'none' }}>
                        <Button style={{ color: '#ffffff' }} variant="contained">
                            Sign up
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
