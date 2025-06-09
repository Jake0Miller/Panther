import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MatterList from '../MatterList';
import { getMatters } from '../../api/matters';

jest.mock('../../api/matters');

describe('MatterList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders matters correctly', async () => {
    const mockMatters = [
      { id: 1, title: 'Test Matter 1', description: 'Description 1', status: 'active', customer_id: 1 },
      { id: 2, title: 'Test Matter 2', description: 'Description 2', status: 'completed', customer_id: 1 }
    ];
    (getMatters as jest.Mock).mockResolvedValueOnce(mockMatters);

    render(
      <MemoryRouter initialEntries={['/customers/1/matters']}>
        <Routes>
          <Route path="/customers/:customerId/matters" element={<MatterList />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Matters')).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: 'Add Matter' })).toBeInTheDocument();
    expect(screen.getByText('Test Matter 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Test Matter 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/customers/1/matters']}>
        <Routes>
          <Route path="/customers/:customerId/matters" element={<MatterList />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error state when API call fails', async () => {
    (getMatters as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <MemoryRouter initialEntries={['/customers/1/matters']}>
        <Routes>
          <Route path="/customers/:customerId/matters" element={<MatterList />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Failed to load matters. Please try again later.')).toBeInTheDocument();
    });
  });
}); 