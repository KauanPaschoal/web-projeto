import React, { useEffect, useState } from 'react';
import './editarPaciente.css';
import { useParams } from 'react-router-dom';

import MenuLateralComponent from '../../components/MenuLateral/MenuLateralComponent';
import CheckBox from '../../components/Checkbox/Checkbox';
import InputField from '../../components/InputField/InputField';
import SaveButton from '../../components/SaveButton/SaveButton';
import MainComponent from '../../components/MainComponent/MainComponent';
import { FaUserEdit } from 'react-icons/fa';
import { putDesativarPaciente, putPaciente } from '../../../../provider/api/pacientes/fetchs-pacientes';
import Swal from 'sweetalert2'; // Importa o SweetAlert
import { confirmCancelEdit, errorMessage, responseMessage } from '../../../../utils/alert';
import { getPreferenciasPorId } from '../../../../provider/api/preferencias/fetchs-preferencias';


const EditarPaciente = () => {
    const { id } = useParams();
    const [paciente, setPaciente] = React.useState({
        fkEndereco: {}, // Inicializa fkEndereco como um objeto vazio
    });
    const [isEditingGeneral, setIsEditingGeneral] = useState(false); // Controle do modo de edição
    const [isAtivo, setIsAtivo] = useState(false); // Controle do checkbox "Paciente Ativo"
    const [isPlanoAtivo, setIsPlanoAtivo] = useState(true); // Controle do checkbox "Plano Mensal"
    const [preferencias, setPreferencias] = useState([]); // Estado para armazenar as preferências do paciente

    useEffect(() => {
        const fetchPaciente = async () => {
            try {
                const response = await fetch(`/pacientes/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                
                if (!response.ok) {
                    throw new Error("Erro ao encontrar paciente");
                }

                const pacienteResponse = await response.json();
                console.log("Response:", pacienteResponse); // Adiciona o log aqui
                // Atualiza o estado do paciente e os checkboxes
                setPaciente(pacienteResponse);
                setIsAtivo(pacienteResponse.status === "ATIVO"); // Marca o checkbox "Paciente Ativo" se o status for "ATIVO"
                setIsPlanoAtivo(pacienteResponse.fkPlano.id === 2); // Marca o checkbox "Plano Mensal" se o plano for mensal
            } catch (error) {
                console.error("Erro ao buscar paciente:", error);
            }
        };

        const fetchPreferencias = async () => {
            try {
                const preferenciasResponse = await getPreferenciasPorId(id); // Busca as preferências do paciente
                console.log("Preferências Response:", preferenciasResponse);
                setPreferencias(preferenciasResponse); // Atualiza o estado com as preferências
            } catch (error) {
                console.error("Erro ao buscar preferências:", error);
            }
        };

        fetchPaciente();
        fetchPreferencias(); 
    }, [id]);

    const handleEditGeneral = async () => {
        if (isEditingGeneral) {
            const result = await confirmCancelEdit(
                "Cancelar edição?",
                "Tem certeza que deseja cancelar a edição?",
                "small"
            );
            if (!result.isConfirmed) return;
        }
        setIsEditingGeneral(!isEditingGeneral); // Alterna entre os modos de edição
    };

    const handleAtualizarPaciente = async () => {
        try {
            // Atualiza os dados do paciente
            const pacienteAtualizado = {
                nome: paciente.nome,
                cpf: paciente.cpf,
                email: paciente.email,
                status: isAtivo ? "ATIVO" : "INATIVO",
                fkEndereco: {
                    id: paciente.fkEndereco?.id || 0,
                    cep: paciente.cep || "",
                    logradouro: paciente.logradouro || "",
                    bairro: paciente.bairro || "",
                    numero: paciente.numero || "",
                    cidade: paciente.cidade || "",
                    uf: paciente.uf || "",
                },
            };

            await putPaciente(id, pacienteAtualizado);

            // Verifica se o paciente precisa ser desativado
            if (!isAtivo && paciente.status === "ATIVO") {
                await putDesativarPaciente(id);
                responseMessage("Paciente desativado com sucesso!");
            } else if (isAtivo && paciente.status === "INATIVO") {
                await putDesativarPaciente(id);
                responseMessage("Paciente ativado com sucesso!");
            }
            responseMessage("Paciente atualizado com sucesso!");
            setIsEditingGeneral(false); // Sai do modo de edição após salvar
        } catch (error) {
            console.error("Erro ao atualizar ou desativar paciente:", error);
            errorMessage("Ocorreu um erro ao atualizar ou desativar o paciente.");
        }
    };

    return (
        <div className='div-administracao flex'>
            <MenuLateralComponent></MenuLateralComponent>

            <MainComponent
                title="Editar Paciente"
                headerContent={
                    <>
                        <div className='flex w-full justify-between'>
                            <button className="btn_agendamento" onClick={() => window.location.href = '/dashboard/pacientes'}>
                                {"< Voltar"}
                            </button>
                            <button
                            className='btn_agendamento flex rounded-full'
                            onClick={handleEditGeneral}
                        >
                            {isEditingGeneral ? "Cancelar" : "Editar"}
                        </button>
                        </div>
                        
                    </>
                }
            >
                <form className='editPaciente'>
                    <section className='flex'>
                        <figure>
                            <div></div>
                            <span>
                                <span>Upload</span> imagem
                            </span>
                        </figure>

                        <section className='fields'>
                            <section>
                                <h2>Dados do Paciente:</h2>
                                <div className='inputArea'>
                                    <InputField
                                        disabled={!isEditingGeneral}
                                        labelTitle={'Nome'}
                                        value={paciente.nome || ''}
                                        onChange={(e) =>
                                            setPaciente((prev) => ({
                                                ...prev,
                                                nome: e.target.value,
                                            }))
                                        }
                                    />
                                    <InputField
                                        disabled={true}
                                        labelTitle={'CPF'}
                                        value={paciente.cpf || ''}
                                    />
                                    <InputField
                                        disabled={!isEditingGeneral}
                                        type={'tel'}
                                        labelTitle={'Telefone'}
                                        value={paciente.telefone || ''}
                                        onChange={(e) =>
                                            setPaciente((prev) => ({
                                                ...prev,
                                                telefone: e.target.value,
                                            }))
                                        }
                                    />
                                    <InputField
                                        disabled={!isEditingGeneral}
                                        type={'email'}
                                        labelTitle={'E-mail'}
                                        value={paciente.email || ''}
                                        onChange={(e) =>
                                            setPaciente((prev) => ({
                                                ...prev,
                                                email: e.target.value,
                                            }))
                                        }
                                    />
                                    <InputField
                                        disabled={!isEditingGeneral}
                                        labelTitle={'Dia de Consultas'}
                                        value={paciente.diaConsulta || ''}
                                        onChange={(e) =>
                                            setPaciente((prev) => ({
                                                ...prev,
                                                diaConsulta: e.target.value,
                                            }))
                                        }
                                    />
                                    <InputField
                                        disabled={!isEditingGeneral}
                                        labelTitle={'Horário de Consultas'}
                                        value={paciente.horaConsulta || ''}
                                        onChange={(e) =>
                                            setPaciente((prev) => ({
                                                ...prev,
                                                horaConsulta: e.target.value,
                                            }))
                                        }
                                    />
                                    <InputField
                                        disabled={!isEditingGeneral}
                                        labelTitle={'Contato de Emergência'}
                                        value={paciente.nomeContato || ''}
                                        onChange={(e) =>
                                            setPaciente((prev) => ({
                                                ...prev,
                                                nomeContato: e.target.value,
                                            }))
                                        }
                                    />
                                    <InputField
                                        disabled={!isEditingGeneral}
                                        type={'tel'}
                                        labelTitle={'Telefone de Emergência'}
                                        value={paciente.telefoneContato || ''}
                                        onChange={(e) =>
                                            setPaciente((prev) => ({
                                                ...prev,
                                                telefoneContato: e.target.value,
                                            }))
                                        }
                                    />
                                </div>

                                <h2>Endereço:</h2>
                                <div className='inputArea'>
                                    <InputField
                                        disabled={!isEditingGeneral}
                                        labelTitle={'CEP'}
                                        value={paciente.fkEndereco?.cep || ''} // Usa o operador ?. para evitar erros
                                        onChange={(e) =>
                                            setPaciente((prev) => ({
                                                ...prev,
                                                fkEndereco: {
                                                    ...prev.fkEndereco,
                                                    cep: e.target.value,
                                                },
                                            }))
                                        }
                                    />
                                    <InputField
                                        disabled={!isEditingGeneral}
                                        labelTitle={'Cidade'}
                                        value={paciente.fkEndereco?.cidade || ''} // Usa o operador ?. para evitar erros
                                        onChange={(e) =>
                                            setPaciente((prev) => ({
                                                ...prev,
                                                fkEndereco: {
                                                    ...prev.fkEndereco,
                                                    cidade: e.target.value,
                                                },
                                            }))
                                        }
                                    />
                                    <InputField
                                        disabled={!isEditingGeneral}
                                        labelTitle={'Bairro'}
                                        value={paciente.fkEndereco?.bairro || ''} // Usa o operador ?. para evitar erros
                                        onChange={(e) =>
                                            setPaciente((prev) => ({
                                                ...prev,
                                                fkEndereco: {
                                                    ...prev.fkEndereco,
                                                    bairro: e.target.value,
                                                },
                                            }))
                                        }
                                    />
                                    <InputField
                                        disabled={!isEditingGeneral}
                                        labelTitle={'Número'}
                                        value={paciente.fkEndereco?.numero || ''}
                                        onChange={(e) =>
                                            setPaciente((prev) => ({
                                                ...prev,
                                                fkEndereco: {
                                                    ...prev.fkEndereco,
                                                    numero: e.target.value,
                                                },
                                            }))
                                        }
                                    />
                                    <InputField
                                        disabled={!isEditingGeneral}
                                        labelTitle={'Logradouro'}
                                        value={paciente.fkEndereco?.logradouro || ''}
                                        onChange={(e) =>
                                            setPaciente((prev) => ({
                                                ...prev,
                                                fkEndereco: {
                                                    ...prev.fkEndereco,
                                                    logradouro: e.target.value,
                                                },
                                            }))
                                        }
                                    />
                                    <CheckBox
                                        CheckboxValue={'ativo'}
                                        labelTitle={'Plano Mensal?'}
                                        checked={isPlanoAtivo} // Marca o checkbox se o plano for mensal
                                        disabled={!isEditingGeneral} // Desativa o checkbox se não estiver no modo de edição
                                        onChange={(e) => setIsPlanoAtivo(e.target.checked)} // Atualiza o estado do checkbox
                                    />
                                    <CheckBox
                                        CheckboxValue={'ativo'}
                                        labelTitle={'Paciente Ativo?'}
                                        checked={isAtivo} // Usa o estado isAtivo para controlar o checkbox
                                        disabled={!isEditingGeneral} // Desativa o checkbox se não estiver no modo de edição
                                        onChange={(e) => setIsAtivo(e.target.checked)} // Atualiza o estado isAtivo
                                    />
                                </div>
                            </section>
                        </section>
                    </section>
                    <SaveButton
                        textContent="Salvar Alterações"
                        disabled={!isEditingGeneral}
                        onClick={handleAtualizarPaciente}
                    />
                </form>
            </MainComponent>
        </div>
    );
};

export default EditarPaciente;