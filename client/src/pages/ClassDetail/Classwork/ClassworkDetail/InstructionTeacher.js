import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useParams } from 'react-router';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { extractFileName, extractFileNameExtension } from 'utils/filename';
import { GoogleDriveImage } from 'assets/images';

export default function InstructionTeacher() {
    const FileName = ({ filename, maxLength }) => {
        // Kiểm tra độ dài của tên file
        if (filename.length > maxLength) {
            // Cắt tên file và thêm "..."
            const truncatedFilename = filename.substring(0, maxLength - 3) + '...';
            return <span>{truncatedFilename}</span>;
        }
        return <span>{filename}</span>;
    };

    const { t } = useTranslation();
    const { classID, classworkID } = useParams();
    const [classwork, setClasswork] = React.useState(null);
    const axiosPrivate = useAxiosPrivate();

    React.useEffect(() => {
        const loadAssignment = async () => {
            try {
                const response = await axiosPrivate.get(`/api/class/${classID}/resource/${classworkID}/detail`);

                if (response.status === 200) {
                    setClasswork(response.data.resource);
                }
            } catch (err) {
                console.log(err);
            }
        };

        loadAssignment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [classID, classworkID]);

    const MoreIcon = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => setAnchorEl(event.currentTarget);
        const handleClose = () => setAnchorEl(null);

        return (
            <div>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    sx={{ left: '-100px' }}
                >
                    <MenuItem onClick={handleClose}>{t('edit')}</MenuItem>
                    <MenuItem onClick={handleClose}>{t('delete')}</MenuItem>
                    <MenuItem onClick={handleClose}>{t('copy link')}</MenuItem>
                </Menu>
            </div>
        );
    };

    return (
        <div style={{ width: '920px', margin: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Fab size="small" sx={{ background: '#4285f4', color: '#ffffff', mr: 2 }}>
                        <AssignmentOutlinedIcon />
                    </Fab>
                    <span style={{ fontSize: '32px', fontWeight: '400', color: '#4285f4', alignSelf: 'center' }}>
                        {classwork && classwork.title}
                    </span>
                </div>
                <MoreIcon sx={{ color: '#4285f4' }} />
            </div>
            <Box sx={{ ml: '58px', fontSize: '14px' }}>
                <div style={{ color: '#5F6368', display: 'flex', alignItems: 'center' }}>
                    <span>{classwork && classwork.owner_lastName + ' ' + classwork.owner_firstName}</span>
                    <NavigateNextIcon sx={{ alignSelf: 'center' }} />
                    <span>{classwork && new Date(classwork.date).toUTCString()}</span>
                </div>
                <div
                    style={{
                        margin: '8px 0px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        color: '#3c4043',
                        fontWeight: '600',
                    }}
                >
                    <span>100 {t('points')}</span>
                    <span>{t('due')} 30/12/2023</span>
                </div>
                <Divider />

                {classwork && classwork.file_urls[0] && (
                    <Card sx={{ display: 'flex', width: '400px', mt: '16px', mb: '16px' }}>
                        {extractFileNameExtension(classwork.file_urls[0]) === 'Image' ? (
                            <CardMedia
                                component="img"
                                sx={{ width: 150, height: '100%' }}
                                image={classwork.file_urls[0]}
                                alt="Image"
                            />
                        ) : (
                            <CardMedia
                                component="img"
                                sx={{ width: 150, height: '100%' }}
                                image={GoogleDriveImage}
                                alt="Google Drive"
                            />
                        )}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" sx={{ fontSize: '16px', color: '#3C3034' }}>
                                    filename={extractFileName(classwork.file_urls[0])}
                                </Typography>
                                <Typography sx={{ fontSize: '14px', color: '#5F6368' }} component="div">
                                    {extractFileNameExtension(classwork.file_urls[0])}
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                )}
                <Divider />

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#5F6368',
                        fontWeight: '600',
                        marginTop: '16px',
                    }}
                >
                    <PeopleAltOutlinedIcon />
                    <span style={{ alignSelf: 'center', marginLeft: '8px' }}>{t('class comments')}</span>
                </div>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '16px 8px 16px 0px',
                    }}
                >
                    <Fab size="small" sx={{ background: '#4285f4', color: '#ffffff', mr: 2 }}>
                        <AssignmentOutlinedIcon />
                    </Fab>
                    <TextField size="small" fullWidth label={t('add class comments...')} id="fullWidth" />
                    <SendOutlinedIcon sx={{ ml: 2 }} />
                </div>
            </Box>
        </div>
    );
}
