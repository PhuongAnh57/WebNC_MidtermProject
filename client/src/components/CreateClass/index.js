import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

function CreateClass({ open, onClose }) {
    const navigate = useNavigate();
    const [classData, setClassData] = useState({
        name: '',
        part: '',
        topic: '',
        room: '',
    });
    const [disabled, setDisabled] = useState(false);
    const [status, setStatus] = useState('tạo');
    const axiosPrivate = useAxiosPrivate();

    const handleChange = (e) => {
        setClassData((prev) => ({
            ...prev,
            [e.target.name]: [e.target.value],
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let classID = 0;

        try {
            setDisabled(true);
            setStatus('Đang tạo');

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
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Tạo lớp học</DialogTitle>
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
                            label="Tên lớp học"
                            value={classData.name}
                            onChange={handleChange}
                            variant="filled"
                            disabled={disabled}
                        />
                        <TextField
                            id="part"
                            name="part"
                            label="Phần"
                            value={classData.part}
                            onChange={handleChange}
                            variant="filled"
                            disabled={disabled}
                        />
                        <TextField
                            id="topic"
                            name="topic"
                            label="Chủ đề"
                            value={classData.topic}
                            onChange={handleChange}
                            variant="filled"
                            disabled={disabled}
                        />
                        <TextField
                            id="room"
                            name="room"
                            label="Phòng"
                            value={classData.room}
                            onChange={handleChange}
                            variant="filled"
                            disabled={disabled}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary" disabled={disabled}>
                        hủy
                    </Button>
                    {classData.name ? (
                        <Button onClick={handleSubmit} color="primary" disabled={disabled}>
                            {status}
                        </Button>
                    ) : (
                        <Button disabled>tạo</Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default CreateClass;
