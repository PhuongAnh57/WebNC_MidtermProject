import * as React from 'react';
import { useState, useEffect } from 'react';

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
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import ClearIcon from '@mui/icons-material/Clear';

import SwitchIcon from './SwitchIcon';

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
    const [classData, setClassData] = useState({
        name: '',
        part: '',
        topic: '',
        room: '',
    });

    const currentURL = window.location.href;
    const classID = currentURL.split('/').pop();
    const axiosPrivate = useAxiosPrivate();

    const handleChange = (e) => {
        setClassData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        if (open) {
            const getClassData = async () => {
                const userID = localStorage.getItem('userID');

                axiosPrivate.get(`/api/class/${classID}/${userID}`).then((response) => {
                    const classDetail = response.data.Class;
                    setClassData({
                        name: classDetail.class_name,
                        part: classDetail.part,
                        topic: classDetail.topic,
                        room: classDetail.room,
                    });
                });
            };

            getClassData();
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
                <Box sx={{ width: '50%', mx: 'auto', marginTop: '20px' }} />
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
                                    value={classData.name}
                                    onChange={handleChange}
                                    variant="filled"
                                />
                                <TextField
                                    id="part"
                                    name="part"
                                    label="Phần"
                                    value={classData.part}
                                    onChange={handleChange}
                                    variant="filled"
                                />
                                <TextField
                                    id="topic"
                                    name="topic"
                                    label="Chủ đề"
                                    value={classData.topic}
                                    onChange={handleChange}
                                    variant="filled"
                                />
                                <TextField
                                    id="room"
                                    name="room"
                                    label="Phòng"
                                    value={classData.room}
                                    onChange={handleChange}
                                    variant="filled"
                                />
                            </Box>
                        </Item>
                        <Item>
                            <div style={{ margin: '12px' }}>
                                <h1>Chấm điểm</h1>
                                <div style={{ textAlign: 'left', fontSize: '22px', fontWeight: '400', color: '#3c4043' }}>Tính tổng điểm theo trọng số</div>
                                <div style={{margin: '12px 0px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <span style={{fontSize: '14px', color: '#3c4043'}}>Hiển thị tổng điểm cho học sinh</span>
                                    <span style={{alignSelf: 'center'}}>{<SwitchIcon />}</span>
                                </div>

                                <Divider />

                                <div style={{ textAlign: 'left', fontSize: '22px', fontWeight: '400', color: '#3c4043', marginTop: '18px' }}>Loại điểm</div>
                                <div style={{ textAlign: 'left', fontSize: '12px', color: '#5f6368', margin: '16px 0px' }}>Loại điểm phải có tổng là 100%</div>
                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '16px' }}>
                                    <TextField
                                        id=""
                                        name=""
                                        label="Danh mục điểm*"
                                        value=""
                                        variant="filled"
                                        sx={{ mr: 3 }}
                                    />
                                    <TextField
                                        id=""
                                        name=""
                                        label="Phần trăm*"
                                        value=""
                                        variant="filled"
                                        sx={{ mr: 4 }}
                                    />
                                    <span style={{alignSelf: 'center'}}>{<ClearIcon />}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '16px' }}>
                                    <TextField
                                        id=""
                                        name=""
                                        label="Danh mục điểm*"
                                        value=""
                                        variant="filled"
                                        sx={{ mr: 3 }}
                                    />
                                    <TextField
                                        id=""
                                        name=""
                                        label="Phần trăm*"
                                        value=""
                                        variant="filled"
                                        sx={{ mr: 4 }}
                                    />
                                    <span style={{alignSelf: 'center'}}>{<ClearIcon />}</span>
                                </div>
                                <div style={{ textAlign: 'left', fontSize: '12px', color: '#5f6368'}}>Phần trăm còn lại <span>0%</span></div>
                                <Button size="large" sx={{ float: 'left', marginLeft: '-12px', fontSize: '14px', color: '#1967d2'}}>Thêm loại điểm</Button>
                            </div>
                        </Item>
                        <Item>Item 3</Item>
                    </Stack>
                </Box>
            </Dialog>
        </React.Fragment>
    );
}
