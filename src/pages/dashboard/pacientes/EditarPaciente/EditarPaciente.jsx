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

const EditarPaciente = () => {
    const { id } = useParams();
    const [paciente, setPaciente] = React.useState({
        fkEndereco: {}, // Inicializa fkEndereco como um objeto vazio
    });
    const [isEditingGeneral, setIsEditingGeneral] = useState(false); // Controle do modo de edição
    const [isAtivo, setIsAtivo] = useState(true); // Controle do checkbox "Paciente Ativo"
    const [isPlanoAtivo, setIsPlanoAtivo] = useState(true); // Controle do checkbox "Plano Mensal"

    useEffect(() => {
        fetch(`/pacientes/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao encontrar paciente");
                }
                response.json().then((pacienteResponse) => {
                    setPaciente(pacienteResponse);
                    setIsAtivo(pacienteResponse.ativo === "ATIVO" ? true : false); // Define o estado inicial do checkbox "Paciente Ativo"
                    setIsPlanoAtivo(pacienteResponse.fkPlano === 2 ? true : false); // Define o estado inicial do checkbox "Plano Mensal"
                    console.log(pacienteResponse);
                });
            })
            .catch((error) => console.error("Erro ao encontrar paciente:", error));
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
                                    <InputField
                                        disabled={!isEditingGeneral}
                                        labelTitle={'Complemento'}
                                        value={paciente.fkEndereco?.complemento || ''}
                                        onChange={(e) =>
                                            setPaciente((prev) => ({
                                                ...prev,
                                                fkEndereco: {
                                                    ...prev.fkEndereco,
                                                    complemento: e.target.value,
                                                },
                                            }))
                                        }
                                    />
                                    <CheckBox
                                        CheckboxValue={'ativo'}
                                        labelTitle={'Plano Mensal?'}
                                        checked={isPlanoAtivo}
                                        disabled={!isEditingGeneral} // Desativa o checkbox se não estiver no modo de edição
                                        onChange={(e) => setIsPlanoAtivo(e.target.checked)} // Atualiza o estado do checkbox
                                    />
                                    <CheckBox
                                        CheckboxValue={'ativo'}
                                        labelTitle={'Paciente Ativo?'}
                                        checked={isAtivo}
                                        disabled={!isEditingGeneral} // Desativa o checkbox se não estiver no modo de edição
                                        onChange={(e) => setIsAtivo(e.target.checked)} // Atualiza o estado do checkbox
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