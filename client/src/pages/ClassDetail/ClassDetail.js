import MainLayout from 'layouts/MainLayout';
import React from 'react';
import TabPanel from './TabPanel';
import { useParams } from 'react-router';

export default function ClassDetail() {
    const { classID } = useParams();

    return (
        <MainLayout>
            <TabPanel classID={classID} />
        </MainLayout>
    );
}
