export const API_BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/api'
  : '/api';

export interface ApiClient {
  get: <T>(path: string) => Promise<T>;
  post: <T>(path: string, data: any) => Promise<T>;
  put: <T>(path: string, data: any) => Promise<T>;
  delete: <T>(path: string) => Promise<T>;
}

class DefaultApiClient implements ApiClient {
  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async get<T>(path: string): Promise<T> {
    return this.request<T>(path);
  }

  async post<T>(path: string, data: any): Promise<T> {
    return this.request<T>(path, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(path: string, data: any): Promise<T> {
    return this.request<T>(path, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>(path, {
      method: 'DELETE',
    });
  }
}

// Export a singleton instance
export const apiClient = new DefaultApiClient(); 