import React from 'react'
import './Agendamentos.css'
import MenuLateralComponent from '../components/MenuLateral/MenuLateralComponent'
import MainComponent from '../components/MainComponent/MainComponent'
import { FaPlus } from 'react-icons/fa'
import CalendarCard from './components/CalendarCard/CalendarCard';


const Agendamentos = () => {

  const statusClass = {
    Pendente: 'pendente',
    Confirmado: 'confirmado',
    Cancelado: 'cancelado',
  }[status] || '';

  const redirectToCadastrarAgendamento = () => {
    window.location.href = './agendamentos/cadastrar'
  }

  const generateCalendarCards = () => {
    const daysOfWeek = ['Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira'];
    const timeSlot = '08:00 - 09:00';

    return daysOfWeek.map((day, index) => (
      <td key={index} className='calendario-card'>
        <span>{timeSlot}</span>
      </td>
    ));
  };

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
        }>

        <section className='calendario-container'>
          <table className='calendario-table flex flex-col w-full'>
            <thead className='flex w-full justify-between'>
              <tr className='flex w-full justify-evenly gap-2'>
                {['Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira'].map((day, index) => (
                  <th key={index} className='calendario-card-header'>
                    <span>{day}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className='flex flex-col w-full gap-2'>
              {['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00'].map((timeSlot, rowIndex) => (
                <tr key={rowIndex} className='flex w-full justify-evenly gap-2'>
                  {['Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira'].map((day, colIndex) => (
                    <td key={colIndex} className={`calendario-card`}>
                      <CalendarCard
                        timeSlot={timeSlot}
                        status={colIndex % 4 === 0 ? 'Confirmado' : colIndex % 4 === 1 ? 'Pendente' : colIndex % 4 === 2 ? 'Cancelado' : 'Disponível'}
                        patientName={colIndex % 4 === 0 ? 'Nome do Paciente' : ''}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </MainComponent>
    </div>
  );
}

export default Agendamentos