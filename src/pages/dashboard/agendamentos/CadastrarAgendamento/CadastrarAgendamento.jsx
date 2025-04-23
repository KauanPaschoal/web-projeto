import React, { use, useEffect } from 'react'
import './CadastrarAgendamento.css'
import { useParams } from 'react-router-dom'
import MenuLateralComponent from '../../components/MenuLateral/MenuLateralComponent'
import InputField from '../../components/InputField/InputField'
import { FaSearch, FaUser } from 'react-icons/fa'
import { errorMessage, responseMessage } from '../../../../utils/alert.js'
import axios from 'axios';
import MainComponent from '../../components/MainComponent/MainComponent.jsx'
import Checkbox from '../../components/Checkbox/Checkbox.jsx'
import { getPacientesPorId, getPacientes } from '../../../../provider/api/pacientes/fetchs-pacientes.js'

const CadastrarAgendamento = ({ paciente }) => {
    const { id } = useParams();
    const [pacientes, setPacientes] = React.useState([]);
    const [agendamentos, setAgendamentos] = React.useState([]);
    const [pacienteSelecionado, setPacienteSelecionado] = React.useState([paciente || null]);
    const [query, setQuery] = React.useState(paciente ? paciente.nome : '');
    const [showSuggestions, setShowSuggestions] = React.useState(false);
    const [statusPlanoMensal, setStatusPlanoMensal] = React.useState(false);
    const [proximosDias, setProximosDias] = React.useState([]);

    const [horario, setHorario] = React.useState('10:00');

    useEffect(() => {
        if (id) {
            const fetchPaciente = async () => {
                try {
                    const pacienteResponse = await getPacientesPorId(id);
                    const diasCalculados = getProximosDias(pacienteResponse.diaSemana);
                    const updatedPaciente = {
                        ...pacienteResponse,
                        diaMes: diasCalculados,
                        horario: pacienteResponse.horario || "00:00",
                        selectedDate: pacienteResponse.selectedDate || "00/00",
                        planoMensal: pacienteResponse.planoMensal || false,
                        statusAgendamento: pacienteResponse.statusAgendamento || "Pendente",

                    };
                    setPacienteSelecionado(updatedPaciente);
                    setQuery(pacienteResponse.nome);
                    console.log(pacienteResponse);
                } catch (error) {
                    console.error("Erro ao buscar paciente:", error);
                }
            };

            fetchPaciente();
        }
    }, [id]);


            const getProximosDias = (diaSemana) => {
                const hoje = new Date();
                const dias = [];
                diaSemana = diaSemana || hoje.getDay();
                const inicio = 7; // Começa a contar a partir de uma semana a partir de hoje
                const qtdDias = 4;

                for (let i = 0; i < qtdDias; i++) {
                    const proximoDia = new Date(hoje);
                    const diferenca = ((diaSemana - hoje.getDay() + 7) % 7) + inicio + i * 7;
                    proximoDia.setDate(hoje.getDate() + diferenca);
                    dias.push(proximoDia.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }));
                }
                setProximosDias(dias);
                return dias;
            };

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
                return dias[diaSemana] || "Indefinido";
            };

            // useEffect(() => {
            //     console.log("Proximos dias: ", proximosDias);
            // }, [proximosDias]);

            useEffect(() => {
                const fetchPacientes = async () => {
                    try {
                        const data = await getPacientes(); // Chama a função de busca de pacientes
                        setPacientes(data); // Atualiza o estado com os pacientes retornados
                    } catch (error) {
                        console.error("Erro ao buscar usuários:", error);
                    }
                };

                fetchPacientes();
            }, []);


            const handlePacienteSearch = (query) => {
                setQuery(query);



                const filteredPacientes = pacientes.filter(paciente =>
                    paciente.nome.toLowerCase().includes(query.toLowerCase())
                );

                if (filteredPacientes.length === 1) {
                    const selectedPaciente = filteredPacientes[0];
                    setPacienteSelecionado({
                        ...selectedPaciente,
                        diaMes:
                            getProximosDias(selectedPaciente.diaSemana)
                    });

                    const filteredAgendamentos = agendamentos.filter(
                        agendamento => agendamento.idPaciente === selectedPaciente.id
                    );
                    setAgendamentos(filteredAgendamentos);
                } else {
                    setPacienteSelecionado(null);
                    setAgendamentos([]);
                }

                setPacientes(filteredPacientes);
                setShowSuggestions(true);
            };

            const handleSelectPaciente = (paciente) => {
                setQuery(paciente);
                handlePacienteSearch(paciente);
                setShowSuggestions(false);
            };

            const handleBlur = () => {
                setTimeout(() => setShowSuggestions(false), 200);
            };

            const handlePlanoMensal = (e) => {
                const isChecked = e.target.checked;
                setStatusPlanoMensal(isChecked);
                setPacienteSelecionado((prevPaciente) => ({
                    ...prevPaciente,
                    planoMensal: isChecked,
                }));
            };

            React.useEffect(() => {
                setPacienteSelecionado((prevPaciente) => ({
                    ...prevPaciente,
                    planoMensal: statusPlanoMensal,
                }));
            }, [statusPlanoMensal]);



            const handleSubmit = async (e) => {
                e.preventDefault();

                if (!pacienteSelecionado) {
                    errorMessage("Por favor, escolha um paciente para continuar.", "small");
                    return;
                }

                if (!pacienteSelecionado.selectedDate) {
                    errorMessage("Por favor, escolha uma data para continuar.", "small");
                    return;
                }

                if (!pacienteSelecionado.horario) {
                    errorMessage("Por favor, escolha um horário para continuar.", "small");
                    return;
                }

                try {
                    if (statusPlanoMensal) {

                        const promises = pacienteSelecionado.diaMes.map(async (dia) => {
                            const novoAgendamento = {
                                idPaciente: pacienteSelecionado.id,
                                data: dia,
                                horario: pacienteSelecionado.horario,
                                statusAgendamento: "Pendente",
                            };

                            // Enviar a requisição para cada data
                            // return axios.post('/api/agendamentos', novoAgendamento);
                            console.log("Agendamento (Plano Mensal):", novoAgendamento);
                            return novoAgendamento;
                        });

                        // Aguarda todas as requisições serem concluídas
                        await Promise.all(promises);
                        responseMessage("Agendamentos cadastrados com sucesso!", "small");
                    } else {
                        // Fazer apenas uma requisição com a data escolhida
                        const novoAgendamento = {
                            idPaciente: pacienteSelecionado.id,
                            data: pacienteSelecionado.selectedDate,
                            horario: pacienteSelecionado.horario,
                            statusAgendamento: "Pendente",
                        };
                        console.log("Agendamento (Data Única):", novoAgendamento);
                        // await axios.post('/api/agendamentos', novoAgendamento);
                        responseMessage("Agendamento cadastrado com sucesso!", "small");
                    }
                } catch (error) {
                    console.error("Erro ao cadastrar agendamento:", error);
                    errorMessage("Erro ao cadastrar agendamento.", "small");
                }
            };

            React.useEffect(() => {
                if (paciente) {
                    setPacienteSelecionado(paciente);
                    setQuery(paciente.nome);
                }
            }, [paciente]);

            React.useEffect(() => {
                const fetchPacientes = async () => {
                    try {
                        const response = await axios.get('/api/pacientes');
                        setPacientes(response.data);
                    } catch (error) {
                        console.error("Erro ao buscar pacientes:", error);
                        errorMessage("Erro ao carregar a lista de pacientes.", "small");
                    }
                };

                fetchPacientes();
            }, []);



            return (
                <>
                    <MenuLateralComponent />
                    <MainComponent
                        title="Cadastrar Agendamento"
                        headerContent={
                            <button className="btn_agendamento" onClick={() => window.location.href = '/dashboard/agendamentos'}>
                                {"< Voltar"}
                            </button>
                        }>
                        <form className='form-cadastrar-agendamento'
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <div className='w-[80%]'>
                                <InputField
                                    type="text"
                                    id="paciente"
                                    name="paciente"
                                    placeholder="Nome do Paciente"
                                    labelTitle="Escolha o Paciente"
                                    onChange={(e) => handlePacienteSearch(e.target.value)}
                                    value={query}
                                    onBlur={handleBlur}
                                    required
                                    className="styled-input"
                                    width={"w-[30%]"}
                                    icon={<FaUser />}
                                />
                                {showSuggestions && pacientes.length > 0 && (
                                    <ul className="suggestions-list">
                                        {pacientes.map((paciente, index) => (
                                            <li
                                                key={index}
                                                onMouseDown={() => handleSelectPaciente(paciente.nome)}
                                                className="suggestion-item"
                                            >
                                                {paciente.nome}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className='div-escolher-paciente'>
                                {!pacienteSelecionado || query === '' || pacienteSelecionado.nome !== query ? (
                                    <p className="mensagem-escolha-paciente">Selecione um paciente para continuar.</p>
                                ) : (
                                    <div className="paciente-info">
                                        <p><strong>Paciente:</strong> {pacienteSelecionado.nome}</p>
                                        <p><strong>Horário para Consultas:</strong> {pacienteSelecionado.horario || "Indefinido"}</p>
                                        <p><strong>Dia para Consultas:</strong> {getNomeDiaSemana(pacienteSelecionado.diaSemana)}</p>
                                    </div>
                                )}
                            </div>

                            <div className='container-sessao'>
                                {(!pacienteSelecionado || query === '' || pacienteSelecionado.nome !== query) ? (
                                    <p className="mensagem-escolha-paciente">Nenhum paciente selecionado. Por favor, escolha um paciente para continuar.</p>
                                ) : (
                                    <>
                                        <div className='container-inputs flex gap-2'>
                                            <div className="select-container w-full">
                                                <label htmlFor="data" className="input-label">Data:</label>
                                                <select
                                                    id="data"
                                                    name="data"
                                                    required
                                                    className="select-field w-full"
                                                    value={pacienteSelecionado?.selectedDate || ''}
                                                    onChange={(e) => setPacienteSelecionado({
                                                        ...pacienteSelecionado,
                                                        selectedDate: e.target.value
                                                    })}
                                                >
                                                    <option value="" disabled>Selecione uma data</option>
                                                    {pacienteSelecionado && pacienteSelecionado.diaMes
                                                        .filter(dia => new Date(dia.split('/').reverse().join('/')) > new Date())
                                                        .map((dia, index) => (
                                                            <option key={index} value={dia}>
                                                                {dia}
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
                                                value={pacienteSelecionado?.horario || horario}
                                                readOnly={pacienteSelecionado && pacienteSelecionado.nome === query ? false : true}
                                                className={"w-full"}
                                                width={"w-full"}
                                            />
                                            <Checkbox
                                                labelTitle="Plano mensal ativo?"
                                                onChange={handlePlanoMensal}
                                                checked={statusPlanoMensal}
                                            />
                                        </div>

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
                                                })}
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className='flex gap-2'>
                                <button type="submit" className='btn_primario rounded-full' >Salvar Alterações</button>
                                <button className='btn_secundario rounded-full'
                                    onClick={() => window.location.href = '/dashboard/agendamentos'}
                                    type="button"
                                >Cancelar</button>
                            </div>
                        </form>
                    </MainComponent >
                </>
            );
        };

        export default CadastrarAgendamento