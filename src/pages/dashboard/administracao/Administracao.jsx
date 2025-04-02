import React from 'react'
import './Administracao.css'
import MenuLateralComponent from '../components/menuLateral/MenuLateralComponent'
import MainComponent from '../components/mainComponent/MainComponent'

const Administracao = () => {
    return (
        <div className='div-administracao flex'>
            <MenuLateralComponent></MenuLateralComponent>
            <MainComponent title="Administração"></MainComponent>
        </div>
    )
}

export default Administracao