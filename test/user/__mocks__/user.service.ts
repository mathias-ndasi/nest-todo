import { User } from '@prisma/client';

export const UserService = (): User => {
  return {
    id: 1,
    firstName: 'Mathias',
    lastName: 'Ndasi',
    email: 'mathiasndasi@gmail.com',
    password: 'password',
    address: 'Douala',
    active: true,
    created_at: new Date(),
    updated_at: new Date(),
  };
};
