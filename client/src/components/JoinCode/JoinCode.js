import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

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
import { AccountCircle } from '@mui/icons-material';

import useAxiosPrivate from 'hooks/useAxiosPrivate';

// import SwitchIcon from './SwitchIcon';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // color: theme.palette.text.secondary,
    color: '#3c4043',
}));

export default function JoinCode({ open, onClose }) {
    const [classCode, setClassCode] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const navigate = useNavigate();

    const axiosPrivate = useAxiosPrivate();

    const handleChange = (e) => {
        setClassCode(e.target.value);
    };

    const userID = localStorage.getItem('userID');
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const userEmail = localStorage.getItem('email');

    const handleSubmitJoinClass = async () => {
        try {
            const data = {
                userID,
                classCode,
                role: 'student',
            };

            const response = await axiosPrivate.post('/api/class/add-member/class-code', { data });

            if (response.status === 400 && response.data.message) {
                setErrorMsg(response.data.mesage);
            } else if (response.status === 200) {
                setErrorMsg(null);
                const classID = response.data;
                navigate(`/class/${classID}`, { replace: true });
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (classCode.length > 7) {
        setErrorMsg('Mã lớp có độ dài từ 5-7 ký tự bao gồm chữ cái và số (không có khoảng trắng hoặc ký tự đặc biệt');
    }

    return (
        <React.Fragment>
            <Dialog fullScreen open={open} onClose={onClose} TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Tham gia lớp học
                        </Typography>
                        <Button
                            autoFocus
                            color="inherit"
                            disabled={classCode === '' ? true : false}
                            onClick={handleSubmitJoinClass}
                        >
                            Tham gia
                        </Button>
                    </Toolbar>
                </AppBar>

                <Box sx={{ width: '560px', mx: 'auto', marginTop: '20px' }}>
                    <Stack spacing={2}>
                        <Item sx={{ boxShadow: 'none', border: '0.0625rem solid #dadce0' }}>
                            <div style={{ margin: '12px' }}>
                                <Typography component="p" sx={{ color: '#7f7f7f' }}>
                                    Bạn đang đăng nhập với tài khoản
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        py: 1,
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <AccountCircle sx={{ fontSize: '32px', marginRight: 1 }} />
                                        <Box>
                                            <Typography>{firstName + ' ' + lastName}</Typography>
                                            <Typography>{userEmail}</Typography>
                                        </Box>
                                    </Box>
                                    <Button variant="outlined" color="primary" sx={{ textTransform: 'none' }}>
                                        Switch account
                                    </Button>
                                </Box>
                            </div>
                        </Item>
                        <Item sx={{ boxShadow: 'none', border: '0.0625rem solid #dadce0' }}>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '97%' },
                                    paddingBottom: 2,
                                    boxShadow: 'none',
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <Typography variant="h6" component="h1">
                                    Mã lớp
                                </Typography>
                                <Typography component="p">Vui lòng lấy mã từ giáo viên của bạn.</Typography>
                                <TextField
                                    error={errorMsg !== null ? true : false}
                                    id="classCode"
                                    name="classCode"
                                    label="Mã lớp"
                                    value={classCode}
                                    onChange={handleChange}
                                    variant="outlined"
                                    helperText={errorMsg}
                                />
                            </Box>
                        </Item>
                    </Stack>
                </Box>
            </Dialog>
        </React.Fragment>
    );
}
