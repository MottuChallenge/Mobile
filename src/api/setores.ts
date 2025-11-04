import axios from "axios";
import { BASE_URL } from "../configurations/api";
import { ISetoresApi, Sector } from "./interfaces/isetoresApi";

const URL_API = `${BASE_URL}sectors`;

export class SetoresApi implements ISetoresApi {
  async findSetores(yardId: string): Promise<Sector[]> {
    const fullUrl = `${URL_API}`;
    console.log("🔎 Buscando setores:", fullUrl);

    try {
      const res = await axios.get(fullUrl);
      const data: Sector[] = res.data;
      for(let i = 0; i < data.length; i++) {

        data[i].pointsOfInterest = res.data[i].points;
      }

      const sectorsByYard = data.filter((sector) => sector.yardId === yardId);
      
      return sectorsByYard;
    } catch (error: any) {
      console.error("❌ Erro ao buscar setores:", error.message);
      console.error("Detalhes:", error.response?.data || error);
      return [];
    }
  }
  async findSetorById(sectorId: string): Promise<Sector | null> {
    const fullUrl = `${URL_API}/${sectorId}`;
    console.log("🔎 Buscando setor por ID:", fullUrl);

    try {
      const res = await axios.get(fullUrl);
      const data: Sector = res.data;
      data.pointsOfInterest = res.data.points;
      console.log("Setor encontrado:", data);
      return data;
    } catch (error: any) {
      console.error("❌ Erro ao buscar setor:", error.message);
      console.error("Detalhes:", error.response?.data || error);
      return null;
    }
  }
}
