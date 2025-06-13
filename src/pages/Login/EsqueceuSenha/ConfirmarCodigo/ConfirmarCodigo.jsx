import React, { useState } from 'react';
import '../EsqueceuSenha.css';
import MainComponent from '../../../dashboard/components/MainComponent/MainComponent';
import InputField from '../../../dashboard/components/InputField/InputField';
import SendButton from '../../../dashboard/components/SendButton/SendButton';
import { errorMessage, responseMessage } from '../../../../utils/alert';

const ConfirmarCodigo = () => {
  const [codigo, setCodigo] = useState('');
  const [confirmado, setConfirmado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!codigo || codigo.length !== 6) {
      errorMessage('Digite o código de 6 dígitos enviado ao seu e-mail.');
      return;
    }
    // Aqui você faria a chamada para a API de confirmação de código
    setConfirmado(true);
    responseMessage('Código confirmado com sucesso! Você pode redefinir sua senha.');
  };

  return (
    <div className="esqueceu-senha-container">
      <form className="esqueceu-senha-form flex flex-col gap-4 items-center justify-center" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold">Confirme o Código</h2>
        <p className="text-center">
          Digite o código de 6 dígitos que enviamos para o seu e-mail.
        </p>
        <InputField
          type="text"
          placeholder="Código de 6 dígitos"
          labelTitle="Código"
          value={codigo}
          onChange={e => setCodigo(e.target.value.replace(/\D/g, '').slice(0, 6))}
          required
          containerWidth="w-full"
        />
        <SendButton
          textContent="Confirmar"
          type="submit"
        />
        {confirmado && (
          <span className="sucesso-msg text-green-600 text-center">
            Código confirmado! Agora você pode redefinir sua senha.
          </span>
        )}
      </form>
    </div>
  );
};

export default ConfirmarCodigo;