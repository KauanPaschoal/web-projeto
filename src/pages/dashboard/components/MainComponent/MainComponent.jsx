import React, { Children } from 'react'
import './MainComponent.css'
import { FaBell } from 'react-icons/fa'
import NotificacaoComponent from '../NotificacaoComponent/NotificacaoComponent'

const MainComponent = ({ title, headerContent, children }) => {
    return (
        <div className='div-main'>
            <div className='flex justify-between items-center w-full p-4 relative'>
                <h1 className='titulo'>{title}</h1>
                <div>
                    <FaBell className='bell-icon ' size={24} />
                    <NotificacaoComponent />
                </div>
            </div>

            <section className='main-section'>
                <div className='cabecalho'>
                    {headerContent ? headerContent : <h2>Cabeçalho</h2>}
                </div>
                <div className='conteudo'>
                    {children}
                </div>

            </section>
        </div>
    )
}

export default MainComponent