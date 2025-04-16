import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const getPacientes = async () => {
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


const getAgendamentosPorId = async (id) => {
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

const getAgendamentos = async () => {
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

const getPacientesLista = async (pesquisar) => {
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




