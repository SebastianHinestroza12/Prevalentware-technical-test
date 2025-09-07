export interface Role {
  id: number;
  name: string;
  description: string;
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
}

export interface UserResponse {
  data: User;
}
