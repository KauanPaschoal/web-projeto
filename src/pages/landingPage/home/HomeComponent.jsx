import React from 'react'
import ImgHome from '../../../assets/images/img_home.png'
import './home.css'

const HomeComponent = () => {

    
    return (
        <section className="section-home flex flex-col md:flex-row justify-between items-center p-12 md:p-40 bg-gradient-to-r from-white to-darkBlueFy mt-16" id='home'>
            <div>
                <h1 className="text-4xl font-bold">Gerencie a agenda de sua empresa conosco!</h1>
                <p className="mt-4 text-lg">Aumente a eficiência de seu negócio com a nossa tecnologia em gerenciamento de agendamentos.</p>
                <div className="div-buttons flex gap-4 mt-4">
                    <button className="btn_primario bg-lightBlueFy border-2 border-lightBlueFy text-white p-4 font-medium text-sm transition duration-300 ease-in-out hover:bg-darkestBlueFy">Entrar</button>
                    <button className="btn_secundario border-2 border-lightBlueFy text-lightBlueFy p-4 font-medium text-sm transition duration-300 ease-in-out hover:bg-lightBlueFy hover:text-white">Saiba Mais</button>
                </div>
            </div>
            <img src={ImgHome} className="w-128 rounded-lg border-2 border-white mt-8 md:mt-0" alt="" />
        </section>
    )
}

export default HomeComponent