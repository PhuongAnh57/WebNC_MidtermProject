import * as React from 'react';
import { useTranslation } from 'react-i18next';

import Assignment from './Assignment/Assignment';

import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import Material from './Material/Material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Grid from '@mui/material/Grid';
import { Navigate } from 'react-router';

export default function ClassworkTeacher({ classDetail }) {
    const { t } = useTranslation();
    const [classworks, setClassworks] = React.useState([]);
    const axiosPrivate = useAxiosPrivate();

    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };

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
                localStorage.clear();
                <Navigate to="/landing" />;
            }
        };

        loadMaterials();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button variant="text" startIcon={<AssignmentIndIcon />}>
                    {t('all classworks')}
                </Button>
            </Grid>
            <Grid item xs={12}>
                <FormControl sx={{ minWidth: 400 }} size="small">
                    <Select
                        value={age}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="">
                            <em>{t('all subjects')}</em>
                        </MenuItem>
                        <MenuItem value={10}>{t('assignments')}</MenuItem>
                        <MenuItem value={20}>{t('projects')}</MenuItem>
                        <MenuItem value={30}>{t('seminars')}</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                {/* classworks list */}
                {classworks.map((classwork, index) => {
                    if (classwork.type === 'assignment') {
                        return <Assignment classDetail={classDetail} data={classwork} key={index} />;
                    }

                    return <Material classDetail={classDetail} data={classwork} key={index} />;
                })}
            </Grid>
        </Grid>
    );
}
