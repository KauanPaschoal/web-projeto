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
    Concluida: 'rgba(0, 0, 255, 0.1)',
  }[status] || 'rgba(128, 128, 128, 0.1)';

  const handleButtonClick = (e) => {
    const startTime = timeSlot.split(' - ')[0];

    if (status === 'Disponível') {
      e.stopPropagation();
      navigate(`/dashboard/agendamentos/cadastrar?timeSlot=${encodeURIComponent(startTime)}&day=${encodeURIComponent(day)}`);
    } else {
      e.stopPropagation();
      navigate(`/dashboard/agendamentos/editar/${id}`);
    }
  }

  return (
    <div className="calendario-card flex flex-col justify-between" style={{ borderLeft: `4px solid ${borderColor}`, backgroundColor }}>
      <div className="card-header-calendario">
        <span>
          {timeSlot}
          {patientName && ` - ${patientName}`}
        </span>
      </div>
      <div className="agendamento-info">
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