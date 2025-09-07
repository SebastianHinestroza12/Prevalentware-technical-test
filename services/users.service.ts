import { API_BASE, API_KEY } from '@/constants';
import { UserResponse } from '@/interfaces/user';

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
}
