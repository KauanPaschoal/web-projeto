import React, { Children } from 'react'
import './MainComponent.css'

const MainComponent = ({ title, headerContent, children }) => {
    return (
        <div className='div-main'>
            <h1 className='titulo'>{title}</h1>
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