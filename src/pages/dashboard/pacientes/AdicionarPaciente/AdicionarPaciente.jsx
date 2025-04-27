import React, { useState } from 'react';
import './adicionarPaciente.css';
import MenuLateralComponent from '../../components/MenuLateral/MenuLateralComponent';
import CheckBox from '../../components/Checkbox/Checkbox';
import InputField from '../../components/InputField/InputField';
import SaveButton from '../../components/SaveButton/SaveButton';
import MainComponent from '../../components/MainComponent/MainComponent';
import { postPaciente } from '../../../../provider/api/pacientes/fetchs-pacientes';
import { errorMessage, responseMessage } from '../../../../utils/alert';

const AdicionarPaciente = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [diaConsultas, setDiaConsultas] = useState('');
    const [horarioConsultas, setHorarioConsultas] = useState('');
    const [planoMensal, setPlanoMensal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação simples
        if (!nome || !email || !diaConsultas || !horarioConsultas) {
            errorMessage('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const planoMensalEscolhido = planoMensal ? 2 : 1;

        const senha = "123456";
        // esta senha deve ser gerada automaticamente, mas para fins de teste, vamos usar uma senha padrão

        const novoPaciente = {
            nome,
            email,
            senha,
            planoMensalEscolhido,
        };
        console.log("Dados enviados:", novoPaciente);

        try {
            await postPaciente(novoPaciente); // Envia os dados para a API
            responseMessage('Paciente adicionado com sucesso!');
            // Limpa os campos após o sucesso
            setNome('');
            setEmail('');
            setDiaConsultas('');
            setHorarioConsultas('');
            setPlanoMensal(false);
        } catch (error) {
            console.error('Erro ao adicionar paciente:', error);
            errorMessage('Erro ao adicionar paciente. Tente novamente.');
        }
    };

    return (
        <div className='div-administracao flex'>
            <MenuLateralComponent></MenuLateralComponent>

            <MainComponent title="Adicionar Paciente"
                headerContent={
                    <button className="btn_agendamento" onClick={() => window.location.href = '/dashboard/pacientes'}>
                        {"< Voltar"}
                    </button>
                }
            >
                <form className='addPaciente' onSubmit={handleSubmit}>
                    <h2>Dados Do Paciente:</h2>
                    <section>
                        <div className='flex gap-3'>
                            <InputField
                                labelTitle={'Nome'}
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                            <InputField
                                labelTitle={'E-mail'}
                                type={'email'}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className='flex gap-3'>
                            <InputField
                                labelTitle={'Dia de Consultas'}
                                value={diaConsultas}
                                onChange={(e) => setDiaConsultas(e.target.value)}
                                required
                            />
                            <InputField
                                labelTitle={'Horário de Consultas'}
                                value={horarioConsultas}
                                onChange={(e) => setHorarioConsultas(e.target.value)}
                                required
                            />
                        </div>
                        <CheckBox
                            CheckboxValue={'mensal'}
                            labelTitle={'Plano Mensal'}
                            checked={planoMensal}
                            onChange={(e) => setPlanoMensal(e.target.checked)}
                        />
                    </section>
                    <SaveButton textContent={'Adicionar Paciente'} type="submit" />
                </form>
            </MainComponent>
        </div>
    );
};

export default AdicionarPaciente;