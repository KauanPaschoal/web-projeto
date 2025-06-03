import axios from "axios";

export const getKpiPorcentPacienteInativos = async () => {
  try {
    const response = await axios.get("/pacientes/kpi/porcent-inativo", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os dados da KPI de % pacientes inativos:", error);
    throw error;
  }
};

export const getKpiQtdSessaoCanceladas = async () => {
  try {
    const response = await axios.get("/sessoes/kpi/porcent-cancelada", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os dados da KPI de % qtd sessoes canceladas:", error);
    throw error;
  }
};

export const getDadosGrafico = async () => {
  try {
    const response = await axios.get("/sessoes/dados-grafico", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar os dados do gráfico da dashboard:", error);
    throw error;
  }
};