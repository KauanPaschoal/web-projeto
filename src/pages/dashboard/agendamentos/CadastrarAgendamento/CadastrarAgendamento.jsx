import React from 'react'
import './CadastrarAgendamento.css'
import MainComponent from '../../components/mainComponent/MainComponent'
import MenuLateralComponent from '../../components/MenuLateral/MenuLateralComponent'
import InputField from '../../components/InputField/InputField'
import { FaSearch, FaUser } from 'react-icons/fa'

const CadastrarAgendamento = ({ paciente }) => {
    const [pacientes, setPacientes] = React.useState([]);
    const [agendamentos, setAgendamentos] = React.useState([]);
    const [pacienteSelecionado, setPacienteSelecionado] = React.useState(paciente || null);
    const [query, setQuery] = React.useState(paciente ? paciente.nome : '');
    const [showSuggestions, setShowSuggestions] = React.useState(false);

    React.useEffect(() => {
        if (paciente) {
            setPacienteSelecionado(paciente);
            setQuery(paciente.nome);
        }
    }, [paciente]);

    const handlePacienteSearch = (query) => {
        setQuery(query);
        const allPacientes = [
            { nome: "Paciente 1", diaSemana: 1, horario: "10:00" },
            { nome: "Pecia 2", diaSemana: 3, horario: "14:00" },
            { nome: "Peaciente 3", diaSemana: 5, horario: "09:00" },
            { nome: "Peagte 4", diaSemana: 0, horario: "11:00" },
        ];

        const agendamentos = [
            { data: "2023-10-01", horario: "10:00", paciente: "Paciente 1" },
            { data: "2023-10-02", horario: "14:00", paciente: "Pecia 2" },
            { data: "2023-10-03", horario: "09:00", paciente: "Peaciente 3" },
            { data: "2023-10-04", horario: "11:00", paciente: "Peagte 4" },
            { data: "2023-10-05", horario: "10:00", paciente: "Paciente 1" },
            { data: "2023-10-06", horario: "14:00", paciente: "Pecia 2" },
            { data: "2023-10-07", horario: "09:00", paciente: "Peaciente 3" },
            { data: "2023-10-08", horario: "11:00", paciente: "Peagte 4" },
        ]

        const filteredAgendamentos = agendamentos.filter(agendamento => {
            const agendamentoData = new Date(agendamento.data);
            const agendamentoDia = agendamentoData.getDate();
            const agendamentoMes = agendamentoData.getMonth() + 1; // Meses começam do 0
            const agendamentoAno = agendamentoData.getFullYear();
            const agendamentoDiaFormatado = `${agendamentoDia < 10 ? '0' : ''}${agendamentoDia}/${agendamentoMes < 10 ? '0' : ''}${agendamentoMes}/${agendamentoAno}`;
            return agendamento.paciente.toLowerCase().includes(query.toLowerCase()) || agendamentoDiaFormatado.includes(query);
        });
        setAgendamentos(filteredAgendamentos);


        const getDiasDoMes = (diaSemana) => {
            const hoje = new Date();
            const mesAtual = hoje.getMonth();
            const anoAtual = hoje.getFullYear();
            const diasDoMes = [];
            const ultimoDiaDoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();

            for (let dia = 1; dia <= ultimoDiaDoMes; dia++) {
                const data = new Date(anoAtual, mesAtual, dia);
                if (data.getDay() === diaSemana) {
                    const diaFormatado = data.toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    });
                    diasDoMes.push(diaFormatado);
                }
            }

            return diasDoMes;
        };

        const allPacientesComDiaMes = allPacientes.map(paciente => ({
            ...paciente,
            diaMes: getDiasDoMes(paciente.diaSemana),
        }));

        const filteredPacientes = allPacientesComDiaMes.filter(paciente =>
            paciente.nome.toLowerCase().includes(query.toLowerCase())
        );

        setPacientes(filteredPacientes);
        if (filteredPacientes.length === 1) {
            setPacienteSelecionado(filteredPacientes[0]);
        }
        setShowSuggestions(true);
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
        return dias[diaSemana] || "Desconhecido";
    };

    const handleSelectPaciente = (paciente) => {
        setQuery(paciente);
        handlePacienteSearch(paciente);
        setShowSuggestions(false);
    };

    const handleBlur = () => {
        setTimeout(() => setShowSuggestions(false), 200);
    };

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
                <form className='form-cadastrar-agendamento'>
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
                        <div className='flex gap-2'>
                            <InputField
                                type="text"
                                id="data"
                                name="data"
                                labelTitle="Data"
                                placeholder="Data"
                                required
                                value={query !== '' && pacienteSelecionado && pacienteSelecionado.nome === query ?
                                    pacienteSelecionado.diaMes.find(dia => new Date(dia.split('/').reverse().join('-')) > new Date()) || ''
                                    : ''} 
                                readOnly
                                className={"w-full"}
                            />
                            {/* Substituir o input por um select para mostrar todas as datas do mês a partir do dia de hoje */}
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

                        {pacienteSelecionado && (
                            <div className='agendamentos-container'>
                                <h3>Últimos Agendamentos</h3>
                                <div className='agendamentos-list'>
                                    {agendamentos.map((agendamento, index) => (
                                        <div key={index} className="agendamento-item">
                                            <p><strong>Data:</strong> {agendamento.data}</p>
                                            <p><strong>Horário:</strong> {agendamento.horario}</p>
                                            <p><span>Compareceu</span></p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='flex gap-2'>
                        <button type="submit" className='btn_primario rounded-full'>Salvar Alterações</button>
                        <button className='btn_secundario rounded-full'>Cancelar</button>
                    </div>
                </form>
            </MainComponent>
        </>
    );
};

export default CadastrarAgendamento