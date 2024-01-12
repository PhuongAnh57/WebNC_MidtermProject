import * as React from 'react';
import { Card, CardActions, CardContent, Grid, IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CropFreeIcon from '@mui/icons-material/CropFree';
import ClassCodeModal from './ClassCodeModal';

function ClassCode({ classDetail }) {
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    return (
        <>
            <Grid item>
                <Card sx={{ marginBottom: '10px' }}>
                    <CardContent>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                mt: -2,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            Mã lớp
                            <CardActions>
                                <IconButton size="large">
                                    <MoreVertIcon />
                                </IconButton>
                            </CardActions>
                        </Typography>
                        <Typography sx={{ mt: -1, color: '#1967d2', fontSize: '22px' }}>
                            {classDetail.code}
                            <IconButton size="large" color="primary" onClick={handleOpen}>
                                <CropFreeIcon />
                            </IconButton>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            {<ClassCodeModal classDetail={classDetail} open={openModal} handleClose={handleClose} />}
        </>
    );
}

export default ClassCode;
