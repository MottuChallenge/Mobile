import axios from "axios";

// Ajuste a URL conforme Android/iOS/dispositivo físico
const URL_API = "http://10.0.2.2:5006/api/";

export const findMotorcycles = async (page = 1, pageSize = 10) => {
    const fullUrl = `${URL_API}Motorcycles?page=${page}&pageSize=${pageSize}`;
    console.log("Tentando acessar:", fullUrl);

    try {
        const response = await axios.get(fullUrl);
        // Os dados estão em response.data.data
        return response.data.data;
    } catch (error) {
        console.error("Erro ao buscar motocicletas:", error.message);
        return [];
    }
};
