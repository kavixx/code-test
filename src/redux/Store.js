import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './EmployeeSlice';

export default configureStore({
  reducer: { employee: employeeReducer },
});
