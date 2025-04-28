import React, { use, useEffect } from 'react'
import './CadastrarAgendamento.css'
import { useParams, useSearchParams } from 'react-router-dom'
import MenuLateralComponent from '../../components/MenuLateral/MenuLateralComponent'
import InputField from '../../components/InputField/InputField'
import { FaSearch, FaUser } from 'react-icons/fa'
import { errorMessage, responseMessage } from '../../../../utils/alert.js'
import axios from 'axios';
import MainComponent from '../../components/MainComponent/MainComponent.jsx'
import Checkbox from '../../components/Checkbox/Checkbox.jsx'
import { getPacientesPorId, getPacientes } from '../../../../provider/api/pacientes/fetchs-pacientes.js'
import { postAgendamento } from '../../../../provider/api/agendamentos/fetchs-agendamentos'; // Importa a função de adicionar agendamento
import { getPreferenciasPorId } from '../../../../provider/api/preferencias/fetchs-preferencias.js'

const CadastrarAgendamento = ({ paciente }) => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [pacientes, setPacientes] = React.useState([]);
    const [agendamentos, setAgendamentos] = React.useState([]);
    const [pacienteSelecionado, setPacienteSelecionado] = React.useState();
    const [query, setQuery] = React.useState(paciente ? paciente.nome : '');
    const [showSuggestions, setShowSuggestions] = React.useState(false);
    const [statusPlanoMensal, setStatusPlanoMensal] = React.useState(false);
    const [proximosDias, setProximosDias] = React.useState([]);
    const [horario, setHorario] = React.useState('10:00');
    const [preferencias, setPreferencias] = React.useState([]);



    useEffect(() => {
        const fetchPreferencias = async () => {
            try {
                if (pacienteSelecionado && pacienteSelecionado.id) { // Verifica se há um paciente selecionado
                    const response = await getPreferenciasPorId(pacienteSelecionado.id); // Chama a função do provider
                    setPreferencias(response); // Atualiza o estado com as preferências
                    console.log("Preferências carregadas:", response);
                }
            } catch (err) {
                console.error('Erro ao buscar preferências:', err);
                errorMessage('Erro ao carregar as preferências.', 'small');
            }
        };

        fetchPreferencias();
    }, [pacienteSelecionado]); // Executa apenas quando o pacienteSelecionado mudar

    useEffect(() => {
        const queryTimeSlot = searchParams.get('timeSlot');
        const queryDay = searchParams.get('day');

        // Atualiza apenas se os valores forem diferentes
        if (queryTimeSlot && queryTimeSlot !== horario) {
            setHorario(queryTimeSlot);
        }

        if (queryDay && pacienteSelecionado?.selectedDate !== queryDay) {
            setPacienteSelecionado((prev) => ({
                ...prev,
                selectedDate: queryDay,
            }));
        }
    }, [searchParams]); // Removido pacienteSelecionado para evitar loops


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
                    setPacienteSelecionado(prev => ({
                        ...selectedPaciente,
                        diaMes: getProximosDias(selectedPaciente.diaSemana),
                        selectedDate: prev?.selectedDate || selectedPaciente.selectedDate || '',
                        horario: prev?.horario || selectedPaciente.horario || horario,
                        anotacao: prev?.anotacao || selectedPaciente.anotacao || 'mensagem',
                    }));

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
                    tipo: isChecked ? "PLANO" : "AVULSO",
                }));
            };

            React.useEffect(() => {
                setPacienteSelecionado((prevPaciente) => ({
                    ...prevPaciente,
                    planoMensal: statusPlanoMensal,
                }));
            }, [statusPlanoMensal]);



            const formatDateToBackend = (date) => {
                const [day, month, year] = date.split('/');
                return `${year}-${month}-${day}`; // Converte para o formato yyyy-MM-dd
            };

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

                if (!pacienteSelecionado.tipo) {
                    errorMessage("Por favor, escolha o tipo de sessão.", "small");
                    console.log("Tipo de sessão não definido." + pacienteSelecionado);
                    return;
                }

                if (!pacienteSelecionado.anotacao) {
                    errorMessage("Por favor, adicione uma anotação.", "small");
                    return;
                }

                // Validação: Verifica se o horário é no futuro
                const [hour, minute] = pacienteSelecionado.horario.split(":").map(Number);
                const now = new Date();
                const selectedDateTime = new Date(
                    formatDateToBackend(pacienteSelecionado.selectedDate) + `T${hour}:${minute}:00`
                );

                if (selectedDateTime <= now) {
                    errorMessage("O horário deve ser no futuro.", "small");
                    return;
                }

                try {
                    if (statusPlanoMensal) {
                        // Cria agendamentos para todas as datas do plano mensal
                        const promises = pacienteSelecionado.diaMes.map(async (dia) => {
                            const novoAgendamento = {
                                fkPaciente: {
                                    id: pacienteSelecionado.id,
                                    nome: pacienteSelecionado.nome,
                                    cpf: pacienteSelecionado.cpf || "000.000.000-00",
                                    email: pacienteSelecionado.email,
                                    status: "ATIVO",
                                    fkPlano: {
                                        id: pacienteSelecionado.fkPlano?.id || 0,
                                        categoria: pacienteSelecionado.fkPlano?.categoria || "Básico",
                                        preco: pacienteSelecionado.fkPlano?.preco || 0,
                                    },
                                },
                                data: formatDateToBackend(dia),
                                hora: pacienteSelecionado.horario,
                                tipo: pacienteSelecionado.tipo,
                                statusSessao: "PENDENTE",
                                anotacao: pacienteSelecionado.anotacao,
                            };

                            console.log("Agendamento (Plano Mensal):", novoAgendamento);
                            return postAgendamento(novoAgendamento);
                        });

                        await Promise.all(promises);
                        responseMessage("Agendamentos cadastrados com sucesso!", "small");
                    } else {
                        // Cria apenas um agendamento para a data selecionada
                        const novoAgendamento = {
                            fkPaciente: {
                                id: pacienteSelecionado.id,
                                nome: pacienteSelecionado.nome,
                                cpf: pacienteSelecionado.cpf || "000.000.000-00",
                                email: pacienteSelecionado.email,
                                status: "ATIVO",
                                fkPlano: {
                                    id: pacienteSelecionado.fkPlano?.id || 0,
                                    categoria: pacienteSelecionado.fkPlano?.categoria || "Básico",
                                    preco: pacienteSelecionado.fkPlano?.preco || 0,
                                },
                            },
                            data: formatDateToBackend(pacienteSelecionado.selectedDate),
                            hora: pacienteSelecionado.horario,
                            tipo: pacienteSelecionado.tipo || "AVULSO",
                            statusSessao: "PENDENTE",
                            anotacao: pacienteSelecionado.anotacao,
                        };

                        console.log("Agendamento (Data Única):", novoAgendamento);
                        await postAgendamento(novoAgendamento);
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
                                    width={"w-[40%]"}
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
                                        <p><strong>Horário para Consultas:</strong> {preferencias.horario || "Indefinido"}</p>
                                        <p><strong>Dia para Consultas:</strong> {getNomeDiaSemana(preferencias.diaSemana)}</p>
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
                                                    onChange={(e) =>
                                                        setPacienteSelecionado({
                                                            ...pacienteSelecionado,
                                                            selectedDate: e.target.value,
                                                        })
                                                    }
                                                >
                                                    <option value="" disabled>Selecione uma data</option>
                                                    {(() => {
                                                        // Obtenha a lista de dias padrão
                                                        let dias = pacienteSelecionado?.diaMes || [];
                                                        const queryDay = searchParams.get('day');

                                                        // Adiciona a nova opção como a primeira, se existir um valor em queryDay
                                                        const options = [];
                                                        if (queryDay) {
                                                            options.push(
                                                                <option key="queryDay" value={queryDay}>
                                                                    {queryDay} (Selecionado)
                                                                </option>
                                                            );
                                                        }

                                                        // Adiciona os dias padrão
                                                        dias.forEach((dia, index) => {
                                                            options.push(
                                                                <option key={index} value={dia}>
                                                                    {dia}
                                                                </option>
                                                            );
                                                        });

                                                        return options;
                                                    })()}
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
                                                onChange={(e) =>
                                                    setPacienteSelecionado((prev) => ({
                                                        ...prev,
                                                        horario: e.target.value,
                                                    }))
                                                }
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