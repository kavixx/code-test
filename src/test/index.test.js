import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../../pages/index';

describe('Home page', () => {
  it('should render ', () => {
    render(<Home />);
    const headingElement = screen.getByText(/Employee Management/i);
    const employeeView = screen.findByRole('');
    expect(headingElement).toBeInTheDocument();
  });
});
