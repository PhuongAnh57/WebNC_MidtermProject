import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Background from '../../../assets/images/classroom.jpg';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';

export default function MediaCard({ classDetail }) {
    const { t } = useTranslation();
    const role = classDetail.role === 'student' ? t('student') : t('teacher');
    return (
        <Link to={`/class/${classDetail.class_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card
                sx={{
                    width: 345,
                    minHeight: 290,
                    marginRight: '16px',
                    marginBottom: '16px',
                }}
            >
                <CardMedia sx={{ height: 140 }} image={Background} title="image" />
                <CardContent sx={{ padding: '16px 16px 8px' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {classDetail.class_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('role')}: {role}
                    </Typography>
                </CardContent>
                <CardActions style={{ flexDirection: 'row-reverse' }}>
                    <IconButton color="primary" aria-label="add to shopping cart">
                        <FolderIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="add to shopping cart">
                        <AssignmentIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Link>
    );
}
