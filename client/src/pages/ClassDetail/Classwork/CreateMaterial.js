import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AddIcon from '@mui/icons-material/Add';
import LinkIcon from '@mui/icons-material/Link';
import ClearIcon from '@mui/icons-material/Clear';

import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import styles from './CreateAssignment.module.scss';

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

// const VisuallyHiddenInput = styled('input')({
//     clip: 'rect(0 0 0 0)',
//     clipPath: 'inset(50%)',
//     height: 1,
//     overflow: 'hidden',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     whiteSpace: 'nowrap',
//     width: 1,
// });

export default function CreateMaterial({ classDetail, open, onCloseDocument }) {
    const handleUploadFile = () => {
        const inputElement = document.createElement('input');

        // Đặt thuộc tính type của input là "file"
        inputElement.type = 'file';

        // Gán sự kiện cho input khi có thay đổi
        inputElement.addEventListener('change', function(event) {
            const fileList = event.target.files;
            // Xử lý danh sách các file đã chọn ở đây
            console.log(fileList);
        });

        // Mở hộp thoại tải lên file
        inputElement.click();
    }

    return (
        <React.Fragment>
            <Dialog fullScreen open={open} onClose={onCloseDocument} TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={onCloseDocument} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Tài liệu
                        </Typography>
                        <Button autoFocus color="inherit" onClick={onCloseDocument}>
                            Đăng tài liệu
                        </Button>
                    </Toolbar>
                </AppBar>

                <Box sx={{ flexGrow: 1, backgroundColor: '#f8f9fa' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <Item elevation={0} sx={{ backgroundColor: 'transparent' }}>
                                {/* <Box sx={{ width: '80%', mx: 'auto', marginTop: '20px' }}> */}
                                <Stack spacing={2} sx={{ width: '82%', mx: 'auto', marginTop: '20px' }}>
                                    <Item>
                                        <Box
                                            component="form"
                                            sx={{
                                                '& > :not(style)': { m: 1, width: '98%' },
                                            }}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <TextField id="filled-basic" label="Tiêu đề" variant="filled" />
                                            {/* <TextField
                                                id="filled-basic"
                                                label="Hướng dẫn (Không bắt buộc)"
                                                variant="filled"
                                                multiline
                                                rows={6}
                                            /> */}
                                            <FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
                                                <InputLabel htmlFor="filled-adornment-instruction">
                                                    Hướng dẫn (Không bắt buộc)
                                                </InputLabel>
                                                <FilledInput
                                                    id="filled-adornment-instruction"
                                                    multiline
                                                    rows={6}
                                                    sx={{ position: 'relative' }}
                                                    endAdornment={
                                                        <InputAdornment
                                                            sx={{ position: 'absolute', bottom: 20, left: 0 }}
                                                        >
                                                            {<FormatBoldIcon sx={{ m: 1 }} />}
                                                            {<FormatItalicIcon sx={{ m: 1 }} />}
                                                            {<FormatUnderlinedIcon sx={{ m: 1 }} />}
                                                            {<FormatListBulletedIcon sx={{ m: 1 }} />}
                                                            {<FormatClearIcon sx={{ m: 1 }} />}
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>  
                                            <Card sx={{ display: 'flex' }}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{ width: 100 }}
                                                    image="https://png.pngtree.com/thumb_back/fw800/background/20210920/pngtree-school-classroom-blackboard-desk-education-course-training-class-classroom-background-image_904108.png"
                                                    alt="Live from space album cover"
                                                />
                                                <Box sx={{width: '82%'}}>
                                                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                                        <Typography component="div" sx={{ fontSize: '16px', color: '#3C3034' }}>
                                                            Tài liệu BT1.docx
                                                        </Typography>
                                                        <Typography sx={{ fontSize: '14px', color: '#5F6368' }} component="div">
                                                            Word
                                                        </Typography>
                                                    </CardContent>
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <CardContent >
                                                        <Typography>
                                                            <Button><ClearIcon /></Button>
                                                        </Typography>
                                                    </CardContent>
                                                </Box>
                                            </Card>
                                        </Box>                                        
                                    </Item>

                                    <Item>
                                        <div className={styles['attached']}>Đính kèm</div>
                                        <div className={styles['listTypes']}>
                                            <div className={styles['box']}>
                                                <IconButton aria-label="" className={styles['icon']}>
                                                    <AddToDriveIcon />
                                                </IconButton>
                                                Drive
                                            </div>
                                            <div className={styles['box']}>
                                                <IconButton aria-label="" className={styles['icon']}>
                                                    <YouTubeIcon />
                                                </IconButton>
                                                YouTube
                                            </div>
                                            <div className={styles['box']}>
                                                <IconButton aria-label="" className={styles['icon']}>
                                                    <AddIcon />
                                                </IconButton>
                                                Tạo
                                            </div>
                                            <div className={styles['box']}>
                                                <IconButton aria-label="" className={styles['icon']} onClick={handleUploadFile}>
                                                    <CloudUploadIcon />
                                                </IconButton>                                  
                                                Tải lên
                                            </div>
                                            <div className={styles['box']}>
                                                <IconButton aria-label="" className={styles['icon']}>
                                                    <LinkIcon />
                                                </IconButton>
                                                Đường liên kết
                                            </div>
                                        </div>
                                    </Item>
                                </Stack>
                                {/* </Box> */}
                            </Item>
                        </Grid>

                        <Grid item xs={3}>
                            <Item sx={{height: 'calc(100vh - 64px)'}}> 
                                {/*  */}
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </Dialog>
        </React.Fragment>
    );
}

{/* <Button
    component="label"
    variant="contained"
    startIcon={<CloudUploadIcon />}
    sx={{ marginBottom: '12px' }}
>
    
</Button>
Tải lên */}