import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PageNotFound from 'pages/PageNotFound/PageNotFound';

function EmailActivated() {
    const [validUrl, setValidUrl] = useState(true);
    const params = useParams();

    useEffect(() => {
        const handleEmailActivation = async () => {
            try {
                const response = await axios.get(`/api/user/email-confirm/${params.token}`);
                console.log(response.status);
                if (response.status === 200) {
                    setValidUrl(true);
                } else {
                    setValidUrl(false);
                }
            } catch (err) {
                setValidUrl(false);
            }
        };

        handleEmailActivation();
    }, []);

    //
    return (
        <>
            {validUrl ? (
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Card sx={{ maxWidth: 400, textAlign: 'center' }}>
                        <CardContent>
                            <CheckCircleOutlineIcon sx={{ color: '#1976D2' }} />
                            <Typography style={{ margin: 0, marginTop: 8 }}>
                                Your email has been activated successfully!
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center', paddingBottom: 2, paddingTop: 0 }}>
                            <Link to="/login">
                                <Button variant="contained">LOGIN</Button>
                            </Link>
                        </CardActions>
                    </Card>
                </Box>
            ) : (
                <PageNotFound />
            )}
        </>
    );
}

export default EmailActivated;
