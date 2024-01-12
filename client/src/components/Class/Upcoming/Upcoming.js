import * as React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

function Upcoming({ classDetail }) {
    return (
        <Grid item>
            <Card sx={{ marginBottom: '10px' }}>
                <CardContent>
                    <Typography variant="h6" component="div">
                        Sắp đến hạn
                    </Typography>
                    <Typography sx={{ mb: 1 }} color="text.secondary">
                        Không có bài tập sắp đến hạn
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Xem tất cả</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default Upcoming;
