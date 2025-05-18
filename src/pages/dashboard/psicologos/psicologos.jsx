import React, { useEffect, useState } from 'react';
import './psicologos.css';
import { FaPen, FaPlus, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import MainComponent from '../components/MainComponent/MainComponent';
import MenuPsicologo from './components/menuPsicologo/menuPsicologo';
import { getPsicologos } from '../../../provider/api/psicologos/fetchs-psicologos'; // Importa o método de requisição
import CardPsicologo from './components/CardPsicologo/CardPsicologo';

const Psicologos = () => {
  const [psicologos, setPsicologos] = useState([]);
  const [psicologosFiltrados, setPsicologosFiltrados] = useState([]);
  const [pesquisar, setPesquisar] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPsicologos = async () => {
      try {
        const response = await getPsicologos();
        if (Array.isArray(response)) {
          setPsicologos(response);
          setPsicologosFiltrados(response);
        } else {
          console.error('A resposta da API não é um array:', response);
          setPsicologos([]);
          setPsicologosFiltrados([]);
        }
      } catch (error) {
        console.error('Erro ao buscar psicólogos:', error);
        setPsicologos([]);
        setPsicologosFiltrados([]);
      }
    };

    fetchPsicologos();
  }, []);

  const handleSearch = (e) => {
    const pesquisa = e.target.value.toLowerCase();
    setPesquisar(pesquisa);

    if (pesquisa === '') {
      setPsicologosFiltrados(psicologos);
      return;
    }

    const filteredPsicologos = psicologos.filter((psicologo) =>
      psicologo.nome.toLowerCase().startsWith(pesquisa)
    );
    setPsicologosFiltrados(filteredPsicologos);
  };

  const redirecionarParaAdicionarPsicologo = () => {
    navigate('/dashboard/psicologos/adicionar');
  };

  return (
    <div className='div-pacientes flex'>
      <MenuPsicologo />
      <MainComponent
        title="Meus Psicólogos"
        mostrarIconeNotificacao={false}
        headerContent={
          <>
            <div className="search-container flex">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Pesquisar psicólogos..."
                className="input-pesquisa"
                value={pesquisar}
                onChange={handleSearch}
              />
            </div>

            <button
              className='btn_agendamento flex rounded-full'
              onClick={(e) => {
                e.preventDefault();
                redirecionarParaAdicionarPsicologo();
              }}
            >
              <FaPlus className='icon' />
              Adicionar Psicólogo
            </button>
          </>
        }
      >
        <div className='pacientes-container'>
          {Array.isArray(psicologosFiltrados) && psicologosFiltrados.length > 0 ? (
            psicologosFiltrados.map((psicologo) => (
              <CardPsicologo
                key={psicologo.id}
                psicologo={psicologo}
              />
            ))
          ) : (
            <p>Nenhum psicólogo encontrado.</p>
          )}
        </div>
      </MainComponent>
    </div>
  );
};

export default Psicologos;