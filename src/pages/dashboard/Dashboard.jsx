import React from 'react'
import MenuLateralComponent from './components/MenuLateral/MenuLateralComponent'
import MainComponent from './components/MainComponent/MainComponent'
import KPIsComponent from './components/KPIsComponent/KPIsComponent'
import AgendaDiaComponent from './components/AgendaDiaComponent/AgendaDiaComponent'
import './dashboard.css'
import GraficoComponent from './components/GraficoComponent/GraficoComponent'

const Dashboard = () => {

  const valores = [
    {
      id: 1, valor: 10, texto: 'Pacientes Agendados na Semana'
    },
    {
      id: 2, valor: 10, texto: 'Desistências e/ou Reagendamentos na Semana'
    },
    {
      id: 3, valor: 10, texto: 'Pacientes sem agendamento por mais de duas semanas'
    }
  ]

  const pacientes = [
    {
      id: 1, nome: 'Usuario Da Silva', horario: '14:30', status: 'Confirmado'
    },
    {
      id: 2, nome: 'Usuario De Souza', horario: '15:30', status: 'Pendente'
    },
    {
      id: 3, nome: 'Usuario Siqueira', horario: '16:30', status: 'Cancelado'
    }
  ]

  const ultimaAtualizacao = new Date().toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });


  return (
    <div className='dashboard flex'>
      <MenuLateralComponent></MenuLateralComponent>
      <MainComponent title="Dashboard"
      headerContent={ultimaAtualizacao}>
        <div className='flex flex-col gap-2'>
          <div className='flex w-full justify-between gap-2'>
            {valores.map((valor, index) => {
              return <KPIsComponent key={index} valor={valor.valor} texto={valor.texto}></KPIsComponent>
            })}
          </div>
          <div className='second-section flex gap-2'>
            <div className='agendas-section w-1/2 flex flex-col items-center'>
              <h1 className='font-bold text-xl'>Pacientes do Dia (01/01)</h1>
              <div className='agendas-diario'>
                {pacientes.map((paciente, index) => {
                  return <AgendaDiaComponent key={index} nome={paciente.nome} horario={paciente.horario} status={paciente.status}></AgendaDiaComponent>
                })}
              </div>
            </div>
            <div className='grafico-section w-1/2 flex flex-col items-center bg-amber-300'>
              <h1 className='font-bold text-xl'>Gráfico de Agendamentos</h1>
              <GraficoComponent></GraficoComponent>
            </div>
          </div>
        </div>



      </MainComponent>
    </div>
  )
}

export default Dashboard