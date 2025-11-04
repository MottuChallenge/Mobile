import axios from "axios";
import { BASE_URL } from "../configurations/api";
import { Alert } from "react-native";

const URL_API = `${BASE_URL}Motorcycles`;

export type Motorcycle = {
    id?: number;
    model: string;
    plate: string;
    lastRevisionDate: string;
    engineType: string;
    spotId?: string;
};

export type PaginatedMotorcycles = {
    items: Motorcycle[];
    page: number;
    totalPages: number;
    totalItems: number;
    hasPrevious: boolean;
    hasNext: boolean;
};

export const findMotorcycles = async (page = 1, pageSize = 10): Promise<PaginatedMotorcycles>=> {
    const fullUrl = `${URL_API}?page=${page}&pageSize=${pageSize}`;
    console.log("Tentando acessar:", fullUrl);

    try {
        const response = await axios.get(fullUrl);
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Erro ao buscar motocicletas:", error.message);
        console.error("Detalhes do erro:", error.response?.data || error);
        return {
            items: [],
            page: page,
            totalPages: 0,
            totalItems: 0,
            hasPrevious: false,
            hasNext: false
        };
    }
};

export const getMotorcycleById = async (id: number) => {
    if (id === null) {
        console.error("ID da motocicleta não pode ser nulo");
        return null;
    }

    const fullUrl = `${URL_API}/${id}`;
    console.log("Tentando acessar:", fullUrl);

    try {
        const response = await axios.get(fullUrl);
        return {
            id: response.data.id,
            model: response.data.model,
            plate: response.data.plate,
            lastRevisionDate: response.data.lastRevisionDate,
            engineType: response.data.engineType
        };
    } catch (error) {
        console.error("Erro ao buscar motocicleta por ID:", error.message);
        console.error("Detalhes do erro:", error.response?.data || error);
        Alert.alert("Erro", "Não foi possível buscar a moto.");
    }
};

export const addMotorcycle = async (motorcycle: Motorcycle) => {
    const fullUrl = `${URL_API}`;
    console.log("Tentando acessar:", fullUrl);

    const requestData = {
        model: motorcycle.model,
        plate: motorcycle.plate,
        spotId: motorcycle.spotId || null,
        lastRevisionDate: motorcycle.lastRevisionDate && new Date(motorcycle.lastRevisionDate).toISOString(),
        engineType: motorcycle.engineType
    };

    try {
        const response = await axios.post(fullUrl, requestData);
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar motocicleta:", error.message);
        console.error("Detalhes do erro:", error.response?.data || error);
        Alert.alert("Erro", "Não foi possível adicionar a moto.");
    }
};

export const deleteMotorcycle = async (id: number) => {
    const fullUrl = `${URL_API}/${id}`;
    console.log("Tentando acessar:", fullUrl);
    try {
        const response = await axios.delete(fullUrl);
        return response.data;
        
    } catch (error) {
        console.error("Erro ao deletar motocicleta:", error.message);
        console.error("Detalhes do erro:", error.response?.data || error);
        Alert.alert("Erro", "Não foi possível deletar a moto.");
    }
};

export const updateMotorcycle = async (id: number, motorcycle: Motorcycle) => {
    const fullUrl = `${URL_API}/${id}`;
    console.log("Tentando acessar:", fullUrl);

    const requestData = {
        model: motorcycle.model,
        plate: motorcycle.plate,
        spotId: motorcycle.spotId || null,
        lastRevisionDate: motorcycle.lastRevisionDate && new Date(motorcycle.lastRevisionDate).toISOString(),
        engineType: motorcycle.engineType
    };
    
    if (id === null) {
        console.error("ID da motocicleta não pode ser nulo");
        return null;
    }
    
    try {
        const response = await axios.put(fullUrl, requestData);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar motocicleta:", error.message);
        console.error("Detalhes do erro:", error.response?.data || error);
        Alert.alert("Erro", "Não foi possível atualizar a moto.");
    }
};