import React, { useEffect } from 'react'
import './CadastrarAgendamento.css'
import { useParams, useSearchParams } from 'react-router-dom'
import MenuLateralComponent from '../../components/MenuLateral/MenuLateralComponent'
import { errorMessage, responseMessage } from '../../../../utils/alert.js'
import MainComponent from '../../components/MainComponent/MainComponent.jsx'
import Checkbox from '../../components/Checkbox/Checkbox.jsx'
import { getPacientesPorId } from '../../../../provider/api/pacientes/fetchs-pacientes.js'
import { getAgendamentosPorPaciente, postAgendamento } from '../../../../provider/api/agendamentos/fetchs-agendamentos'; // Importa a função de adicionar agendamento
import { getPreferenciasPorId } from '../../../../provider/api/preferencias/fetchs-preferencias.js'
import UserSearch from '../../components/UserSearch/UserSearch.jsx'
import {
    getProximosDias,
    getProximosDiasDoMes,
    getNomeDiaSemana,
    formatDateToBackend,
    formatHoraToBackend,
    montarPacienteComPadrao
} from '../../../../utils/agendamentoUtils';

const CadastrarAgendamento = ({ paciente }) => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [agendamentos, setAgendamentos] = React.useState([]);
    const [pacienteSelecionado, setPacienteSelecionado] = React.useState();
    const [query, setQuery] = React.useState(paciente ? paciente.nome : '');
    const [statusPlanoMensal, setStatusPlanoMensal] = React.useState(false);
    const [horario, setHorario] = React.useState();
    const [preferencias, setPreferencias] = React.useState([]);
    const [diaSemana, setDiaSemana] = React.useState('');
    const [diasDoMes, setDiasDoMes] = React.useState([]);
    const [diaMesSelecionado, setDiaMesSelecionado] = React.useState('');

    useEffect(() => {
        const fetchPreferencias = async () => {
            try {
                if (pacienteSelecionado && pacienteSelecionado.id) {
                    const response = await getPreferenciasPorId(pacienteSelecionado.id);
                    setPreferencias(response);
                    console.log("Preferências carregadas:", response);
                }
            } catch (err) {
                console.error('Erro ao buscar preferências:', err);
                errorMessage('Erro ao carregar as preferências.', 'small');
            }
        };

        fetchPreferencias();
    }, [pacienteSelecionado]);

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
                        tipo: pacienteResponse.tipo || "AVULSO",
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
    useEffect(() => {
        const fetchAgendamentosPorPaciente = async () => {
            try {
                if (pacienteSelecionado && pacienteSelecionado.id) {
                    const response = await getAgendamentosPorPaciente(pacienteSelecionado.id);
                    setAgendamentos(response);
                    console.log("Agendamentos carregados:", response);
                }
            } catch (error) {
                console.error("Erro ao buscar agendamentos por paciente:", error);
                errorMessage("Erro ao carregar os agendamentos.", "small");
            }
        };

        fetchAgendamentosPorPaciente();
    }, [pacienteSelecionado]);

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
            return;
        }

        const [hour, minute, second] = (pacienteSelecionado.horario || horario || "08:00").split(':');

        try {
            if (statusPlanoMensal) {
                const promises = Array.from({ length: 4 }).map((_, index) => {
                    const [day, month, year] = (pacienteSelecionado.selectedDate || "").split("/");
                    const baseDate = new Date(`${year}-${month}-${day}T00:00:00`);
                    baseDate.setDate(baseDate.getDate() + index * 7);
                    const dataFormatada = baseDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
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
                            }
                        },
                        data: formatDateToBackend(dataFormatada),
                        hora: formatHoraToBackend(pacienteSelecionado.horario || horario),
                        tipo: pacienteSelecionado.tipo || "AVULSO",
                        statusSessao: "PENDENTE",
                        anotacao: "teste",
                    };

                    console.log("Agendamento (Plano Mensal):", novoAgendamento);
                    return postAgendamento(novoAgendamento);
                });

                await Promise.all(promises);
                responseMessage("Agendamentos cadastrados com sucesso!", "small");
            } else {
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
                        }
                    },
                    data: formatDateToBackend(pacienteSelecionado.selectedDate),
                    hora: formatHoraToBackend(pacienteSelecionado.horario || horario),
                    tipo: pacienteSelecionado.tipo || "AVULSO",
                    statusSessao: "PENDENTE",
                    anotacao: "teste",
                };

                console.log("Agendamento (Data Única):", novoAgendamento);
                await postAgendamento(novoAgendamento);
                responseMessage("Agendamento cadastrado com sucesso!", "small");
            }
        } catch (error) {
            console.error("Erro ao cadastrar agendamento:", error);
            errorMessage("Erro ao cadastrar agendamento.", "small");
        } finally {
            responseMessage("Agendamentos cadastrados com sucesso!", "small");
            setTimeout(() => {
                window.location = '/dashboard/agendamentos';
            }, 1200);
        }
    };

    React.useEffect(() => {
        if (paciente) {
            setPacienteSelecionado(paciente);
            setQuery(paciente.nome);
        }
    }, [paciente]);


    const handleDiaSemanaChange = (e) => {
        const selected = parseInt(e.target.value, 10);
        setDiaSemana(selected);
        const dias = getProximosDiasDoMes(selected);
        setDiasDoMes(dias);
        setDiaMesSelecionado(dias[0]);
        setPacienteSelecionado(prev => ({
            ...prev,
            diaSemana: selected,
            selectedDate: dias[0]
        }));
    };

    React.useEffect(() => {
        if (pacienteSelecionado && pacienteSelecionado.diaSemana !== undefined) {
            setDiaSemana(pacienteSelecionado.diaSemana);
            const dias = getProximosDiasDoMes(pacienteSelecionado.diaSemana);
            setDiasDoMes(dias);
            if (pacienteSelecionado.selectedDate !== dias[0]) {
                setPacienteSelecionado(prev => ({
                    ...prev,
                    selectedDate: dias[0]
                }));
            }
        }
    }, [pacienteSelecionado]);

    useEffect(() => {
        const timeSlotParam = searchParams.get('timeSlot');
        const dayParam = searchParams.get('day');

        if (dayParam) {
            setDiaMesSelecionado(dayParam);
            const [dia, mes, ano] = dayParam.split('/');
            const data = new Date(Number(ano), Number(mes) - 1, Number(dia));
            const jsDiaSemana = data.getDay();
            const diaSemanaSelect = jsDiaSemana >= 1 && jsDiaSemana <= 5 ? jsDiaSemana : 1;

            setDiaSemana(diaSemanaSelect);
            setPacienteSelecionado(prev => prev ? {
                ...prev,
                selectedDate: dayParam,
                diaSemana: diaSemanaSelect
            } : prev);
        }
        if (timeSlotParam) {
            setHorario(timeSlotParam);
            setPacienteSelecionado(prev => prev ? { ...prev, horario: timeSlotParam } : prev);
        }
    }, [searchParams]);

    return (
        <>
            <MenuLateralComponent />
            <MainComponent
                title="Cadastrar Agendamento"
                headerContent={
                    <div className='flex w-full justify-start'>
                        <button className="btn_agendamento" onClick={() => window.location.href = '/dashboard/agendamentos'}>
                            {"< Voltar"}
                        </button>
                    </div>
                }>
                <form className='form-cadastrar-agendamento'
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <div className='w-[80%] div-escolher-paciente'>
                        <UserSearch
                            onUserSelect={p =>
                                setPacienteSelecionado(
                                    p
                                        ? montarPacienteComPadrao(p, {
                                            horario: pacienteSelecionado?.horario || horario,
                                            selectedDate: pacienteSelecionado?.selectedDate || diaMesSelecionado,
                                            diaSemana: pacienteSelecionado?.diaSemana || diaSemana,
                                        })
                                        : undefined
                                )
                            }
                        />

                        {!pacienteSelecionado || !pacienteSelecionado.id ? (
                            <p className="mensagem-escolha-paciente">Selecione um paciente para continuar.</p>
                        ) : (
                            <div className="paciente-info">
                                <p><strong>Paciente:</strong> {pacienteSelecionado.nome}</p>
                                <p><strong>Dia para Consultas:</strong> {getNomeDiaSemana(preferencias.diaSemana)}</p>
                                <p><strong>Horário para Consultas:</strong> {preferencias.horario || "Indefinido"}</p>
                            </div>
                        )}
                    </div>

                    <div className='container-sessao'>
                        {(!pacienteSelecionado || !pacienteSelecionado.id) ? (
                            <p className="mensagem-escolha-paciente">Nenhum paciente selecionado. Por favor, escolha um paciente para continuar.</p>
                        ) : (
                            <>
                                <div className='container-inputs flex gap-2'>
                                    <div className="select-container w-full">
                                        <label htmlFor="diaSemana" className="input-label">Dia da Semana</label>
                                        <select
                                            id="diaSemana"
                                            name="diaSemana"
                                            required
                                            className="select-field w-full"
                                            value={diaSemana}
                                            onChange={handleDiaSemanaChange}
                                        >
                                            <option value="" disabled>Selecione um dia da semana</option>
                                            <option value={1}>Segunda-feira</option>
                                            <option value={2}>Terça-feira</option>
                                            <option value={3}>Quarta-feira</option>
                                            <option value={4}>Quinta-feira</option>
                                            <option value={5}>Sexta-feira</option>
                                        </select>
                                    </div>
                                    <div className="select-container w-full">
                                        <label htmlFor="diaMes" className="input-label">Dia do Mês</label>
                                        <select
                                            id="diaMes"
                                            name="diaMes"
                                            required
                                            className="select-field w-full"
                                            value={diaMesSelecionado}
                                            onChange={e => {
                                                setDiaMesSelecionado(e.target.value);
                                                setPacienteSelecionado(prev => ({
                                                    ...prev,
                                                    selectedDate: e.target.value
                                                }));
                                            }}
                                        >
                                            <option value="" disabled>Selecione o dia do mês</option>
                                            {diasDoMes.map((dia, idx) => (
                                                <option key={idx} value={dia}>{dia}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="select-container w-full">
                                        <label htmlFor="horario" className="input-label">Horário</label>
                                        <select
                                            id="horario"
                                            name="horario"
                                            required
                                            className="select-field w-full"
                                            value={pacienteSelecionado?.horario || horario}
                                            onChange={e =>
                                                setPacienteSelecionado(prev => ({
                                                    ...prev,
                                                    horario: e.target.value,
                                                }))
                                            }
                                        >
                                            <option value="" disabled>Selecione um horário</option>
                                            {Array.from({ length: 9 }, (_, i) => {
                                                const hour = (8 + i).toString().padStart(2, '0');
                                                if (hour === "12") return null; // Não renderiza 12:00
                                                return (
                                                    <option key={hour} value={`${hour}:00`}>
                                                        {`${hour}:00`}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                    <Checkbox
                                        labelTitle="Plano mensal ativo?"
                                        onChange={handlePlanoMensal}
                                        checked={statusPlanoMensal}
                                    />
                                </div>

                                <div className='agendamentos-container'>
                                    <h3>Últimos Agendamentos</h3>
                                    <div className='agendamentos-list'>
                                        {agendamentos.length > 0 ? (
                                            agendamentos.map((agendamento, index) => (
                                                <div key={index} className="agendamento-item">
                                                    <p><strong>Data:</strong> {new Date(agendamento.data).toLocaleDateString('pt-BR')}</p>
                                                    <p><strong>Horário:</strong> {agendamento.hora}</p>
                                                    <p><strong>Status:</strong> {agendamento.statusSessao}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Nenhum agendamento encontrado para este paciente.</p>
                                        )}
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