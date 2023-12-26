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
import BookIcon from '@mui/icons-material/Book';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useTheme } from '@mui/material/styles';
import Background from '../../../assets/images/classroom.jpg';

export default function SelectLabels() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const theme = useTheme();

    return (
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
                                            <BookIcon />
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
                        <Card sx={{ display: 'flex', width: '50%', margin:'20px'}}>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image={Background}
                                alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        Live From Space
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        Mac Miller
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
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
                                            <BookIcon />
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
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid item xs={12}>
                <Grid item xs>
                    <Grid container alignItems="center" marginTop={'30px'}>
                        <Grid item xs>
                            <Typography gutterBottom variant="h5" component="div">
                                Assignments
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button size="small">
                                <MoreVertIcon />
                            </Button>
                        </Grid>
                    </Grid>
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
                                                <BookIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary="React tutorial" secondary="" />
                                    </ListItem>
                                </ListItem>
                            </List>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </Grid>
    );
}
