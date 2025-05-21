import React, { useEffect, useState } from 'react'
import './Notificacao.css'
import BoxNotificacao from './BoxNotificacao/BoxNotificacao'
import { getAgendamentosPorStatus } from '../../../../provider/api/agendamentos/fetchs-agendamentos'

const NotificacaoComponent = ({ aberta }) => {
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (aberta) {
            setLoading(true);
            getAgendamentosPorStatus('PENDENTE')
                .then(setAgendamentos)
                .catch(() => setAgendamentos([]))
                .finally(() => setLoading(false));
        }
    }, [aberta]);

    const handleConfirmado = (id) => {
        // Lógica para lidar com o agendamento confirmado
        console.log("Agendamento confirmado:", id);
    }

    return (
        <div className={`container-notificacao w-96 absolute right-4 bg-white${aberta ? ' aberta' : ''}`}>
            <div>
                <h1 className='titulo-notificacao p-2'>Notificações</h1>
            </div>
            {loading && <div className="p-4 text-gray-500">Carregando...</div>}
            {!loading && agendamentos.length === 0 && (
                <div className="p-4 text-gray-500">Nenhum agendamento pendente.</div>
            )}
            {agendamentos.map((agendamento) => (
                <BoxNotificacao
                    key={agendamento.id}
                    titulo="Agendamento Pendente"
                    conteudo={"Confirme este agendamento."}
                    horario={agendamento.hora}
                    data={agendamento.data}
                    paciente={{ nome: agendamento.fkPaciente?.nome || "Paciente" }}
                    agendamentoId={agendamento.id}
                    agendamento={agendamento} // <-- Passe o objeto completo aqui!
                    onConfirmado={handleConfirmado}
                />
            ))}
        </div>
    )
}

export default NotificacaoComponent