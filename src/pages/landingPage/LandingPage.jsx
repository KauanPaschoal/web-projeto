import React from 'react'

import DivisaoComponent from './components/divisao/divisao'
import HeaderComponent from './header/HeaderComponent';
import HomeComponent from './home/HomeComponent'
import NossaEssenciaComponent from './nossa-essencia/NossaEssenciaComponent'
import SolucaoComponent from './solucao/SolucaoComponent';
import RecursosComponent from './recursos/RecursosComponent';
import ContatoComponent from './contato/ContatoComponent';
import { Link } from 'react-router-dom';	
import FooterComponent from './footer/FooterComponent';


const LandingPage = () => {
    return (
        <div>
            
            <HeaderComponent/>
            
            <HomeComponent/>

            <DivisaoComponent/>

            <SolucaoComponent/>

            <DivisaoComponent/>

            <NossaEssenciaComponent/>

            <DivisaoComponent/>

            <RecursosComponent/>

            <DivisaoComponent/>

            <ContatoComponent/>

            <FooterComponent/>
        </div>
    )
}

export default LandingPage