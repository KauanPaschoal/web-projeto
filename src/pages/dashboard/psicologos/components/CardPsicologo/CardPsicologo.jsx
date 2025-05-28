import React from 'react';
import { FaAddressCard, FaPen, FaPlus } from 'react-icons/fa';
import './CardPsicologo.css'; // Opcional: Adicione estilos específicos para o card

const CardPsicologo = ({ psicologo: psicologo, onEditar, onAgendar }) => {
    const imgSrc = psicologo?.img ? psicologo.img : "https://placehold.co/100";

    const redirectToEditarPsicologo = (id) => {
        window.location.href = `/dashboard/psicologos/editar/${id}`;
    }


    return (
        <div className="psicologo-card">
            <div className="flex gap-2">
                <img src={imgSrc} alt="" />
                <h3>
                    <b>Nome: </b>
                    {psicologo.nome}
                </h3>
                <p>
                    <b>CRP:</b> {psicologo.crp}
                </p>
            </div>
            <div>
                <button className="btn_primario flex gap-2" onClick={() => redirectToEditarPsicologo(psicologo.id)}>
                    <FaAddressCard />
                    Visualizar
                </button>
                
            </div>
        </div>
    );
};

export default CardPsicologo;