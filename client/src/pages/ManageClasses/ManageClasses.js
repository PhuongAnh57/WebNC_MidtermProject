
import * as React from 'react';
import { Link } from 'react-router-dom';
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

function createData(classname, part, topic, room, numberOfMembers, numberOfTeachers, numberOfStudents) {
    return { classname, part, topic, room, numberOfMembers, numberOfTeachers, numberOfStudents };
}

const rows = [
    createData('Web nâng cao', '1', 'Cuối kỳ', 'F402', 5, 2, 3),
    createData('Web nâng cao', '1', 'Cuối kỳ', 'F402', 5, 2, 3),
    createData('Web nâng cao', '1', 'Cuối kỳ', 'F402', 5, 2, 3)
];

export default function ManageClas() {
    const [keySearch, setKeySearch] = React.useState('');
    const [keySearched, setKeySearched] = React.useState('');
    const handleClickSearch = () => {
        setKeySearched(keySearch);
        setKeySearch('');
    }

    // Select input
    const [sort, setSort] = React.useState('asc');
    const handleSelectSort = (event) => {
        setSort(event.target.value);
    };

    return (
        <AdminLayout>
            <form>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    {/* Input Select */}
                    <FormControl sx={{ minWidth: 300, mr: 3 }} size="small">
                        <Select
                            value={sort}
                            onChange={handleSelectSort}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="asc">Sắp xếp tăng dần</MenuItem>
                            <MenuItem value="desc">Sắp xếp giảm dần</MenuItem>
                        </Select>
                    </FormControl>

                    <input
                        placeholder="Tìm kiếm"
                        style={{
                            marginRight: '2px',
                            width: '400px',
                            height: '28px',
                            padding: '4px 12px',
                            fontSize: '16px',
                        }}
                        value={keySearch}
                        onChange={(e) => setKeySearch(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleClickSearch}>Tìm kiếm</Button>
                </Box>
            </form>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Tên lớp</StyledTableCell>
                            <StyledTableCell align="right">Phần</StyledTableCell>
                            <StyledTableCell align="right">Chủ đề</StyledTableCell>
                            <StyledTableCell align="right">Phòng</StyledTableCell>
                            <StyledTableCell align="right">Số lượng thành viên</StyledTableCell>      
                            <StyledTableCell align="right">Số lượng giáo viên</StyledTableCell>   
                            <StyledTableCell align="right">Số lượng sinh viên</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.classname}>
                                <StyledTableCell component="th" scope="row">
                                    <Link to='/manage-classes/classID' style={{textDecoration: 'none', color: 'black'}}>
                                        {row.classname}
                                    </Link>
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.part}</StyledTableCell>
                                <StyledTableCell align="right">{row.topic}</StyledTableCell>
                                <StyledTableCell align="right">{row.room}</StyledTableCell>
                                <StyledTableCell align="right">{row.numberOfMembers}</StyledTableCell>
                                <StyledTableCell align="right">{row.numberOfTeachers}</StyledTableCell>
                                <StyledTableCell align="right">{row.numberOfStudents}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </AdminLayout>
    );
}
