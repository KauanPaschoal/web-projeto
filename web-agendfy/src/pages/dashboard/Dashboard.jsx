import React from 'react'
import MenuLateralComponent from './components/MenuLateral/MenuLateralComponent'
import MainComponent from './components/mainComponent/MainComponent'
import KPIsComponent from './components/kpisComponent/KPIsComponent'
import AgendaDiaComponent from './components/AgendaDiaComponent/AgendaDiaComponent'
import './dashboard.css'

const Dashboard = () => {

  const valores = [
    {
      id: 1, valor: 10, texto: 'Pacientes Agendados na Semana'
    },
    {
      id: 2, valor: 10, texto: 'Pacientes Agendados na Semana'
    },
    {
      id: 3, valor: 10, texto: 'Pacientes Agendados na Semana'
    }
  ]

  const pacientes = [
    {
      id: 1, nome: 'Usuario Da Silva', horario: '14:30', status: 'Confirmado'
    },
    {
      id: 2, nome: 'Usuario Da Silva', horario: '14:30', status: 'Pendente'
    },
    {
      id: 3, nome: 'Usuario Da Silva', horario: '14:30', status: 'Cancelado'
    }
  ]





  return (
    <div className='dashboard flex'>
      <MenuLateralComponent></MenuLateralComponent>
      <MainComponent title="Dashboard">
        <div className='flex w-full justify-evenly'>
          <div className='flex w-full justify-evenly'>
            {valores.map((valor, index) => {
              return <KPIsComponent key={index} valor={valor.valor} texto={valor.texto}></KPIsComponent>
            })}
          </div>
        </div>
        <div className='agendas-section w-1/2 flex flex-col items-center'>
          <h1 className='font-bold text-xl'>Pacientes do Dia (01/01)</h1>
          <div className='agendas-diario'>
            {pacientes.map((paciente, index) => {
              return <AgendaDiaComponent key={index} nome={paciente.nome} horario={paciente.horario} status={paciente.status}></AgendaDiaComponent>
            })}
          </div>
        </div>
      </MainComponent>
    </div>
  )
}

export default Dashboard