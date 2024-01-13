import * as React from 'react';
import { Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import useAxiosPrivate from 'hooks/useAxiosPrivate';

export default function DeleteUserAccount( {open, handleClose, userID }) {
  const axiosPrivate = useAxiosPrivate();
  const handleDeleteUserAccount = async () => {
    try {
        const response = await axiosPrivate.post(`/api/delete-account/${userID}`);   
        if (response.status === 200) {
            console.log('Đã xóa tài khoản thành công')
        }
    } catch (err) {
        console.log(err);
        if (err.response.status === 401) {
            return <Navigate to="/login" />;
        }
    }
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Bạn muốn xóa tài khoản?"}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleDeleteUserAccount} autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
