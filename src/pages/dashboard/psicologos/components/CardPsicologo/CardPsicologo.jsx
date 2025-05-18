import React from 'react';
import { FaPen, FaPlus } from 'react-icons/fa';
import './CardPsicologo.css'; // Opcional: Adicione estilos específicos para o card

const CardPsicologo = ({ psicologo: psicologo, onEditar, onAgendar }) => {
    const imgSrc = psicologo?.img ? psicologo.img : "https://placehold.co/100";
    return (
        <div className="psicologo-card">
            <div className="flex gap-2">
                <img src={imgSrc} alt="" />
                <h3>
                    <b>Nome: </b>
                    {psicologo.nome}
                </h3>
                <p>
                    <b>Telefone:</b> {psicologo.telefone}
                </p>
            </div>
            <div className="div-buttons flex gap-2">
                <button
                    className="btn_secundario flex rounded-full"
                    onClick={() => onEditar(psicologo.id)}
                >
                    <FaPen />
                    Editar
                </button>
                <button
                    className="btn_primario flex rounded-full"
                    onClick={() => onAgendar(psicologo.id)}
                >
                    <FaPlus className="icon" />
                    Agendar
                </button>
            </div>
        </div>
    );
};

export default CardPsicologo;