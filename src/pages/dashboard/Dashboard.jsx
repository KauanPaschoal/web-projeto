import React, { useEffect, useState } from 'react'
import MenuLateralComponent from './components/MenuLateral/MenuLateralComponent'

import KPIsComponent from './components/KPIsComponent/KPIsComponent'
import AgendaDiaComponent from './components/AgendaDiaComponent/AgendaDiaComponent'
import './dashboard.css'
import GraficoComponent from './components/GraficoComponent/GraficoComponent'
import MainComponent from './components/MainComponent/MainComponent'
import { getKpiQtdSessaoCanceladas, getKpiPorcentPacienteInativos } from '../../provider/api/dashboard/fetchs-dashboard'
import { getSessoesSemana, getSessoesDia } from '../../provider/api/dashboard/axios-dashboard'

const Dashboard = () => {

  const [loadingKpi, setLoadingKpi] = useState(true);
  const [loadingDia, setLoadingDia] = useState(true);
  const [kpiData, setKpiData] = useState([]);
  const [showPacientes, setShowPacientes] = useState(true);
  const [pacientes, setPacientes] = useState([]);
  const [qtdSessaoCancelada, setQtdSessaoCancelada] = useState({});
  const [qtdPacientesInativos, setQtdPacientesInativos] = useState({});
  const [error, setError] = useState(null);

  // KPIs extras
  useEffect(() => {
    const fetchDadosKpis = async () => {
      try {
        const [
          qtdSessaoCanceladaData,
          qtdPacientesInativosData,
        ] = await Promise.all([
          getKpiQtdSessaoCanceladas(),
          getKpiPorcentPacienteInativos(),
        ]);

        setQtdSessaoCancelada(qtdSessaoCanceladaData.qtdCancelada);
        setQtdPacientesInativos(qtdPacientesInativosData.porcentPacienteInativo);

        console.log('KPI SESSAO CANCELADA:', qtdSessaoCanceladaData);
        console.log('KPI PACIENTE INATIVO:', qtdPacientesInativosData);

      } catch (err) {
        setError(err.message || 'Erro ao buscar dados das KPIs');
      }
    };

    fetchDadosKpis();
  }, []);

  const ultimaAtualizacao = new Date().toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  // Buscar KPIs da semana
  useEffect(() => {
    const fetchKpi = async () => {
      setLoadingKpi(true);
      const getAnoSemana = (date) => {
        const onejan = new Date(date.getFullYear(), 0, 1);
        const week = Math.ceil((((date - onejan) / 86400000) + onejan.getDay() + 1) / 7);
        return `${date.getFullYear()}${week.toString().padStart(2, '0')}`;
      };
      const now = new Date();
      const semanaAtual = getAnoSemana(now);
      const semanaAnterior = getAnoSemana(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7));
      try {
        const data = await getSessoesSemana([semanaAtual, semanaAnterior]);
        setKpiData(data);
        // eslint-disable-next-line no-unused-vars
      } catch (e) {
        setKpiData([]);
      }
      setLoadingKpi(false);
    };

    fetchKpi();
  }, []);

  // Buscar pacientes do dia
  useEffect(() => {
    const fetchPacientesDia = async () => {
      setLoadingDia(true);
      try {
        const data = await getSessoesDia();
        // Adaptar para o componente AgendaDiaComponent
        const pacientesFormatados = data.map(sessao => ({
          id: sessao.idSessao,
          nome: sessao.nomePaciente,
          horario: sessao.hora?.slice(0, 5), // "10:00:00" -> "10:00"
          status: sessao.status
        }));
        setPacientes(pacientesFormatados);
        // eslint-disable-next-line no-unused-vars
      } catch (e) {
        setPacientes([]);
      }
      setLoadingDia(false);
    };
    fetchPacientesDia();
  }, []);

  // KPIs mockadas/extras
  const valores = [
    {
      id: 2, valor: `${qtdSessaoCancelada}%`, texto: 'Cancelamentos na Semana'
    },
    {
      id: 3, valor: `${qtdPacientesInativos}%`, texto: 'Pacientes Inativos'
    }
  ];

  // Função utilitária para formatar anoSemana
  function formatAnoSemana(anoSemana) {
    if (!anoSemana || anoSemana.length < 6) return anoSemana;
    return `${anoSemana.slice(0, 4)}/${anoSemana.slice(4)}`;
  }

  return (
    <div className='dashboard flex'>
      <MenuLateralComponent />
      <MainComponent title="Dashboard"
        headerContent={
          <div className='flex w-full gap-2 items-center justify-between'>
            <p className='font-bold'>Olá, {localStorage.getItem('nomeUsuario')}</p>
            <p>Última atualização: <b>{ultimaAtualizacao}</b></p>
          </div>}>
        <div className='flex flex-col gap-2'>
          <div className='flex w-full justify-between gap-2'>
            {/* KPI dinâmica - Pacientes Agendados na Semana */}
            <div className="flex flex-col items-center">
              {loadingKpi ? (
                <KPIsComponent valor="..." texto="Pacientes Agendados na Semana" />
              ) : (
                kpiData[0] && (
                  <KPIsComponent
                    valor={showPacientes ? kpiData[0].pacientesAgendados : kpiData[0].totalSessoes}
                    texto={
                      showPacientes
                        ? `Pacientes Agendados na Semana (${formatAnoSemana(kpiData[0].anoSemana)})`
                        : `Total de Sessões na Semana (${formatAnoSemana(kpiData[0].anoSemana)})`
                    }
                  />
                )
              )}
            </div>
            {/* KPIs mockadas/extras */}
            {valores.map((valor) => (
              <div key={valor.id} className="flex-1 flex flex-col items-center">
                <KPIsComponent valor={valor.valor} texto={valor.texto}></KPIsComponent>
              </div>
            ))}
          </div>
          <div className='second-section flex gap-2'>
            <div className='agendas-section w-1/2 flex flex-col items-center'>
              <h1 className='font-bold text-xl'>
                Pacientes do Dia ({new Date().toLocaleDateString('pt-BR')})
              </h1>
              <div className='agendas-diario'>
                {loadingDia ? (
                  <p>Carregando...</p>
                ) : pacientes.length === 0 ? (
                  <p>Nenhum paciente agendado para hoje.</p>
                ) : (
                  pacientes.map((paciente) => (
                    <AgendaDiaComponent
                      key={paciente.id}
                      nome={paciente.nome}
                      horario={paciente.horario}
                      status={paciente.status}
                      id={paciente.id}
                    />
                  ))
                )}
              </div>
            </div>
            <div className='grafico-section w-1/2 flex flex-col items-center bg-amber-300'>
              <h1 className='font-bold text-xl'>Gráfico de Agendamentos</h1>
              <GraficoComponent />
            </div>
          </div>
        </div>
      </MainComponent>
    </div>
  )
}

export default Dashboard