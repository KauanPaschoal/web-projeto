import axios from "axios";

export const getPacientes = async () => {
  try {
    const response = await axios.get("/pacientes", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao encontrar pacientes:", error);
    throw error;
  }
};

export const getPacientesPorId = async (id) => {
  try {
    const response = await axios.get(`/pacientes/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao encontrar paciente:", error);
    throw error;
  }
};

export const getPacientesLista = async (pesquisar) => {
  try {
    const response = await axios.get(`/pacientes?nome=${pesquisar}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao encontrar pacientes:", error);
    throw error;
  }
};

export const postPaciente = async (paciente) => {
  try {
    const response = await axios.post("/pacientes", paciente, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar paciente:", error);
    throw error;
  }
};

export const putPaciente = async (id, paciente) => {
  try {
    const response = await axios.put(`/pacientes/${id}`, paciente, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar paciente:", error);
    throw error;
  }
};

export const getEnderecoPorCep = async (cep) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    if (response.data.erro) {
      throw new Error("CEP não encontrado.");
    }
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o endereço:", error.message);
    throw error;
  }
};

export const putDesativarPaciente = async (id, paciente) => {
  try {
    const response = await axios.put(`/pacientes/${id}/desativar`, paciente, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao desativar paciente:", error);
    throw error;
  }
};

export const putAtualizarSenhaPaciente = async (id, senha) => {
  try {
    const response = await axios.put(`/pacientes/${id}/senha`, senha, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
    throw error;
  }
};

export const putEndereco = async (id, endereco) => {
  try {
    const response = await axios.put(`/enderecos/${id}`, endereco, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar endereço:", error);
    throw error;
  }
};


/**
 * @param {string | number} idPaciente
 * @returns {Promise}
 */
export const buscarTelefonePorIdPaciente = async (idPaciente) => {
  try {
    const response = await axios.get(`/telefones/pacientes/${idPaciente}`)
    return response.data
  } catch (error) {
    console.error("Erro ao buscar telefone por ID do paciente:", error?.message, error?.response)
    throw error
  }
}
