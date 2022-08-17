import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Tosat from '../components/Toast';

describe('Toast', () => {
  it('should render', () => {
    render(<Tosat />);
    const toast = screen.getByRole('alert');
    expect(toast).toBeInTheDocument();
  });
});
