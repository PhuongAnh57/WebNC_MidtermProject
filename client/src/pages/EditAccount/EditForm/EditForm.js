import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputDate from '../InputDate/InputDate';
import InputSelect from '../InputSelect';
import { Button } from '@mui/material';
import useAxiosPrivate from 'hooks/useAxiosPrivate';

export default function EditForm() {
    const { t } = useTranslation();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: dayjs(new Date()),
        gender: '',
        email: '',
        address: '',
    });

    const axiosPrivate = useAxiosPrivate();
    const [userExists, setUserExists] = useState(true);
    const [editResponse, setEditResponse] = useState('');

    const handleChangeUser = (e) => {
        setUser((pre) => ({
            ...pre,
            [e.target.name]: e.target.value,
        }));
    };

    const handleChangeDateOfBirth = (date) => {
        setUser((prev) => ({
            ...prev,
            dateOfBirth: date,
        }));
    };

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await axiosPrivate.get('/api/get-profile');

                if (response.data.message === 'User not found') {
                    setUserExists(false);
                }

                if (response.data.message === 'User found') {
                    const userData = response.data.userData;

                    setUser({
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        dateOfBirth: userData.dateOfBirth ? dayjs(new Date(userData.dateOfBirth)) : dayjs(new Date()),
                        gender: userData.gender,
                        email: userData.email,
                        address: userData.address,
                    });

                    setUserExists(true);
                }
            } catch (err) {
                console.log(err);
                localStorage.clear();
                return <Navigate to="/landing" />;
            }
        };

        getProfile();
    }, []);

    if (!localStorage.getItem('accessToken')) {
        return <Navigate to="/" />;
    }

    if (!userExists) {
        return <Navigate to="*" />;
    }

    const handleSubmitProfileEdition = async () => {
        const userData = {
            ...user,
            dateOfBirth: new Date(user.dateOfBirth),
        };

        try {
            const response = await axiosPrivate.post('/api/edit-profile', { userData });

            if (response.data.message === 'Update successfully') {
                setEditResponse(`${t('update successfully')}`);
            } else {
                setEditResponse(`${t('update failed')}`);
            }
        } catch (err) {
            console.log(err);
        }
    };

    //
    const handleCancelEdit = (e) => {
        return <Navigate to="/" />;
    };

    return (
        <>
            {editResponse !== '' ? (
                <span style={{ color: '#1976D2', textAlign: 'center' }}>{editResponse}</span>
            ) : (
                <></>
            )}
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            name="lastName"
                            id="lastName"
                            label={t('last name')}
                            variant="filled"
                            fullWidth
                            value={user.lastName}
                            onChange={handleChangeUser}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            name="firstName"
                            id="firstName"
                            label={t('first name')}
                            variant="filled"
                            fullWidth
                            value={user.firstName}
                            onChange={handleChangeUser}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputDate dateOfBirth={user.dateOfBirth} changeDate={handleChangeDateOfBirth} />
                    </Grid>
                    <Grid item xs={12} sm={6} mt={1}>
                        <InputSelect gender={user.gender} changeGender={handleChangeUser} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            name="email"
                            id="email"
                            label="Email"
                            variant="filled"
                            fullWidth
                            value={user.email}
                            onChange={handleChangeUser}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            name="address"
                            id="address"
                            label={t('address')}
                            variant="filled"
                            fullWidth
                            value={user.address}
                            onChange={handleChangeUser}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button
                            variant="contained"
                            style={{ background: '#d32f2f' }}
                            fullWidth
                            onClick={(event) => handleCancelEdit(event)}
                        >
                            Hủy
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button variant="contained" fullWidth onClick={handleSubmitProfileEdition}>
                            Lưu
                        </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        </>
    );
}
