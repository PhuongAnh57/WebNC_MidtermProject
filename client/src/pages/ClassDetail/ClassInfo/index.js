import * as React from 'react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
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
                            {t('class settings')}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={onClose}>
                            {t('save')}
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
                                <h1>{t('class details')}</h1>
                                <TextField
                                    required
                                    id="name"
                                    name="name"
                                    label={t('class name')}
                                    value={classData.name}
                                    onChange={handleChange}
                                    variant="filled"
                                />
                                <TextField
                                    id="part"
                                    name="part"
                                    label={t('section')}
                                    value={classData.part}
                                    onChange={handleChange}
                                    variant="filled"
                                />
                                <TextField
                                    id="topic"
                                    name="topic"
                                    label={t('subject')}
                                    value={classData.topic}
                                    onChange={handleChange}
                                    variant="filled"
                                />
                                <TextField
                                    id="room"
                                    name="room"
                                    label={t('room')}
                                    value={classData.room}
                                    onChange={handleChange}
                                    variant="filled"
                                />
                            </Box>
                        </Item>
                        <Item>
                            <div style={{ margin: '12px' }}>
                                <h1>{t('grading')}</h1>
                                <div
                                    style={{ textAlign: 'left', fontSize: '22px', fontWeight: '400', color: '#3c4043' }}
                                >
                                    {t('overall grade calculation')}
                                </div>
                                <div
                                    style={{
                                        margin: '12px 0px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                >
                                    <span style={{ fontSize: '14px', color: '#3c4043' }}>
                                        {t('show overall grade to students')}
                                    </span>
                                    <span style={{ alignSelf: 'center' }}>{<SwitchIcon />}</span>
                                </div>

                                <Divider />

                                <div
                                    style={{
                                        textAlign: 'left',
                                        fontSize: '22px',
                                        fontWeight: '400',
                                        color: '#3c4043',
                                        marginTop: '18px',
                                    }}
                                >
                                    {t('grade categories')}
                                </div>
                                <div
                                    style={{
                                        textAlign: 'left',
                                        fontSize: '12px',
                                        color: '#5f6368',
                                        margin: '16px 0px',
                                    }}
                                >
                                    {t('grade categories must add up to 100%')}
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        marginBottom: '16px',
                                    }}
                                >
                                    <TextField
                                        id=""
                                        name=""
                                        label={t('grade category') + '*'}
                                        value=""
                                        variant="filled"
                                        sx={{ mr: 3 }}
                                    />
                                    <TextField
                                        id=""
                                        name=""
                                        label={t('percentage') + '*'}
                                        value=""
                                        variant="filled"
                                        sx={{ mr: 4 }}
                                    />
                                    <span style={{ alignSelf: 'center' }}>{<ClearIcon />}</span>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                        marginBottom: '16px',
                                    }}
                                >
                                    <TextField
                                        id=""
                                        name=""
                                        label={t('grade category') + '*'}
                                        value=""
                                        variant="filled"
                                        sx={{ mr: 3 }}
                                    />
                                    <TextField
                                        id=""
                                        name=""
                                        label={t('percentage') + '*'}
                                        value=""
                                        variant="filled"
                                        sx={{ mr: 4 }}
                                    />
                                    <span style={{ alignSelf: 'center' }}>{<ClearIcon />}</span>
                                </div>
                                <div style={{ textAlign: 'left', fontSize: '12px', color: '#5f6368' }}>
                                    {t('remaining')} <span>0%</span>
                                </div>
                                <Button
                                    size="large"
                                    sx={{ float: 'left', marginLeft: '-12px', fontSize: '14px', color: '#1967d2' }}
                                >
                                    {t('add grade category')}
                                </Button>
                            </div>
                        </Item>
                    </Stack>
                </Box>
            </Dialog>
        </React.Fragment>
    );
}
