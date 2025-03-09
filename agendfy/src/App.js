import logo from './images/logoBlue.svg';
import ImgHome from './images/img_home.png'
import Rectangle from './images/Rectangle 11.svg'
import CardIcon1 from './images/icons/Vector.svg'
import CardIcon2 from './images/icons/Vector-1.svg'
import CardIcon3 from './images/icons/Vector-2.svg'
import CardIcon4 from './images/icons/Vector-3.svg'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
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
          <button id="btn_primario">Saiba Mais</button>
          <button id="btn_secundario">Criar Conta</button>
        </div>
        <img src={ImgHome} className="card-img" alt="" />
      </section>

      <div className="divisao">
        <img src={Rectangle} alt="" />
        V
        <img src={Rectangle} alt="" />
      </div>

      <section className="section-solucao" id="solucao">
        <h1>SOLUÇÃO</h1>
        <h3>BENEFÍCIOS DA AGENDFY</h3>
        <div className="content-solucao">
          <img src={ImgHome} className="card-img" alt="" />
          <div className="cards-solucao">
            <div>
              <img src={CardIcon1} className="card-img" alt="" />
              <h5>Facilite o gerenciamento de agendas com a Dashboard customizada!</h5>
            </div>
            <div>
              <img src={CardIcon2} className="card-img" alt="" />
              <h5>Tenha mais eficiência nos atendimentos aos seus clientes.</h5>
            </div>
            <div>
              <img src={CardIcon3} className="card-img" alt="" />
              <h5>Organize seus agendamentos em calendários semanais</h5>
            </div>
            <div>
              <img src={CardIcon4} className="card-img" alt="" />
              <h5>Aumente a produtividade de seus serviços utilizando a nossa solução.</h5>
            </div>
          </div>
        </div>

      </section>

      <div className="divisao">
        <img src={Rectangle} alt="" />
        V
        <img src={Rectangle} alt="" />
      </div>

      <section className="section-nossa-essencia" id="essencia">

      </section>

      <div className="divisao">
        <img src={Rectangle} alt="" />
        V
        <img src={Rectangle} alt="" />
      </div>

      <section className="section-recursos" id="recursos">

      </section>

      <div className="divisao">
        <img src={Rectangle} alt="" />
        V
        <img src={Rectangle} alt="" />
      </div>


      <section className="section-contate" id="contate">

      </section>
    </div>
  );
}

export default App;
