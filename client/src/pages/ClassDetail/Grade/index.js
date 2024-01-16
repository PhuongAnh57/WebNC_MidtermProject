import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Input from '@mui/material/Input';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function createRow(fullname, avg, assignment1, assignment2) {
    return { fullname, avg, assignment1, assignment2 };
}

const rows = [
    createRow('Nguyễn Phương Anh', 100, 100, 100),
    createRow('Trần Thị Mỹ Trinh', 100, 100, 100),
    createRow('Bùi Khánh Duy', 100, 100, 100),
];

export default function Grade() {
    const Filter = () => {
        const [type, setType] = React.useState('SortByLastName');
        const handleChange = (event) => setType(event.target.value);

        return (
            <FormControl sx={{ minWidth: 100 }}>
                <Select value={type} onChange={handleChange} displayEmpty sx={{ outline: 'transparent' }}>
                    <MenuItem value="SortByLastName">Sắp xếp theo họ</MenuItem>
                    <MenuItem value="SortByName">Sắp xếp theo tên</MenuItem>
                </Select>
            </FormControl>
        );
    };

    const MoreIcon = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => setAnchorEl(event.currentTarget);
        const handleClose = () => setAnchorEl(null);

        return (
            <div>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    sx={{ left: '-80px' }}
                >
                    <MenuItem onClick={handleClose}>Chỉnh sửa</MenuItem>
                    <MenuItem onClick={handleClose}>Xóa</MenuItem>
                    <Divider />
                    <MenuItem>Trả lại tất cả</MenuItem>
                </Menu>
            </div>
        );
    };

    const Column = ({ title }) => {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: '16px',
                    }}
                >
                    <div>
                        <span style={{ fontSize: '14px', color: '#5F6368' }}>27/12/2023</span>
                        <div style={{ fontSize: '16px', color: 'rgba(0,0,0,.87)', fontWeight: 600 }}>{title}</div>
                    </div>
                    <MoreIcon />
                </div>
                <Divider />
                <div style={{ fontSize: '14px', color: '#5F6368' }}>Cuối kỳ</div>
                <div style={{ fontSize: '14px', color: '#5F6368' }}>Trong tổng số 100</div>
            </Box>
        );
    };

    return (
        <TableContainer component={Paper} elevation={0}>
            {/* <Table sx={{ minWidth: 700, border: '1px solid #e0e0e0','& th, & td': {border: '1px solid #e0e0e0' }}} aria-label="spanning table"> */}
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                    <TableRow sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <TableCell sx={{ width: '250px', alignSelf: 'flex-end' }}>
                            <Filter />
                        </TableCell>
                        <TableCell sx={{ width: '150px', alignSelf: 'flex-end' }}>Điểm trung bình chung</TableCell>
                        <TableCell sx={{ width: '150px' }}>
                            <Column title="Bài tập 1" />
                        </TableCell>
                        <TableCell sx={{ width: '150px' }}>
                            <Column title="Bài tập 2" />
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    <TableRow sx={{ display: 'flex', justifyContent: 'flex-start', background: '#f8f9fa' }}>
                        <TableCell sx={{ width: '250px', display: 'flex', alignItems: 'center' }}>
                            <PeopleAltIcon color="primary" sx={{ mr: 2 }} />
                            Điểm trung bình của lớp
                        </TableCell>
                        <TableCell sx={{ width: '150px' }}>100</TableCell>
                        <TableCell sx={{ width: '150px' }}>100</TableCell>
                        <TableCell sx={{ width: '150px' }}>100</TableCell>
                    </TableRow>

                    {rows.map((row, index) => (
                        <TableRow key={{ index }} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <TableCell sx={{ width: '250px', display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ width: 24, height: 24, mr: 2 }}>{row.fullname[0]}</Avatar>
                                <Link to={`${row.fullname}`} style={{ color: 'black', textDecoration: 'none' }}>
                                    {row.fullname}
                                </Link>
                            </TableCell>
                            <TableCell sx={{ width: '150px' }}>{row.avg}</TableCell>
                            <TableCell sx={{ width: '150px' }}>
                                <Input defaultValue={row.assignment1} />
                            </TableCell>
                            <TableCell sx={{ width: '150px' }}>
                                <Input defaultValue={row.assignment1} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
