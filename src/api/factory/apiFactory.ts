import { USE_MOCKS } from "../../configurations/api";
import { IPatiosApi } from "../interfaces/ipatiosApi";
import { ISetoresApi } from "../interfaces/isetoresApi";
import { PatiosApi } from "../patiosApi";
import { PatiosApiMock } from "../patiosApiMock";
import { SetoresApi } from "../setores";
import { SetoresApiMock } from "../setoresApiMock";


export const createPatiosApi = (): IPatiosApi =>
  USE_MOCKS ? new PatiosApiMock() : new PatiosApi();

export const createSetoresApi = (): ISetoresApi =>
  USE_MOCKS ? new SetoresApiMock() : new SetoresApi();
