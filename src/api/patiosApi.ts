import axios from "axios";
import { BASE_URL } from "../configurations/api";
import { IPatiosApi, Patio } from "./interfaces/ipatiosApi";


export class PatiosApi implements IPatiosApi {

  private readonly endpoint = "yards";

  async findPatios(id: string): Promise<Patio | null> {
    const url = `${BASE_URL}${this.endpoint}/${id}`;
    try {
      const response = await axios.get(url);
      return response.data as Patio;
    } catch (err: any) {
      console.error("Erro ao buscar pátio:", err?.message ?? err);
      return null;
    }
  }
}
