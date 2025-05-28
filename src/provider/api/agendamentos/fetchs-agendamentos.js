import axios from 'axios';

export const getAgendamentosPorId = async (id) => {
    try {
        const response = await axios.get(`/sessoes/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao encontrar agendamento:', error);
        throw error;
    }
}

export const getAgendamentos = async () => {
    try {
        const response = await axios.get('/sessoes', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("response: ", response.data)
        return response.data;
    } catch (error) {
        console.error('Erro ao encontrar agendamentos:', error);
        throw error;
    }
}

export const getAgendamentosPorPaciente = async (id) => {
    try {
        const response = await axios.get(`/sessoes/pacientes/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao encontrar agendamentos por paciente:', error);
        throw error;
    }
}

export const postAgendamento = async (agendamento) => {
    try {
        const response = await axios.post('/sessoes', agendamento, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar agendamento:', error);
        throw error;
    }
}

export const putAgendamento = async (id, agendamento) => {
    try {
        const response = await axios.put(`/sessoes/${id}`, agendamento, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar agendamento:', error);
        throw error;
    }
}

/**
 * Busca agendamentos por status
 * @param {string} status - Ex: "PENDENTE", "CONFIRMADA", "CANCELADA", "AGUARDANDO", "CONCLUIDA"
 */
export const getAgendamentosPorStatus = async (status) => {
    try {
        const response = await axios.get(`/sessoes/status?status=${status}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("response: ", response.data)
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar agendamentos por status:', error);
        throw error;
    }
};

export const cancelAgendamento = async (id) => {
    try {
        const response = await axios.put(`/sessoes/cancelar/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao deletar agendamento:', error);
        throw error;
    }
}