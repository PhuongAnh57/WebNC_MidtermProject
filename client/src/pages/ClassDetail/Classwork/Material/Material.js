import { useState } from 'react';
import { Link } from 'react-router-dom';
import { extractFileName, extractFileNameExtension } from 'utils/filename';
import { GoogleDriveImage } from 'assets/images';

import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookIcon from '@mui/icons-material/Book';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const FileName = ({ filename, maxLength }) => {
    // Kiểm tra độ dài của tên file
    if (filename.length > maxLength) {
        // Cắt tên file và thêm "..."
        const truncatedFilename = filename.substring(0, maxLength - 3) + '...';
        return <span>{truncatedFilename}</span>;
    }
    return <span>{filename}</span>;
};

export default function Material({ data }) {
    const [click, setClick] = useState(false);
    const [material, setMaterial] = useState(data);

    const handleAccordionClick = () => {
        setClick(!click);
    };

    const getDateUpload = () => {
        const date = new Date(material.date);
        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    };

    return (
        <Accordion onClick={handleAccordionClick} sx={{ boxShadow: click ? '-moz-initial' : 'none' }}>
            <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ ':hover': { background: '#e8f0fe' }, display: 'flex', alignItems: 'center' }}
            >
                <Typography
                    sx={{
                        background: '#4285f4',
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mr: 2,
                    }}
                >
                    <BookIcon sx={{ color: 'white' }} />
                </Typography>
                <Typography sx={{ width: '80%', alignSelf: 'center' }}>{material.title}</Typography>
                <Typography sx={{ width: '20%', color: '#0000008C', alignSelf: 'center', fontSize: '12px' }}>
                    Đã đăng vào {getDateUpload()}
                </Typography>
                <Typography sx={{ alignSelf: 'center' }}>{<MoreVertIcon />}</Typography>
            </AccordionSummary>

            {material.file_urls[0] && (
                <AccordionDetails sx={{ borderTop: '1px solid #b5bec9' }}>
                    <Typography sx={{ padding: '16px 24px' }}>
                        <Card sx={{ display: 'flex', width: '400px', height: '90px' }}>
                            <CardActionArea
                                component={Link}
                                to={material.file_urls[0]}
                                target="_blank"
                                sx={{ display: 'flex', justifyContent: 'flex-start', width: '400px', height: '90px' }}
                            >
                                {extractFileNameExtension(material.file_urls[0]) === 'Image' ? (
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 150, height: '100%' }}
                                        image={material.file_urls[0]}
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
                                            <FileName
                                                filename={extractFileName(material.file_urls[0])}
                                                maxLength={25}
                                            />
                                        </Typography>
                                        <Typography sx={{ fontSize: '14px', color: '#5F6368' }} component="div">
                                            {extractFileNameExtension(material.file_urls[0])}
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Typography>
                </AccordionDetails>
            )}

            <AccordionDetails sx={{ borderTop: '1px solid #b5bec9' }}>
                <Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px' }}>
                        <Button variant="text" sx={{ color: '#518cdd' }}>
                            Xem tài liệu
                        </Button>
                    </div>
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}
