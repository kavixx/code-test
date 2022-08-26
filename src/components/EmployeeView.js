import EmployeeGrid from './EmployeeGrid';
import EmployeeList from './EmployeeList';
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import ViewListIcon from '@mui/icons-material/ViewList';
import Link from 'next/link';
import DeleteEmployee from './DeleteEmployee';
import { useSelector } from 'react-redux';

export default function EmployeeView() {
  const [listView, setListView] = useState(true);
  const changeViewStyle = () => {
    setListView(!listView);
  };
  return (
    <>
      {<DeleteEmployee />}
      <div className='mr-16 px-8'>
        <Stack
          direction='row'
          justifyContent='flex-end'
          alignItems='center'
          spacing={0}
        >
          <button
            className='bg-sky-500 py-1 px-6 mx-1 rounded-md hover:bg-sky-600 text-white'
            type='submit'
          >
            <Link href={'/employee/add'}>
              <a>Add</a>
            </Link>
          </button>
          <IconButton onClick={changeViewStyle}>
            <ViewComfyIcon className={!listView && 'text-black'} />
          </IconButton>
          <IconButton onClick={changeViewStyle}>
            <ViewListIcon className={listView && 'text-black'} />
          </IconButton>
        </Stack>
      </div>
      <div>{listView ? <EmployeeList /> : <EmployeeGrid />}</div>
    </>
  );
}
