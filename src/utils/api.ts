import axios from "axios";

const API_URL =
  "https://beta-api.serverlondrisoft.com:9000/disponibilizadados/cliente/";

const HEADERS = {
  GatewayLS: "2e44bb6339e6aacd8faeca8fd4e8694e",
  identificacao: "04361421000107",
};

export const fetchInitialData = async (cnpjCpf: string) => {
  try {
    const response = await axios.get(`${API_URL}?cnpjCpf=${cnpjCpf}`, {
      headers: HEADERS,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados iniciais:", error);
    throw error;
  }
};

export const updateData = async (data: {
  cnpjCpf: string;
  [key: string]: any;
}) => {
  try {
    const response = await axios.put(
      `${API_URL}?cnpjCpf=${data.cnpjCpf}`,
      data,
      {
        headers: HEADERS,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar dados:", error);
    throw error;
  }
};
