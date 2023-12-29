import * as React from 'react';
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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: '10px',
}));

export default function ClassworkDetail() {
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
                                                        Assignment
                                                    </Typography>
                                                    <Typography color="text.secondary" variant="body2">
                                                        Khánh Duy - 23 thg 12
                                                    </Typography>
                                                </ListItemText>
                                            </ListItem>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Divider variant="middle" />
                                <Box sx={{ m: 2, display: 'flex', alignItems: 'center' }}>
                                    <PeopleIcon />
                                    <Typography gutterBottom variant="body1">
                                        Nhân xét về lớp học
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
                                    <Button>Thêm nhận xét về lớp học</Button>
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
                                            Bài tập của bạn
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography gutterBottom variant="h7" component="div">
                                            Đã giao
                                        </Typography>
                                    </Grid>
                                </ListItem>
                                <Stack spacing={2}>
                                    <Button variant="outlined" startIcon={<AddIcon />}>
                                        Thêm hoặc tạo
                                    </Button>
                                    <Button variant="contained">Đánh dấu là đã hoàn thành</Button>
                                </Stack>
                            </Item>
                        </Grid>
                        <Grid>
                            <Item>
                                <Box sx={{ m: 2, display: 'flex', alignItems: 'center' }}>
                                    <PeopleIcon />
                                    <Typography gutterBottom variant="body1">
                                        Nhân xét riêng tư
                                    </Typography>
                                </Box>
                                <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
                                    <Button>Thêm nhận xét riêng tư</Button>
                                </Box>
                            </Item>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </MainLayout>
    );
}
