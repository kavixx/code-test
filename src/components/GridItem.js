import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ModalContext from '../contextApi/modalContext';
import { useContext } from 'react';
import Link from 'next/link';

export default function GridItem(props) {
  const { openModal } = useContext(ModalContext);
  return (
    <div className='max-w-sm overflow-hidden rounded-xl bg-white shadow-md duration-200 hover:scale-105 hover:shadow-xl'>
      <div className='p-3'>
        <Avatar />
        <ul key={props.id}>
          <h5>{`${props.first_name} ${props.last_name}`}</h5>
          <h5>{props.gender}</h5>
          <h5>{props.email}</h5>
          <h5>{props.number}</h5>
        </ul>
        <Stack
          direction='row'
          justifyContent='flex-end'
          alignItems='center'
          spacing={0}
        >
          <IconButton>
            <Link href={`employee/update/${props.id}`}>
              <a>
                <EditIcon />
              </a>
            </Link>
          </IconButton>
          <IconButton onClick={() => openModal(props.id)}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </div>
    </div>
  );
}
