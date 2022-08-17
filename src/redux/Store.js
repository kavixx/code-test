import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './EmployeeSlice';
import modalReducer from './/modalSlice';

export default configureStore({
  reducer: { employee: employeeReducer, modal: modalReducer },
});
