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
  const [agendamento, setAgendamento] = React.useState({});
  const [diaSemana, setDiaSemana] = React.useState(0);


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

          <div className='container-sessao-editar'>
            <div className='container-inputs-editar flex gap-2'>
              <div className="select-container w-full">
                <label htmlFor="diaSemana" className="input-label">Novo Dia da Semana:</label>
                <select
                  id="diaSemana"
                  name="diaSemana"
                  required
                  className="select-field w-full"
                  value={paciente?.diaSemana || ''}
                  onChange={handleDiaSemanaChange}
                >
                  <option value="" disabled>Selecione um dia da semana</option>
                  {paciente && Array.from({ length: 7 }, (_, i) => (
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