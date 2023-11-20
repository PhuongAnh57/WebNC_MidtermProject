import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputDate from '../InputDate/InputDate';
import InputSelect from '../InputSelect';
import { Button } from '@mui/material';

export default function EditForm() {
    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        label="First name"
                        defaultValue="Tran"
                        variant="filled"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required id="lastName" label="Last name" defaultValue="Anh" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputDate />
                </Grid>
                <Grid item xs={12} sm={6} mt={1}>
                    <InputSelect />
                </Grid>
                <Grid item xs={12}>
                    <TextField required id="email" label="Email" defaultValue="Your email" variant="filled" fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address"
                        label="Address"
                        defaultValue="Ho Chi Minh City"
                        variant="filled"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" style={{ background: '#d32f2f' }} fullWidth>
                        Cancel
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" fullWidth>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
