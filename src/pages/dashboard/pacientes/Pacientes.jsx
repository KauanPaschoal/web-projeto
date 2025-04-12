import React from 'react'
import './pacientes.css'
import MenuLateralComponent from '../components/MenuLateral/MenuLateralComponent'
import MainComponent from '../components/mainComponent/MainComponent'


const Pacientes = () => {
  return (
    <div className='div-pacientes flex'>
      <MenuLateralComponent></MenuLateralComponent>
      <MainComponent title="Meus Pacientes"></MainComponent>
    </div>
  )
}

export default Pacientes