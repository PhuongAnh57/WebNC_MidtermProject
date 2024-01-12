import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';

import Assignment from './Assignment/Assignment';
import Background from '../../../assets/images/classroom.jpg';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BookIcon from '@mui/icons-material/Book';
import ListIcon from '@mui/icons-material/List';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CreateAssignment from './Assignment/CreateAssignment';
import CreateMaterial from './Material/CreateMaterial';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import Material from './Material/Material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardMedia } from '@mui/material';

export default function Classwork({ classDetail }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [classworks, setClassworks] = React.useState([]);
    const open = Boolean(anchorEl);
    const handleOpenCreateAssignment = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Select input
    const [topic, setTopic] = React.useState('');
    const handleSelectTopic = (event) => {
        setTopic(event.target.value);
    };

    const [openAssignment, setOpenAssignment] = React.useState(false);
    const handleOpenAssignment = () => setOpenAssignment(true);
    const handleCloseAssignment = () => setOpenAssignment(false);

    const [openMaterial, setOpenMaterial] = React.useState(false);
    const handleOpenMaterial = () => setOpenMaterial(true);
    const handleCloseMaterial = () => setOpenMaterial(false);

    const axiosPrivate = useAxiosPrivate();

    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    React.useEffect(() => {
        const loadMaterials = async () => {
            try {
                const response = await axiosPrivate.get(`/api/class/${classDetail.class_id}/resource/all`);

                if (response.status === 200) {
                    const resources = response.data.resources;
                    setClassworks([...resources]);
                }
            } catch (err) {
                console.log('Error loading classworks', err);
            }
        };

        loadMaterials();
    }, []);

    const handleUpdateClassworks = (newClasswork) => {
        setClassworks((prev) => [newClasswork, ...prev]);
    };

    const teacherView = () => {
        return (
            <>
                <div style={{ width: '920px' }}>
                    <Button
                        id="fade-button"
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleOpenCreateAssignment}
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ padding: '8px 12px', borderRadius: '20px' }}
                    >
                        Tạo
                    </Button>
                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                            'aria-labelledby': 'fade-button',
                        }}
                        anchorEl={anchorEl}
                        classDetail={classDetail}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                        sx={{ marginTop: '8px' }}
                    >
                        <MenuItem onClick={handleOpenAssignment}>
                            <ListItemIcon sx={{ marginRight: '8px' }}>
                                <AssignmentIcon fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText>Bài tập</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={handleOpenMaterial}>
                            <ListItemIcon sx={{ marginRight: '8px' }}>
                                <BookIcon fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText>Tài liệu</ListItemText>
                        </MenuItem>

                        <Divider />

                        <MenuItem>
                            <ListItemIcon sx={{ marginRight: '8px' }}>
                                <ListIcon fontSize="small" color="primary" />
                            </ListItemIcon>
                            <ListItemText>Chủ đề</ListItemText>
                        </MenuItem>
                    </Menu>

                    {openAssignment && (
                        <CreateAssignment
                            classDetail={classDetail}
                            onUpdateClassworks={handleUpdateClassworks}
                            onCloseAssignment={handleCloseAssignment}
                        />
                    )}

                    {openMaterial && (
                        <CreateMaterial
                            classDetail={classDetail}
                            onUpdateClassworks={handleUpdateClassworks}
                            onCloseMaterial={handleCloseMaterial}
                        />
                    )}

                    {/* Input Select */}
                    <FormControl sx={{ mt: 7, ml: -10, mb: 2, minWidth: 300 }}>
                        <Select
                            value={topic}
                            onChange={handleSelectTopic}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">Tất cả chủ đề</MenuItem>
                            <MenuItem value="mid">Giữa kỳ</MenuItem>
                            <MenuItem value="seminar">Seminar</MenuItem>
                            <MenuItem value="final">Cuối kỳ</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Asignment list */}
                    {classworks.map((classwork, index) => {
                        if (classwork.type === 'assignment') {
                            return <Assignment data={classwork} key={index} />;
                        }

                        return <Material data={classwork} key={index} />;
                    })}

                    {/* Chủ đề */}
                    {/* <Paper elevation="0" sx={{ width: '100%', marginTop: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px' }}>
                    <span style={{ fontSize: '1.6rem', color: '#1976d2' }}>Cuối kỳ</span>
                    <span style={{ alignSelf: 'center' }}>{<MoreVertIcon sx={{ color: '#4285f4' }} />}</span>
                </div>
            </Paper> */}
                </div>
            </>
        );
    };

    const studentView = () => {
        return (
            <>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button variant="text" startIcon={<AssignmentIndIcon />}>
                            Xem tất cả bài tập của bạn
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ minWidth: 400 }} size="small">
                            <Select
                                value={age}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="">
                                    <em>Tất cả chủ đề</em>
                                </MenuItem>
                                <MenuItem value={10}>Assignments</MenuItem>
                                <MenuItem value={20}>Projects</MenuItem>
                                <MenuItem value={30}>Seminar</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                sx={{ height: 70 }}
                            >
                                <List>
                                    <ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <AssignmentIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Simple JWT auth with Nest" secondary="" />
                                        </ListItem>
                                    </ListItem>
                                </List>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                                    ex, sit amet blandit leo lobortis eget.
                                </Typography>
                                <Card sx={{ display: 'flex', width: '50%', margin: '20px' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 151 }}
                                        image={Background}
                                        alt="Live from space album cover"
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography component="div" variant="h6">
                                                Live From Space
                                            </Typography>
                                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                                Mac Miller
                                            </Typography>
                                        </CardContent>
                                    </Box>
                                </Card>
                                <Divider sx={{ margin: '10px 0' }} />
                                <Link to="/classwork-detail">
                                    <Button variant="text">Xem chi tiết</Button>
                                </Link>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header-2"
                                sx={{ height: 70 }}
                            >
                                <List>
                                    <ListItem>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <AssignmentIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary="Simple JWT auth with Nest" secondary="" />
                                        </ListItem>
                                    </ListItem>
                                </List>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus
                                    ex, sit amet blandit leo lobortis eget.
                                </Typography>
                                <Divider sx={{ margin: '10px 0' }} />
                                <Button variant="text">Xem chi tiết</Button>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>{' '}
                </Grid>
            </>
        );
    };

    return <> {classDetail.role === 'student' ? studentView() : teacherView()}</>;
}
