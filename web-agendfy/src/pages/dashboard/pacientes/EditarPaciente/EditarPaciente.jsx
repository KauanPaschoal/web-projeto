import React from 'react'
// import './Administracao.css'
import MenuLateralComponent from '../../components/MenuLateral/MenuLateralComponent'
import FormEditPacienteComponent from '../../components/FormEditPaciente/FormEditPaciente'
import MainComponent from '../../components/MainComponent/MainComponent'

const EditarPaciente = () => {
    return (
        <div className='div-administracao flex'>
            <MenuLateralComponent></MenuLateralComponent>

            <MainComponent title="Editar Paciente">
                <FormEditPacienteComponent></FormEditPacienteComponent>
            </MainComponent>
        </div>
    )
}

export default EditarPaciente