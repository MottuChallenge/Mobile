import { PointOfInterest } from "../../utils/pointsOfInterest";

export interface IPatiosApi {
    findPatios(id: string): Promise<Patio | null>;
}

export type Address = {
    street: string;
    number: number;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

export type Patio = {
    id: string;
    name: string;
    address: Address;
    pointsOfInterest: PointOfInterest[];
}