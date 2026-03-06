//src/types/personnel.ts
export interface Personnel {
    Id: string;
    Nom: string;
    Prenom: string;
    Matricule: string;
    grade: string;
    Arme: string;
    Fonction: string;
    willaya: string;
    numero: string;
    ville: string;
    email: string;
}

export interface PersonnelForm {
    Nom: string;
    Prenom: string;
    Arme: string;
    Fonction: string;
    grade: string;
    Matricule: string;
    numero: string;
    ville: string;
    willaya: string;
    email: string;
}



export interface PersonnelPermCourante {
    role: string;
    jourSemaine: string;
    DateDebut: string;
    DateFin: string;
    estWeekend: boolean;
    personnel: Personnel;
    estTemporaire: boolean;
    nomDuRemplace: string;
    prenomDuRemplace: string;
    matriculeDuRemplace: string;

}

export interface PersonnelIndispo {
    nom:string;
    prenom: string;
    matricule: string;
    numero: string;
    datePermanence: string;
    role: string;
    remplaçant: string;
    matriculeRemplacant: string;
    numeroRemplacant: string;
}