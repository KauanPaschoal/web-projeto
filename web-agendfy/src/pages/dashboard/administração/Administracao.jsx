import React from 'react'
import './Administracao.css'
import MenuLateralComponent from '../components/MenuLateral/MenuLateralComponent'
import MainComponent from '../components/MainComponent/MainComponent'

const Administracao = () => {
    return (
        <div className='div-administracao flex'>
            <MenuLateralComponent></MenuLateralComponent>
            <MainComponent title="Administração"></MainComponent>
        </div>
    )
}

export default Administracao