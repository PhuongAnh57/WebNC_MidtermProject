import * as React from 'react';
import { useTranslation } from 'react-i18next';

import MainLayout from 'layouts/MainLayout';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import List from '@mui/material/List';
import Background from '../../../../assets/images/classroom.jpg';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { extractFileName, extractFileNameExtension } from 'utils/filename';
import { Card, CardContent, CardMedia } from '@mui/material';
import { GoogleDriveImage } from 'assets/images';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: '10px',
}));

export default function InstructionStudent() {
    const { t } = useTranslation();
    const { classID, classworkID } = useParams();
    const [classwork, setClasswork] = React.useState();
    const axiosPrivate = useAxiosPrivate();

    React.useEffect(() => {
        const loadAssignment = async () => {
            try {
                const response = await axiosPrivate.get(`/api/class/${classID}/resource/${classworkID}/detail`);

                if (response.status === 200) {
                    setClasswork(response.data.resource);
                }
            } catch (err) {
                console.log(err);
            }
        };

        loadAssignment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [classID, classworkID]);

    return (
        <MainLayout>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Grid item>
                            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                <Box sx={{ my: 3, mx: 2 }}>
                                    <Grid container alignItems="center">
                                        <Grid item xs>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <AssignmentIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText>
                                                    <Typography gutterBottom variant="h4" component="div">
                                                        {t('assignment')}
                                                    </Typography>
                                                    <span>
                                                        {classwork &&
                                                            classwork.owner_lastName + ' ' + classwork.owner_firstName}
                                                    </span>
                                                    <NavigateNextIcon sx={{ alignSelf: 'center' }} />
                                                    <span>{classwork && new Date(classwork.date).toUTCString()}</span>
                                                </ListItemText>
                                            </ListItem>
                                        </Grid>
                                    </Grid>
                                </Box>

                                {classwork && classwork.file_urls[0] && (
                                    <Card sx={{ display: 'flex', width: '400px', mt: '16px', mb: '16px' }}>
                                        {extractFileNameExtension(classwork.file_urls[0]) === 'Image' ? (
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 150, height: '100%' }}
                                                image={classwork.file_urls[0]}
                                                alt="Image"
                                            />
                                        ) : (
                                            <CardMedia
                                                component="img"
                                                sx={{ width: 150, height: '100%' }}
                                                image={GoogleDriveImage}
                                                alt="Google Drive"
                                            />
                                        )}
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography component="div" sx={{ fontSize: '16px', color: '#3C3034' }}>
                                                    filename={extractFileName(classwork.file_urls[0])}
                                                </Typography>
                                                <Typography sx={{ fontSize: '14px', color: '#5F6368' }} component="div">
                                                    {extractFileNameExtension(classwork.file_urls[0])}
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </Card>
                                )}

                                <Divider variant="middle" />
                                <Box sx={{ m: 2, display: 'flex', alignItems: 'center' }}>
                                    <PeopleIcon />
                                    <Typography gutterBottom variant="body1">
                                        {t('class comments')}
                                    </Typography>
                                </Box>
                                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar src={Background}></Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Mỹ Trinh" secondary="Bài tập khó quá" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar src={Background}></Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Khánh Duy" secondary="Thầy dời deadline đi ạ" />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar src={Background}></Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="Phương Anh" secondary="Em làm không kịp" />
                                    </ListItem>
                                </List>
                                <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
                                    <Button>{t('add class comment...')}</Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid item>
                            <Item>
                                <ListItem>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {t('your work')}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography gutterBottom variant="h7" component="div">
                                            {t('assigned')}
                                        </Typography>
                                    </Grid>
                                </ListItem>
                                <Stack spacing={2}>
                                    <Button variant="outlined" startIcon={<AddIcon />}>
                                        {t('add or create')}
                                    </Button>
                                    <Button variant="contained">{t('mark as done')}</Button>
                                </Stack>
                            </Item>
                        </Grid>
                        <Grid>
                            <Item>
                                <Box sx={{ m: 2, display: 'flex', alignItems: 'center' }}>
                                    <PeopleIcon />
                                    <Typography gutterBottom variant="body1">
                                        {t('private comments')}
                                    </Typography>
                                </Box>
                                <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
                                    <Button>{t('add private comments')}</Button>
                                </Box>
                            </Item>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </MainLayout>
    );
}
