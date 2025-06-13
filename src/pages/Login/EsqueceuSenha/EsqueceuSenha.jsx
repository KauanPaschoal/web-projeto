import React, { useState } from 'react';
import './EsqueceuSenha.css';
import MainComponent from '../../dashboard/components/MainComponent/MainComponent';
import InputField from '../../dashboard/components/InputField/InputField';
import { errorMessage, responseMessage } from '../../../utils/alert';
import SendButton from '../../dashboard/components/SendButton/SendButton';

const EsqueceuSenha = () => {
    const [email, setEmail] = useState('');
    const [enviado, setEnviado] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            errorMessage('Digite um e-mail válido.');
            return;
        }
        // Aqui você faria a chamada para a API de recuperação de senha
        setEnviado(true);
        responseMessage('Se o e-mail estiver cadastrado, você receberá as instruções em instantes.');
    };

    return (
        <div className="esqueceu-senha-container">
            <form className="esqueceu-senha-form flex flex-col gap-4 items-center justify-center" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold">Esqueceu sua senha?</h2>
                <p className="text-center">Digite seu e-mail cadastrado para receber as instruções de redefinição.</p>
                <InputField
                    type="email"
                    placeholder="Seu e-mail"
                    labelTitle="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    containerWidth="w-full"
                />
                <SendButton
                    textContent="Enviar"
                    type="submit"
                />
                {enviado && (
                    <span className="sucesso-msg text-green-600 text-center">
                        Se o e-mail estiver cadastrado, você receberá as instruções em instantes.
                    </span>
                )}
            </form>
        </div>
    );
};

export default EsqueceuSenha;