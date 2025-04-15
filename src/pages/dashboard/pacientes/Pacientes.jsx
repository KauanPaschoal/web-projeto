import React from 'react';
import './pacientes.css';
import MenuLateralComponent from '../components/MenuLateral/MenuLateralComponent';
import { FaPen, FaPlus, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import MainComponent from '../components/MainComponent/MainComponent';



const Pacientes = () => {
  const [pacientes, setPacientes] = React.useState([]);
  const [pacientesLista, setPacientesLista] = React.useState([]);
  const [pesquisar, setPesquisar] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch("/usuarios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao encontrar pacientes");
        }
        response.json().then((pacientes) => {
          setPacientes(pacientes);
          setPacientesLista(pacientes);
        });
      })
      .catch((error) => console.error("Erro ao encontrar pacientes:", error));
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
                onClick={redirectToCadastrarAgendamento}
              >
                <FaPlus className='icon' />
                Agendar
              </button>
            </>
          }
        >
          <div className='pacientes-container'>
            {pacientesLista.map((paciente) => (
              <div key={paciente.id} className='paciente-card'>
                <div className='flex gap-2'>
                  <h3>
                    <b>Nome: </b>
                    {paciente.nome}
                  </h3>
                  <p>
                    <b>Telefone:</b> {paciente.telefone}
                  </p>
                </div>
                <div className='flex gap-2'>
                  <button className='btn_secundario flex rounded-full'
                    onClick={() => redirectToEditarPaciente(paciente.id)}
                  >
                    <FaPen />
                    Editar
                  </button>
                  <button className='btn_primario flex rounded-full'
                    onClick={() => redirectToCadastrarAgendamento(paciente.id)}
                  >
                    <FaPlus className='icon' />
                    Agendar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </MainComponent>
      </div>
    );
  };

  export default Pacientes;