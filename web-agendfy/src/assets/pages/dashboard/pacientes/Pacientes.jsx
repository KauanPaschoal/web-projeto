import React from 'react'
import './Pacientes.css'
import MenuLateralComponent from '../components/MenuLateral/MenuLateralComponent'

const Pacientes = () => {
  return (
    <div className='div-pacientes flex'>
      <MenuLateralComponent></MenuLateralComponent>
      Pacientes
    </div>
  )
}

export default Pacientes