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
import useAxiosPrivate from 'hooks/useAxiosPrivate';

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

export default function ManageClas() {
    const axiosPrivate = useAxiosPrivate();
    const [classes, setClasses] = React.useState([]);

    const [keyword, setKeyWord] = React.useState('');
    const handleClickSearch = async () => {
        try {
            const response = await axiosPrivate.get(`/api/get-classes/${sortType}/${keyword}`);
            if (response.status === 200) {
                // console.log(response.data.userAccountsData);
                setClasses(response.data.classesData);
            }
        } catch (err) {
            console.log(err);
            if (err.response.status === 401) {
                return <Navigate to="/login" />;
            }
        }
    };

    // Select input
    const [sortType, setSort] = React.useState('all');
    const handleSelectSortType = (event) => {
        setSort(event.target.value);
    };

    React.useEffect(() => {
        setKeyWord('');
        const getClassesBySortType = async () => {
            try {
                const response = await axiosPrivate.get(`/api/get-classes/${sortType}`);
                if (response.status === 200) {
                    setClasses(response.data.classesData);
                }
            } catch (err) {
                console.log(err);
                if (err.response.status === 401) {
                    return <Navigate to="/login" />;
                }
            }
        };
        getClassesBySortType();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortType]);

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
                            value={sortType}
                            onChange={handleSelectSortType}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="all">Tất cả các lớp</MenuItem>
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
                        value={keyword}
                        onChange={(e) => setKeyWord(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleClickSearch}>
                        Tìm kiếm
                    </Button>
                </Box>
            </form>

            <TableContainer component={Paper} sx={{ width: 900, mx: 'auto' }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Tên lớp</StyledTableCell>
                            <StyledTableCell align="right">Phần</StyledTableCell>
                            <StyledTableCell align="right">Chủ đề</StyledTableCell>
                            <StyledTableCell align="right">Phòng</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {classes.map((Class) => (
                            <StyledTableRow key={Class.class_id}>
                                <StyledTableCell component="th" scope="row">
                                    <Link
                                        to={`/manage-classes/${Class.class_id}`}
                                        style={{ textDecoration: 'none', color: 'black' }}
                                    >
                                        {Class.class_name}
                                    </Link>
                                </StyledTableCell>
                                <StyledTableCell align="right">{Class.part}</StyledTableCell>
                                <StyledTableCell align="right">{Class.topic}</StyledTableCell>
                                <StyledTableCell align="right">{Class.room}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </AdminLayout>
    );
}
