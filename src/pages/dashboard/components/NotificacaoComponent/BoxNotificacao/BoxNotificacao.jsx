import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './BoxNotificacao.css'
import { putAgendamento } from '../../../../../provider/api/agendamentos/fetchs-agendamentos'
import { errorMessage, responseMessage } from '../../../../../utils/alert'

const BoxNotificacao = (props) => {
    const [confirmando, setConfirmando] = useState(false);

    const handleConfirmar = async () => {
        setConfirmando(true);
        try {
            // Monta o objeto completo, alterando apenas o statusSessao
            const agendamentoAtualizado = {
                ...props.agendamento, // objeto completo vindo do backend
                statusSessao: "CONFIRMADA"
            };
            await putAgendamento(props.agendamentoId, agendamentoAtualizado);
            if (props.onConfirmado) props.onConfirmado(props.agendamentoId);
        } catch (e) {
            errorMessage('Erro ao confirmar agendamento!');
        } finally {
            setConfirmando(false);
            responseMessage("Agendamento confirmado com sucesso!", "small");
            setTimeout(() => {
                window.location.reload();
            }, 1200);
        }
    };

    function formatarDataPtBr(dataIso) {
    if (!dataIso) return '';
    const [year, month, day] = dataIso.split('-');
    if (!year || !month || !day) return dataIso;
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
}

    return (
        <div className='box-notificacao px-4 gap-2'>
            <h1 className='titulo-notificacao'>{props.titulo}</h1>
            <h2 className='agendamento-info'>{formatarDataPtBr(props.data)} - {props.horario} | {props.paciente.nome}</h2>
            <p className='conteudo-notificacao'>{props.conteudo}</p>
            <div className='flex justify-between w-full'>
                <Link to={`/dashboard/agendamentos/editar/${props.agendamentoId}`}>
                    <button className='btn_notificacao rounded-full flex w-full'>Visualizar</button>
                </Link>
                <div>
                    <button
                        className='btn_notificacao_confirmar rounded-full flex w-full'
                        onClick={handleConfirmar}
                        disabled={confirmando}
                    >
                        {confirmando ? 'Confirmando...' : 'Confirmar Agendamento'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BoxNotificacao