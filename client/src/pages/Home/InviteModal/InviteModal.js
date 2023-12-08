import { useState } from 'react';
import classNames from 'classnames/bind';
import { Modal, Box, FormControl, Chip } from '@mui/material';
// import { makeStyles } from '@mui/material/styles';
import Button from '@mui/material/Button';

import styles from './InviteModal.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

function InviteModal({ open, handleClose }) {
    const [values, setValues] = useState([]);
    // const [inviteStates, setInviteStates] = useState([]);
    const [currentValue, setCurrentValue] = useState('');

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

    const handleInvite = (e) => {
        e.preventDefault();
        const data = {
            classID: '0',
            emails: [...values],
        };

        try {
            const response = axios.post('/api/class/invite-students', { data });

            if (response.status === 200) {
                console.log('Invited');
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
                        Invite Students
                    </h3>
                    <div style={{ margin: 0, padding: '8px 0' }}>
                        <h6 style={{ margin: 0, fontSize: '16px' }}>Invite Link</h6>
                        <div className={cx('modal-content')}>
                            <p id="child-modal-description">
                                https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox/FMfcgzGwHxzNGVTjKLBjnVqhnJGCRXWQ
                            </p>
                            <Button>Copy</Button>
                        </div>
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
