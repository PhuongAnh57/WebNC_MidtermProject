import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { t } from 'i18next';

export default function InputSelect({ gender, changeGender }) {
    const { t } = useTranslation();
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender}
                    label={t('gender')}
                    name="gender"
                    onChange={changeGender}
                >
                    <MenuItem value={'male'}>{t('male')}</MenuItem>
                    <MenuItem value={'female'}>{t('female')}</MenuItem>
                    <MenuItem value={'other'}>{t('other')}</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
