//src/types/role.ts
export type RoleFormData = {
    nom: string; // "ADMIN", "USER" ou "Admin", "User"
    roleDescription : string;
  };
  export type Role = {
    id: number;
    nom: string; // "ADMIN", "USER" ou "Admin", "User"
    roleDescription : string;
  };
    