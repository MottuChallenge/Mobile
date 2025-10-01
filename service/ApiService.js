import axios from "axios";

// Ajuste a URL conforme Android/iOS/dispositivo físico
const URL_API = "http://10.0.2.2:5006/api/";

export const findMotorcycles = async (page = 1, pageSize = 10) => {
    const fullUrl = `${URL_API}Motorcycles?page=${page}&pageSize=${pageSize}`;
    console.log("Tentando acessar:", fullUrl);

    try {
        const response = await axios.get(fullUrl);
        // Retorna o objeto completo com paginação
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar motocicletas:", error.message);
        console.error("Detalhes do erro:", error.response?.data || error);
        return [];
    }
};

export const getMotorcycleById = async (id) => {
    const fullUrl = `${URL_API}Motorcycles/${id}`;
    console.log("Tentando acessar:", fullUrl);

    try {
        const response = await axios.get(fullUrl);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar motocicleta por ID:", error.message);
        console.error("Detalhes do erro:", error.response?.data || error);
        throw error;
    }
};

export const addMotorcycle = async (model, plate, lastRevisionDate, engineType = 0) => {
    const fullUrl = `${URL_API}Motorcycles`;
    console.log("Tentando acessar:", fullUrl);
    
    console.log("Data recebida:", lastRevisionDate);
    
    const requestData = {
        model,
        plate,
        lastRevisionDate: lastRevisionDate ? new Date(lastRevisionDate).toISOString() : null,
        engineType
    };
    
    console.log("Dados enviados:", requestData);
    
    try {
        const response = await axios.post(fullUrl, requestData);
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar motocicleta:", error.message);
        console.error("Detalhes do erro:", error.response?.data || error);
        throw error;
    }
};

export const deleteMotorcycle = async (id) => {
    const fullUrl = `${URL_API}Motorcycles/${id}`;
    console.log("Tentando acessar:", fullUrl);
    try {
        const response = await axios.delete(fullUrl);
        return response.data;
        
    } catch (error) {
        console.error("Erro ao deletar motocicleta:", error.message);
        console.error("Detalhes do erro:", error.response?.data || error);
        throw error;
    }
};

export const updateMotorcycle = async (id, model, plate, spotId = null, lastRevisionDate, engineType = 0) => {
    const fullUrl = `${URL_API}Motorcycles/${id}`;
    console.log("Tentando acessar:", fullUrl);

    
    const requestData = {
        model,
        plate,
        spotId,
        lastRevisionDate: lastRevisionDate,
        engineType
    };
    
    console.log("Dados enviados para update:", requestData);
    
    try {
        const response = await axios.put(fullUrl, requestData);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar motocicleta:", error.message);
        console.error("Detalhes do erro:", error.response?.data || error);
        throw error;
    }
};