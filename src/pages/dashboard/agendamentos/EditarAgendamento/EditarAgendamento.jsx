import React, { useEffect, useState } from 'react'
import MainComponent from '../../components/MainComponent/MainComponent'
import MenuLateralComponent from '../../components/MenuLateral/MenuLateralComponent'
import './EditarAgendamento.css'
import InputField from '../../components/InputField/InputField'
import { FaDeleteLeft, FaTrashCan } from 'react-icons/fa6'
import { FaRegSave, FaSave } from 'react-icons/fa'
import { errorMessage, responseMessage } from '../../../../utils/alert.js'
import { useParams } from 'react-router-dom'
import { getAgendamentosPorId } from '../../../../provider/api/agendamentos/fetchs-agendamentos.js'
import { putAgendamento } from '../../../../provider/api/agendamentos/fetchs-agendamentos.js';

const EditarAgendamento = () => {

  const [paciente, setPaciente] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const [diasDoMes, setDiasDoMes] = useState({});
  const [agendamento, setAgendamento] = useState({});
  const [diaSemana, setDiaSemana] = useState(0);

  const { id } = useParams(); // Obtém o ID do paciente da URL



  // const pacienteResponse = ([
  //   { id: 1, nome: "Usuario da Silva", horario: "14:00", diaSemana: 2, data: "22/04/2025", status: "Pendente" },
  // ]);



  useEffect(() => {
    const fetchAgendamento = async () => {
      try {
        const response = await getAgendamentosPorId(id); // Busca o agendamento pelo ID
        console.log("Agendamento carregado:", response);

        if (response && response.id) {
          setAgendamento(response);
          setPaciente({
            id: response.fkPaciente.id,
            nome: response.fkPaciente.nome,
            cpf: response.fkPaciente.cpf,
            email: response.fkPaciente.email,
            status: response.fkPaciente.status,
            fkPlano: response.fkPaciente.fkPlano,
            data: response.data, // Certifique-se de que está no formato YYYY-MM-DD
            horario: response.hora,
            diaSemana: new Date(response.data).getDay(),
            statusSessao: response.statusSessao,
          });
        } else {
          console.error("Nenhum agendamento encontrado para o ID:", id);
        }
      } catch (error) {
        console.error("Erro ao carregar agendamento:", error);
      }
    };

    fetchAgendamento();
  }, [id]);

  useEffect(() => {
    if (paciente && paciente.data) {
        const diaSemanaCalculado = new Date(Date.UTC(
            parseInt(paciente.data.split('-')[0], 10),
            parseInt(paciente.data.split('-')[1], 10) - 1,
            parseInt(paciente.data.split('-')[2], 10)
        )).getUTCDay();
        setDiaSemana(diaSemanaCalculado);

        const diasDoMesAtualizados = Array.from({ length: 4 }, (_, i) => {
            const data = new Date();
            data.setDate(data.getDate() + i * 7 + ((diaSemanaCalculado - data.getDay() + 7) % 7));
            return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        });

        setDiasDoMes({ diaMes: diasDoMesAtualizados });
    }
}, [paciente]);

  const getNomeDiaSemana = (diaSemana) => {
    const dias = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];

    return dias[diaSemana] || "Desconhecido";
  };

  const formatDateToBackend = (date) => {
    if (!date || typeof date !== 'string') {
        console.error("Data inválida para formatDateToBackend:", date);
        return "0000-00-00"; // Retorna um valor padrão inválido para evitar erros
    }

    const [day, month, year] = date.split('/');
    if (!day || !month || !year) {
        console.error("Formato de data inválido para formatDateToBackend:", date);
        return "0000-00-00";
    }

    return `${year}-${month}-${day}`; // Converte para o formato YYYY-MM-DD
};

  const handleAtualizarAgendamento = async (e) => {
    e.preventDefault();

    if (!paciente.data || !paciente.horario || paciente.diaSemana === undefined) {
      errorMessage("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const requestBody = {
        id: agendamento.id,
        fkPaciente: {
          id: agendamento.fkPaciente.id,
          nome: agendamento.fkPaciente.nome,
          cpf: agendamento.fkPaciente.cpf,
          email: agendamento.fkPaciente.email,
          status: agendamento.fkPaciente.status,
          fkPlano: {
            id: agendamento.fkPaciente.fkPlano?.id,
            categoria: agendamento.fkPaciente.fkPlano?.categoria,
            preco: agendamento.fkPaciente.fkPlano?.preco,
          },
        },
        data: agendamento.data,
        hora: agendamento.hora,
        tipo: agendamento.tipo,
        statusSessao: agendamento.statusSessao,
        anotacao: agendamento.anotacao,
        createdAt: agendamento.createdAt,
      };

      console.log("Request Body para Atualizar:", requestBody);

      await putAgendamento(agendamento.id, requestBody);
      responseMessage("Agendamento atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar agendamento:", error);
      errorMessage("Erro ao atualizar agendamento.");
    }
  };

  const handleDiaSemanaChange = (e) => {
    const selectedDiaSemana = parseInt(e.target.value, 10);
    setDiaSemana(selectedDiaSemana);

    const diasDoMesAtualizados = Array.from({ length: 4 }, (_, i) => {
      const data = new Date();
      data.setDate(data.getDate() + i * 7 + ((selectedDiaSemana - data.getDay() + 7) % 7));
      return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    });

    setDiasDoMes({ diaMes: diasDoMesAtualizados });
    setPaciente({
      ...paciente,
      diaSemana: selectedDiaSemana,
      data: diasDoMesAtualizados[0],
    });
  }

  useEffect(() => {
    console.log("Paciente Data:", paciente.data);
    console.log("Dia da Semana Calculado:", diaSemana);
}, [paciente, diaSemana]);

  return (
    <>
      <MenuLateralComponent />
      <MainComponent
        title={'Editar Agendamento'}
        headerContent={
          <div className='flex gap-2 justify-between w-full'>
            <button className="btn_agendamento" onClick={() => window.location.href = '/dashboard/agendamentos'}>
              {"< Voltar"}
            </button>
            <button
              className='btn_primario rounded-full flex gap-2 m-0'
              type="button"
              onClick={() => setPaciente({
                ...paciente,
                data: paciente.selectedDate
              })}
            >
              <FaTrashCan className='' size={20} />
              Cancelar Agendamento
            </button>
          </div>
        }
      >

        <form className='form-editar-agendamento'

          noValidates
          onSubmit={handleAtualizarAgendamento}>
          <div className='div-escolher-paciente'>
            {paciente && (
              <div className="paciente-info-editar">
                <p><strong>Paciente Selecionado:</strong> {paciente.nome}</p>
                <p><strong>Horário Marcado:</strong> {paciente.horario}</p>
                <p><strong>Dia para Consultas:</strong> {getNomeDiaSemana(new Date(agendamento.data).getDay())}</p>
                <p><strong>Data Marcada:</strong> {agendamento.data}</p>
                <div className="pendente-container">
                  <span className={`status ${agendamento.statusSessao === 'Pendente' ? 'status-sessao-pendente' :
                    agendamento.statusSessao === 'Confirmado' ? 'status-sessao-ok' :
                      agendamento.statusSessao === 'Cancelado' ? 'status-cancelado' :
                        ''
                    }`}>
                    {agendamento.statusSessao}
                  </span>
                  <div className="checkbox-container">
                    <label>
                      <input
                        type="checkbox"
                        checked={paciente.confirmado || false}
                        onChange={(e) => setPaciente({
                          ...paciente,
                          confirmado: e.target.checked,
                          status: e.target.checked ? 'Confirmado' : 'Pendente'
                        })}
                      />
                      Confirmar Agendamento
                    </label>
                  </div>
                </div>

              </div>
            )}
          </div>

          <div className='container-sessao-editar'>
            <div className='container-inputs-editar flex gap-2'>
              <div className="select-container w-full">
                <label htmlFor="diaSemana" className="input-label">Novo Dia da Semana:</label>
                <select
                  id="diaSemana"
                  name="diaSemana"
                  required
                  className="select-field w-full"
                  value={diaSemana}
                  onChange={handleDiaSemanaChange}
                >
                  <option value="" disabled>Selecione um dia da semana</option>
                  {Array.from({ length: 7 }, (_, i) => (
                    <option key={i} value={i}>
                      {getNomeDiaSemana(i)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="select-container w-full">
                <label htmlFor="data" className="input-label">Nova Data:</label>
                <select
                  id="data"
                  name="data"
                  required
                  className="select-field w-full"
                  value={paciente?.data || ''}
                  onChange={(e) => setPaciente({
                    ...paciente,
                    data: e.target.value
                  })}
                >
                  <option value="" disabled>Selecione uma data</option>
                  {paciente && diasDoMes.diaMes && diasDoMes.diaMes.map((data, index) => (
                    <option key={index} value={data}>
                      {data}
                    </option>
                  ))}
                </select>
              </div>
              <InputField
                type="text"
                id="horario"
                name="horario"
                labelTitle="Horário"
                placeholder="Horário"
                required
                value={paciente ? paciente.horario : ''}
                readOnly={paciente ? false : true}
                className={"w-full"}
                width={"w-[50%]"}
              />
            </div>
          </div>

          <div className='flex gap-2'>
            <button type='submit' className='btn_primario rounded-full flex gap-2'>
              <FaRegSave className='' size={20} />
              Salvar Alterações</button>
            <button className='btn_secundario rounded-full'
              onClick={() => window.location.href = '/dashboard/agendamentos'}
              type="button">
              Cancelar
            </button>
          </div>

        </form>

      </MainComponent>
    </>
  )
}

export default EditarAgendamento