// src/types/user.ts
export type UserUpdateData = {
  nom?: string;
  prenom?: string;
  username?: string;
  mustChangePassword?: boolean;
};

// pour la création
export type UserFormData = {
  nom: string;
  prenom: string;
  username: string;
  roleID: number; // 1 = admin, 2 = user
};

// utilisateur venant du backend
export type User = {
  id: string;
  username: string;
  nom: string;
  prenom: string;
  mustChangePassword: boolean;
};
