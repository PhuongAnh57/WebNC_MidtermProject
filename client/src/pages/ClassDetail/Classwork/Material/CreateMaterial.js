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

import useAxiosPrivate from 'hooks/useAxiosPrivate';

import styles from './CreateMaterial.module.scss';
import { GoogleDriveImage } from 'assets/images';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

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

const names = ['Tất cả học sinh', 'Nguyễn Phương Anh', 'Trần Thị Mỹ Trinh', 'Bùi Khánh Duy'];

function CreateMaterial({ classDetail, onUpdateClassworks, onCloseMaterial }) {
    const axiosPrivate = useAxiosPrivate();
    const [filesUpload, setFilesUpload] = React.useState([]);
    const [disabled, setDisabled] = React.useState(false);
    const [material, setMaterial] = React.useState({
        title: '',
        instruction: '',
        students: '',
        type: 'material',
        date: new Date(),
    });

    const handleChange = (event) => {
        setMaterial((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const packFiles = (files) => {
        const fileList = [];

        [...files].forEach((file) => {
            let type = '';

            if (file.type.startsWith('image')) {
                type = 'Image';
            } else if (file.type.startsWith('video')) {
                type = 'Video';
            } else if (file.type.startsWith('application/pdf')) {
                type = 'PDF';
            } else if (file.type.startsWith('application/msword')) {
                type = 'Word';
            } else if (file.type.startsWith('application/pptx')) {
                type = 'PowerPoint';
            } else if (file.type.startsWith('text/csv')) {
                type = 'Comma Separate Values';
            } else if (file.type.startsWith('application/x-zip-compressed')) {
                type = 'Zip';
            } else {
                type = 'Unknown File';
            }

            fileList.push({
                file,
                type,
            });
        });

        return fileList;
    };

    const handleUploadFile = () => {
        const inputElement = document.createElement('input');

        // Đặt thuộc tính type của input là "file"
        inputElement.type = 'file';

        // Gán sự kiện cho input khi có thay đổi
        inputElement.addEventListener('change', function (event) {
            const fileList = packFiles(event.target.files);

            setFilesUpload((prev) => [...prev, ...fileList]);
        });

        // Mở hộp thoại tải lên file
        inputElement.click();
    };

    const sendFiles = async (material) => {
        try {
            const formData = new FormData();
            formData.append(`file`, filesUpload[0].file);

            const sendFiles = await axiosPrivate.post(
                `/api/class/${material.class_id}/resource/${material.id}/add_file`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            // console.log(sendFiles.data.message);
        } catch (err) {
            console.log(err.message);
        }
    };

    const sendMaterial = async () => {
        try {
            const resource = { ...material };
            const response = await axiosPrivate.post(`/api/class/${classDetail.class_id}/resource/add_resource`, {
                resource,
            });

            return response.data.resource;
        } catch (err) {
            console.log(err.message);
        }

        return null;
    };

    const handlePostMaterial = async () => {
        if (material.title === '') {
            alert('Vui lòng điền vào tiêu đề!');
            return;
        }

        setDisabled(true);
        let materialResponse = await sendMaterial();

        if (filesUpload.length && materialResponse) {
            materialResponse = await sendFiles(materialResponse);
        }

        if (materialResponse) {
            onUpdateClassworks(materialResponse);
            setDisabled(false);
        }

        onCloseMaterial();
    };

    const handleRemoveFile = (index) => {
        const newFilesUpload = filesUpload.filter((file) => file !== filesUpload[index]);
        setFilesUpload(newFilesUpload);
    };

    let image;
    if (filesUpload.length > 0) {
        // console.log(filesUpload[0].file);
        const isImage = filesUpload[0].type === 'Image';
        if (isImage) {
            image = URL.createObjectURL(filesUpload[0].file);
        }
    }

    const renderFilesUpload = () => {
        return (
            <>
                {filesUpload.map((file, index) => (
                    <Card key={index} sx={{ display: 'flex' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 100 }}
                            image={image || GoogleDriveImage}
                            alt="Live from space album cover"
                        />
                        <Box sx={{ width: '82%' }}>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <Typography component="div" sx={{ fontSize: '16px', color: '#3C3034' }}>
                                    {file.file.name}
                                </Typography>
                                <Typography sx={{ fontSize: '14px', color: '#5F6368' }} component="div">
                                    {file.type}
                                </Typography>
                            </CardContent>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CardContent>
                                <Typography>
                                    <Button onClick={() => handleRemoveFile(index)}>
                                        <ClearIcon />
                                    </Button>
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                ))}
            </>
        );
    };

    const [classes, setClasses] = React.useState('all-classes');
    const handleChangeClasses = (event) => setClasses(event.target.value);

    const [personName, setPersonName] = React.useState([]);
    const handleChangeStudents = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [topic, setTopic] = React.useState('no-topic');
    const handleChangeTopic = (event) => setTopic(event.target.value);

    return (
        <React.Fragment>
            <Dialog fullScreen open={true} onClose={onCloseMaterial} TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={onCloseMaterial} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Tài liệu
                        </Typography>
                        {!disabled ? (
                            <Button autoFocus color="inherit" onClick={handlePostMaterial}>
                                Đăng
                            </Button>
                        ) : (
                            <Button autoFocus color="success" onClick={handlePostMaterial} disabled>
                                Đang đăng...
                            </Button>
                        )}
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
                                            <TextField
                                                id="filled-basic"
                                                label="Tiêu đề"
                                                name="title"
                                                variant="filled"
                                                value={material.title}
                                                onChange={handleChange}
                                            />
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
                                                    name="instruction"
                                                    rows={6}
                                                    sx={{ position: 'relative' }}
                                                    value={material.instruction}
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
                                                    onChange={handleChange}
                                                />
                                            </FormControl>

                                            {/* Render files uploaded */}
                                            {renderFilesUpload()}
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
                                                <IconButton
                                                    aria-label=""
                                                    className={styles['icon']}
                                                    onClick={handleUploadFile}
                                                >
                                                    <CloudUploadIcon />
                                                </IconButton>
                                                Tải lên
                                            </div>
                                            <div className={styles['box']}>
                                                <IconButton aria-label="" className={styles['icon']}>
                                                    <LinkIcon />
                                                </IconButton>
                                                Liên kết
                                            </div>
                                        </div>
                                    </Item>
                                </Stack>
                                {/* </Box> */}
                            </Item>
                        </Grid>

                        <Grid item xs={3}>
                            <Item sx={{ height: 'calc(100vh - 64px)' }}>
                                <div style={{ margin: '16px' }}>
                                    <div style={{ textAlign: 'left', marginBottom: '8px', fontWeight: 600 }}>
                                        Dành cho
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <FormControl sx={{ width: 150 }}>
                                            <Select
                                                size="small"
                                                value={classes}
                                                onChange={handleChangeClasses}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value="all-classes">Web</MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <FormControl sx={{ width: 150 }}>
                                            <InputLabel
                                                sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    marginLeft: 1, // Điều chỉnh khoảng cách từ viền trái
                                                }}
                                                id="demo-multiple-checkbox-label"
                                            ></InputLabel>
                                            <Select
                                                size="small"
                                                labelId="demo-multiple-checkbox-label"
                                                id="demo-multiple-checkbox"
                                                multiple
                                                value={personName}
                                                onChange={handleChangeStudents}
                                                renderValue={(selected) => selected.join(', ')}
                                                MenuProps={MenuProps}
                                            >
                                                {names.map((name) => (
                                                    <MenuItem key={name} value={name}>
                                                        <Checkbox checked={personName.indexOf(name) > -1} />
                                                        <ListItemText primary={name} />
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>

                                <div style={{ margin: '16px' }}>
                                    <div style={{ textAlign: 'left', marginBottom: '8px', fontWeight: 600 }}>
                                        Chủ đề
                                    </div>
                                    <FormControl fullWidth>
                                        <Select
                                            size="small"
                                            value={topic}
                                            onChange={handleChangeTopic}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem value="no-topic">Không có chủ đề</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </Dialog>
        </React.Fragment>
    );
}

export default React.memo(CreateMaterial);
