import { render, screen } from '@testing-library/react';
import Test from '../../Test';
import AuthForm from '.';

describe('AuthForm', () => {
  it('renders component', () => {
    render(<Test component={<AuthForm />} />);

    const input = screen.getByLabelText('Username');
    expect(input.getAttribute('placeholder')).toBe('username');
  });
});
