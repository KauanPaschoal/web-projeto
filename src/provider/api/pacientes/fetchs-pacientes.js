import axios from 'axios';

export const getPacientes = async () => {
    try {
        const response = await axios.get('/usuarios', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao encontrar pacientes:', error);
        throw error;
    }
}

export const getPacientesPorId = async (id) => {
    try {
        const response = await axios.get(`/usuarios/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao encontrar paciente:', error);
        throw error;
    }
}

export const getPacientesLista = async (pesquisar) => {
    try {
        const response = await axios.get(`/usuarios?nome=${pesquisar}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao encontrar pacientes:', error);
        throw error;
    }
}

export const postPaciente = async (paciente) => {
    try {
        const response = await axios.post('/usuarios', paciente, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar paciente:', error);
        throw error;
    }
}

export const putPaciente = async (id, paciente) => {
    try {
        const response = await axios.put(`/usuarios/${id}`, paciente, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar paciente:', error);
        throw error;
    }
}

export const putDesativarPaciente = async (id, paciente) => {
    try {
        const response = await axios.put(`/usuarios/${id}`, paciente, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao desativar paciente:', error);
        throw error;
    }
}

export const putAtualizarSenhaPaciente = async (id, senha) => {
    try {
        const response = await axios.put(`/usuarios/${id}/senha`, senha, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar senha:', error);
        throw error;
    }
}