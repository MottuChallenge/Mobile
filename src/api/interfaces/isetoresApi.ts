import { PointOfInterest } from "../../utils/pointsOfInterest";

export interface ISetoresApi {
  findSetores(yardId: string): Promise<Sector[]>;
  findSetorById(sectorId: string): Promise<Sector | null>;
}

export type Sector = {
    id: string;
    yardId: string;
    sectorTypeId: string;
    pointsOfInterest: PointOfInterest[];
    spots: Spots[];
};

export type Spots = {
    spotId: string;
    x: number;
    y: number;
    status: string;
    motorcycleId?: number;
};
