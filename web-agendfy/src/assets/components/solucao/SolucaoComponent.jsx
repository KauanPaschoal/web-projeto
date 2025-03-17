import React from 'react'
import ImgHome from '../../images/img_home.png'
import CardComponent from './Card/CardComponent'
import './solucao.css'


const SolucaoComponent = () => {
  return (
    <section className="section-solucao pt-16" id="solucao">
          <h1 className='titulo-section'>SOLUÇÃO</h1>
          <h3 className='subtitulo-section'>BENEFÍCIOS DA AGENDFY</h3>
          <div className="content-solucao flex flex-col md:flex-row lg:flex-row justify-between items-center gap-4 md:gap-8 lg:gap-8 p-4 md:p-10 lg:p-10">
            <img src={ImgHome} className="card-img w-full md:w-1/3 lg:w-1/3 rounded-lg border-2 border-white" alt="" />
            <div className="cards-solucao flex justify-between items-center">
            <CardComponent></CardComponent>
            <CardComponent></CardComponent>
            <CardComponent></CardComponent>
            <CardComponent></CardComponent>
            </div>
          </div>
        </section>
  )
}

export default SolucaoComponent