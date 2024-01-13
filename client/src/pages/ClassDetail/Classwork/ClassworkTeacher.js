import * as React from 'react';

import Assignment from './Assignment/Assignment';

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
import CreateAssignment from './Assignment/CreateAssignment';
import CreateMaterial from './Material/CreateMaterial';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import Material from './Material/Material';

export default function ClassworkTeacher({ classDetail }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [classworks, setClassworks] = React.useState([]);

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

    const [openMaterial, setOpenMaterial] = React.useState(false);
    const handleOpenMaterial = () => setOpenMaterial(true);
    const handleCloseMaterial = () => setOpenMaterial(false);

    const axiosPrivate = useAxiosPrivate();

    React.useEffect(() => {
        const loadMaterials = async () => {
            try {
                const response = await axiosPrivate.get(`/api/class/${classDetail.class_id}/resource/all`);

                if (response.status === 200) {
                    const resources = response.data.resources;
                    setClassworks([...resources]);
                }
            } catch (err) {
                console.log('Error loading classworks', err);
            }
        };

        loadMaterials();
    }, []);

    const handleUpdateClassworks = (newClasswork) => {
        // console.log(newClasswork);
        setClassworks((prev) => [newClasswork, ...prev]);
    };

    return (
        <div style={{ width: '920px' }}>
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
                classDetail={classDetail}
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
                <MenuItem onClick={handleOpenMaterial}>
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

            {openAssignment && (
                <CreateAssignment
                    classDetail={classDetail}
                    onUpdateClassworks={handleUpdateClassworks}
                    onCloseAssignment={handleCloseAssignment}
                />
            )}

            {openMaterial && (
                <CreateMaterial
                    classDetail={classDetail}
                    onUpdateClassworks={handleUpdateClassworks}
                    onCloseMaterial={handleCloseMaterial}
                />
            )}

            {/* Input Select */}
            <FormControl sx={{ mt: 7, ml: -10, mb: 2, minWidth: 300 }}>
                <Select
                    value={topic}
                    onChange={handleSelectTopic}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="">Tất cả chủ đề</MenuItem>
                    <MenuItem value="mid">Giữa kỳ</MenuItem>
                    <MenuItem value="seminar">Seminar</MenuItem>
                    <MenuItem value="final">Cuối kỳ</MenuItem>
                </Select>
            </FormControl>

            {/* classworks list */}
            {classworks.map((classwork, index) => {
                if (classwork.type === 'assignment') {
                    return <Assignment classDetail={classDetail} data={classwork} key={index} />;
                }

                return <Material classDetail={classDetail} data={classwork} key={index} />;
            })}
        </div>
    );
}
