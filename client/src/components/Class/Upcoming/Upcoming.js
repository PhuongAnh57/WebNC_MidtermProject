import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

function Upcoming({ classDetail }) {
    const { t } = useTranslation();

    return (
        <Grid item>
            <Card sx={{ marginBottom: '10px' }}>
                <CardContent>
                    <Typography variant="h6" component="div">
                        {t('upcoming')}
                    </Typography>
                    <Typography sx={{ mb: 1 }} color="text.secondary">
                        {t('no work due soon')}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">{t('view all')}</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default Upcoming;
