import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DeleteButton from '../components/DeleteButton';

describe('Delete button', () => {
  it('should render', () => {
    render(<DeleteButton />);
    const button = screen.getByRole('link');
    expect(button).toBeInTheDocument();
  });
});
