import { FaSave } from "react-icons/fa";
import InputField from "../components/InputField/InputField";
import MainComponent from "../components/mainComponent/MainComponent";
import MenuLateralComponent from "../components/MenuLateral/MenuLateralComponent";
import "./adicionarPsicologo.css";


const AdicionarPsicologo = () => {
    return (
        <>
            <MenuLateralComponent></MenuLateralComponent>
            <MainComponent title="Adicionar Psicólogo" headerContent={<button className="btn_agendamento" onClick={() => window.location.href = '/dashboard/agendamentos'}>
                {"< Voltar"}
            </button>}>
                <div className="container-psicologo">
                    <h2>Dados do Psicólogo: </h2>
                    <form className="flex flex-col gap-5" action="" method="post">
                        <div className="flex gap-3" >
                            <InputField type="text" name="primeiroNome" labelTitle="Primeiro Nome" placeholder={"Informe o nome"} width={'w-[50%]'} required />
                            <InputField type="text" name="sobrenome" labelTitle="Sobrenome" placeholder={"Informe o sobrenome"} width={'w-[50%]'} required />
                        </div>

                        <div className="flex gap-3" >
                            <InputField type="date" name="dataNascimento" labelTitle="Data de Nascimento" width={'w-[50%]'}  required />
                            <InputField type="number" name="telefone" labelTitle="Telefone" placeholder={"(11) 98877-6655"} width={'w-[50%]'} required />
                        </div>
                        <InputField type="email" name="email" labelTitle="Endereço de Email" placeholder={"Informe seu Email"} width={'w-[100%]'} required />
                        <div className="flex gap-3">
                            <InputField type="password" name="senha" labelTitle="Senha" placeholder={"Digite sua senha"} width={'w-[50%]'} required />
                            <InputField type="password" name="confirmarSenha" labelTitle="Confirmar Senha" placeholder={"Confirme sua Senha"} width={'w-[50%]'} required />
                        </div>
                    </form>
                    <div className="flex gap-3 justify-end mt-5">
                        <button className="btn_primario flex rounded-full" >
                            <FaSave className="icon-save" />
                            Adicionar Psicólogo
                        </button>
                        <button className="btn_secundario flex rounded-full" >
                            Cancelar
                        </button>
                    </div>
                </div>
            </MainComponent>
        </>
    );
}

export default AdicionarPsicologo;