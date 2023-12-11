import * as React from 'react';
import axios from 'axios';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function FullScreenDialog({ open, onClose }) {
    const [name, setName] = useState('');
    const [part, setPart] = useState('');
    const [topic, setTopic] = useState('');
    const [room, setRoom] = useState('');

    const currentURL = window.location.href;
    const classID = currentURL.split('/').pop();

    useEffect(() => {
        if(open) {
            axios.get(`/api/class/${classID}`).then((response) => {
                const classDetail = response.data.Class;
                
                setName(classDetail.class_name);
                setPart(classDetail.part);
                setTopic(classDetail.topic);
                setRoom(classDetail.room);
                // setClassInfo(response.data.Class);
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return (
        <React.Fragment>
            <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Cài đặt lớp học
                        </Typography>
                        <Button autoFocus color="inherit" onClick={onClose}>
                            lưu
                        </Button>
                    </Toolbar>
                </AppBar>
                <Box sx={{ width: '50%', mx: 'auto', marginTop: '20px' }}>
                <Box sx={{ width: '50%', mx: 'auto', marginTop: '20px' }}>
                    <Stack spacing={2}>
                        <Item>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '97%' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <h1>Thông tin chi tiết về lớp học</h1>
                                <TextField
                                    required
                                    id="name"
                                    name="name"
                                    label="Tên lớp học"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    variant="filled"
                                />
                                <TextField
                                    id="part"
                                    name="part"
                                    label="Phần"
                                    value={part}
                                    onChange={(e) => setPart(e.target.value)}
                                    variant="filled"
                                />
                                <TextField
                                    id="topic"
                                    name="topic"
                                    label="Chủ đề"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    variant="filled"
                                />
                                <TextField
                                    id="room"
                                    name="room"
                                    label="Phòng"
                                    value={room}
                                    onChange={(e) => setRoom(e.target.value)}
                                    variant="filled"
                                />
                            </Box>
                        </Item>
                        <Item>
                            <h1>Chung</h1>
                        </Item>
                        <Item>Item 3</Item>
                    </Stack>
                </Box>
            </Dialog>
        </React.Fragment>
    );
}
