import { API_BASE_URL } from './client';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface SignupCredentials {
  email: string;
  firmName: string;
  password: string;
  passwordConfirmation: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Invalid email or password');
  }

  return response.json();
};

export const signup = async (
  email: string,
  firmName: string,
  password: string,
  passwordConfirmation: string
): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      email, 
      firm_name: firmName, 
      password,
      password_confirmation: passwordConfirmation
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || 'Failed to create account');
  }

  return response.json();
};

export const fetchUser = async (token: string): Promise<{ email: string }> => {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  return response.json();
}; 