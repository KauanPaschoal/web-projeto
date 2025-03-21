import React from 'react'
import ImgHome from '../../../images/img_home.png'
import './recursos.css'

import { Swiper, SwiperSlide } from 'swiper/react'

const RecursosComponent = () => {
    

    const dadosRecursos = [
        {
            id: 1,
            titulo: 'Dashboard pessoal',
            descricao: 'Tenha acesso a uma dashboard intuitiva e completa, com insights valiosos sobre seus clientes, frequência de agendamentos, reagendamentos e muito mais. Transforme dados em decisões estratégicas e otimize seu negócio com inteligência.',
            img: ImgHome
        },
        {
            id: 2,
            titulo: 'Dashboard pessoal',
            descricao: 'Tenha acesso a uma dashboard intuitiva e completa, com insights valiosos sobre seus clientes, frequência de agendamentos, reagendamentos e muito mais. Transforme dados em decisões estratégicas e otimize seu negócio com inteligência.',
            img: ImgHome
        },
        {
            id: 3,
            titulo: 'Dashboard pessoal',
            descricao: 'Tenha acesso a uma dashboard intuitiva e completa, com insights valiosos sobre seus clientes, frequência de agendamentos, reagendamentos e muito mais. Transforme dados em decisões estratégicas e otimize seu negócio com inteligência.',
            img: ImgHome
        },
        {
            id: 4,
            titulo: 'Dashboard pessoal',
            descricao: 'Tenha acesso a uma dashboard intuitiva e completa, com insights valiosos sobre seus clientes, frequência de agendamentos, reagendamentos e muito mais. Transforme dados em decisões estratégicas e otimize seu negócio com inteligência.',
            img: ImgHome
        },
    ]



    return (
        <div className='div-recursos flex flex-col justify-center items-center p-12 md:p-40' id='recursos'>
            <h1 className='titulo-section'>RECURSOS AGENDFY</h1>
            <h3 className='subtitulo-section'>AGENDAMENTOS INTELIGENTES</h3>
            <section className='cards flex flex-col md:flex-row gap-8 mt-8'>

            </section>
            <Swiper
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation
                className='swiper-recursos'
            >
                {dadosRecursos.map((recurso) => (
                    <SwiperSlide key={recurso.id} className='card-content-solucao'>
                        <div className='card-solucao'>
                            <img src={recurso.img} alt="" className='slide-img' />
                            <div>
                                <h1>{recurso.titulo}</h1>
                                <p>{recurso.descricao}</p>
                            </div>

                        </div>

                    </SwiperSlide>
                ))}
            </Swiper>

        </div>

    )
}

export default RecursosComponent