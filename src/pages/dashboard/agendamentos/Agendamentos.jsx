import React, { useEffect, useState } from 'react';
import './Agendamentos.css';
import MenuLateralComponent from '../components/MenuLateral/MenuLateralComponent';
import MainComponent from '../components/MainComponent/MainComponent';
import { FaPlus } from 'react-icons/fa';
import CalendarCard from './components/CalendarCard/CalendarCard';

const Agendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  const redirectToCadastrarAgendamento = () => {
    window.location.href = './agendamentos/cadastrar';
  };

  const getCurrentWeekDays = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 (Domingo) a 6 (Sábado)
    const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const weekDays = [];

    // Ajusta o índice para começar na segunda-feira
    const adjustedDay = currentDay === 0 ? 6 : currentDay - 1;

    for (let i = 0; i < 5; i++) {
      const diff = i - adjustedDay;
      const day = new Date(today);
      day.setDate(today.getDate() + diff);

      const dayOfMonth = day.getDate().toString().padStart(2, '0'); // Formata o dia com dois dígitos
      const month = (day.getMonth() + 1).toString().padStart(2, '0'); // Formata o mês com dois dígitos
      const year = day.getFullYear(); // Obtém o ano completo

      weekDays.push({
        dayName: daysOfWeek[i + 1], // Segunda a Sexta
        date: `${dayOfMonth}/${month}/${year}`, // Formata a data como DD/MM/YYYY
      });
    }

    return weekDays;
  };

  const weekDays = getCurrentWeekDays();

  const timeSlots = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
  ];

  // Simula o fetch para buscar os agendamentos
  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        setLoading(true);
        // Simulação de um fetch para a API
        const response = await new Promise((resolve) =>
          setTimeout(() => {
            resolve([
              { date: '23/04/2025', timeSlot: '08:00 - 09:00', status: 'Confirmado', patientName: 'Lucas Pereira' },
              { date: '24/04/2025', timeSlot: '09:00 - 10:00', status: 'Pendente', patientName: 'Fernanda Lima' },
              { date: '21/04/2025', timeSlot: '10:00 - 11:00', status: 'Cancelado', patientName: 'Rafael Almeida' },
              { date: '22/04/2025', timeSlot: '11:00 - 12:00', status: 'Confirmado', patientName: 'Beatriz Santos' },
              { date: '23/04/2025', timeSlot: '13:00 - 14:00', status: 'Confirmado', patientName: 'Gabriel Costa' },
              { date: '24/04/2025', timeSlot: '14:00 - 15:00', status: 'Cancelado', patientName: 'Juliana Rocha' },
              { date: '25/04/2025', timeSlot: '15:00 - 16:00', status: 'Confirmado', patientName: 'Thiago Martins' },
              { date: '23/04/2025', timeSlot: '16:00 - 17:00', status: 'Pendente', patientName: 'Mariana Oliveira' },
            ]);
          }, 1000)
        );
        setAgendamentos(response);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgendamentos();
  }, []);

  return (
    <div className='div-agendamentos flex'>
      <MenuLateralComponent />
      <MainComponent
        title="Agendamentos"
        headerContent={
          <button className='btn_agendamento flex rounded-full' onClick={redirectToCadastrarAgendamento}>
            <FaPlus className='icon' />
            Agendar
          </button>
        }
      >
        <section className='calendario-container'>
          {loading ? (
            <p>Carregando agendamentos...</p>
          ) : (
            <>
              <table className='calendario-table flex flex-col w-full'>
                <thead className='flex w-full justify-between'>
                  <tr className='table-tr flex w-full justify-evenly gap-2' >
                    {weekDays.map((day, index) => (
                      <th key={index} className='calendario-card-header'>
                        <span>{day.dayName}</span>
                        <span>{day.date}</span> {/* Exibe a data no formato DD/MM */}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='table-body flex w-full flex-col justify-between gap-2'>
                  {timeSlots.map((timeSlot, rowIndex) => (
                    <tr key={rowIndex} className='flex w-full justify-evenly gap-2'>
                      {weekDays.map((day, colIndex) => {
                        const agendamento = agendamentos.find(
                          (a) => a.date === day.date && a.timeSlot === timeSlot
                        );
                        return (
                          <td key={colIndex} className='div-calendario-card'>
                            {agendamento ? (
                              <CalendarCard
                                timeSlot={agendamento.timeSlot}
                                status={agendamento.status}
                                patientName={agendamento.patientName}
                                buttonText="Ver Detalhes"
                                day={day.date}
                              />
                            ) : (
                              <CalendarCard
                                timeSlot={timeSlot}
                                status="Disponível"
                                patientName=""
                                buttonText="+ Agendar"
                                day={day.date}
                              />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </section>
      </MainComponent>
    </div>
  );
};

export default Agendamentos;