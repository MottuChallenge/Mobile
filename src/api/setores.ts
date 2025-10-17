import axios from "axios";
import { BASE_URL } from "../configurations/api";
import { ISetoresApi, Sector } from "./interfaces/isetoresApi";

const URL_API = `${BASE_URL}sectors`;

export class SetoresApi implements ISetoresApi {
  async findSetores(yardId: string): Promise<Sector[]> {
    const fullUrl = `${URL_API}/${yardId}`;
    console.log("🔎 Buscando setores:", fullUrl);

    try {
      const res = await axios.get(fullUrl);
      return res.data;
    } catch (error: any) {
      console.error("❌ Erro ao buscar setores:", error.message);
      console.error("Detalhes:", error.response?.data || error);
      return [];
    }
  }
}
