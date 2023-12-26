import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function InputSelect({ gender, changeGender }) {
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender}
                    label="Giới tính"
                    name="gender"
                    onChange={changeGender}
                >
                    <MenuItem value={'male'}>Nam</MenuItem>
                    <MenuItem value={'female'}>Nữ</MenuItem>
                    <MenuItem value={'other'}>Khác</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
