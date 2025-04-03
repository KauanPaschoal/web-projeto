import React from 'react'
import './CadastrarAgendamento.css'
import MainComponent from '../../components/mainComponent/MainComponent'
import MenuLateralComponent from '../../components/MenuLateral/MenuLateralComponent'
import InputField from '../../components/InputField/InputField'

const CadastrarAgendamento = () => {

    // State and function to handle autocomplete
    const [pacientes, setPacientes] = React.useState([]);
    const [query, setQuery] = React.useState('');

    const handlePacienteSearch = (query) => {
        setQuery(query);
        // Simulate fetching data based on the query
        const allPacientes = ["Paciente 1", "Paciente 2", "Paciente 3", "Paciente 4"];
        const filteredPacientes = allPacientes.filter(paciente =>
            paciente.toLowerCase().includes(query.toLowerCase())

        );
        console.log(filteredPacientes);
        setPacientes(filteredPacientes);
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
                        <input
                            type={"text"}
                            id="paciente"
                            name="paciente"
                            placeholder={"Nome do Paciente"}
                            onChange={(e) => handlePacienteSearch(e.target.value)}
                            list="pacientes"
                            required
                            className="styled-input"
                        />
                        <datalist id="pacientes">
                            {pacientes.map((paciente, index) => (
                                <option key={index} value={paciente} />
                            ))}
                        </datalist>
                    </div>

                    <div className='div-escolher-paciente'>
                        {/* Exibe a mensagem se o campo de entrada estiver vazio */}
                        {query === '' || pacientes.length === 0 ? (
                            <p className="mensagem-escolha-paciente">Escolha um paciente</p>
                        ) : null}
                        {pacientes.length === 1 && (
                            <div className="paciente-info">
                                <p><strong>Paciente Selecionado:</strong> {pacientes[0]}</p>
                                {/* Add more patient details here if available */}
                            </div>
                        )}
                    </div>

                    <div className='flex'>
                        <InputField type={"text"} id="data" name="data" labelTitle={"Data"} placeholder={"Data"} required />
                        <InputField type={"text"} id="hora" name="hora" labelTitle={"Hora"} placeholder={"Hora"} required />
                    </div>


                    <button type="submit" className='btn_secundario'>Cadastrar</button>
                </form>
            </MainComponent >
        </>
    )


}

export default CadastrarAgendamento