import { Patio } from "../interfaces/ipatiosApi";


export const patioMock: Patio = {
  id: "02987fa3-9cd6-11f0-95ac-4ad47e1b9edc",
  name: "Pátio Central",
  address: {
    street: "Rua das Oficinas",
    number: 100,
    neighborhood: "Centro Industrial",
    city: "São Paulo",
    state: "SP",
    zipCode: "01000-000",
    country: "Brasil",
  },
  pointsOfInterest: [
    { pointOrder: 1, x: 0, y: 0 },
    { pointOrder: 2, x: 0, y: 250 },
    { pointOrder: 3, x: 250, y: 250 },
    { pointOrder: 4, x: 250, y: 0 }
  ],
};
