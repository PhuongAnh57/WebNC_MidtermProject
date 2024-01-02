import { memo, useState } from 'react';
import { extractFileName, extractFileNameExtension } from 'utils/filename';

import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AssignmentIcon from '@mui/icons-material/Assignment';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { GoogleDriveImage } from 'assets/images';
import { Link } from 'react-router-dom';

const FileName = ({ filename, maxLength }) => {
    // Kiểm tra độ dài của tên file
    if (filename.length > maxLength) {
        // Cắt tên file và thêm "..."
        const truncatedFilename = filename.substring(0, maxLength - 3) + '...';
        return <span>{truncatedFilename}</span>;
    }
    return <span>{filename}</span>;
};

function Assignment({ data }) {
    const [click, setClick] = useState(false);
    const [assignment, setAssignment] = useState(data);
    // const [files, setFiles] = useState([]);

    const handleAccordionClick = () => {
        setClick(!click);
    };

    const getDateUpload = () => {
        const date = new Date(assignment.date);
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
                    <AssignmentIcon sx={{ color: 'white' }} />
                </Typography>
                <Typography sx={{ width: '80%', alignSelf: 'center' }}>{assignment.title}</Typography>
                <Typography sx={{ width: '20%', color: '#0000008C', alignSelf: 'center', fontSize: '12px' }}>
                    Đã đăng vào {getDateUpload()}
                </Typography>
                <Typography sx={{ alignSelf: 'center' }}>{<MoreVertIcon />}</Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ borderTop: '1px solid #b5bec9' }}>
                <Typography sx={{ padding: '16px 24px' }}>
                    <div style={{ fontSize: '12px', color: '#5f6368' }}>Đã đăng vào {getDateUpload()}</div>
                    <div style={{ textAlign: 'right' }}>
                        <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'flex-end' }}>
                            <li
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    padding: '0px 16px',
                                    borderLeft: '1px solid #b5bec9',
                                }}
                            >
                                <span style={{ fontSize: '2rem' }}>0</span>
                                <span>Đã nộp</span>
                            </li>
                            <li
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    padding: '0px 16px',
                                    borderLeft: '1px solid #b5bec9',
                                }}
                            >
                                <span style={{ fontSize: '2rem' }}>0</span>
                                <span>Đã giao</span>
                            </li>
                            <li
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    paddingLeft: '16px',
                                    borderLeft: '1px solid #b5bec9',
                                }}
                            >
                                <span style={{ fontSize: '2rem' }}>0</span>
                                <span>Đã chấm điểm</span>
                            </li>
                        </ul>
                    </div>

                    <Card sx={{ width: '400px', height: '90px' }}>
                        <CardActionArea
                            component={Link}
                            to={assignment.file_urls[0]}
                            target="_blank"
                            sx={{ display: 'flex', justifyContent: 'flex-start', width: '400px', height: '90px' }}
                        >
                            {extractFileNameExtension(assignment.file_urls[0]) === 'Image' ? (
                                <CardMedia
                                    component="img"
                                    sx={{ width: 150 }}
                                    image={assignment.file_urls[0]}
                                    alt="Image"
                                />
                            ) : (
                                <CardMedia
                                    component="img"
                                    sx={{ width: 150 }}
                                    image={GoogleDriveImage}
                                    alt="Google Drive"
                                />
                            )}
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" sx={{ fontSize: '16px', color: '#3C3034' }}>
                                        <FileName filename={extractFileName(assignment.file_urls[0])} maxLength={25} />
                                    </Typography>
                                    <Typography sx={{ fontSize: '14px', color: '#5F6368' }} component="div">
                                        {extractFileNameExtension(assignment.file_urls[0])}
                                    </Typography>
                                </CardContent>
                            </Box>
                        </CardActionArea>
                        {/* </Link> */}
                    </Card>
                </Typography>
            </AccordionDetails>
            <AccordionDetails sx={{ borderTop: '1px solid #b5bec9' }}>
                <Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px' }}>
                        <Button variant="text" sx={{ color: '#518cdd' }}>
                            Xem hướng dẫn
                        </Button>
                        <Button variant="contained" sx={{ padding: '8px 24px' }}>
                            Đánh giá bài tập
                        </Button>
                    </div>
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}

export default memo(Assignment);
// export default Assignment;
