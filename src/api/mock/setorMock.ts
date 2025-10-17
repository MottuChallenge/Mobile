import { Sector } from "../interfaces/isetoresApi";


export const setoresMock: Sector[] = [
  {
    id: "1a2b3c4d",
    yardId: "02987fa3-9cd6-11f0-95ac-4ad47e1b9edc",
    sectorTypeId: "tipo-01",
    pointsOfInterest: [
      { pointOrder: 1, x: 0, y: 0 },
      { pointOrder: 2, x: 100, y: 0 },
      { pointOrder: 3, x: 100, y: 100 },
      { pointOrder: 4, x: 0, y: 100 },
    ],
    spots: [
      { spotId: "A1", x: 10, y: 10, status: "livre" },
      { spotId: "A2", x: 30, y: 10, status: "ocupado", motorcycleId: 4321 },
      { spotId: "A3", x: 50, y: 10, status: "livre" },
    ],
  },
  {
    id: "5e6f7g8h",
    yardId: "02987fa3-9cd6-11f0-95ac-4ad47e1b9edc",
    sectorTypeId: "tipo-02",
    pointsOfInterest: [
      { pointOrder: 1, x: 120, y: 0 },
      { pointOrder: 2, x: 220, y: 0 },
      { pointOrder: 3, x: 220, y: 100 },
      { pointOrder: 4, x: 120, y: 100 },
    ],
    spots: [
      { spotId: "B1", x: 130, y: 10, status: "ocupado", motorcycleId: 5678 },
      { spotId: "B2", x: 150, y: 10, status: "livre" },
      { spotId: "B3", x: 170, y: 10, status: "livre" },
      { spotId: "B4", x: 190, y: 10, status: "livre" },
      { spotId: "B5", x: 210, y: 10, status: "livre" },
      { spotId: "B6", x: 130, y: 30, status: "livre" },
      { spotId: "B7", x: 150, y: 30, status: "livre" },
      { spotId: "B8", x: 170, y: 30, status: "livre" },
      { spotId: "B9", x: 190, y: 30, status: "livre" },
      { spotId: "B10", x: 210, y: 30, status: "livre" },
      { spotId: "B11", x: 130, y: 50, status: "livre" },
      { spotId: "B12", x: 150, y: 50, status: "livre" },
    ],
  },
];
