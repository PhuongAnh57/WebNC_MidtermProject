import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import axios from 'axios';

function CreateClass({ open, onClose }) {
    const [name, setName] = useState('');
    const [part, setPart] = useState('');
    const [topic, setTopic] = useState('');
    const [room, setRoom] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const classInfo = { name, part, topic, room };

        try {
            setName('');
            setPart('');
            setTopic('');
            setRoom('');
            onClose();
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
                .then((response) => {
                    console.log('Tạo lớp thành công');
                });
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        hủy
                    </Button>
                    {name ? (
                        <Button onClick={handleSubmit} color="primary">
                            tạo
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
