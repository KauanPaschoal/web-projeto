import React from 'react'
import './Agendamentos.css'
import MenuLateralComponent from '../components/MenuLateral/MenuLateralComponent'
import MainComponent from '../components/MainComponent/MainComponent'
import { FaPlus } from 'react-icons/fa'


const Agendamentos = () => {

  const redirectToCadastrarAgendamento = () => {
    window.location.href = './agendamentos/cadastrar'
  }

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
      </MainComponent>
    </div>
  )
}

export default Agendamentos