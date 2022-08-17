// myForm.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AddEmployee from '../components/AddEmployee';

test('rendering and submitting a basic Formik form', async () => {
  const handleSubmit = jest.fn();
  render(<AddEmployee onSubmit={handleSubmit} />);
  const user = userEvent.setup();

  await user.type(screen.getBy(/first name/i), 'John');
  await user.type(screen.getByLabelText(/last name/i), 'Dee');
  await user.type(screen.getByLabelText(/email/i), 'john.dee@someemail.com');

  await user.click(screen.getByRole('button', { name: /submit/i }));

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'john.dee@someemail.com',
      firstName: 'John',
      lastName: 'Dee',
    })
  );
});
