import React, { useState, useEffect } from 'react';
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
import Members from '../Members';
import Classwork from '../Classwork/Classwork';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

import LoadingSpinner from 'components/LoadingSpinner/LoadingSpinner';

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

export default function BasicTabs({ classID }) {
    // const { user } = React.useContext(AuthContext);

    const [value, setValue] = React.useState(0);
    const [open, setOpen] = useState(false);
    const [classDetail, setClassDetail] = useState({});
    const [loading, setLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const loadClass = async () => {
            const userID = localStorage.getItem('userID');

            try {
                await axiosPrivate.get(`/api/class/${classID}/${userID}`).then((response) => {
                    const classDetail = response.data.Class;

                    setClassDetail(classDetail);
                    setLoading(false);
                });
            } catch (error) {
                console.log(error);
            }
        };

        loadClass();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Stack direction="row">
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Bảng tin" {...a11yProps(0)} />
                                <Tab label="Bài tập" {...a11yProps(1)} />
                                <Tab label="Mọi người" {...a11yProps(2)} />
                            </Tabs>
                            <IconButton aria-label="delete" onClick={handleOpen}>
                                <SettingsIcon />
                            </IconButton>
                            <ClassInfo open={open} onClose={handleClose} />
                        </Stack>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <BulletinBoard classDetail={classDetail} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Classwork classDetail={classDetail} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Members classDetail={classDetail} />
                    </TabPanel>
                </Box>
            )}
        </>
    );
}
