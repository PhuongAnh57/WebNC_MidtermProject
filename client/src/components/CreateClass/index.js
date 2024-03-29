import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

function CreateClass({ open, onClose }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [classData, setClassData] = useState({
        name: '',
        part: '',
        topic: '',
        room: '',
    });
    const [disabled, setDisabled] = useState(false);
    const [status, setStatus] = useState(`${t('create')}`);
    const axiosPrivate = useAxiosPrivate();

    const handleChange = (e) => {
        setClassData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let classID = 0;

        try {
            setDisabled(true);
            setStatus(`${t('creating...')}`);

            await axiosPrivate
                .post('/api/create-class', { classData })
                .then((response) => (classID = response.data.class_id));

            setTimeout(() => {
                onClose();
                setClassData({
                    name: '',
                    part: '',
                    topic: '',
                    room: '',
                });
                navigate(`/class/${classID}`, { replace: true });
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{t('create class')}</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '97%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        required
                        id="name"
                        name="name"
                        label={t('class name')}
                        value={classData.name}
                        onChange={handleChange}
                        variant="filled"
                        disabled={disabled}
                    />
                    <TextField
                        id="part"
                        name="part"
                        label={t('section')}
                        value={classData.part}
                        onChange={handleChange}
                        variant="filled"
                        disabled={disabled}
                    />
                    <TextField
                        id="topic"
                        name="topic"
                        label={t('subject')}
                        value={classData.topic}
                        onChange={handleChange}
                        variant="filled"
                        disabled={disabled}
                    />
                    <TextField
                        id="room"
                        name="room"
                        label={t('room')}
                        value={classData.room}
                        onChange={handleChange}
                        variant="filled"
                        disabled={disabled}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" disabled={disabled}>
                    {t('create')}
                </Button>
                {classData.name ? (
                    <Button onClick={handleSubmit} color="primary" disabled={disabled}>
                        {status}
                    </Button>
                ) : (
                    <Button disabled>{t('cancel')}</Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
export default CreateClass;
