import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

function CreateClass({ open, onClose }) {
    return (
        <div>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create class</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        Enter the name of class and we will create a classroom for you!
                    </DialogContentText> */}
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '97%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField required id="name" label="Tên lớp học" variant="filled" />
                        <TextField id="part" label="Phần" variant="filled" />
                        <TextField id="topic" label="Chủ đề" variant="filled" />
                        <TextField id="room" label="Phòng" variant="filled" />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        hủy
                    </Button>
                    <Button onClick={onClose} color="primary">
                        tạo
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default CreateClass;
