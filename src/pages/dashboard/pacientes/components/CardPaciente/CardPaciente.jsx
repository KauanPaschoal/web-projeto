import React from 'react';
import { FaPen, FaPlus } from 'react-icons/fa';
import './CardPaciente.css'; // Opcional: Adicione estilos específicos para o card

const CardPaciente = ({ paciente, onEditar, onAgendar }) => {
    const imgSrc = paciente?.img ? paciente.img : "https://placehold.co/100";
    return (
        <div className="paciente-card">
            <div className="flex gap-2">
                <img src={imgSrc} alt="" />
                <h3>
                    <b>Nome: </b>
                    {paciente.nome}
                </h3>
                <p>
                    <b>Telefone:</b> {paciente.telefone}
                </p>
            </div>
            <div className="div-buttons flex gap-2">
                <button
                    className="btn_secundario flex rounded-full"
                    onClick={() => onEditar(paciente.id)}
                >
                    <FaPen />
                    Editar
                </button>
                <button
                    className="btn_primario flex rounded-full"
                    onClick={() => onAgendar(paciente.id)}
                >
                    <FaPlus className="icon" />
                    Agendar
                </button>
            </div>
        </div>
    );
};

export default CardPaciente;