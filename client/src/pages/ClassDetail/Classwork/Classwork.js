import * as React from 'react';
import Material from './Material';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BookIcon from '@mui/icons-material/Book';
import ListIcon from '@mui/icons-material/List';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import CreateAssignment from './CreateAssignment';
import CreateDocument from './CreateDocument';

export default function Classwork({ classDetail }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleOpenCreateAssignment = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Select input
    const [topic, setTopic] = React.useState('');
    const handleSelectTopic = (event) => {
        setTopic(event.target.value);
    };

    const [openAssignment, setOpenAssignment] = React.useState(false);
    const handleOpenAssignment = () => setOpenAssignment(true);
    const handleCloseAssignment = () => setOpenAssignment(false);

    const [openDocument, setOpenDocument] = React.useState(false);
    const handleOpenDocument = () => setOpenDocument(true);
    const handleCloseDocument = () => setOpenDocument(false);

    return (
        <div style={{width: '920px'}}>
            <Button
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpenCreateAssignment}
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ padding: '8px 12px', borderRadius: '20px' }}
            >
                Tạo
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                sx={{ marginTop: '8px' }}
            >
                <MenuItem onClick={handleOpenAssignment}>
                    <ListItemIcon sx={{ marginRight: '8px' }}>
                        <AssignmentIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText>Bài tập</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleOpenDocument}>
                    <ListItemIcon sx={{ marginRight: '8px' }}>
                        <BookIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText>Tài liệu</ListItemText>
                </MenuItem>

                <Divider />

                <MenuItem>
                    <ListItemIcon sx={{ marginRight: '8px' }}>
                        <ListIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText>Chủ đề</ListItemText>
                </MenuItem>
            </Menu>

            {<CreateAssignment open={openAssignment} onCloseAssignment={handleCloseAssignment}/>}
            {<CreateDocument open={openDocument} onCloseDocument={handleCloseDocument}/>}

            {/* Input Select */}
            <FormControl sx={{ mt: 7, ml: -10, mb: 2, minWidth: 300 }}>
                <Select value={topic} onChange={handleSelectTopic} displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                    <MenuItem value="">Tất cả chủ đề</MenuItem>
                    <MenuItem value="mid">Giữa kỳ</MenuItem>
                    <MenuItem value="seminar">Seminar</MenuItem>
                    <MenuItem value="final">Cuối kỳ</MenuItem>
                </Select>
            </FormControl>

            {<Material />}
            {<Material />}
            {<Material />}

            {/* Chủ đề */}
            <Paper 
                elevation='0'
                sx={{ width: '100%', marginTop: '32px' }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px' }}>
                    <span style={{ fontSize: '1.6rem', color: '#1976d2' }}>Cuối kỳ</span>
                    <span style={{ alignSelf: 'center' }}>{<MoreVertIcon sx={{color: '#4285f4'}} />}</span>
                </div>

                {<Material />}
                {<Material />}
            </Paper>
        </div>
    );
}
