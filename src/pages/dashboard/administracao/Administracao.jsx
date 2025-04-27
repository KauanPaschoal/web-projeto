import React, { useState } from "react";
import "./style/Administracao.css";

import InputField from "../components/InputField/InputField";
import SaveButton from "../components/SaveButton/SaveButton";
import EditButton from "../components/EditButton/EditButton";
import {
  popupMessage,
  responseMessage,
  errorMessage,
  confirmCancelEdit,
} from "../../../utils/alert";
import axios from "axios";
import MainComponent from "../components/MainComponent/MainComponent";
import MenuLateralComponent from "../components/MenuLateral/MenuLateralComponent";

const Administracao = () => {
  const [isEditingGeneral, setIsEditingGeneral] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  const [email, setEmail] = useState("yuri.alberto@sccp.com");
  const [nome, setNome] = useState("Yuri Alberto");
  const [telefone, setTelefone] = useState("(11) 94002-8922");

  const [senha, setSenha] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleEditGeneral = async () => {
    if (isEditingGeneral) {
      const result = await confirmCancelEdit(
        "Cancelar edição?",
        "Tem certeza que deseja cancelar a edição?",
        "small"
      );
      if (!result.isConfirmed) return;
    }
    setIsEditingGeneral(!isEditingGeneral);
  };

  const handleEditPassword = async () => {
    if (isEditingPassword) {
      const result = await confirmCancelEdit(
        "Cancelar edição da senha?",
        "Tem certeza que deseja cancelar a edição da senha?",
        "small"
      );
      if (!result.isConfirmed) return;
    }
    setIsEditingPassword(!isEditingPassword);
  };

  const handleSaveGeneral = async () => {
    if (!email || !nome || !telefone) {
      errorMessage("Todos os campos devem estar preenchidos!");
      return;
    }

    try {
      await axios.post("/api/usuario/atualizar-dados", {
        email,
        nome,
        telefone,
      });
      responseMessage("Dados atualizados com sucesso!");
      setIsEditingGeneral(false);
    } catch (error) {
      errorMessage("Erro ao salvar dados.");
      console.error(error);
    }
  };

  const handleSavePassword = async () => {
    if (!senha || !novaSenha || !confirmarSenha) {
      errorMessage("Todos os campos devem estar preenchidos!");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      errorMessage("As senhas não coincidem!");
      return;
    }

    try {
      await axios.post("/api/usuario/alterar-senha", { senha, novaSenha });
      responseMessage("Senha alterada com sucesso!");
      setIsEditingPassword(false);
    } catch (error) {
      errorMessage("Erro ao alterar a senha.");
      console.error(error);
    }
  };

  return (
    <div className="div-administracao flex">
      <MenuLateralComponent />
      <MainComponent
        title="Configurações de Conta"
        headerContent={
          <div className="flex w-full gap-2 items-center justify-between">
            <button className="btn_agendamento">Voltar</button>
            <button className="btn_agendamento" onClick={() => popupMessage()}>
              Preferências
            </button>
          </div>
        }
      >
        <div className="form-cadastrar-agendamento">
          <div className="card-forms">
            <div className="forms-container">
              {/* Card: Dados Gerais */}
              <form
                className="editar-conta"
                onSubmit={(e) => e.preventDefault()}
              >
                <h2 className="flex items-center justify-between">
                  Dados Gerais:
                  <EditButton
                    onClick={handleEditGeneral}
                    text={isEditingGeneral ? "Cancelar" : "Editar"}
                  />
                </h2>
                <div className="card-inputs">
                  <InputField
                    labelTitle="Nome"
                    value={nome}
                    disabled={!isEditingGeneral}
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <InputField
                    labelTitle="CPF"
                    value="123.456.789-10"
                    disabled={true}
                  />
                  <InputField
                    labelTitle="E-mail"
                    value={email}
                    type="email"
                    disabled={!isEditingGeneral}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputField
                    labelTitle="Telefone"
                    value={telefone}
                    disabled={!isEditingGeneral}
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                  <InputField
                    labelTitle="CRP"
                    value="12345-6"
                    disabled={true}
                    width={"w-full"}
                  />
                </div>
                <div className="inputs-button">
                  <SaveButton
                    icon="📄"
                    textContent="Salvar Alterações"
                    disabled={!isEditingGeneral}
                    onClick={handleSaveGeneral}
                  />
                </div>
              </form>

              {/* Card: Alterar Senha */}
              <form
                className="editar-conta"
                onSubmit={(e) => e.preventDefault()}
              >
                <h2 className="flex items-center justify-between">
                  Alterar Senha:
                  <EditButton
                    onClick={handleEditPassword}
                    text={isEditingPassword ? "Cancelar" : "Editar"}
                  />
                </h2>
                <div className="card-inputs">
                  <InputField
                    labelTitle="Senha"
                    value={senha}
                    disabled={!isEditingPassword}
                    width={"w-full"}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                  <InputField
                    labelTitle="Nova senha"
                    value={novaSenha}
                    disabled={!isEditingPassword}
                    onChange={(e) => setNovaSenha(e.target.value)}
                  />
                  <InputField
                    labelTitle="Confirmar senha"
                    value={confirmarSenha}
                    disabled={!isEditingPassword}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                  />
                </div>
                <div className="inputs-button">
                  <SaveButton
                    icon="🔒"
                    textContent="Alterar Senha"
                    disabled={!isEditingPassword}
                    onClick={handleSavePassword}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </MainComponent>
    </div>
  );
};

export default Administracao;
