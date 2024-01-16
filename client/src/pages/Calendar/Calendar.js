import MainLayout from 'layouts/MainLayout';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

import AddIcon from '@mui/icons-material/Add';

export default function Calendar() {
    return (
        <MainLayout>
            <Box sx={{ width: '920px', display: 'flex', justifyContent: 'center' }}>
                <div>
                    <Fab color="primary" aria-label="add">
                        {/* <AddIcon /> */}
                    </Fab>
                </div>
            </Box>
        </MainLayout>
    );
}
