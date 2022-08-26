import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees, selectAllEmployees } from '../redux/EmployeeSlice';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Link from 'next/link';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteEmployee from './DeleteEmployee';
import ModalContext from '../contextApi/modalContext';
import { useContext } from 'react';
export default function EmployeeList() {
  const [empId, setEmpId] = useState(0);
  const [showModal, setshowModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const { openModal } = useContext(ModalContext);

  const employees = useSelector(state => state.employee);
  const handleClick = (param, cellValues, event) => {
    setEmpId(cellValues.row._id);
  };
  const handleDelete = (param, cellValues, event) => {
    //setshowModal(true);
    setEmpId(cellValues.row._id);
  };
  const handleRowClick = (param, event) => {
    event.stopPropagation();
  };
  const handleCellClick = (param, event) => {
    event.stopPropagation();
  };

  const columns = [
    {
      field: 'first_name',
      headerName: 'First name',
      width: 220,
      hideable: false,
    },
    {
      field: 'last_name',
      headerName: 'Last name',
      width: 220,
      hideable: false,
    },
    { field: 'email', headerName: 'Email', width: 220, hideable: false },
    {
      field: 'number',
      headerName: 'Mobile number',
      width: 200,
      hideable: false,
    },
    { field: 'gender', headerName: 'Gender', width: 100, hideable: false },
    {
      field: 'Edit',
      width: '120',
      hideable: false,
      renderCell: cellValues => {
        return (
          <IconButton
            onClick={event => {
              handleClick(event, cellValues);
            }}
          >
            <Link href={`employee/update/${cellValues.row._id}`}>
              <a>
                <EditIcon />
              </a>
            </Link>
          </IconButton>
        );
      },
    },
    {
      field: 'Delete',
      width: '120',
      hideable: false,
      renderCell: cellValues => {
        return (
          <IconButton
            onClick={event => {
              handleDelete(event, cellValues);
            }}
          >
            <DeleteIcon onClick={() => openModal(cellValues.row._id)} />
          </IconButton>
        );
      },
    },
  ];

  return (
    <div className='px-20 mt-5'>
      <DeleteEmployee />
      <Box sx={{ width: '100%' }}>
        <DataGrid
          autoHeight
          rows={employees}
          columns={columns}
          pageSize={5}
          getRowId={row => row._id}
          rowsPerPageOptions={[5]}
          onCellClick={handleCellClick}
          onRowClick={handleRowClick}
        />
      </Box>
    </div>
  );
}
