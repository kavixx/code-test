import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees } from '../redux/EmployeeSlice';
import GridItem from './GridItem';

export default function EmployeeGrid() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);
  const employees = useSelector(state => state.employee);
  return (
    <div
      className={`grid grid-cols-3 gap-4 p-10 ${
        employees.length ? 'sm:grid-cols-3' : 'sm:grid-cols-1'
      }`}
    >
      {employees.length ? (
        employees.map(emp => {
          return (
            <GridItem
              key={emp._id}
              id={emp._id}
              first_name={emp.first_name}
              last_name={emp.last_name}
              gender={emp.gender == 'M' ? 'Male' : 'Female'}
              email={emp.email}
              number={emp.number}
            />
          );
        })
      ) : (
        <label className='text-center font-mono'>No Data!</label>
      )}
    </div>
  );
}
