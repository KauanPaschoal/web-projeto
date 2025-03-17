import React from 'react'
import ImgHome from '../../images/img_home.png'
import './recursos.css'

const RecursosComponent = () => {
    return (
        <div className='div-recursos flex flex-col justify-center items-center p-12 md:p-40' id='recursos'>
            <h1 className='titulo-section'>RECURSOS AGENDFY</h1>
            <h3 className='subtitulo-section'>AGENDAMENTOS INTELIGENTES</h3>
            <section className='cards flex flex-col md:flex-row gap-8 mt-8'>
                <div className='card-content flex flex-row justify-center items-center text-center border border-gray-300 p-4 rounded-lg shadow-md'>
                    <img src={ImgHome} className='w-64 '></img>
                    <div>
                        <h3 className='mt-4 text-lg font-bold'>Dashboard pessoal</h3>
                        <p className='mt-2 text-sm'>Tenha acesso a uma dashboard intuitiva e completa, com insights valiosos sobre seus clientes, frequência de agendamentos, reagendamentos e muito mais. Transforme dados em decisões estratégicas e otimize seu negócio com inteligência.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default RecursosComponent