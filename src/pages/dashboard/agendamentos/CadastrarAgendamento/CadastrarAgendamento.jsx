import React from 'react'
import './CadastrarAgendamento.css'
import MainComponent from '../../components/mainComponent/MainComponent'
import MenuLateralComponent from '../../components/MenuLateral/MenuLateralComponent'
import InputField from '../../components/InputField/InputField'
import { FaSearch, FaUser } from 'react-icons/fa'
import { errorMessage, responseMessage } from '../../../../utils/alert.js'
import axios from 'axios';

const CadastrarAgendamento = ({ paciente }) => {
    const [pacientes, setPacientes] = React.useState([]);
    const [agendamentos, setAgendamentos] = React.useState([]);
    const [pacienteSelecionado, setPacienteSelecionado] = React.useState(paciente || null);
    const [query, setQuery] = React.useState(paciente ? paciente.nome : '');
    const [showSuggestions, setShowSuggestions] = React.useState(false);



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


    const handlePacienteSearch = (query) => {
        setQuery(query);
        const allPacientes = [
            { id: 1, nome: "Paciente 1", diaSemana: 1, horario: "10:00" },
            { id: 2, nome: "paeciente 2", diaSemana: 3, horario: "14:00" },
            { id: 3, nome: "paegiente 3", diaSemana: 5, horario: "09:00" },
            { id: 4, nome: "paegente 4", diaSemana: 0, horario: "11:00" },
        ];


        const agendamentos = [
            { data: "2023-10-01", horario: "10:00", idPaciente: 1, status: "Compareceu" },
            { data: "2023-10-02", horario: "14:00", idPaciente: 2, status: "Cancelou" },
            { data: "2023-10-03", horario: "09:00", idPaciente: 3, status: "Reagendou" },
            { data: "2023-10-04", horario: "11:00", idPaciente: 4, status: "Pendente" },
            { data: "2023-10-05", horario: "10:30", idPaciente: 1, status: "Compareceu" },
            { data: "2023-10-06", horario: "15:00", idPaciente: 2, status: "Cancelou" },
            { data: "2023-10-07", horario: "08:30", idPaciente: 3, status: "Reagendou" },
            { data: "2023-10-08", horario: "12:00", idPaciente: 4, status: "Pendente" },
            { data: "2023-10-09", horario: "09:00", idPaciente: 1, status: "Compareceu" },
            { data: "2023-10-10", horario: "13:00", idPaciente: 2, status: "Cancelou" },
            { data: "2023-10-11", horario: "10:00", idPaciente: 3, status: "Reagendou" },
            { data: "2023-10-12", horario: "11:30", idPaciente: 4, status: "Pendente" },
            { data: "2023-10-13", horario: "14:00", idPaciente: 1, status: "Compareceu" },
            { data: "2023-10-14", horario: "16:00", idPaciente: 2, status: "Cancelou" },
            { data: "2023-10-15", horario: "07:30", idPaciente: 3, status: "Reagendou" },
            { data: "2023-10-16", horario: "10:00", idPaciente: 4, status: "Pendente" },
            { data: "2023-10-17", horario: "09:30", idPaciente: 1, status: "Compareceu" },
            { data: "2023-10-18", horario: "14:30", idPaciente: 2, status: "Cancelou" },
            { data: "2023-10-19", horario: "08:00", idPaciente: 3, status: "Reagendou" },
            { data: "2023-10-20", horario: "12:30", idPaciente: 4, status: "Pendente" },
        ];

        const filteredPacientes = allPacientes.filter(paciente =>
            paciente.nome.toLowerCase().includes(query.toLowerCase())
        );

        if (filteredPacientes.length === 1) {
            const selectedPaciente = filteredPacientes[0];
            setPacienteSelecionado({
                ...selectedPaciente,
                diaMes: Array.from({ length: 4 }, (_, i) => {
                    const data = new Date();
                    data.setDate(data.getDate() + i * 7 + (selectedPaciente.diaSemana - data.getDay() + 7) % 7);
                    return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
                }),
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        let novoAgendamento = {}
        if (!pacienteSelecionado) {
            errorMessage("Por favor, escolha um paciente para continuar.", "small")
        } else if (!pacienteSelecionado.selectedDate) {
            errorMessage("Por favor, escolha uma data para continuar.", "small")
        } else if (!pacienteSelecionado.horario) {
            errorMessage("Por favor, escolha um horário para continuar.", "small")
        } else {
            novoAgendamento = {
                idPaciente: pacienteSelecionado.id,
                data: pacienteSelecionado.selectedDate,
                horario: pacienteSelecionado.horario,
            };
            responseMessage("Agendamento cadastrado com sucesso!", "small")
        }
        console.log(novoAgendamento);
    }

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

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!pacienteSelecionado || !pacienteSelecionado.selectedDate || !pacienteSelecionado.horario) {
    //         alert("Por favor, preencha todos os campos antes de salvar.");
    //         return;
    //     }

    //     const novoAgendamento = {
    //         idPaciente: pacienteSelecionado.id,
    //         data: pacienteSelecionado.selectedDate,
    //         horario: pacienteSelecionado.horario,
    //     };

    //     try {
    //         const response = await fetch('/api/agendamentos', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(novoAgendamento),
    //         });

    //         if (response.ok) {
    //             alert("Agendamento cadastrado com sucesso!");
    //             setAgendamentos([...agendamentos, novoAgendamento]);
    //         } else {
    //             alert("Erro ao cadastrar o agendamento. Tente novamente.");
    //         }
    //     } catch (error) {
    //         console.error("Erro ao cadastrar o agendamento:", error);
    //         alert("Erro ao cadastrar o agendamento. Tente novamente.");
    //     }
    // };



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
                        {query === '' || pacientes.length !== 1 ? (
                            <p className="mensagem-escolha-paciente">Escolha um paciente</p>
                        ) : null}
                        {query !== '' && pacienteSelecionado && pacienteSelecionado.nome === query && (
                            <div className="paciente-info">
                                <p><strong>Paciente Selecionado:</strong> {pacienteSelecionado.nome}</p>
                                <p><strong>Horário para Consultas:</strong> {pacienteSelecionado.horario}</p>
                                <p><strong>Dia para Consultas:</strong> {getNomeDiaSemana(pacienteSelecionado.diaSemana)}</p>
                            </div>
                        )}
                    </div>

                    <div className='container-sessao'>
                        <div className='container-inputs flex gap-2'>
                            <div className="select-container w-full">
                                <label htmlFor="data" className="input-label">Data</label>
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
                                value={query !== '' && pacienteSelecionado && pacienteSelecionado.nome === query ? pacienteSelecionado.horario : ''}
                                readOnly={pacienteSelecionado && pacienteSelecionado.nome === query ? false : true}
                                className={"w-full"}
                            />
                        </div>
                        {query !== '' && pacienteSelecionado && pacienteSelecionado.nome === query && (
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
                    <div className='flex gap-2'>
                        <button type="submit" className='btn_primario rounded-full' >Salvar Alterações</button>
                        <button className='btn_secundario rounded-full'>Cancelar</button>
                    </div>
                </form>
            </MainComponent >
        </>
    );
};

export default CadastrarAgendamento