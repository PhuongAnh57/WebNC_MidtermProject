import MainLayout from 'layouts/MainLayout';
import React from 'react';
import TabPanel from './TabPanel';
import { Navigate, useParams } from 'react-router';

export default function ClassDetail() {
    const { classID } = useParams();

    if (!localStorage.getItem('accessToken')) {
        return <Navigate to="/" />;
    }

    return (
        <MainLayout>
            <TabPanel classID={classID} />
        </MainLayout>
    );
}
