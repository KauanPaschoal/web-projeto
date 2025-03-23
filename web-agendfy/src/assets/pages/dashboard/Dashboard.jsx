import React from 'react'
import MenuLateralComponent from './components/MenuLateral/MenuLateralComponent'
import MainComponent from './components/MainComponent/MainComponent'
import './dashboard.css'

const Dashboard = () => {
  return (
    <div className='dashboard flex'>
      <MenuLateralComponent></MenuLateralComponent>
      <MainComponent title="Dashboard">
        <div>
        Colocar aqui o conteúdo do MainComponent 
        </div>
      </MainComponent>
    </div>
  )
}

export default Dashboard