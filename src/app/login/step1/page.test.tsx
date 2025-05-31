// app/step1/page.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Step1Page from './page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Step1Page', () => {
  it('renders input and button', () => {
    render(<Step1Page />);
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  it('shows error when username is empty', async () => {
    render(<Step1Page />);
    const button = screen.getByRole('button', { name: /next/i });
    await userEvent.click(button);
    expect(await screen.findByText(/username is required/i)).toBeInTheDocument();
  });

  it('redirects when valid username is submitted', async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<Step1Page />);
    const input = screen.getByPlaceholderText('Enter username');
    const button = screen.getByRole('button', { name: /next/i });

    await userEvent.type(input, 'testuser');
    await userEvent.click(button);

    expect(push).toHaveBeenCalledWith('/step2?username=testuser');
  });
});
