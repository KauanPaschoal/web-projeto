import React from 'react'
import MainComponent from '../../components/MainComponent/MainComponent'
import MenuLateralComponent from '../../components/MenuLateral/MenuLateralComponent'
import './EditarAgendamento.css'
import InputField from '../../components/InputField/InputField'
import { FaDeleteLeft, FaTrashCan } from 'react-icons/fa6'
import { FaRegSave, FaSave } from 'react-icons/fa'

const EditarAgendamento = () => {

  const [paciente, setPaciente] = React.useState([]);
  const [agendamentos, setAgendamentos] = React.useState([]);
  const [diasDoMes, setDiasDoMes] = React.useState({});
  const [agendamento,setAgendamento] = React.useState({});

  const pacienteResponse = ([
    { id: 1, nome: "Usuario da Silva", horario: "14:00", diaSemana: 2, data: "22/04/2025", status: "Pendente" },
  ]);

  React.useEffect(() => {
    const selectedPaciente = pacienteResponse.find(p => p.id === 1);
    if (selectedPaciente) {
      setPaciente(selectedPaciente);
        setDiasDoMes({
            diaMes: Array.from({ length: 4 }, (_, i) => {
                const data = new Date();
                data.setDate(data.getDate() + i * 7 + ((selectedPaciente.diaSemana - data.getDay() + 7) % 7));
                return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
            }),
        });
    }
}, []);




  const agendamentosResponse = ([
    { data: "2023-10-01", horario: "10:00", idPaciente: 1, status: "Compareceu" },
    { data: "2023-10-01", horario: "10:00", idPaciente: 1, status: "Cancelou" },
    { data: "2023-10-01", horario: "10:00", idPaciente: 1, status: "Reagendou" },
    { data: "2023-10-01", horario: "10:00", idPaciente: 1, status: "Pendente" },
    { data: "2023-10-01", horario: "10:00", idPaciente: 1, status: "Compareceu" },
  ]);

  

  React.useEffect(() => {
    if (paciente && paciente.id) {
        const filteredAgendamentos = agendamentosResponse.filter(
            agendamento => agendamento.idPaciente === paciente.id
        );
        setAgendamentos(filteredAgendamentos);
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

  const handleAtualizarAgendamento = (e) => {
    e.preventDefault();

    const updatedPaciente = {
      ...paciente,
      data: paciente.data,
      horario: paciente.horario,
      status: paciente.status,
    };
    setPaciente(updatedPaciente);

    
    alert("Agendamento atualizado com sucesso!");
    console.log("Paciente atualizado:", updatedPaciente);
    console.log("Paciente objeto:", paciente);
  }

  



  return (
    <>
      <MenuLateralComponent />
      <MainComponent
        title={'Editar Agendamento'}
        headerContent={
          <button className="btn_agendamento" onClick={() => window.location.href = '/dashboard/agendamentos'}>
            {"< Voltar"}
          </button>
        }
      >

        <form className='form-editar-agendamento'

          noValidates
          onSubmit={handleAtualizarAgendamento}>
          <div className='div-escolher-paciente'>
            {paciente && (
              <div className="paciente-info">
                <p><strong>Paciente Selecionado:</strong> {paciente.nome}</p>
                <p><strong>Horário para Consultas:</strong> {paciente.horario}</p>
                <p><strong>Dia para Consultas:</strong> {getNomeDiaSemana(paciente.diaSemana)}</p>
                <p><strong>Data Marcada:</strong> {paciente.data}</p>
                <div className="pendente-container">
                  <span className={`status ${paciente.status === 'Pendente' ? 'status-sessao-pendente' :
                    paciente.status === 'Confirmado' ? 'status-sessao-ok' :
                      paciente.status === 'Cancelado' ? 'status-cancelado' :
                        ''
                    }`}>
                    {paciente.status}
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

          <div className='container-sessao'>
            <div className='container-inputs flex gap-2'>
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
                width={"w-full"}
              />
            </div>
            {paciente && (
              <div className='agendamentos-container'>
                <h3>Últimos Agendamentos</h3>
                <div className='agendamentos-list'>
                  {agendamentos.map((agendamento, index) => {
                    const getStatusSessaoClass = () => {
                      switch (agendamento.status) {
                        case 'Compareceu':
                          return 'status-sessao-ok';
                        case 'Pendente':
                          return 'status-sessao-pendente';
                        case 'Cancelou':
                          return 'status-sessao-cancelado';
                        case 'Reagendou':
                          return 'status-sessao-reagendado';
                        default:
                          return 'status-sessao-default';
                      }
                    };
                    return (
                      <div key={index} className="agendamento-item">
                        <p><strong>Data:</strong> {agendamento.data}</p>
                        <p><strong>Horário:</strong> {agendamento.horario}</p>
                        <p><span className={`status ${getStatusSessaoClass()}`}>{agendamento.status}</span></p>
                      </div>
                    )
                  }
                  )}
                </div>
              </div>
            )}
          </div>
          <div className='w-[80%]'>
            <button
              className='btn_secundario rounded-full flex gap-2'
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