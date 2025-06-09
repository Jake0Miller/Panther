declare module './auth' {
  export function login(email: string, password: string): Promise<{ token: string }>;
  export function signup(email: string, firmName: string, password: string): Promise<{ token: string }>;
  export function fetchUser(token: string): Promise<{ email: string }>;
} 