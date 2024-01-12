import Box from '@mui/material/Box';
import * as React from 'react';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import MainLayout from 'layouts/MainLayout';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

export default function MaterialDetail() {
    const FileName = ({ filename, maxLength }) => {
        // Kiểm tra độ dài của tên file
        if (filename.length > maxLength) {
            // Cắt tên file và thêm "..."
            const truncatedFilename = filename.substring(0, maxLength - 3) + '...';
            return <span>{truncatedFilename}</span>;
        }
        return <span>{filename}</span>;
    };

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
                    <MenuItem onClick={handleClose}>Chỉnh sửa</MenuItem>
                    <MenuItem onClick={handleClose}>Xóa</MenuItem>
                    <MenuItem onClick={handleClose}>Sao chép đường liên kết</MenuItem>
                </Menu>
            </div>
        );
    };

    return (
        <MainLayout>
            <div style={{ width: '920px', margin: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Fab size="small" sx={{ background: '#4285f4', color: '#ffffff', mr: 2 }}>
                            <ClassOutlinedIcon />
                        </Fab>
                        <span style={{ fontSize: '32px', fontWeight: '400', color: '#4285f4', alignSelf: 'center' }}>
                            Tài liệu Cuối kỳ
                        </span>
                    </div>
                    <MoreIcon sx={{ color: '#4285f4' }} />
                </div>
                <Box sx={{ ml: '58px', fontSize: '14px' }}>
                    <div style={{ color: '#5F6368', display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <span>Nguyễn Phương Anh</span>
                        <NavigateNextIcon sx={{ alignSelf: 'center' }} />
                        <span> Ngày 27/12/2023</span>
                    </div>

                    <Divider />

                    <Card sx={{ display: 'flex', width: '400px', mt: '16px', mb: '16px' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image="https://png.pngtree.com/thumb_back/fw800/background/20210920/pngtree-school-classroom-blackboard-desk-education-course-training-class-classroom-background-image_904108.png"
                            alt="Live from space album cover"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" sx={{ fontSize: '16px', color: '#3C3034' }}>
                                    <FileName filename="Hướng dẫn Bài tập 1.docx" maxLength={25} />
                                </Typography>
                                <Typography sx={{ fontSize: '14px', color: '#5F6368' }} component="div">
                                    Word
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
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
                        <span style={{ alignSelf: 'center', marginLeft: '8px' }}>Nhận xét của lớp học</span>
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
                            <ClassOutlinedIcon />
                        </Fab>
                        <TextField size="small" fullWidth label="Thêm nhận xét trong lớp học..." id="fullWidth" />
                        <SendOutlinedIcon sx={{ ml: 2 }} />
                    </div>
                </Box>
            </div>
        </MainLayout>
    );
}
