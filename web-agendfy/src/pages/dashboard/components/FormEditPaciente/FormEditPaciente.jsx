import React from 'react'
import './formEditPaciente.css'

import CheckBox from './components/Checkbox/Checkbox'
import InputField from './components/InputField/InputField'


const FormEditPacienteComponent = () => {

    return (
        <form>

            <figure>
                <div></div>
                <span><span>Upload</span> imagem</span>
            </figure>

            <section className='fields'>

                <section className='checkboxContainer'>
                    <CheckBox labelTitle={'Plano Mensal'}></CheckBox>
                    <CheckBox labelTitle={'Paciente Ativo ?'}></CheckBox>
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

                <button type='submit'>Salvar Alterações</button>

            </section>
        </form>
    )
}

export default FormEditPacienteComponent