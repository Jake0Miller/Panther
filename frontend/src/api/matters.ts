import { API_BASE_URL } from './client';

export interface Matter {
  id: number;
  title: string;
  description: string;
  status: string;
  customer_id: number;
}

export const getMatters = async (customerId: number): Promise<Matter[]> => {
  const response = await fetch(`${API_BASE_URL}/customers/${customerId}/matters`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized');
    }
    throw new Error('Failed to fetch matters');
  }

  return response.json();
};

export const getMatter = async (customerId: number, id: number): Promise<Matter> => {
  const response = await fetch(`${API_BASE_URL}/customers/${customerId}/matters/${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Unauthorized');
    }
    throw new Error('Failed to fetch matter');
  }

  return response.json();
};

export const createMatter = async (customerId: number, data: { title: string; description: string; status: string }): Promise<Matter> => {
  const response = await fetch(`${API_BASE_URL}/customers/${customerId}/matters`, {
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
    throw new Error('Failed to create matter');
  }

  return response.json();
};

export const updateMatter = async (customerId: number, id: number, data: { title: string; description: string; status: string }): Promise<Matter> => {
  const response = await fetch(`${API_BASE_URL}/customers/${customerId}/matters/${id}`, {
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
    throw new Error('Failed to update matter');
  }

  return response.json();
};

export const deleteMatter = async (customerId: number, id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/customers/${customerId}/matters/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete matter');
  }
}; 