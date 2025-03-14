import { useState } from 'react'
import './App.css'
import logo from './assets/images/logoBlue.svg';
import ImgHome from './assets/images/img_home.png'
import CardIcon1 from './assets/images/icons/Vector.svg'
import CardIcon2 from './assets/images/icons/Vector-1.svg'
import CardIcon3 from './assets/images/icons/Vector-2.svg'
import CardIcon4 from './assets/images/icons/Vector-3.svg'
import MissaoImg from './assets/images/essencia/missao_img.svg'
import ValoresImg from './assets/images/essencia/valores_img.svg'
import VisaoImg from './assets/images/essencia/visao_img.svg'
import LogoBranca from './assets/images/LogoTipo Branco 1.svg'


import DivisaoComponent from './assets/components/divisao/divisao'
import HomeComponent from './assets/components/home/HomeComponent'
import NossaEssenciaComponent from './assets/components/nossa-essencia/NossaEssenciaComponent'
import SolucaoComponent from './assets/components/solucao/SolucaoComponent';



import HeaderComponent from './assets/components/header/HeaderComponent';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <HeaderComponent></HeaderComponent>
        {/* Seção Home */}
        <HomeComponent></HomeComponent>
        <DivisaoComponent></DivisaoComponent>

        <SolucaoComponent></SolucaoComponent>

        <DivisaoComponent></DivisaoComponent>

        <NossaEssenciaComponent></NossaEssenciaComponent>

        <DivisaoComponent></DivisaoComponent>


        <section className="section-recursos" id="recursos">

        </section>

        <DivisaoComponent></DivisaoComponent>


        <section className="section-contate" id="contate">

        </section>

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
    </>
  )
}

export default App
