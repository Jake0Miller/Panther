import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MatterForm from '../MatterForm';
import { getMatter, createMatter, updateMatter } from '../../api/matters';

jest.mock('../../api/matters');

describe('MatterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders create form correctly', () => {
    render(
      <MemoryRouter initialEntries={['/customers/1/matters/new']}>
        <Routes>
          <Route path="/customers/:customerId/matters/new" element={<MatterForm onClose={() => {}} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('New Matter')).toBeInTheDocument();
    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Matter' })).toBeInTheDocument();
  });

  it('renders edit form correctly', async () => {
    const mockMatter = { id: 1, title: 'Test Matter', description: 'Test Description', status: 'active', customer_id: 1 };
    (getMatter as jest.Mock).mockResolvedValueOnce(mockMatter);

    render(
      <MemoryRouter initialEntries={['/customers/1/matters/1']}>
        <Routes>
          <Route path="/customers/:customerId/matters/:matterId" element={<MatterForm onClose={() => {}} matterId={1} />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Edit Matter')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test Matter')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
    });
  });

  it('handles form submission for create', async () => {
    const mockMatter = { id: 1, title: 'New Matter', description: 'New Description', status: 'active', customer_id: 1 };
    (createMatter as jest.Mock).mockResolvedValueOnce(mockMatter);

    render(
      <MemoryRouter initialEntries={['/customers/1/matters/new']}>
        <Routes>
          <Route path="/customers/:customerId/matters/new" element={<MatterForm onClose={() => {}} />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'New Matter' }
    });

    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'New Description' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Create Matter' }));

    await waitFor(() => {
      expect(createMatter).toHaveBeenCalledWith(1, {
        title: 'New Matter',
        description: 'New Description',
        status: 'active'
      });
    });
  });

  it('handles form submission for edit', async () => {
    const mockMatter = { id: 1, title: 'Test Matter', description: 'Test Description', status: 'active', customer_id: 1 };
    (getMatter as jest.Mock).mockResolvedValueOnce(mockMatter);
    (updateMatter as jest.Mock).mockResolvedValueOnce({ ...mockMatter, title: 'Updated Matter' });

    render(
      <MemoryRouter initialEntries={['/customers/1/matters/1']}>
        <Routes>
          <Route path="/customers/:customerId/matters/:matterId" element={<MatterForm onClose={() => {}} matterId={1} />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Edit Matter')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'Updated Matter' }
    });

    fireEvent.click(screen.getByRole('button', { name: 'Update Matter' }));

    await waitFor(() => {
      expect(updateMatter).toHaveBeenCalledWith(1, 1, {
        title: 'Updated Matter',
        description: 'Test Description',
        status: 'active'
      });
    });
  });
}); 