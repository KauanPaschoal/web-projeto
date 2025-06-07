import { useEffect, useState } from 'react'
import MenuPsicologo from '../components/menuPsicologo/menuPsicologo'
import MainComponent from '../../components/MainComponent/MainComponent'
import InputField from '../../components/InputField/InputField'
import { useParams } from 'react-router-dom';
import { getPsicologosPorId, putPsicologo } from '../../../../provider/api/psicologos/fetchs-psicologos';
import { confirmCancelEdit } from "../../../../utils/alert";
import './EditarPsicologo.css'
import { FaUser } from 'react-icons/fa';
import EditButton from '../../components/EditButton/EditButton';

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
                        <EditButton
                            className="bg-white"
                            onClick={handleEditGeneral}
                            text={isEditing ? "Cancelar" : "Editar"}
                        />
                    </div>
                }
            >
                {loading ? (
                    <p>Carregando...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div className="pacientes-background">
                        <form className="flex w-full align-center justify-center h-full" onSubmit={handleSave}>
                            <div className="form-psicologo">
                                <figure>
                                    <div style={{ width: 120, height: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        {psicologo.imagemUrl && psicologo.imagemUrl.trim() !== "" ? (
                                            <img
                                                src={psicologo.imagemUrl}
                                                alt="Foto do paciente"
                                                style={{ width: 120, height: 120, borderRadius: "1em", objectFit: "cover" }}
                                            />
                                        ) : (
                                            <FaUser size={80} color="#bdbdbd" />
                                        )}
                                    </div>
                                </figure>
                                <div className="flex flex-col items-center justify-center gap-2 w-[50%]">
                                    <InputField
                                        labelTitle="Nome"
                                        name="nome"
                                        containerWidth={"w-[100%]"}
                                        value={psicologo.nome}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                    <InputField
                                        labelTitle="CRP"
                                        name="crp"
                                        containerWidth={"w-[100%]"}
                                        value={psicologo.crp}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                    <InputField
                                        labelTitle="Email"
                                        name="email"
                                        type="email"
                                        containerWidth={"w-[100%]"}
                                        value={psicologo.email}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                    <InputField
                                        labelTitle="Telefone"
                                        name="telefone"
                                        type="tel"
                                        containerWidth={"w-[100%]"}
                                        value={psicologo.telefone}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
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
                                </div>
                                {isEditing ? (
                                <button
                                    type="submit"
                                    form="form-psicologo"
                                    className="btn_primario rounded-full"
                                >
                                    Salvar Alterações
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="btn_secundario rounded-full"
                                    onClick={() => window.location.href = "/dashboard/psicologos"}
                                >
                                    Voltar
                                </button>
                            )}
                            </div>
                        </form>
                    </div>
                )}
            </MainComponent>
        </div>
    )
}

export default EditarPsicologo