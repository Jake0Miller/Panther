import { API_BASE_URL } from './client';

export interface Customer {
  id: number;
  name: string;
  phone: string;
  created_at: string;
  updated_at: string;
  active_matters_count: number;
}

export const getCustomers = async (): Promise<Customer[]> => {
  const token = localStorage.getItem('token');
  console.log('Using token:', token); // Debug log

  const response = await fetch(`${API_BASE_URL}/customers`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  console.log('Response status:', response.status); // Debug log

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized - Please log in again');
    }
    const errorData = await response.json().catch(() => null);
    console.error('Error response:', errorData); // Debug log
    throw new Error(errorData?.message || `Failed to fetch customers (Status: ${response.status})`);
  }

  const data = await response.json();
  console.log('Response data:', data); // Debug log
  return data;
};

export const getCustomer = async (id: number): Promise<Customer> => {
  const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized');
    }
    throw new Error('Failed to fetch customer');
  }

  return response.json();
};

export const createCustomer = async (data: { name: string; phone: string }): Promise<Customer> => {
  const response = await fetch(`${API_BASE_URL}/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized');
    }
    throw new Error('Failed to create customer');
  }

  return response.json();
};

export const updateCustomer = async (id: number, data: { name: string; phone: string }): Promise<Customer> => {
  const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized');
    }
    throw new Error('Failed to update customer');
  }

  return response.json();
};

export const deleteCustomer = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized');
    }
    throw new Error('Failed to delete customer');
  }
}; 