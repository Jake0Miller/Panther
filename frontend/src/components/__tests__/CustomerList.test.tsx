import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import CustomerList from '../CustomerList';
import { getCustomers, getCustomer } from '../../api/customers';

jest.mock('../../api/customers');

describe('CustomerList Component', () => {
  const mockCustomers = [
    {
      id: 1,
      name: 'Test Customer 1',
      phone: '+1234567890',
      active_matters_count: 2,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z'
    },
    {
      id: 2,
      name: 'Test Customer 2',
      phone: '+0987654321',
      active_matters_count: 0,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (getCustomers as jest.Mock).mockResolvedValue(mockCustomers);
    (getCustomer as jest.Mock).mockResolvedValue(mockCustomers[0]);
  });

  it('renders customer list with active matters count', async () => {
    render(
      <BrowserRouter>
        <CustomerList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Customer 1')).toBeInTheDocument();
      expect(screen.getByText('Test Customer 2')).toBeInTheDocument();
    });

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    render(
      <BrowserRouter>
        <CustomerList />
      </BrowserRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error state when API call fails', async () => {
    (getCustomers as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));
    render(
      <BrowserRouter>
        <CustomerList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to load customers/i)).toBeInTheDocument();
    });
  });

  it('opens customer form when Edit button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <CustomerList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Customer 1')).toBeInTheDocument();
    });

    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    await user.click(editButtons[0]);

    await waitFor(() => {
      expect(screen.getByText('Edit Customer')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test Customer 1')).toBeInTheDocument();
      expect(screen.getByDisplayValue('+1234567890')).toBeInTheDocument();
    });
  });
}); 