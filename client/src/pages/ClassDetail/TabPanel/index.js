import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BulletinBoard from '../BulletinBoard';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Stack from '@mui/material/Stack';
import ClassInfo from '../ClassInfo';
import Members from '../Members'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Stack direction="row">
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Bảng tin" {...a11yProps(0)} />
                        <Tab label="Mọi người" {...a11yProps(1)} />
                    </Tabs>
                    <IconButton aria-label="delete" onClick={handleOpen}>
                        <SettingsIcon />
                    </IconButton>
                    <ClassInfo open={open} onClose={handleClose}/>
                </Stack>
            </Box>
            <TabPanel value={value} index={0}>
                <BulletinBoard />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Members />
            </TabPanel>
        </Box>
    );
}
