import React, { useEffect, useState } from "react";
import "./editarPaciente.css";
import { useParams } from "react-router-dom";

import MenuLateralComponent from "../../components/MenuLateral/MenuLateralComponent";
import CheckBox from "../../components/Checkbox/Checkbox";
import InputField from "../../components/InputField/InputField";
import SaveButton from "../../components/SaveButton/SaveButton";
import MainComponent from "../../components/MainComponent/MainComponent";
import { FaUserEdit } from "react-icons/fa";
import {
  putDesativarPaciente,
  putPaciente,
  putEndereco,
} from "../../../../provider/api/pacientes/fetchs-pacientes";
import Swal from "sweetalert2"; // Importa o SweetAlert
import {
  confirmCancelEdit,
  errorMessage,
  responseMessage,
} from "../../../../utils/alert";
import { getPreferenciasPorId, putPreferencia } from "../../../../provider/api/preferencias/fetchs-preferencias";
import { getEnderecoPorCep } from "../../../../provider/api/pacientes/fetchs-pacientes";

const EditarPaciente = () => {
  const { id } = useParams();
  const [paciente, setPaciente] = React.useState({
    fkEndereco: {}, // Inicializa fkEndereco como um objeto vazio
    diaConsulta: "", // Inicializa diaConsulta como string vazia
    horaConsulta: "", // Inicializa horaConsulta como string vazia
  });
  const [isEditingGeneral, setIsEditingGeneral] = useState(false); // Controle do modo de edição
  const [isAtivo, setIsAtivo] = useState(false); // Controle do checkbox "Paciente Ativo"
  const [isPlanoAtivo, setIsPlanoAtivo] = useState(true); // Controle do checkbox "Plano Mensal"
  const [preferencias, setPreferencias] = useState([]); // Estado para armazenar as preferências do paciente
  const [erro, setErro] = useState(''); // Estado para armazenar erros

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pacienteResponse, preferenciasResponse] = await Promise.all([
          fetch(`/pacientes/${id}`).then((res) => res.json()),
          getPreferenciasPorId(id),
        ]);

        setPaciente({
          ...pacienteResponse,
          diaConsulta: preferenciasResponse.diaSemana,
          horaConsulta: preferenciasResponse.horario,
        });

        setIsAtivo(pacienteResponse.status === "ATIVO");
        setIsPlanoAtivo(pacienteResponse.fkPlano.id === 2);
        setPreferencias(preferenciasResponse);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [id]);
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

  function limparCamposEndereco() {
    setPaciente((prev) => ({
      ...prev,
      fkEndereco: {
        ...prev.fkEndereco,
        logradouro: "",
        bairro: "",
        cidade: "",
        uf: "",
      },
    }));
  }

  const handleBuscarEndereco = async () => {
    try {
      setErro('');
      const cepSemFormatacao = paciente.fkEndereco?.cep?.replace(/\D/g, '');

      if (!cepSemFormatacao || cepSemFormatacao.length !== 8) {
        throw new Error('Formato de CEP inválido.');
      }

      const endereco = await getEnderecoPorCep(cepSemFormatacao);

      setPaciente((prev) => ({
        ...prev,
        fkEndereco: {
          ...prev.fkEndereco,
          logradouro: endereco.logradouro || "",
          bairro: endereco.bairro || "",
          cidade: endereco.localidade || "",
          uf: endereco.uf || "",
        },
      }));

    } catch (error) {
      limparCamposEndereco();
      setErro("CEP Inválido ou não encontrado.");
      return
    }
  }

  const handleAtualizarPaciente = async () => {
    try {
      // const cpfFormatado = paciente.cpf?.trim();

      const pacienteAtualizado = {
        nome: paciente.nome,
        email: paciente.email,
        senha: paciente.senha || "senha_padrao",
        status: isAtivo ? "ATIVO" : "INATIVO",
        fkPlano: {
          id: isPlanoAtivo ? 2 : 1,
        },
        fkEndereco: {
          id: paciente.fkEndereco?.id || null,
        },
      };

      const preferenciaAtualizada = {
        diaSemana: paciente.diaConsulta,
        horario: paciente.horaConsulta,
        fkPaciente: {
          id: parseInt(id), // Certifique-se de que o ID é um número
        },
      };

      // Atualiza a preferência
      await putPreferencia(id, preferenciaAtualizada);

      console.log(`STATUS PACIENTE: ${pacienteAtualizado.status}`);
      sessionStorage(`ENDERECO: ${paciente.fkEndereco.id}`);

      // Verifica se o paciente deve ser desativado
      if (!isAtivo) {
        await putDesativarPaciente(id, pacienteAtualizado);
      } else {
        // Atualiza o paciente normalmente
        await putPaciente(id, pacienteAtualizado);

      }

      let enderecoAtualizado = false;

      if (paciente.fkEndereco?.id) {
        const enderecoPayload = {
          cep: paciente.fkEndereco?.cep?.trim() || "",
          logradouro: paciente.fkEndereco?.logradouro || "",
          bairro: paciente.fkEndereco?.bairro || "",
          numero: paciente.fkEndereco?.numero || "",
          cidade: paciente.fkEndereco?.cidade || "",
          uf: paciente.fkEndereco?.uf || "",
        };

        await putEndereco(paciente.fkEndereco.id, enderecoPayload);
        enderecoAtualizado = true;
      } else {
        console.warn(
          "Usuário não possui endereço cadastrado. PUT de endereço ignorado."
        );
      }

      if (enderecoAtualizado) {
        responseMessage("Paciente e endereço atualizados com sucesso!");
      } else {
        responseMessage("Paciente atualizado com sucesso!");
      }

      setIsEditingGeneral(false);
    } catch (error) {
      console.error("Erro ao atualizar paciente ou endereço:", error);
      errorMessage("Ocorreu um erro ao atualizar o paciente ou endereço.");
    }
  };
  return (
    <div className="div-administracao flex">
      <MenuLateralComponent></MenuLateralComponent>

      <MainComponent
        title="Editar Paciente"
        headerContent={
          <>
            <div className="flex w-full justify-between">
              <button
                className="btn_agendamento"
                onClick={() => (window.location.href = "/dashboard/pacientes")}
              >
                {"< Voltar"}
              </button>
              <button
                className="btn_agendamento flex rounded-full"
                onClick={handleEditGeneral}
              >
                {isEditingGeneral ? "Cancelar" : "Editar"}
              </button>
            </div>
          </>
        }
      >
        <form className="editPaciente">
          <section className="flex">
            <figure>
              <div></div>
              <span>
                <span>Upload</span> imagem
              </span>
            </figure>

            <section className="fields">
              <section>
                <h2>Dados do Paciente:</h2>
                <div className="inputArea">
                  <InputField
                    disabled={!isEditingGeneral}
                    labelTitle={"Nome"}
                    value={paciente.nome || ""}
                    onChange={(e) =>
                      setPaciente((prev) => ({
                        ...prev,
                        nome: e.target.value,
                      }))
                    }
                  />
                  <InputField
                    disabled={true}
                    labelTitle={"CPF"}
                    value={paciente.cpf || ""}
                  />
                  <InputField
                    disabled={!isEditingGeneral}
                    type={"tel"}
                    labelTitle={"Telefone"}
                    value={paciente.telefone || ""}
                    onChange={(e) =>
                      setPaciente((prev) => ({
                        ...prev,
                        telefone: e.target.value,
                      }))
                    }
                  />
                  <InputField
                    disabled={!isEditingGeneral}
                    type={"email"}
                    labelTitle={"E-mail"}
                    value={paciente.email || ""}
                    onChange={(e) =>
                      setPaciente((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                  <InputField
                    disabled={!isEditingGeneral}
                    labelTitle={"Dia de Consultas"}
                    value={paciente.diaConsulta || ""}
                    onChange={(e) =>
                      setPaciente((prev) => ({
                        ...prev,
                        diaConsulta: e.target.value,
                      }))
                    }
                  />
                  <InputField
                    disabled={!isEditingGeneral}
                    labelTitle={"Horário de Consultas"}
                    value={paciente.horaConsulta || ""}
                    onChange={(e) =>
                      setPaciente((prev) => ({
                        ...prev,
                        horaConsulta: e.target.value,
                      }))
                    }
                  />
                  <InputField
                    disabled={!isEditingGeneral}
                    labelTitle={"Contato de Emergência"}
                    value={paciente.nomeContato || ""}
                    onChange={(e) =>
                      setPaciente((prev) => ({
                        ...prev,
                        nomeContato: e.target.value,
                      }))
                    }
                  />
                  <InputField
                    disabled={!isEditingGeneral}
                    type={"tel"}
                    labelTitle={"Telefone de Emergência"}
                    value={paciente.telefoneContato || ""}
                    onChange={(e) =>
                      setPaciente((prev) => ({
                        ...prev,
                        telefoneContato: e.target.value,
                      }))
                    }
                  />
                </div>

                <h2>Endereço:</h2>
                <div className="inputArea">
                  <div>
                    <InputField
                      disabled={!isEditingGeneral}
                      type={"text"}
                      labelTitle={"CEP"}
                      value={paciente.fkEndereco?.cep || ""} // Usa o operador ?. para evitar erros
                      maxLength={8}
                      onChange={(e) =>
                        setPaciente((prev) => ({
                          ...prev,
                          fkEndereco: {
                            ...prev.fkEndereco,
                            cep: e.target.value,
                          },
                        }))
                      }
                      onBlur={handleBuscarEndereco}
                    />
                    {erro && <p className='text-xs text-red-500'>{erro}</p>}
                  </div>
                  <InputField
                    disabled={!isEditingGeneral}
                    type={"text"}
                    labelTitle={"Cidade"}
                    value={paciente.fkEndereco?.cidade || ""} // Usa o operador ?. para evitar erros
                    onChange={(e) =>
                      setPaciente((prev) => ({
                        ...prev,
                        fkEndereco: {
                          ...prev.fkEndereco,
                          cidade: e.target.value,
                        },
                      }))
                    }
                  />
                  <InputField
                    disabled={!isEditingGeneral}
                    type={"text"}
                    labelTitle={"Bairro"}
                    value={paciente.fkEndereco?.bairro || ""} // Usa o operador ?. para evitar erros
                    onChange={(e) =>
                      setPaciente((prev) => ({
                        ...prev,
                        fkEndereco: {
                          ...prev.fkEndereco,
                          bairro: e.target.value,
                        },
                      }))
                    }
                  />
                  <InputField
                    disabled={!isEditingGeneral}
                    type={"text"}
                    labelTitle={"Número"}
                    value={paciente.fkEndereco?.numero || ""}
                    onChange={(e) =>
                      setPaciente((prev) => ({
                        ...prev,
                        fkEndereco: {
                          ...prev.fkEndereco,
                          numero: e.target.value,
                        },
                      }))
                    }
                  />
                  <InputField
                    disabled={!isEditingGeneral}
                    type={"text"}
                    labelTitle={"Logradouro"}
                    value={paciente.fkEndereco?.logradouro || ""}
                    onChange={(e) =>
                      setPaciente((prev) => ({
                        ...prev,
                        fkEndereco: {
                          ...prev.fkEndereco,
                          logradouro: e.target.value,
                        },
                      }))
                    }
                  />
                  <div className="flex flex-col gap-2">
                    <label className="w-fit text-sm font-bold text-gray-800">Estado:</label>
                    <select className="border-b border-gray-300 text-sm px-0 py-2 caret-blue-500 outline-none"
                      disabled={!isEditingGeneral}
                      type={"text"}
                      labelTitle={"Estado"}
                      value={paciente.fkEndereco?.uf || ""}
                      onChange={(e) =>
                        setPaciente((prev) => ({
                          ...prev,
                          fkEndereco: {
                            ...prev.fkEndereco,
                            uf: e.target.value,
                          },
                        }))
                      }
                    >
                      <option value="">Selecione o estado</option>
                      <option value="AC">AC</option>
                      <option value="AL">AL</option>
                      <option value="AP">AP</option>
                      <option value="AM">AM</option>
                      <option value="BA">BA</option>
                      <option value="CE">CE</option>
                      <option value="DF">DF</option>
                      <option value="ES">ES</option>
                      <option value="GO">GO</option>
                      <option value="MA">MA</option>
                      <option value="MT">MT</option>
                      <option value="MS">MS</option>
                      <option value="MG">MG</option>
                      <option value="PA">PA</option>
                      <option value="PB">PB</option>
                      <option value="PR">PR</option>
                      <option value="PE">PE</option>
                      <option value="PI">PI</option>
                      <option value="RJ">RJ</option>
                      <option value="RN">RN</option>
                      <option value="RS">RS</option>
                      <option value="RO">RO</option>
                      <option value="RR">RR</option>
                      <option value="SC">SC</option>
                      <option value="SP">SP</option>
                      <option value="SE">SE</option>
                      <option value="TO">TO</option>
                    </select>
                  </div>
                  <CheckBox
                    CheckboxValue={"ativo"}
                    labelTitle={"Plano Mensal?"}
                    checked={isPlanoAtivo}
                    disabled={!isEditingGeneral}
                    onChange={(e) => setIsPlanoAtivo(e.target.checked)}
                  />
                  <CheckBox
                    CheckboxValue={"ativo"}
                    labelTitle={"Paciente Ativo?"}
                    checked={isAtivo}
                    disabled={!isEditingGeneral}
                    onChange={(e) => setIsAtivo(e.target.checked)}
                  />
                </div>
              </section>
            </section>
          </section>
          <SaveButton
            textContent="Salvar Alterações"
            disabled={!isEditingGeneral}
            onClick={handleAtualizarPaciente}
          />
        </form>
      </MainComponent>
    </div>
  );
};

export default EditarPaciente;
