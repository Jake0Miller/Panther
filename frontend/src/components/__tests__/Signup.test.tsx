import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Signup from '../Signup';
import { signup } from '../../api/auth';
import { AuthProvider } from '../../contexts/AuthContext';

jest.mock('../../api/auth');

describe('Signup Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders signup form', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Signup />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Create your account')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/firm name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('handles form input changes', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Signup />
        </AuthProvider>
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const emailInput = screen.getByPlaceholderText(/email address/i);
    const firmNameInput = screen.getByPlaceholderText(/firm name/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(firmNameInput, 'Test Firm');
    await user.type(passwordInput, 'password123');
    await user.type(confirmPasswordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(firmNameInput).toHaveValue('Test Firm');
    expect(passwordInput).toHaveValue('password123');
    expect(confirmPasswordInput).toHaveValue('password123');
  });

  it('handles successful signup', async () => {
    const user = userEvent.setup();
    (signup as jest.Mock).mockResolvedValueOnce({ token: 'test-token' });
    render(
      <MemoryRouter>
        <AuthProvider>
          <Signup />
        </AuthProvider>
      </MemoryRouter>
    );

    await user.type(screen.getByPlaceholderText(/email address/i), 'test@example.com');
    await user.type(screen.getByPlaceholderText(/firm name/i), 'Test Firm');
    await user.type(screen.getByLabelText(/^password$/i), 'password123');
    await user.type(screen.getByLabelText(/confirm password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    expect(signup).toHaveBeenCalledWith('test@example.com', 'Test Firm', 'password123', 'password123');
    expect(localStorage.getItem('token')).toBe('test-token');
  });

  it('handles signup error', async () => {
    const user = userEvent.setup();
    (signup as jest.Mock).mockRejectedValueOnce(new Error('Failed to create account'));
    render(
      <MemoryRouter>
        <AuthProvider>
          <Signup />
        </AuthProvider>
      </MemoryRouter>
    );

    await user.type(screen.getByPlaceholderText(/email address/i), 'test@example.com');
    await user.type(screen.getByPlaceholderText(/firm name/i), 'Test Firm');
    await user.type(screen.getByLabelText(/^password$/i), 'password123');
    await user.type(screen.getByLabelText(/confirm password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/failed to create account/i)).toBeInTheDocument();
    });
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AuthProvider>
          <Signup />
        </AuthProvider>
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: /create account/i }));

    expect(screen.getByPlaceholderText(/email address/i)).toBeInvalid();
    expect(screen.getByPlaceholderText(/firm name/i)).toBeInvalid();
    expect(screen.getByLabelText(/^password$/i)).toBeInvalid();
    expect(screen.getByLabelText(/confirm password/i)).toBeInvalid();
  });
}); 