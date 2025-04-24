import { FaSave } from "react-icons/fa";
import InputField from "../../components/InputField/InputField";
import MenuLateralComponent from "../../components/MenuLateral/MenuLateralComponent";
import "./adicionarPsicologo.css";
import MainComponent from "../../components/MainComponent/MainComponent";
import MenuPsicologo from "../components/menuPsicologo/menuPsicologo";


const AdicionarPsicologo = () => {
    return (
        <>
            <MenuPsicologo></MenuPsicologo>
            <MainComponent title="Adicionar Psicólogo" headerContent={<button className="btn_agendamento" onClick={() => window.location.href = '/dashboard/psicologos'}>
                {"< Voltar"}
            </button>}>
                <div className="container-psicologo">
                    <h2>Dados do Psicólogo: </h2>
                    <form className="flex flex-col gap-5 w-full" action="" method="post">
                        <div className="flex gap-3" >
                            <InputField type="text" name="primeiroNome" labelTitle="Primeiro Nome" placeholder={"Informe o nome"} width={'w-[50%]'} required />
                            <InputField type="text" name="sobrenome" labelTitle="Sobrenome" placeholder={"Informe o sobrenome"} width={'w-[50%]'} required />
                        </div>

                        <div className="flex gap-3" >
                            <InputField type="date" name="dataNascimento" labelTitle="Data de Nascimento" width={'w-[50%]'} required />
                            <InputField type="number" name="telefone" labelTitle="Telefone" placeholder={"(11) 98877-6655"} width={'w-[50%]'} required />
                        </div>
                        <div className="flex gap-3">
                            <InputField type="email" name="email" labelTitle="Endereço de Email" placeholder={"Informe seu Email"} width={'w-[50%]'} required />
                            <InputField type="text" name="CRP" labelTitle="CRP" placeholder={"Informe o CRP"} width={'w-[50%]'} required />
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