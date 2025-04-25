import React from 'react';
import './CalendarCard.css';

const CalendarCard = ({ timeSlot, status, patientName, buttonText}) => {

    const borderColor = {
        Pendente: 'orange',
        Confirmado: 'green',
        Cancelado: 'red',
        Disponível: 'gray',
    }[status] || 'gray';

    const backgroundColor = {
        Pendente: 'rgba(255, 165, 0, 0.1)',
        Confirmado: 'rgba(0, 128, 0, 0.1)',
        Cancelado: 'rgba(255, 0, 0, 0.1)',
        Disponível: 'rgba(128, 128, 128, 0.1)',
    }[status] || 'rgba(128, 128, 128, 0.1)';


    return (
        <div className='calendario-card flex flex-col justify-between' style={{ borderColor, backgroundColor }}>
            <span>{timeSlot}</span>
            <div className='agendamento-info'>
                <b>{patientName}</b>
                <p>Status: {status}</p>
            </div>
            <div className='flex gap-2 w-full'>
                <button className='btn_calendario flex rounded-full'>{buttonText}</button>
            </div>
        </div>
    );
};

export default CalendarCard;