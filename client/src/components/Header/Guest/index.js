import { Link } from 'react-router-dom';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Guest() {
    return (
        <Box sx={{ flexGrow: 1, mb: 2 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>Google Classroom</Link>
                    </Typography>
                    
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <Button style={{ color: '#ffffff', marginRight: 12}} variant="contained">  
                            Log in
                        </Button>
                    </Link>

                    <Link to="/signup" style={{ textDecoration: 'none'}}>
                        <Button style={{ color: '#ffffff' }} variant="contained">
                            Sign up
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
