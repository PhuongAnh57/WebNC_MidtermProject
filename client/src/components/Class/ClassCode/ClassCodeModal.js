import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const style = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 650,
        minHeight: 250,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
        paddingBottom: 0,
    },
    buttonClose: {
        marginTop: -2,
        marginRight: -1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    title: {
        textAlign: 'center',
        borderBottom: '2px solid #1976d2',
        padding: '16px 0',
    },
    modalFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 1,
    },
};

function ClassCodeModal({ classDetail, open, handleClose }) {
    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(classDetail.code);
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style.modal}>
                        <Typography component="div" sx={style.buttonClose}>
                            <IconButton size="large" onClick={handleClose}>
                                <CloseRoundedIcon />
                            </IconButton>
                        </Typography>
                        <Typography
                            id="transition-modal-title"
                            variant="h1"
                            color="primary"
                            component="h1"
                            sx={style.title}
                        >
                            {classDetail.code}
                        </Typography>

                        <Box sx={style.modalFooter}>
                            <Typography variant="p" component="h3" color="primary" sx={{ lineHeight: 1.6 }}>
                                {classDetail.class_name}
                            </Typography>
                            <Typography variant="h6" component="h1" color="primary">
                                <Button size="small" sx={{ textTransform: 'none' }} onClick={handleCopyToClipboard}>
                                    <ContentCopyIcon sx={{ fontSize: '20px', mx: 1 }} />
                                    <Typography variant="p" component="h3" color="primary">
                                        Sao chép
                                    </Typography>
                                </Button>
                            </Typography>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default ClassCodeModal;
