import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: [],
  status: '',
};

export const getEmployees = createAsyncThunk(
  'employee/getEmployees',
  async () => {
    const resp = await fetch('http://localhost:8070/api/v1/employee/list');
    if (resp.ok) {
      const employees = await resp.json();
      return { employees };
    }
  }
);
export const getEmployee = createAsyncThunk(
  'employee/getEmployee',
  async payload => {
    const resp = await fetch(
      `http://localhost:8070/api/v1/employee/${payload.id}`
    );
    if (resp.ok) {
      const employee = await resp.json();
      return { employee };
    }
  }
);
export const addEmployee = createAsyncThunk(
  'employee/addEmployee',
  async payload => {
    const resp = await fetch('http://localhost:8070/api/v1/employee/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...payload }),
    });
    if (resp.ok) {
      const emp = await resp.json();
      return { emp };
    }
  }
);
export const updateEmployee = createAsyncThunk(
  'employee/updateEmployee',
  async ({ _id, data }) => {
    const resp = await fetch(`http://localhost:8070/api/v1/employee/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    });
    if (resp.ok) {
      const emp = await resp.json();
      return { emp };
    }
  }
);
export const deleteEmployee = createAsyncThunk(
  'emp/deleteEmployee',
  async payload => {
    const resp = await fetch(
      `http://localhost:8070/api/v1/employee/delete/${payload.id}`,
      { method: 'DELETE' }
    );
    if (resp.ok) {
      return { id: payload.id };
    }
  }
);

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  extraReducers: {
    [getEmployees.fulfilled]: (state, action) => {
      return action.payload.employees;
    },
    [getEmployee.fulfilled]: (state, action) => {
      return state.find(emp => emp.id !== action.payload.index);
    },
    [updateEmployee.fulfilled]: (state, action) => {
      const employee = state.employees.findIndex(
        employee => employee.id == action.payload._id
      );
      state.employee = [...employee, action.payload];
    },
    [addEmployee.fulfilled]: (state, action) => {
      state.employees.push(action.payload);
      state.status = 'success';
    },
    [deleteEmployee.fulfilled]: (state, action) => {
      return state.filter(emp => {
        emp.id !== action.payload._id;
      });
    },
  },
});
export const selectEmployeeById = (state, empId) => {
  // state.employee.find(employee => employee._id == empId);
};

export const selectAllEmployees = state => state.employee;

export default employeeSlice.reducer;
