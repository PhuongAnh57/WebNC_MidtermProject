import * as React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SchoolIcon from '@mui/icons-material/School';

import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

export default function BasicList() {
    const location = useLocation();

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    <NavLink to="/manage-accounts" className={cx('btn')}>
                        <ListItem
                            disablePadding
                            style={{ background: location.pathname === '/manage-accounts' || location.pathname === '/manage-accounts/:userID' ? '#e3eefc' : 'none' }}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <ManageAccountsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Quản lý tài khoản" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>

                    <NavLink to="/manage-classes" className={cx('btn')}>
                        <ListItem
                            disablePadding
                            style={{ background: location.pathname === '/manage-classes' || location.pathname === '/manage-classes/:classID' ? '#e3eefc' : 'none' }}
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <SchoolIcon />
                                </ListItemIcon>
                                <ListItemText primary="Quản lý lớp" />
                            </ListItemButton>
                        </ListItem>
                    </NavLink>
                </List>
            </nav>
        </Box>
    );
}
