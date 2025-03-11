import logo from './images/logoBlue.svg';
import ImgHome from './images/img_home.png'
import CardIcon1 from './images/icons/Vector.svg'
import CardIcon2 from './images/icons/Vector-1.svg'
import CardIcon3 from './images/icons/Vector-2.svg'
import CardIcon4 from './images/icons/Vector-3.svg'
import MissaoImg from './images/essencia/missao_img.svg'
import ValoresImg from './images/essencia/valores_img.svg'
import VisaoImg from './images/essencia/visao_img.svg'
import LogoBranca from './images/LogoTipo Branco 1.svg'
import DivisaoComponent from './components/divisao/divisao'


import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">

        <img src={logo} id="agendfy_logo" alt="" />
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#solucao">Solução</a></li>
          <li><a href="#essencia">Nossa Essência</a></li>
          <li><a href="#recursos">Recursos AgendFy</a></li>
          <li><a href="#contate">Contate-nos</a></li>
        </ul>
        <div>
          <button id="btn_secundario">Cadastrar</button>
          <button id="btn_primario">Entrar</button>
        </div>
      </header>
      {/* Seção Home */}
      <section className="section-home" id="home">
        <div>
          <h1>Gerencie a agenda de sua empresa conosco!</h1>
          <p>Aumente a eficiência de seu negócio com a nossa tecnologia em gerenciamento de agendamentos. </p>
          <div className="div-buttons">
            <button id="btn_primario">Saiba Mais</button>
            <button id="btn_secundario">Criar Conta</button>
          </div>
        </div>
        <img src={ImgHome} className="card-img" alt="" />
      </section>

      <DivisaoComponent></DivisaoComponent>

      <section className="section-solucao" id="solucao">
        <h1>SOLUÇÃO</h1>
        <h3>BENEFÍCIOS DA AGENDFY</h3>
        <div className="content-solucao">
          <img src={ImgHome} className="card-img" alt="" />
          <div className="cards-solucao">
            <div>
              <img src={CardIcon1} className="card-icon" alt="" />
              <h5>Facilite o gerenciamento de agendas com a Dashboard customizada!</h5>
            </div>
            <div>
              <img src={CardIcon2} className="card-icon" alt="" />
              <h5>Tenha mais eficiência nos atendimentos aos seus clientes.</h5>
            </div>
            <div>
              <img src={CardIcon3} className="card-icon" alt="" />
              <h5>Organize seus agendamentos em calendários semanais</h5>
            </div>
            <div>
              <img src={CardIcon4} className="card-icon" alt="" />
              <h5>Aumente a produtividade de seus serviços utilizando a nossa solução.</h5>
            </div>
          </div>
        </div>

      </section>

      <DivisaoComponent></DivisaoComponent>

      <section className="section-nossa-essencia" id="essencia">
        <h1>NOSSA ESSÊNCIA</h1>
        <h3>MISSÃO, VISÃO E VALORES</h3>
        <div className="boxes">
          <div className="box-content">
            <img src={MissaoImg} alt="" />
            <h3>Missão</h3>
            <p>Facilitar e otimizar o gerenciamento de agendamentos por meio de tecnologia inovadora, proporcionando eficiência e organização.</p>
          </div>

          <div className="box-content">
            <img src={VisaoImg} alt="" />
            <h3>Visão</h3>
            <p>Ser a principal referência em soluções tecnológicas para agendamentos, revolucionando a experiência entre empresas e clientes.</p>
          </div>

          <div className="box-content">
            <img src={ValoresImg} alt="" />
            <h3>Valores</h3>
            <p>Prezamos pela segurança, protegendo os dados, garantindo processos simples e ágeis. e oferecendo um serviço confiável.</p>
          </div>
        </div>
        <button id="btn_primario">Entre em contato</button>
      </section>

     
      <DivisaoComponent></DivisaoComponent>
      

      <section className="section-recursos" id="recursos">

      </section>

      <DivisaoComponent></DivisaoComponent>


      <section className="section-contate" id="contate">

      </section>

      <footer>
        <img src={LogoBranca} alt=""/>
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
  );
}

export default App;
