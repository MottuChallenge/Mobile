import { ISetoresApi, Sector } from "./interfaces/isetoresApi";
import { setoresMock } from "./mock/setorMock";

export class SetoresApiMock implements ISetoresApi {
  public async findSetores(yardId: string): Promise<Sector[]> {
    console.log("🧩 Usando mock de setores");
    return setoresMock;
  }
}
