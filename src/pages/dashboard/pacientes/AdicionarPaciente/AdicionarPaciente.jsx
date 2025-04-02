import React from 'react'

import './adicionarPaciente.css'

import MenuLateralComponent from '../../components/MenuLateral/MenuLateralComponent'
import MainComponent from '../../components/MainComponent/MainComponent'
import CheckBox from '../../components/Checkbox/Checkbox'
import InputField from '../../components/InputField/InputField'
import SaveButton from '../../components/SaveButton/SaveButton'

const EditarPaciente = () => {
    return (
        <div className='div-administracao flex'>
            <MenuLateralComponent></MenuLateralComponent>

            <MainComponent title="Adicionar Paciente">

                <form className='addPaciente'>

                    <h2>Dados Do Paciente:</h2>

                    <section>
                        <InputField labelTitle={'Nome'} />
                        <InputField labelTitle={'E-mail'} type={'email'} />
                        <InputField labelTitle={'Dia de Consultas'} />
                        <InputField labelTitle={'Horário de Consultas'} />
                    </section>

                    <CheckBox CheckboxValue={'mensal'} labelTitle={'Plano Mensal'}/>

                    <SaveButton textContent={'Adicionar Paciente'} />

                </form>

            </MainComponent>
        </div>
    )
}

export default EditarPaciente