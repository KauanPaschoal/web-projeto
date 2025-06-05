import React from 'react';
import './pacientes.css';
import MenuLateralComponent from '../components/MenuLateral/MenuLateralComponent';
import { FaPen, FaPlus, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import MainComponent from '../components/MainComponent/MainComponent';
import { getPacientes } from '../../../provider/api/pacientes/fetchs-pacientes';
import CardPaciente from './components/CardPaciente/CardPaciente';
import Loading from '../components/Loading/Loading';



const Pacientes = () => {
  const [pacientes, setPacientes] = React.useState([]);

  const [pacientesLista, setPacientesLista] = React.useState(pacientes);
  const [pesquisar, setPesquisar] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();



  React.useEffect(() => {
    setLoading(true);
    const fetchPacientes = async () => {
      try {
        const pacientes = await getPacientes();
        if (Array.isArray(pacientes)) {
          setPacientes(pacientes);
          setPacientesLista(pacientes);
          console.log("Pacientes encontrados:", pacientes);
        } else {
          console.error("A resposta da API não é um array:", pacientes);
        }
      } catch (error) {
        console.error("Erro ao encontrar pacientes:", error);
      }
      setTimeout(() => setLoading(false), 500);
    };

    fetchPacientes();
  }, []);

  const handleSearch = (e) => {
    const pesquisa = e.target.value.toLowerCase();
    setPesquisar(pesquisa);

    if (pesquisa === '') {
      setPacientesLista(pacientes);
      return;
    }

    const filteredPacientes = pacientes.filter((paciente) =>
      paciente.nome.toLowerCase().startsWith(pesquisa)
    );
    setPacientesLista(filteredPacientes);
  }

  const redirectToVisualizarPaciente = (id) => {
    navigate(`/dashboard/pacientes/editar/${id}`);
  };

  const redirectToCadastrarAgendamento = (id) => {
    navigate(`/dashboard/agendamentos/cadastrar/${id}`)
  };

  return (
    
    <div className='div-pacientes flex'>
      <MenuLateralComponent></MenuLateralComponent>
      {loading && <Loading />}
      <MainComponent
        title="Meus Pacientes"
        headerContent={
          <>
            <div className="search-container flex">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Pesquisar pacientes..."
                className="input-pesquisa"
                value={pesquisar}
                onChange={handleSearch}
              />
            </div>

            <button
              className='btn_agendamento flex rounded-full'
              onClick={(e) => {
                e.preventDefault();
                navigate(`/dashboard/pacientes/adicionar`);
              }}
            >
              <FaPlus className='icon' />
              Adicionar Paciente
            </button>
          </>
        }
      >
        
          <div className='pacientes-background'>
            <div className='pacientes-container'>
              {pacientesLista.map((paciente) => (
                <CardPaciente
                  key={paciente.id}
                  paciente={paciente}
                  onVisualizar={redirectToVisualizarPaciente}
                  onAgendar={redirectToCadastrarAgendamento}
                />
              ))}
            </div>
          </div>
        
      </MainComponent>
    </div>
  );
};

export default Pacientes;