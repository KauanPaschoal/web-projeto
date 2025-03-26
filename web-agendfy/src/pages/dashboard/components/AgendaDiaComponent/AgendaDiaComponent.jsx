import React from 'react'
import './AgendaDiaComponent.css'

const AgendaDiaComponent = (paciente) => {
    return (
        <div className='agendaDiaComponent bg-gray-300'>
            <div className='info-card flex'>
                <div className='flex gap-1'>
                    <span className='font-bold'>Nome:</span><p>{paciente.nome}</p>
                </div>
            </div>
            <div className='info-card flex'>
                <div className='flex gap-1'>
                    <span className='font-bold'>Horário:</span><p>{paciente.horario}</p>
                </div>
                <span className='status'>{paciente.status}</span>
            </div>
            <button className='btn_primario rounded-full'>Ver Detalhes</button>
        </div>
    )
}

export default AgendaDiaComponent