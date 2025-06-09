import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CustomerForm from '../CustomerForm';
import { getCustomer, createCustomer, updateCustomer } from '../../api/customers';

jest.mock('../../api/customers');

describe('CustomerForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders create form correctly', () => {
    render(
      <MemoryRouter initialEntries={['/customers/new']}>
        <Routes>
          <Route path="/customers/new" element={<CustomerForm onClose={() => {}} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('New Customer')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Customer' })).toBeInTheDocument();
  });

  it('renders edit form correctly', async () => {
    const mockCustomer = { id: 1, name: 'Test Customer', phone: '123-456-7890' };
    (getCustomer as jest.Mock).mockResolvedValueOnce(mockCustomer);

    render(
      <MemoryRouter initialEntries={['/customers/1']}>
        <Routes>
          <Route path="/customers/:customerId" element={<CustomerForm onClose={() => {}} customerId={1} />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Edit Customer')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test Customer')).toBeInTheDocument();
      expect(screen.getByDisplayValue('123-456-7890')).toBeInTheDocument();
    });
  });

  it('handles form submission for create', async () => {
    const mockCustomer = { id: 1, name: 'New Customer', phone: '123-456-7890' };
    (createCustomer as jest.Mock).mockResolvedValueOnce(mockCustomer);

    render(
      <MemoryRouter initialEntries={['/customers/new']}>
        <Routes>
          <Route path="/customers/new" element={<CustomerForm onClose={() => {}} />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'New Customer' }
    });

    fireEvent.change(screen.getByLabelText('Phone'), {
      target: { value: '123-456-7890' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Create Customer' }));

    await waitFor(() => {
      expect(createCustomer).toHaveBeenCalledWith({
        name: 'New Customer',
        phone: '123-456-7890'
      });
    });
  });

  it('handles form submission for edit', async () => {
    const mockCustomer = { id: 1, name: 'Test Customer', phone: '123-456-7890' };
    (getCustomer as jest.Mock).mockResolvedValueOnce(mockCustomer);
    (updateCustomer as jest.Mock).mockResolvedValueOnce({ ...mockCustomer, name: 'Updated Customer' });

    render(
      <MemoryRouter initialEntries={['/customers/1']}>
        <Routes>
          <Route path="/customers/:customerId" element={<CustomerForm onClose={() => {}} customerId={1} />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Edit Customer')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Updated Customer' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Update Customer' }));

    await waitFor(() => {
      expect(updateCustomer).toHaveBeenCalledWith(1, {
        name: 'Updated Customer',
        phone: '123-456-7890'
      });
    });
  });
}); 