import axios from 'axios';

export const getAgendamentosPorId = async (id) => {
    try {
        const response = await axios.get(`/agendamentos/${id}`, {
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
        const response = await axios.get('/agendamentos', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao encontrar agendamentos:', error);
        throw error;
    }
}


export const postAgendamento = async (agendamento) => {
    try {
        const response = await axios.post('/agendamentos', agendamento, {
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
        const response = await axios.put(`/agendamentos/${id}`, agendamento, {
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