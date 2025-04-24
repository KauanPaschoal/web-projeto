import React from 'react';
import './CalendarCard.css';

const CalendarCard = ({ timeSlot, status, patientName }) => {

    const borderColor = {
        Pendente: 'orange',
        Confirmado: 'green',
        Cancelado: 'red',
        Disponível: 'gray',
    }[status] || 'gray';

    const cardClassName = `calendario-card border-${borderColor}`;

    return (
        <div>
            <span>{timeSlot}</span>
            <div className='agendamento-info'>
                <p>{patientName}</p>
                <p>Status: {status}</p>
            </div>
            <div className='flex gap-2'>
                <button className='btn_calendario flex rounded-full'>Editar</button>
                <button className='btn_calendario flex rounded-full'>Cancelar</button>
            </div>
        </div>
    );
};

export default CalendarCard;