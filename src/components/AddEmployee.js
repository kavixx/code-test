import React, { useEffect, useState } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addEmployee, getEmployee } from '../redux/EmployeeSlice';
import { useRouter } from 'next/router';
import Tosat from './Toast';

function AddEmployee() {
  const dispatch = useDispatch();
  const [addRequestStatus, setAddRequestStatus] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      //get employee id
      getEmployee(router.query.index);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      {addRequestStatus && <Tosat />}
      <div className='flex flex-col justify-center w-screen h-screen'>
        <h5 className='text-green-600 text-lg z-20'>Successful!</h5>
        <div className='flex flex-col justify-center p-10 border border-gray-700 rounded-md sm:m-64 m-8'>
          <div className='title grid grid-rows-2 justify-items-center sm:p-2'>
            <h1 className='mb-2 font-bold text-2xl'>Add Employee</h1>
            <h5 className='text-slate-600 text-sm'>
              Enter details to add an employee
            </h5>
          </div>
          <form
            //submit form handle
            onSubmit={handleSubmit(data => {
              try {
                dispatch(addEmployee(data));
              } catch (error) {
                console.log(error);
              } finally {
                setAddRequestStatus(true);
                setTimeout(() => {
                  router.push('/');
                }, 1500);
              }
            })}
          >
            <div className='grid grid-rows-2 gap-4'>
              <div className='flex flex-col'>
                <TextField
                  error={errors.first_name?.message}
                  id='first_name'
                  label='First name'
                  data-testid='first_name'
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
                    pattern: {
                      value: /[^A-Za-z]/gi,
                      message: 'First name can be only alphabets',
                    },
                  })}
                />
              </div>
              <div className='flex flex-col'>
                <TextField
                  id='outlined-basic'
                  error={errors.last_name?.message}
                  label='Last name'
                  variant='outlined'
                  data-testid='last_name'
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
                    pattern: {
                      value: /[^A-Za-z]/gi,
                      message: 'First name can be only alphabets',
                    },
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
                  data-testid='email'
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
                  data-testid='number'
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
                  data-testid='gender'
                  label='Gender'
                  size='small'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  {...register('gender', {
                    required: 'Gender is required',
                  })}
                >
                  <MenuItem value={'F'}>Female</MenuItem>
                  <MenuItem value={'M'}>Male</MenuItem>
                </TextField>
              </div>
              <button
                className='bg-sky-500 py-2 mt-3 rounded-md hover:bg-sky-600 text-white'
                type='submit'
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddEmployee;
