import React from 'react';
import './CalendarCard.css';
import { useNavigate } from 'react-router-dom';

const CalendarCard = ({ timeSlot, status, patientName, buttonText, day, id }) => {
  const navigate = useNavigate();

  const borderColor = {
    Pendente: 'orange',
    Confirmada: 'green',
    Concluida: 'blue',
    Cancelada: 'red',
    Disponível: 'gray',
  }[status] || 'gray';

  const backgroundColor = {
    Pendente: 'rgba(255, 165, 0, 0.1)',
    Confirmada: 'rgba(0, 128, 0, 0.1)',
    Cancelada: 'rgba(255, 0, 0, 0.1)',
    Disponível: 'rgba(128, 128, 128, 0.1)',
  }[status] || 'rgba(128, 128, 128, 0.1)';

  const handleButtonClick = (e) => {
    const startTime = timeSlot.split(' - ')[0]; // Pega apenas o horário inicial

    if (status === 'Disponível') {
      e.stopPropagation();
      // Redireciona para cadastrar agendamento com os parâmetros startTime e day na query string
      navigate(`/dashboard/agendamentos/cadastrar?timeSlot=${encodeURIComponent(startTime)}&day=${encodeURIComponent(day)}`);
    } else {
      e.stopPropagation();
      // Redireciona para uma página de detalhes ou então faz outra lógica
      navigate(`/dashboard/agendamentos/editar/${id}`);
      // Ex.: navigate(`/dashboard/agendamentos/detalhes?timeSlot=${encodeURIComponent(startTime)}&day=${encodeURIComponent(day)}`);
    }
  }

  return (
    <div className="calendario-card flex flex-col justify-between" style={{ borderLeft: `4px solid ${borderColor}`, backgroundColor }}>
      <div className="card-header-calendario">
        <span>{timeSlot}</span>
      </div>
      <div className="agendamento-info">
        <b>{patientName}</b>
        <p>Status: {status}</p>
      </div>
      <div className="flex gap-2 w-full">
        <button className="btn_calendario flex rounded-full" onClick={handleButtonClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default CalendarCard;