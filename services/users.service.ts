import { API_BASE, API_KEY } from '@/constants';
import { User, UserResponse } from '@/interfaces';
import { EditUserFormData } from '@/schemas/user.schema';

export class UsersService {
  static async getUserById(userId: string): Promise<UserResponse> {
    const res = await fetch(`${API_BASE}/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Error fetching user');
    }

    return res.json();
  }
  static async getUsers(): Promise<User[]> {
    const res = await fetch(`${API_BASE}/users`, {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Error fetching users');
    return res.json().then((data) => data.data);
  }

  static async updateUser(
    id: string,
    body: Partial<EditUserFormData>
  ): Promise<UserResponse> {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error('Error updating user');
    return res.json().then((data) => data.data);
  }
}
