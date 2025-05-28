import React, { useState, useEffect } from "react";
import InputField from "../InputField/InputField";
import { FaUser } from "react-icons/fa";
import { errorMessage } from "../../../../utils/alert";
import axios from "axios";
import { getPacientes } from "../../../../provider/api/pacientes/fetchs-pacientes";

const UserSearch = ({
    onUserSelect,
    labelTitle = "Escolha o Paciente",
    placeholder = "Nome do Paciente",
    width = "w-[100%]",
    className = "styled-input",
    useIcon = true,
    ...rest
}) => {
    const [todosPacientes, setTodosPacientes] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [query, setQuery] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const data = await getPacientes(); // Chama a função de busca de pacientes
                setTodosPacientes(data);
                setPacientes(data); // Atualiza o estado com os pacientes retornados
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };

        fetchPacientes();
    }, []);

    const handlePacienteSearch = (query) => {
        setQuery(query);

        // Garante que todosPacientes é array
        const listaPacientes = Array.isArray(todosPacientes) ? todosPacientes : [];

        if (!query.trim()) {
            setPacientes(listaPacientes);
            setShowSuggestions(false);
            onUserSelect(null);
            return;
        }

        const filteredPacientes = listaPacientes.filter((paciente) =>
            paciente.nome.toLowerCase().includes(query.toLowerCase())
        );

        setPacientes(filteredPacientes);
        setShowSuggestions(true);

        if (filteredPacientes.length === 1) {
            onUserSelect(filteredPacientes[0]);
        } else {
            onUserSelect(null);
        }
    };

    const handleSelectPaciente = (paciente) => {
        setQuery(paciente.nome);
        setShowSuggestions(false);
        onUserSelect(paciente);
    };

    const handleBlur = () => {
        setTimeout(() => setShowSuggestions(false), 200);
    };

    return (
        <div className={`${width} relative`}>
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
                width={"w-[100%]"}
                icon={useIcon && <FaUser />}
            />
            {showSuggestions && pacientes.length > 0 && (
                <ul className="suggestions-list">
                    {pacientes.map((paciente, index) => (
                        <li
                            key={index}
                            onMouseDown={() => handleSelectPaciente(paciente)} // Passe o objeto inteiro!
                            className="suggestion-item"
                        >
                            {paciente.nome}
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
};

export default UserSearch;