import axios from 'axios';

export const getPreferencias = async () => {
    try {
        const response = await axios.get('/preferencias', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao encontrar preferencias:', error);
        throw error;
    }
}

export const getPreferenciasPorId = async (id) => {
    try {
        const response = await axios.get(`/preferencias/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao encontrar preferencias:', error);
        throw error;
    }
}

export const postPreferencia = async (preferencia) => {
    try {
        const response = await axios.post('/preferencias', preferencia, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar preferencia:', error);
        throw error;
    }
};

export const putPreferencia = async (id, preferencia) => {
    try {
        const response = await axios.post(`/preferencias/${id}`, preferencia, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar preferencia:', error);
        throw error;
    }
};

