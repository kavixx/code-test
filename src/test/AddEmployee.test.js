import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import AddEmployee from '../components/AddEmployee';

test('rendering and submitting a addEmployee', async () => {
  const handleSubmit = jest.fn();
  render(<AddEmployee onSubmit={handleSubmit} />);
  const user = userEvent.setup();

  const initialState = { output: 10 };
  const mockStore = configureStore();
  let store, wrapper;

  // it('Shows "Hello world!"', () => {
  //   store = mockStore(initialState)
  //   const { getByText } = render(<Provider store={store}><App /></Provider>)

  //   expect(getByText('Hello Worldd!')).not.toBeNull()
  // })

  await user.type(screen.getByTestId(/first_name/i), 'John');
  await user.type(screen.getByLabelText(/Last_name/i), 'Dee');
  await user.type(screen.getByLabelText(/email/i), 'john.dee@someemail.com');
  await user.type(screen.getByLabelText(/gender/i), 'M');
  await user.type(screen.getByLabelText(/number/i), '+947674329');

  await user.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'john.dee@someemail.com',
      first_name: 'John',
      last_name: 'Dee',
      gender: 'M',
      number: '+947674329',
    })
  );
});
