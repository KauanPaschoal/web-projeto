import React from 'react'

import LogoBranca from '../../images/LogoTipo Branco 1.svg'

import DivisaoComponent from './components/divisao/divisao'
import HeaderComponent from './header/HeaderComponent';
import HomeComponent from './home/HomeComponent'
import NossaEssenciaComponent from './nossa-essencia/NossaEssenciaComponent'
import SolucaoComponent from './solucao/SolucaoComponent';
import RecursosComponent from './recursos/RecursosComponent';
import ContatoComponent from './contato/ContatoComponent';


const LandingPage = () => {
    return (
        <div>
            <HeaderComponent></HeaderComponent>
            {/* Seção Home */}
            <HomeComponent></HomeComponent>

            <DivisaoComponent></DivisaoComponent>

            <SolucaoComponent></SolucaoComponent>

            <DivisaoComponent></DivisaoComponent>

            <NossaEssenciaComponent></NossaEssenciaComponent>

            <DivisaoComponent></DivisaoComponent>

            <RecursosComponent></RecursosComponent>

            <DivisaoComponent></DivisaoComponent>

            <ContatoComponent></ContatoComponent>

            <footer>
                <img src={LogoBranca} alt="" />
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#solucao">Solução</a></li>
                    <li><a href="#essencia">Nossa Essência</a></li>
                    <li><a href="#recursos">Recursos AgendFy</a></li>
                    <li><a href="#contate">Contate-nos</a></li>
                </ul>
                <p>AgendFy @ 2025. Todos os direitos reservados.</p>
            </footer>
        </div>
    )
}

export default LandingPage