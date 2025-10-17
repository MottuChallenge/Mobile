import { IPatiosApi, Patio } from "./interfaces/ipatiosApi";
import { patioMock } from "./mock/patioMock";

export class PatiosApiMock implements IPatiosApi {
  async findPatios(id: string): Promise<Patio | null> {
    console.log("🧩 Usando mock de pátio");
    return patioMock;
  }
}
