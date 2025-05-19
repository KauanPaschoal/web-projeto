import React, { useEffect, useState } from 'react'
import MenuPsicologo from '../components/menuPsicologo/menuPsicologo'
import MainComponent from '../../components/MainComponent/MainComponent'
import InputField from '../../components/InputField/InputField'
import { useParams } from 'react-router-dom';
import { getPsicologosPorId, putPsicologo } from '../../../../provider/api/psicologos/fetchs-psicologos';
import { confirmCancelEdit } from "../../../../utils/alert"; // certifique-se de importar

const EditarPsicologo = () => {
    const { id } = useParams();

    const [psicologo, setPsicologo] = useState({
        nome: "",
        crp: "",
        email: "",
        telefone: "",
        status: true,
        img: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchPsicologo = async () => {
            try {
                const data = await getPsicologosPorId(id);
                setPsicologo({
                    nome: data.nome || "",
                    crp: data.crp || "",
                    email: data.email || "",
                    telefone: data.telefone || "",
                    status: data.status !== undefined ? data.status : true,
                    img: data.img || ""
                });
            } catch (err) {
                setError(err.message || 'Erro ao buscar psicólogo');
            } finally {
                setLoading(false);
            }
        };
        fetchPsicologo();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPsicologo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleStatusChange = (e) => {
        setPsicologo(prev => ({
            ...prev,
            status: e.target.value === "ATIVO"
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await putPsicologo(id, psicologo);
            setIsEditing(false);
        } catch (err) {
            setError(err.message || 'Erro ao atualizar psicólogo');
        }
        setLoading(false);
    };

    const handleEditGeneral = async () => {
        if (isEditing) {
            const result = await confirmCancelEdit(
                "Cancelar edição?",
                "Tem certeza que deseja cancelar a edição?",
                "small"
            );
            if (!result.isConfirmed) return;
        }
        setIsEditing(!isEditing);
    };

    return (
        <div>
            <MenuPsicologo />
            <MainComponent
                title={"Editar Psicólogo"}
                mostrarIconeNotificacao={false}
                headerContent={
                    <div className="flex w-full justify-between">
                        <button
                            className="btn_agendamento"
                            onClick={() => window.location.href = "/dashboard/psicologos"}
                        >
                            {"< Voltar"}
                        </button>
                        <button
                            className="btn_agendamento flex rounded-full"
                            onClick={handleEditGeneral}
                        >
                            {isEditing ? "Cancelar" : "Editar"}
                        </button>
                    </div>
                }
            >
                {loading ? (
                    <p>Carregando...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <form className="flex w-full align-center justify-center" onSubmit={handleSave}>
                        <div className="items-center align-center flex flex-col gap-2 w-full max-w-[500px]">
                            <img src={psicologo.img || "https://placehold.co/100"} alt="" />
                            <div className="flex justify-center gap-2 w-[100%]">
                                <InputField
                                    labelTitle="Nome"
                                    name="nome"
                                    value={psicologo.nome}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                                <InputField
                                    labelTitle="CRP"
                                    name="crp"
                                    value={psicologo.crp}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="flex justify-center gap-2 w-[100%]">
                                <InputField
                                    labelTitle="Email"
                                    name="email"
                                    type="email"
                                    value={psicologo.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                                <InputField
                                    labelTitle="Telefone"
                                    name="telefone"
                                    type="tel"
                                    value={psicologo.telefone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="inputContainer w-[100%]">
                                <label>Status:</label>
                                <select
                                    name="status"
                                    value={psicologo.status ? "ATIVO" : "INATIVO"}
                                    onChange={handleStatusChange}
                                    disabled={!isEditing}
                                    className="inputField w-[100%]"
                                >
                                    <option value="ATIVO">Ativo</option>
                                    <option value="INATIVO">Inativo</option>
                                </select>
                            </div>
                            {isEditing && (
                                <button type="submit" className="btn_primario rounded-full mt-4">
                                    Salvar Alterações
                                </button>
                            )}
                        </div>
                    </form>
                )}
            </MainComponent>
        </div>
    )
}

export default EditarPsicologo