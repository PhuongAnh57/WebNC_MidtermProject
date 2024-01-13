import * as React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import AdminLayout from 'layouts/AdminLayout';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import useAxiosPrivate from 'hooks/useAxiosPrivate';
import DeleteUserAccount from './DeleteUserAccount';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function ManageUserAccounts() {
    const axiosPrivate = useAxiosPrivate();
    const [userAccounts, setUserAccounts] = React.useState([]);

    const [keyword, setKeyWord] = React.useState('');
    const handleClickSearch = async () => {
        try {
            const response = await axiosPrivate.get(`/api/get-accounts/${role}/${keyword}/${type}`);
            if (response.status === 200) {
                console.log(response.data.userAccountsData);
                setUserAccounts(response.data.userAccountsData);
            }
        } catch (err) {
            console.log(err);
            if (err.response.status === 401) {
                return <Navigate to="/login" />;
            }
        }
    };

    // Select input
    const [role, setRole] = React.useState('all');
    const handleSelectRole = (event) => {
        setRole(event.target.value);
    };
    // Select input
    const [type, setType] = React.useState('fullname');
    const handleSelectType = (event) => {
        setType(event.target.value);
    };

    React.useEffect(() => {
        const getAccountsByRole = async () => {
            try {
                const response = await axiosPrivate.get(`/api/get-accounts/${role}`);

                if (response.status === 200) {
                    setUserAccounts(response.data.userAccountsData);
                }
            } catch (err) {
                console.log(err);
                if (err.response.status === 401) {
                    return <Navigate to="/login" />;
                }
            }
        };
        getAccountsByRole();
    }, [role]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    if (!localStorage.getItem('accessToken')) {
        // redirect to landing page
        return <Navigate to="/landing" />;
    }

    return (
        <AdminLayout>
            <form>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    {/* Input Select */}
                    <FormControl sx={{ minWidth: 300, mr: 3 }} size="small">
                        <Select
                            value={role}
                            onChange={handleSelectRole}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="all">Tất cả tài khoản</MenuItem>
                            <MenuItem value="student">Học sinh</MenuItem>
                            <MenuItem value="teacher">Giáo viên</MenuItem>
                        </Select>
                    </FormControl>

                    <input
                        placeholder="Tìm kiếm"
                        style={{
                            marginRight: '4px',
                            width: '400px',
                            height: '28px',
                            padding: '4px 12px',
                            fontSize: '16px',
                        }}
                        value={keyword}
                        onChange={(e) => setKeyWord(e.target.value)}
                    />
                    <FormControl sx={{ minWidth: 100, mr: 1 }} size="small">
                        <Select
                            value={type}
                            onChange={handleSelectType}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="fullname">Họ tên</MenuItem>
                            <MenuItem value="username">Username</MenuItem>
                            <MenuItem value="email">Email</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" onClick={handleClickSearch}>
                        Tìm kiếm
                    </Button>
                </Box>
            </form>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Họ tên</StyledTableCell>
                            <StyledTableCell align="right">Username</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="right">Giới tính</StyledTableCell>
                            <StyledTableCell align="right">Ngày sinh</StyledTableCell>
                            <StyledTableCell align="right">Địa chỉ</StyledTableCell>
                            <StyledTableCell align="right">Xóa tài khoản</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userAccounts.map((user) => (
                            <StyledTableRow key={user.id}>
                                <StyledTableCell component="th" scope="row">
                                    <Link
                                        to={`/manage-accounts/${user.user_id}`}
                                        style={{ textDecoration: 'none', color: 'black' }}
                                    >
                                        {`${user.last_name} ${user.first_name}`}
                                    </Link>
                                </StyledTableCell>
                                <StyledTableCell align="right">{user.username}</StyledTableCell>
                                <StyledTableCell align="right">{user.email}</StyledTableCell>
                                <StyledTableCell align="right">{user.gender}</StyledTableCell>
                                <StyledTableCell align="right">{user.date_of_birth}</StyledTableCell>
                                <StyledTableCell align="right">{user.address}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <IconButton onClick={handleOpen}>
                                        <DeleteIcon />
                                    </IconButton>
                                </StyledTableCell>
                                <DeleteUserAccount open={open} handleClose={handleClose} userID={user.user_id} />
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </AdminLayout>
    );
}
