import React from 'react'

import './editarPaciente.css'
import { useParams } from 'react-router-dom';

import MenuLateralComponent from '../../components/MenuLateral/MenuLateralComponent'
import CheckBox from '../../components/Checkbox/Checkbox'
import InputField from '../../components/InputField/InputField'
import SaveButton from '../../components/SaveButton/SaveButton'
import MainComponent from '../../components/MainComponent/MainComponent';
import { FaRegEdit, FaUserEdit } from 'react-icons/fa';


const EditarPaciente = () => {

    const { id } = useParams();
    const [paciente, setPaciente] = React.useState({
        "id": 1,
        "nome": "João Silva",
        "cpf": "123.456.789-00",
        "telefone": "(11) 98765-4321",
        "email": "joao.silva@example.com",
        "diaConsulta": "Segunda-feira",
        "horaConsulta": "14:00",
        "nomeContato": "Maria Silva",
        "telefoneContato": "(11) 91234-5678",
        "cep": "12345-678",
        "cidade": "São Paulo",
        "bairro": "Centro",
        "numero": "123",
        "logradouro": "Rua das Flores",
        "complemento": "Apartamento 45"
    });

    React.useEffect(() => {
        fetch(`/usuarios/${id}`, {
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
                    setPaciente(pacienteResponse)
                    console.log(pacienteResponse)
                });
            })
            .catch((error) => console.error("Erro ao encontrar paciente:", error));
    }, []);

    // if (!paciente) {

    //     return <p>Carregando...</p>;
    // }

    return (
        <div className='div-administracao flex'>
            <MenuLateralComponent></MenuLateralComponent>

            <MainComponent title="Editar Paciente"
                headerContent={
                    <button className='btn_agendamento flex rounded-full'>
                        <FaUserEdit/>
                        Editar
                    </button>
                }
            >
                <form className='editPaciente'>
                    <section className='flex'>
                        <figure>
                            <div></div>
                            <span><span>Upload</span> imagem</span>
                        </figure>

                        <section className='fields'>

                            <section>
                                <h2>Dados do Paciente:</h2>
                                <div className='inputArea'>
                                    <InputField labelTitle={'Nome'} value={paciente.nome} />
                                    <InputField labelTitle={'CPF'} value={paciente.cpf} />
                                    <InputField type={'tel'} labelTitle={'Telefone'} value={paciente.telefone} />
                                    <InputField type={'email'} labelTitle={'E-mail'} value={paciente.email} />
                                    <InputField labelTitle={'Dia de Consultas'} value={paciente.diaConsulta} />
                                    <InputField labelTitle={'Horário de Consultas'} value={paciente.horaConsulta} />
                                    <InputField labelTitle={'Contato de Emergência'} value={paciente.nomeContato} />
                                    <InputField type={'tel'} labelTitle={'Telefone de Emergência'} value={paciente.telefoneContato} />
                                </div>

                                <h2>Endereço:</h2>
                                <div className='inputArea'>
                                    <InputField labelTitle={'CEP'} value={paciente.cep} />
                                    <InputField labelTitle={'Cidade'} value={paciente.cidade} />
                                    <InputField labelTitle={'Bairro'} value={paciente.bairro} />
                                    <InputField labelTitle={'Número'} value={paciente.numero} />
                                    <InputField labelTitle={'Logradouro'} value={paciente.logradouro} />
                                    <InputField labelTitle={'Complemento'} value={paciente.complemento} />
                                    <CheckBox CheckboxValue={'mensal'} labelTitle={'Plano Mensal'}></CheckBox>
                                    <CheckBox CheckboxValue={'ativo'} labelTitle={'Paciente Ativo ?'}></CheckBox>
                                </div>
                            </section>
                        </section>
                    </section>
                    <SaveButton />
                </form>
            </MainComponent>
        </div>
    )
}

export default EditarPaciente