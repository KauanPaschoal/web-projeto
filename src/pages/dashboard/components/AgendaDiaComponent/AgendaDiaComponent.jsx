import React from 'react'
import './AgendaDiaComponent.css'

const AgendaDiaComponent = ({ nome, horario, status = 'Default' }) => {

      const getStatusClasse = () => {
        switch (status) {
          case 'Confirmado':
            return 'status-confirmado';
          case 'Pendente':
            return 'status-pendente';
          case 'Cancelado':
            return 'status-cancelado';
          default:
            return 'status-default';
        }
      };

    return (
        <div className='agendaDiaComponent bg-gray-200'>
            <span className={`status ${getStatusClasse()}`}>{status}</span>
            <div className='info-card flex'>
                <div className='flex gap-1'>
                    <span className='font-bold'>Nome:</span><p>{nome}</p>
                </div>
            </div>
            <div className='info-card flex'>
                <div className='flex gap-1'>
                    <span className='font-bold'>Horário:</span><p>{horario}</p>
                </div>
                
            </div>
            <button className='btn_primario rounded-full'>Ver Detalhes</button>
        </div>
    )
}

export default AgendaDiaComponent