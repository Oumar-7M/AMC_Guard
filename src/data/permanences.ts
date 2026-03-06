import { PermanenceCheck } from "@/types/permanence";

export const mockPermanence: PermanenceCheck = {
  id: "mock-2026-01-07",
  date: "2026-01-07",
  permanenciers: [
    {
      id: "1",
      nom: "Maiga",
      prenom: "Oumar",
      grade: "Terminale",
      fonction: "Président",
      numTel: "0555123456",
    },
    {
      id: "2",
      nom: "Diallo",
      prenom: "Aminata",
      grade: "Première",
      fonction: "Secrétaire",
      numTel: "0555765432",
    },
    {
      id: "3",
      nom: "Poudiougo",
      prenom: "Pierre",
      grade: "Seconde",
      fonction: "Trésorier",
      numTel: "0555987654",
    },
    {
      id: "4",
      nom: "Maiga",
      prenom: "Hama",
      grade: "Seconde",
      fonction: "Membre",
      numTel: "0555234567",
    },
    {
      id: "5",
      nom: "Sissoko",
      prenom: "Koudy",
      grade: "Seconde",
      fonction: "Membre",
      numTel: "0555345678",
    },
  ],
};
