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
            <MainComponent title="Configurações de Conta"
                headerContent={
                    <div className='flex w-full gap-2 items-center justify-between'>
                        <button className="btn_agendamento">Voltar</button>
                        <button className="btn_agendamento">Prefe</button>

                    </div>}>


                <div className="form-cadastrar-agendamento">
                    <div className="card-forms">
                        <div className="forms-container">
                            <form className="editar-conta">
                                <h2>Dados Gerais:</h2>
                                <div className="card-inputs">
                                    <InputField
                                        labelTitle="E-mail"
                                        value="yuri.alberto@sccp.com"
                                        type="email"
                                    />
                                    <InputField labelTitle="Nome" value="Yuri Alberto" />
                                    <InputField labelTitle="CPF" value="123.456.789-10" />
                                    <InputField labelTitle="Telefone" value="(11) 94002-8922" />
                                    <SaveButton icon="📄" textContent="Salvar Alterações" />
                                </div>


                            </form>

                            <form className="editar-conta">
                                <h2>Alterar Senha:</h2>
                                <div className="card-inputs">
                                    <InputField labelTitle="Senha" value="Yuri Alberto" width={"w-full"} />
                                    <InputField labelTitle="Nova senha" value="123.456.789-10" />
                                    <InputField
                                        labelTitle="Confirmar senha"
                                        value="(11) 94002-8922"

                                    />




                                </div>
                                <div className="inputs-button">
                                    <SaveButton icon="🔒" textContent="Alterar Senha" outline />

                                </div>


                            </form>
                        </div>
                    </div>

                    {/* <div className="container-botao">
              <div className="botoes-acao">
              </div>
            </div> */}
                </div>
            </MainComponent>
        </div>
    );
};

export default Administracao;