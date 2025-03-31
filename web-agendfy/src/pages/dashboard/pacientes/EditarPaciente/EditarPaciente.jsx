import React from 'react'

import './editarPaciente.css'

import MenuLateralComponent from '../../components/MenuLateral/MenuLateralComponent'
import MainComponent from '../../components/MainComponent/MainComponent'
import CheckBox from '../../components/Checkbox/Checkbox'
import InputField from '../../components/InputField/InputField'
import SaveButton from '../../components/SaveButton/SaveButton'

const EditarPaciente = () => {
    return (
        <div className='div-administracao flex'>
            <MenuLateralComponent></MenuLateralComponent>

            <MainComponent title="Editar Paciente">
                <form className='editPaciente'>

                    <figure>
                        <div></div>
                        <span><span>Upload</span> imagem</span>

                    </figure>

                    <section className='fields'>

                        <section className='checkboxContainer'>
                            <CheckBox CheckboxValue={'mensal'} labelTitle={'Plano Mensal'}></CheckBox>
                            <CheckBox CheckboxValue={'ativo'} labelTitle={'Paciente Ativo ?'}></CheckBox>
                        </section>

                        <section>
                            <h2>Dados do Paciente:</h2>
                            <div className='inputArea'>
                                <InputField labelTitle={'Nome'} />
                                <InputField labelTitle={'CPF'} />
                                <InputField type={'tel'} labelTitle={'Telefone'} />
                                <InputField type={'email'} labelTitle={'E-mail'} />
                                <InputField labelTitle={'Dia de Consultas'} />
                                <InputField labelTitle={'Horário de Consultas'} />
                                <InputField labelTitle={'Contato de Emergência'} />
                                <InputField type={'tel'} labelTitle={'Telefone de Emergência'} />
                            </div>

                            <h2>Endereço:</h2>
                            <div className='inputArea'>
                                <InputField labelTitle={'CEP'} />
                                <InputField labelTitle={'Cidade'} />
                                <InputField labelTitle={'Bairro'} />
                                <InputField labelTitle={'Número'} />
                                <InputField labelTitle={'Logradouro'} />
                                <InputField labelTitle={'Complemento'} />
                            </div>

                        </section>
                        <SaveButton />
                    </section>

                </form>
            </MainComponent>
        </div>
    )
}

export default EditarPaciente