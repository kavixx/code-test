import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteEmployee } from '../redux/EmployeeSlice';
import ModalContext from '../contextApi/modalContext';
import { useContext } from 'react';

export default function DeleteEmployee(props) {
  const { id, isOpen, closeModal } = useContext(ModalContext);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  const dispatch = useDispatch();
  const deleteEmp = () => {
    dispatch(deleteEmployee({ id }));
  };
  return (
    <Modal
      open={isOpen}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Confirm delete
        </Typography>

        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          Are you sure delete this employee?
        </Typography>
        <Stack spacing={2} direction='row' className='float-right mt-4'>
          <Button variant='outlined' onClick={() => closeModal()}>
            Cancel
          </Button>
          <Button
            variant='contained'
            color='error'
            className='bg-red-600'
            onClick={() => {
              deleteEmp(), closeModal();
            }}
          >
            Delete
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
