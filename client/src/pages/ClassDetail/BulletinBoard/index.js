import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import background from '../../../assets/images/classroom.jpg';

import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

import ClassCode from 'components/Class/ClassCode/ClassCode';
import Upcoming from 'components/Class/Upcoming/Upcoming';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: '10px',
}));

export default function BasicGrid({ classDetail }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Item>
                        <ImageListItem>
                            <img
                                src={background}
                                alt="background"
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    height: '300px',
                                    objectFit: 'cover',
                                    objectPosition: '100% 20%',
                                }}
                            />
                            <ImageListItemBar
                                title={classDetail.class_name}
                                subtitle={classDetail.part}
                                actionIcon={
                                    <IconButton sx={{ color: 'rgba(255, 255, 255, 0.54)' }}>
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </ImageListItem>
                        {/* </ImageList> */}
                    </Item>
                </Grid>

                <Grid item xs={3}>
                    {classDetail.role === 'teacher' && <ClassCode classDetail={classDetail} />}
                    <Upcoming classDetail={classDetail} />
                </Grid>
                <Grid item xs={9}>
                    <Grid item>
                        <Item>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Mỹ Trinh vừa đăng một tài liệu mới" secondary="Jan 9, 2014" />
                            </ListItem>
                        </Item>
                    </Grid>
                    <Grid>
                        <Item>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Khánh Duy" secondary="Jan 9, 2014" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Em có câu hỏi ạ" />
                            </ListItem>
                        </Item>
                    </Grid>
                    <Grid item>
                        <Item>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Phương Anh vừa đăng một tài liệu mới" secondary="Jan 9, 2014" />
                            </ListItem>
                        </Item>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
