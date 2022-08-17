import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  employees: [],
  status: 'idle',
  error: null,
};

export const getEmployees = createAsyncThunk(
  'employees/getEmployees',
  async () => {
    const response = await axios.get(
      'http://localhost:8070/api/v1/employee/list'
    );
    return response.data;
  }
);

export const addEmployee = createAsyncThunk(
  'employees/addEmployee',
  async initialEmployee => {
    const response = await axios.post(
      'http://localhost:8070/api/v1/employee/add'
    );
    return response.data;
  }
);

export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',
  async initialEmployee => {
    const { id } = initialEmployee;
    const response = await axios.put(
      `http://localhost:8070/api/v1/employee/${id}`,
      initialEmployee
    );
    return response.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async initialEmployee => {
    const response = await axios.delete(
      `http://localhost:8070/api/v1/employee/${id}`
    );
    if (response?.status === 200) return initialEmployee;
    return `${response?.status}: ${response?.statusText}`;
  }
);

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getEmployees.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      state.status = 'Succeeded';
      state.employees.push(action.payload.data);
    });
    builder.addCase(addEmployee.fulfilled, (state, action) => {
      state.employees.push(action.payload);
    });
    builder.addCase(updateEmployee.fulfilled, (state, action) => {
      if (!action.payload?.id) {
        console.log('Update could not complete');
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      const employees = state.employees.filter(employee => employee.id !== id);
      state.employees = [...employees, action.payload];
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      if (!action.payload?.id) {
        console.log('Delete could not complete');
        console.log(action.payload);
        return;
      }
      const { id } = action.payload;
      const employess = state.employees.filter(employee => employee.id !== id);
      state.employees = employess;
    });
  },
});

export const selectAllEmployee = state => state.employees.employees;
export const getEmployeeStatus = state => state.employees.status;
export const getEmployeeError = state => state.employees.error;

export const selectEmployeeById = (state, empId) => {
  state.employees.employees.find(employee => employee._id == empId);
};

export default employeesSlice.reducer;
