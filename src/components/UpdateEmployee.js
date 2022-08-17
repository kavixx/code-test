import React, { useEffect, useState } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { set, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateEmployee } from '../redux/EmployeeSlice';
import { useRouter } from 'next/router';
import axios from 'axios';
import Tosat from './Toast';

export default function UpdateEmployee() {
  const [empDetails, setEmpDetails] = useState({
    _id: '',
    first_name: '',
    last_name: '',
    gender: '',
    email: '',
    number: '',
  });

  const [addRequestStatus, setAddRequestStatus] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({});
  useEffect(() => {
    if (router.isReady) {
      getEmployee(router.query.index);
    }
  }, []);
  setValue('first_name', empDetails.first_name);
  setValue('last_name', empDetails.last_name);
  setValue('email', empDetails.email);
  setValue('number', empDetails.number);
  setValue('gender', empDetails.gender);
  const getEmployee = id => {
    axios
      .get(`http://localhost:8070/api/v1/employee/${id}`)
      .then(res => {
        setEmpDetails(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const UpdateEmp = (id, data) => {
    axios
      .put(`http://localhost:8070/api/v1/employee/update/${id}`, data)
      .then(res => {
        if ((res.message = 'Updated')) {
          setAddRequestStatus(true);
          setTimeout(() => {
            router.push('/');
          }, 1500);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      {addRequestStatus && <Tosat />}

      <div className='flex flex-col justify-center w-screen h-screen'>
        <div className='flex flex-col justify-center p-10 border border-gray-700 rounded-md sm:m-64 m-8'>
          <div className='title grid grid-rows-2 justify-items-center sm:p-2'>
            <h1 className='mb-2 font-bold text-2xl'>Edit Employee</h1>
            <h5 className='text-slate-600 text-sm'>
              Enter details to update an employee
            </h5>
          </div>
          <form
            onSubmit={handleSubmit(data => {
              try {
                UpdateEmp(empDetails._id, data);
                //dispatch(updateEmployee({ _id: empDetails._id, data }));
              } catch (error) {
                console.log(error);
              }
            })}
          >
            <div className='grid grid-rows-2 gap-4'>
              <div className='flex flex-col'>
                <TextField
                  error={errors.first_name?.message}
                  id='first_name'
                  ref={register}
                  label='First name'
                  variant='outlined'
                  required
                  size='small'
                  className={
                    register.first_name == null && 'border border-red-600'
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  helperText={errors.first_name?.message}
                  {...register('first_name', {
                    required: 'First name is required',
                    minLength: { value: 6, message: 'Minimum length is 6' },
                    maxLength: { value: 10, message: 'Maximum length is 10' },
                  })}
                />
              </div>
              <div className='flex flex-col'>
                <TextField
                  id='outlined-basic'
                  error={errors.last_name?.message}
                  label='Last name'
                  variant='outlined'
                  required
                  size='small'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  helperText={errors.last_name?.message}
                  {...register('last_name', {
                    required: 'First name is required',
                    minLength: { value: 6, message: 'Minimun length is 6' },
                    maxLength: { value: 10, message: 'Maximum length is 10' },
                  })}
                />
              </div>
              <div className='flex flex-col'>
                <TextField
                  id='outlined-basic'
                  error={errors.email?.message}
                  helperText={errors.email?.message}
                  label='Email'
                  variant='outlined'
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  size='small'
                  {...register('email', {
                    required: 'First name is required',
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: 'Email is invalid',
                    },
                  })}
                />
              </div>
              <div className='flex flex-col'>
                <TextField
                  id='outlined-basic'
                  error={errors.number?.message}
                  helperText={errors.number?.message}
                  label='Mobile number'
                  variant='outlined'
                  required
                  size='small'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...register('number', {
                    required: 'Mobile number is required',
                    pattern: {
                      value: /^\+?[1-9][0-9]{7,12}$/,
                      message: 'Mobile number is invalid',
                    },
                  })}
                />
              </div>
              <div className='flex flex-col'>
                <TextField
                  id='outlined'
                  error={errors.gender?.message}
                  helperText={errors.gender?.message}
                  select
                  label='Gender'
                  size='small'
                  value={empDetails.gender}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  {...register('gender', {
                    required: 'Gender is required',
                  })}
                >
                  <MenuItem value='F'>Female</MenuItem>
                  <MenuItem value='M'>Male</MenuItem>
                </TextField>
              </div>
              <button
                className='bg-sky-500 py-2 mt-3 rounded-md hover:bg-sky-600 text-white'
                type='submit'
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
