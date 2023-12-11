import * as React from 'react';
import Card from '@mui/material/Card';
import { useState } from 'react';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Background from '../../../assets/images/classroom.jpg';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';

export default function MediaCard({ Class }) {
    return (
        <Link to={`/class/${Class.class_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card sx={{ width: 345 }} style={{ marginRight: '16px', marginBottom: '16px' }}>
                <CardMedia sx={{ height: 140 }} image={Background} title="image" />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {Class.class_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {Class.part}
                    </Typography>
                </CardContent>
                <CardActions style={{ float: 'right' }}>
                    <IconButton color="primary" aria-label="add to shopping cart">
                        <AssignmentIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="add to shopping cart">
                        <FolderIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Link>
    );
}
