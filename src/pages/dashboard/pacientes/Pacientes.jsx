import React from 'react';
import './pacientes.css';
import MenuLateralComponent from '../components/MenuLateral/MenuLateralComponent';
import { FaPen, FaPlus, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import MainComponent from '../components/MainComponent/MainComponent';
import { getPacientes } from '../../../provider/api/pacientes/fetchs-pacientes';
import CardPaciente from './components/CardPaciente/CardPaciente';



const Pacientes = () => {
  const [pacientes, setPacientes] = React.useState([
    {
      id: 1,
      nome: "João Silva",
      telefone: "(11) 98765-4321",
      email: "joao.silva@example.com",
      status: "ATIVO",
      img: "https://placehold.co/100",
    },
    {
      id: 2,
      nome: "Maria Oliveira",
      telefone: "(21) 91234-5678",
      email: "maria.oliveira@example.com",
      status: "ATIVO",
      img: "https://placehold.co/100",
    },
    {
      id: 1,
      nome: "João Silva",
      telefone: "(11) 98765-4321",
      email: "joao.silva@example.com",
      status: "ATIVO",
      img: "https://placehold.co/100",
    },
    {
      id: 2,
      nome: "Maria Oliveira",
      telefone: "(21) 91234-5678",
      email: "maria.oliveira@example.com",
      status: "ATIVO",
      img: "https://placehold.co/100",
    },
    {
      id: 1,
      nome: "João Silva",
      telefone: "(11) 98765-4321",
      email: "joao.silva@example.com",
      status: "ATIVO",
      img: "https://placehold.co/100",
    },
    {
      id: 2,
      nome: "Maria Oliveira",
      telefone: "(21) 91234-5678",
      email: "maria.oliveira@example.com",
      status: "ATIVO",
      img: "https://placehold.co/100",
    },
    {
      id: 1,
      nome: "João Silva",
      telefone: "(11) 98765-4321",
      email: "joao.silva@example.com",
      status: "ATIVO",
      img: "https://placehold.co/100",
    },
    {
      id: 2,
      nome: "Maria Oliveira",
      telefone: "(21) 91234-5678",
      email: "maria.oliveira@example.com",
      status: "ATIVO",
      img: "https://placehold.co/100",
    },
  ]);

  const [pacientesLista, setPacientesLista] = React.useState(pacientes);
  const [pesquisar, setPesquisar] = React.useState('');
  const navigate = useNavigate();

  

  React.useEffect(() => {
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

    const redirectToEditarPaciente = (id) => {
      navigate(`/dashboard/pacientes/editar/${id}`); 
    };

    const redirectToCadastrarAgendamento = (id) => {
      navigate(`/dashboard/agendamentos/cadastrar/${id}`)
    };

    return (
      <div className='div-pacientes flex'>
        <MenuLateralComponent></MenuLateralComponent>
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
          <div className='pacientes-container'>
            {pacientesLista.map((paciente) => (
              <CardPaciente
              key={paciente.id}
              paciente={paciente}
              onEditar={redirectToEditarPaciente}
              onAgendar={redirectToCadastrarAgendamento}

            />
            ))}
          </div>
        </MainComponent>
      </div>
    );
  };

  export default Pacientes;