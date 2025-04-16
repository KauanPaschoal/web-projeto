import React from "react";
import "./style/Administracao.css";
import MenuLateralComponent from "../components/menuLateral/MenuLateralComponent";
import MainComponent from "../components/mainComponent/MainComponent";
import InputField from "../components/InputField/InputField";
import SaveButton from "../components/SaveButton/SaveButton";

const Administracao = () => {
  return (
    <div className="div-administracao flex">
      <MenuLateralComponent />
      <MainComponent title="Administração">
        <div className="container-admin">
          <div className="card-header">
            <h2 className="card-title">Conta</h2>
            <button className="edit-button"> Editar</button>
          </div>
          <div className="card">
            <div className="card-forms">
              <div className="forms-container">
                {/* Coluna 1 - Dados Gerais */}
                <form className="editar-conta">
                  <h2>Dados Gerais:</h2>
                  <InputField
                    labelTitle="E-mail"
                    value="yuri.alberto@sccp.com"
                    type="email"
                  />
                  <InputField labelTitle="Nome" value="Yuri Alberto" />
                  <InputField labelTitle="CPF" value="123.456.789-10" />
                  <InputField labelTitle="Telefone" value="(11) 94002-8922" />
                </form>

                {/* Coluna 2 - Alterar Senha */}
                <form className="editar-conta">
                  <h2>Alterar Senha:</h2>
                  <InputField labelTitle="Senha" value="Yuri Alberto" />
                  <InputField labelTitle="Nova senha" value="123.456.789-10" />
                  <InputField
                    labelTitle="Confirmar senha"
                    value="(11) 94002-8922"
                  />
                  <button>Preferencias</button>
                </form>
              </div>
            </div>

            <div className="container-botao">
              <div className="botoes-acao">
                <SaveButton icon="📄" textContent="Salvar Alterações" />
                <SaveButton icon="🔒" textContent="Alterar Senha" outline />
              </div>
            </div>
          </div>
        </div>
      </MainComponent>
    </div>
  );
};

export default Administracao;
