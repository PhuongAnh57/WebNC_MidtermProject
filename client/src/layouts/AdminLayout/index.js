import Footer from 'components/Footer';
import Header from 'components/Header';
import SideBar from 'layouts/AdminLayout/SideBar';
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';

import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Main from './Main';

const cx = classNames.bind(styles);

export default function AdminLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />

            <div className={cx('content')}>
                <Container maxWidth="xl" style={{ padding: 0 }}>
                    <Grid container spacing={3}>
                        {/* Sidebar */}
                        <Grid item xs={3} style={{ paddingLeft: 0, paddingTop: '8px' }}>
                            <Paper elevation={0} className={cx('sidebar')}>
                                <SideBar />
                            </Paper>
                        </Grid>

                        {/* Main Content */}
                        <Grid item xs={9} style={{ paddingRight: 0, paddingTop: '8px' }}>
                            <Paper elevation={0} className={cx('main')}>
                                <Main children={children} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );
}
