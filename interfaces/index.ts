export interface Role {
  id: number;
  name: string;
  description: string;
}

export interface Movement {
  id: string;
  concept: string;
  amount: number;
  date: string;
  userId: string;
  type: 'INCOME' | 'EXPENSE';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  emailVerified: boolean;
  phone: string;
  createdAt: string;
  updatedAt: string;
  roleId: number;
  role: Role;
  movements: Movement[];
}

export interface UserResponse {
  data: User;
}

export interface MovementResponse {
  data: Movement;
}