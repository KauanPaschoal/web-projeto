import './App.css'
import LogoBranca from './assets/images/LogoTipo Branco 1.svg'


import DivisaoComponent from './assets/pages/landingPage/components/divisao/divisao'
import HomeComponent from './assets/pages/landingPage/home/HomeComponent'
import NossaEssenciaComponent from './assets/pages/landingPage/nossa-essencia/NossaEssenciaComponent'
import SolucaoComponent from './assets/pages/landingPage/solucao/SolucaoComponent';
import RecursosComponent from './assets/pages/landingPage/recursos/RecursosComponent';
import HeaderComponent from './assets/pages/landingPage/header/HeaderComponent';



function App() {

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

        <RecursosComponent></RecursosComponent>

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
