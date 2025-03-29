import React from 'react'
import './Agendamentos.css'
import MenuLateralComponent from '../components/MenuLateral/MenuLateralComponent'
import MainComponent from '../components/mainComponent/MainComponent'

const Agendamentos = () => {

  const handleFilterClick = () => {
    alert('Filtro clicado!');
  };

  return (
    <div className='div-agendamentos flex'>
      <MenuLateralComponent></MenuLateralComponent>
      <MainComponent
        title="Agendamentos"
        headerContent={<button className="btn_secundario" onClick={handleFilterClick}>
          + Agendar
        </button>}>
      </MainComponent>

    </div>
  )
}

export default Agendamentos