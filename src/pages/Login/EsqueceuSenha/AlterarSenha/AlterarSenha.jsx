import React, { useState } from 'react';
import '../EsqueceuSenha.css';
import MainComponent from '../../../dashboard/components/MainComponent/MainComponent';
import InputField from '../../../dashboard/components/InputField/InputField';
import SendButton from '../../../dashboard/components/SendButton/SendButton';
import { errorMessage, responseMessage } from '../../../../utils/alert';

const AlterarSenha = () => {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [alterada, setAlterada] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!senha || senha.length < 6) {
      errorMessage('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (senha !== confirmarSenha) {
      errorMessage('As senhas não coincidem.');
      return;
    }
    // Aqui você faria a chamada para a API de alteração de senha
    setAlterada(true);
    responseMessage('Senha alterada com sucesso! Você já pode fazer login.');
    setTimeout(() => {
      window.location.href = '/login'; // Redireciona para a página de login
    }, 2000);
  };

  return (
    <div className="esqueceu-senha-container">
      <form className="esqueceu-senha-form flex flex-col gap-4 items-center justify-center" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold">Alterar Senha</h2>
        <p className="text-center">
          Digite sua nova senha abaixo.
        </p>
        <InputField
          type="password"
          placeholder="Nova senha"
          labelTitle="Nova senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
          containerWidth="w-full"
        />
        <InputField
          type="password"
          placeholder="Confirme a nova senha"
          labelTitle="Confirmar senha"
          value={confirmarSenha}
          onChange={e => setConfirmarSenha(e.target.value)}
          required
          containerWidth="w-full"
        />
        <SendButton
          textContent="Alterar Senha"
          type="submit"
        />
        {alterada && (
          <span className="sucesso-msg text-green-600 text-center">
            Senha alterada com sucesso! Você já pode fazer login.
          </span>
        )}
      </form>
    </div>
  );
};

export default AlterarSenha;