import { API_BASE, API_KEY } from '@/constants';
import { Movement, MovementResponse } from '@/interfaces';
import { MovementFormData } from '@/schemas/movement.schema';

export class MovementsService {
  static async getUserMovements(userId: string): Promise<Movement[]> {
    const res = await fetch(`${API_BASE}/movements?userId=${userId}`, {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY,
      },
    });

    if (!res.ok) throw new Error('Error fetching user movements');
    const data = await res.json();
    return data.data;
  }

  static async createMovement(
    data: MovementFormData
  ): Promise<MovementResponse> {
    const res = await fetch(`${API_BASE}/movements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Error creating movement');
    }

    return res.json();
  }

  static async updateMovement(
    data: Partial<MovementFormData> & { id: string }
  ): Promise<MovementResponse> {
    const res = await fetch(`${API_BASE}/movements`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Error updating movement');
    return res.json();
  }

  static async deleteMovement(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/movements`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify({ id }),
    });

    if (!res.ok) throw new Error('Error deleting movement');
  }
}
