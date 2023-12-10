import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Background from '../../../assets/images/classroom.jpg';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
    return (
        <>
            <Box sx={{ flexGrow: 1, width: '90%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <Typography gutterBottom variant="h5" component="div">
                                    Giáo viên
                                </Typography>
                            </Grid>
                            <Grid item>
                                <PersonAddIcon />
                            </Grid>
                        </Grid>
                        <Divider />
                        <Demo>
                            <List>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={Background} />
                                    </ListItemAvatar>
                                    <ListItemText primary="Mỹ Trinh" />
                                </ListItem>
                            </List>
                        </Demo>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ flexGrow: 1, width: '90%', marginTop: '30px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container alignItems="center">
                            <Grid item xs>
                                <Typography gutterBottom variant="h5" component="div">
                                    Sinh viên
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography gutterBottom variant="h7" component="div">
                                    3 sinh viên
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Demo>
                            <List>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={Background} />
                                    </ListItemAvatar>
                                    <ListItemText primary="Mỹ Trinh" />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={Background} />
                                    </ListItemAvatar>
                                    <ListItemText primary="Khánh Duy" />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={Background} />
                                    </ListItemAvatar>
                                    <ListItemText primary="Phương Anh" />
                                </ListItem>
                            </List>
                        </Demo>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}
