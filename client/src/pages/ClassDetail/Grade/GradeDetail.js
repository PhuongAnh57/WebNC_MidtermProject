import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';
import { Box, Divider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import MainLayout from 'layouts/MainLayout';

export default function GradeDetail() {
    //Get fullname from URL
    const currentURL = window.location.href;
    const decodedURL = decodeURIComponent(currentURL);
    let fullname = decodedURL.split('/').pop();

    // open Accordion
    const [click, setClick] = React.useState(false);
    const handleAccordionClick = () => {
        setClick(!click);
    };

    const FileName = ({ filename, maxLength }) => {
        // Kiểm tra độ dài của tên file
        if (filename.length > maxLength) {
            // Cắt tên file và thêm "..."
            const truncatedFilename = filename.substring(0, maxLength - 3) + '...';
            return <span>{truncatedFilename}</span>;
        }
        return <span>{filename}</span>;
    };

    return (
        <MainLayout>
            <Box sx={{ width: '920px', m: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* <Fab size="small" sx={{ background: '#4285f4', color: '#ffffff', mr: 2 }} /> */}
                        <Avatar sx={{ mr: 2 }}>{fullname[0]}</Avatar>
                        <span style={{ fontSize: '32px', fontWeight: '400', alignSelf: 'center' }}>
                            {fullname}
                        </span>
                    </div>
                    <span style={{ fontSize: '32px', fontWeight: '400', color: '#4285f4', alignSelf: 'center' }}>
                        100%
                    </span>
                </div>
                <Divider sx={{mt: 3, mb: 3}}/>

                <Accordion onClick={handleAccordionClick} sx={{ boxShadow: click ? '-moz-initial' : 'none' }}>
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{ ':hover': { background: '#e8f0fe' }, display: 'flex', alignItems: 'center' }}
                    >
                        <Typography sx={{ width: '80%', alignSelf: 'center' }}>Bài tập 1</Typography>
                        <Typography sx={{ width: '20%' }}>100/100</Typography>
                    </AccordionSummary>

                    <AccordionDetails sx={{ borderTop: '1px solid #b5bec9' }}>
                        <Typography sx={{ padding: '16px 24px' }}>
                            <Card sx={{ display: 'flex', width: '400px' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 151 }}
                                    image="https://png.pngtree.com/thumb_back/fw800/background/20210920/pngtree-school-classroom-blackboard-desk-education-course-training-class-classroom-background-image_904108.png"
                                    alt="Live from space album cover"
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" sx={{ fontSize: '16px', color: '#3C3034' }}>
                                            <FileName filename="Bài tập 1.docx" maxLength={25} />
                                        </Typography>
                                        <Typography sx={{ fontSize: '14px', color: '#5F6368' }} component="div">
                                            Word
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Card>
                        </Typography>
                    </AccordionDetails>
                    <AccordionDetails sx={{ borderTop: '1px solid #b5bec9' }}>
                        <Typography>
                            <Link to="/instruction">
                                <Button variant="text" sx={{ color: '#518cdd' }}>
                                    Xem chi tiết
                                </Button>
                            </Link>
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </MainLayout>
    );
}
