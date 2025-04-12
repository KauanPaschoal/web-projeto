import React from 'react';
import './pacientes.css';
import MenuLateralComponent from '../components/MenuLateral/MenuLateralComponent';
import MainComponent from '../components/MainComponent/MainComponent';
import { FaPen, FaPlus, FaSearch } from 'react-icons/fa';
import { FaFilter } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

// const pacientesResponse = [
//   { id: 1, nome: "Gavassa", telefone: "11912341234" },
//   { id: 2, nome: "Gevassa", telefone: "11912341234" },
//   { id: 3, nome: "Geavassa", telefone: "11912341234" },
//   { id: 4, nome: "João", telefone: "11956785678" },
//   { id: 5, nome: "Maria", telefone: "11987654321" },
//   { id: 6, nome: "Ana", telefone: "11912345678" },
//   { id: 7, nome: "Carlos", telefone: "11923456789" },
//   { id: 8, nome: "Fernanda", telefone: "11934567890" },
//   { id: 9, nome: "Lucas", telefone: "11945678901" },
//   { id: 10, nome: "Juliana", telefone: "11956789012" },
//   { id: 11, nome: "Ricardo", telefone: "11967890123" },
//   { id: 12, nome: "Patrícia", telefone: "11978901234" },
//   { id: 13, nome: "Roberto", telefone: "11989012345" },
//   { id: 14, nome: "Mariana", telefone: "11990123456" },
//   { id: 15, nome: "Eduardo", telefone: "11901234567" },
//   { id: 16, nome: "Tatiane", telefone: "11912345678" },
//   { id: 17, nome: "Felipe", telefone: "11923456789" },
//   { id: 18, nome: "Sofia", telefone: "11934567890" },
//   { id: 19, nome: "André", telefone: "11945678901" },
//   { id: 20, nome: "Camila", telefone: "11956789012" }
// ];




const Pacientes = () => {
  // const [pacientes, setPacientes] = React.useState(pacientesResponse);
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

    // Se o campo de pesquisa estiver vazio, restaura a lista completa
    if (pesquisa === '') {
      setPacientesLista(pacientes);
      return;
    }

    // Filtra os pacientes cujo nome começa com o termo pesquisado
    const filteredPacientes = pacientes.filter((paciente) =>
      paciente.nome.toLowerCase().startsWith(pesquisa)
    );
    setPacientesLista(filteredPacientes);
  }

    const redirectToEditarPaciente = (id) => {
      navigate(`/dashboard/pacientes/editar/${id}`); // Redireciona para a URL com o ID do paciente
    };

    const redirectToCadastrarAgendamento = () => {
      window.location.href = './agendamentos/cadastrar';
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

              <button className='btn_agendamento flex rounded-full'>
                <FaFilter />
                Filtros
              </button>

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
                  <button className='btn_primario flex rounded-full'>
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