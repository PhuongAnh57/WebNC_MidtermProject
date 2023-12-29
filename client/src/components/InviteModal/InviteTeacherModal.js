import { memo, useState } from 'react';
import { Navigate } from 'react-router';
import classNames from 'classnames/bind';

import { Modal, Box, FormControl, Chip } from '@mui/material';
import Button from '@mui/material/Button';
import styles from './InviteModal.module.scss';
import { axiosPrivate } from 'api/axios';

const cx = classNames.bind(styles);

function InviteTeacherModal({ classID, open, handleClose }) {
    const [values, setValues] = useState([]);
    const [currentValue, setCurrentValue] = useState('');

    if (!localStorage.getItem('accessToken')) {
        return <Navigate to="/" />;
    }

    const handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            setValues((prevState) => [...prevState, e.target.value]);
            // setInviteStates((prevState) => [...prevState, 'invited']);
            setCurrentValue('');
        }
    };

    const handleChange = (e) => {
        setCurrentValue(e.target.value);
    };

    const handleDelete = (item, index) => {
        let tempValues = [...values];
        // let tempStates = [...inviteStates];
        tempValues.splice(index, 1);
        // tempStates.splice(index, 1);

        setValues(tempValues);
        // setInviteStates(tempStates);
    };

    const handleInvite = async (e) => {
        e.preventDefault();
        const data = {
            classID: classID,
            emails: [...values],
            role: 'teacher',
        };

        try {
            const response = await axiosPrivate.post('/api/class/invite-members', { data });

            const usersExist = response.data.usersExist;

            if (response.status === 200 && usersExist?.length) {
                usersExist.forEach((email) => {
                    alert(`${email} đã được mời hoặc đã tham gia lớp học!`);
                });
            }
            setValues([]);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box className={cx('modal-box')}>
                    <h3 id="child-modal-title" style={{ fontSize: '18px', margin: '16px 0' }}>
                        Mời giáo viên?
                    </h3>
                    <div style={{ margin: 0, padding: '8px 0' }}>
                        <FormControl className={cx('form-control')}>
                            <div className={cx('container')}>
                                {values.map((item, index) => (
                                    <Chip size="small" onDelete={() => handleDelete(item, index)} label={item} />
                                ))}
                            </div>
                            <input
                                placeholder="Nhập email"
                                variant="standard"
                                value={currentValue}
                                onChange={handleChange}
                                onKeyDown={handleKeyUp}
                            />
                        </FormControl>
                    </div>
                    <div className={cx('modal-button')}>
                        <Button className={cx('cancel-btn')} onClick={handleClose}>
                            Thoát
                        </Button>
                        <Button type="submit" onClick={handleInvite}>
                            Mời
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default memo(InviteTeacherModal);
