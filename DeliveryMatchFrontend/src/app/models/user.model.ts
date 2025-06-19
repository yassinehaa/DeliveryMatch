import {Role} from './role.model';

export interface User {
  id: number;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  verified?: boolean;
  active?: boolean;
  role?: Role;
}

