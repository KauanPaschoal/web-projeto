import React from 'react'
import MenuLateralComponent from './components/MenuLateral/MenuLateralComponent'
import MainComponent from './components/MainComponent/MainComponent'
import KPIsComponent from './components/KPIsComponent/KPIsComponent'
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

  return (
    <div className='dashboard flex'>
      <MenuLateralComponent></MenuLateralComponent>
      <MainComponent title="Luquinhas">
        <div className='flex w-full justify-evenly'>
          <div className='flex w-full justify-evenly'>
            {valores.map((valor, index) => {
              return <KPIsComponent key={index} valor={valor.valor} texto={valor.texto}></KPIsComponent>
            })}
          </div>
        </div>
      </MainComponent>
    </div>
  )
}

export default Dashboard