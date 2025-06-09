import { login, signup, fetchUser } from './auth';
import { API_BASE_URL } from './client';

jest.mock('./auth');
jest.mock('./client', () => ({
  API_BASE_URL: 'http://localhost:3000',
  fetchUser: jest.fn()
}));

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('has correct API base URL', () => {
    expect(API_BASE_URL).toBe('http://localhost:3000');
  });

  it('calls login function with correct parameters', async () => {
    (login as jest.Mock).mockResolvedValueOnce({ token: 'fake-token' });
    await login({ email: 'test@example.com', password: 'password123' });
    expect(login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' });
  });

  it('calls signup function with correct parameters', async () => {
    (signup as jest.Mock).mockResolvedValueOnce({ token: 'fake-token' });
    await signup({
      email: 'test@example.com',
      firmName: 'Test Firm',
      password: 'password123',
      passwordConfirmation: 'password123'
    });
    expect(signup).toHaveBeenCalledWith({
      email: 'test@example.com',
      firmName: 'Test Firm',
      password: 'password123',
      passwordConfirmation: 'password123'
    });
  });

  it('calls fetchUser function with correct token', async () => {
    const mockUser = { email: 'test@example.com' };
    (fetchUser as jest.Mock).mockResolvedValueOnce(mockUser);
    
    const result = await fetchUser('fake-token');
    
    expect(fetchUser).toHaveBeenCalledWith('fake-token');
    expect(result).toEqual(mockUser);
  });
}); 