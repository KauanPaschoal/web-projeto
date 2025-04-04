import React from 'react'
import './CadastrarAgendamento.css'
import MainComponent from '../../components/mainComponent/MainComponent'
import MenuLateralComponent from '../../components/MenuLateral/MenuLateralComponent'
import InputField from '../../components/InputField/InputField'
import { FaSearch, FaUser } from 'react-icons/fa'

const CadastrarAgendamento = () => {
    const [pacientes, setPacientes] = React.useState([]);
    const [query, setQuery] = React.useState('');
    const [showSuggestions, setShowSuggestions] = React.useState(false);

    const handlePacienteSearch = (query) => {
        setQuery(query); // Atualiza o estado com o texto digitado
        const allPacientes = [
            { nome: "Paciente 1", diaSemana: 1, horario: "10:00" }, // Segunda-feira
            { nome: "Pecia 2", diaSemana: 3, horario: "14:00" }, // Quarta-feira
            { nome: "Peaciente 3", diaSemana: 5, horario: "09:00" }, // Sexta-feira
            { nome: "Peagte 4", diaSemana: 0, horario: "11:00" }, // Domingo
        ];

        const getDiaDoMes = (diaSemana) => {
            const hoje = new Date();
            const mesAtual = hoje.getMonth();
            const anoAtual = hoje.getFullYear();

            // Primeiro dia do mês
            const primeiroDiaDoMes = new Date(anoAtual, mesAtual, 1);

            // Calcula o primeiro dia da semana no mês
            const diferenca = (diaSemana - primeiroDiaDoMes.getDay() + 7) % 7;
            const primeiroDiaSemanaNoMes = 1 + diferenca;

            return primeiroDiaSemanaNoMes;
        };

        const allPacientesComDiaMes = allPacientes.map(paciente => ({
            ...paciente,
            diaMes: getDiaDoMes(paciente.diaSemana),
        }));

        const filteredPacientes = allPacientesComDiaMes.filter(paciente =>
            paciente.nome.toLowerCase().includes(query.toLowerCase())
        );

        setPacientes(filteredPacientes);
        setShowSuggestions(true); // Exibe as sugestões
    };

    const handleSelectPaciente = (paciente) => {
        setQuery(paciente);
        handlePacienteSearch(paciente); // Atualiza o estado com o paciente selecionado
        setShowSuggestions(false); // Oculta as sugestões
    };

    const handleBlur = () => {
        // Oculta as sugestões ao perder o foco, com um pequeno atraso
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
                    <div>
                        <InputField
                            type="text"
                            id="paciente"
                            name="paciente"
                            placeholder="Nome do Paciente"
                            labelTitle="Escolha o Paciente"
                            onChange={(e) => handlePacienteSearch(e.target.value)}
                            value={query} // Vincula o valor do campo ao estado query
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
                                        onMouseDown={() => handleSelectPaciente(paciente.nome)} // Atualiza o estado ao clicar
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
                        {query !== '' && pacientes.length === 1 && pacientes[0].nome === query && (
                            <div className="paciente-info">
                                <p><strong>Paciente Selecionado:</strong> {pacientes[0].nome}</p>
                                <p><strong>Dia da Semana:</strong> {pacientes[0].diaSemana}</p>
                                <p><strong>Horário:</strong> {pacientes[0].horario}</p>
                                <p><strong>Dia do Mês:</strong> {pacientes[0].diaMes}</p>
                            </div>
                        )}
                    </div>

                    <div className='container-sessao'>
                        <div className='flex gap-2 justify-center'>
                            <InputField
                                type="text"
                                id="data"
                                name="data"
                                labelTitle="Data"
                                placeholder="Data"
                                required
                                value={query !== '' && pacientes.length === 1 && pacientes[0].nome === query ? pacientes[0].diaMes : ''}
                                readOnly
                            />
                            <InputField
                                type="text"
                                id="hora"
                                name="hora"
                                labelTitle="Hora"
                                placeholder="Hora"
                                required
                                value={query !== '' && pacientes.length === 1 && pacientes[0].nome === query ? pacientes[0].horario : ''}
                                readOnly
                            />
                        </div>

                        <div>
                            <h3>Últimos Agendamentos</h3>
                        </div>
                    </div>


                    <div className='flex gap-2'>
                        <button type="submit" className='btn_primario'>Salvar Alterações</button>
                        <button className='btn_secundario'>Cancelar</button>
                    </div>

                </form>
            </MainComponent>
        </>
    );
};

export default CadastrarAgendamento