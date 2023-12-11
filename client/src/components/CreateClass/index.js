import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

function CreateClass({ open, onClose }) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [part, setPart] = useState('');
    const [topic, setTopic] = useState('');
    const [room, setRoom] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [status, setStatus] = useState('tạo');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const classInfo = { name, part, topic, room };
        let classID = 0;

        try {
            setDisabled(true);
            setStatus('Đang tạo');

            await axios
                .post(
                    '/api/create-class',
                    { classInfo },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        },
                    },
                )
                .then((response) => (classID = response.data.class_id));
            
            setTimeout(() => {
                onClose();
                setName('');
                setPart('');
                setTopic('');
                setRoom('');
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            variant="filled"
                            disabled={disabled}
                        />
                        <TextField
                            id="part"
                            name="part"
                            label="Phần"
                            value={part}
                            onChange={(e) => setPart(e.target.value)}
                            variant="filled"
                            disabled={disabled}
                        />
                        <TextField
                            id="topic"
                            name="topic"
                            label="Chủ đề"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            variant="filled"
                            disabled={disabled}
                        />
                        <TextField
                            id="room"
                            name="room"
                            label="Phòng"
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                            variant="filled"
                            disabled={disabled}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary" disabled={disabled}>
                        hủy
                    </Button>
                    {name ? (
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
