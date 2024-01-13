import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
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
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Background from '../../../assets/images/classroom.jpg';
import Divider from '@mui/material/Divider';
import { Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Classwork() {
    const { t } = useTranslation();
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button variant="text" startIcon={<AssignmentIndIcon />}>
                    {t('view your work')}
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
                            <em>{t('all topics')}</em>
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                            amet blandit leo lobortis eget.
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit
                            amet blandit leo lobortis eget.
                        </Typography>
                        <Divider sx={{ margin: '10px 0' }} />
                        <Button variant="text">Xem chi tiết</Button>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    );
}
