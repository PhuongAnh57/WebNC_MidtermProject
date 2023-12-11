import { useState } from 'react';
import { Navigate } from 'react-router';
import classNames from 'classnames/bind';
import axios from 'axios';

import { Modal, Box, FormControl, Chip } from '@mui/material';
import Button from '@mui/material/Button';
import styles from './InviteModal.module.scss';

const cx = classNames.bind(styles);

function InviteModal({ open, handleClose }) {
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
        console.log(item);
        setValues(tempValues);
        // setInviteStates(tempStates);
    };

    const handleInvite = async (e) => {
        e.preventDefault();
        const data = {
            classID: '0',
            emails: [...values],
            role: '2',
        };

        try {
            const response = await axios.post(
                '/api/class/invite-members',
                { data },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                },
            );

            if (response.status === 200) {
                console.log('Invited');
                setValues([]);
            } else {
                console.log('Something went wrong!');
            }
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
                        Invite Teachers
                    </h3>
                    <div style={{ margin: 0, padding: '8px 0' }}>
                        <FormControl className={cx('form-control')}>
                            <div className={cx('container')}>
                                {values.map((item, index) => (
                                    <Chip size="small" onDelete={() => handleDelete(item, index)} label={item} />
                                ))}
                            </div>
                            <input
                                placeholder="Type an email"
                                variant="standard"
                                value={currentValue}
                                onChange={handleChange}
                                onKeyDown={handleKeyUp}
                            />
                        </FormControl>
                    </div>
                    <div className={cx('modal-button')}>
                        <Button className={cx('cancel-btn')} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleInvite}>
                            Invite
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}

export default InviteModal;
