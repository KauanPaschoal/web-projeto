import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import Dashboard from "./pages/dashboard/Dashboard";
import Agendamentos from "./pages/dashboard/agendamentos/Agendamentos";
import CadastrarAgendamento from "./pages/dashboard/agendamentos/CadastrarAgendamento/CadastrarAgendamento";
import EditarAgendamento from "./pages/dashboard/agendamentos/EditarAgendamento/EditarAgendamento";
import Pacientes from "./pages/dashboard/pacientes/Pacientes";
import EditarPaciente from "./pages/dashboard/pacientes/EditarPaciente/EditarPaciente";
import AdicionarPaciente from "./pages/dashboard/pacientes/AdicionarPaciente/AdicionarPaciente";
import Administracao from "./pages/dashboard/administracao/Administracao";
import Psicologos from "./pages/dashboard/psicologos/psicologos";
import AdicionarPsicologo from "./pages/dashboard/psicologos/adicionarPsicologo/adicionarPsicologo";
import LoginPage from "./pages/Login/Login";
import EditarPsicologo from "./pages/dashboard/psicologos/visualizarPsicologo/EditarPsicologo";

export const routes = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/dashboard/agendamentos", element: <Agendamentos /> },
    { path: "/dashboard/agendamentos/cadastrar/:id", element: <CadastrarAgendamento /> },
    { path: "/dashboard/agendamentos/cadastrar", element: <CadastrarAgendamento /> },
    { path: "/dashboard/agendamentos/editar/:id", element: <EditarAgendamento /> },
    { path: "/dashboard/pacientes", element: <Pacientes /> },
    { path: "/dashboard/pacientes/editar/:id", element: <EditarPaciente /> },
    { path: "/dashboard/pacientes/adicionar", element: <AdicionarPaciente /> },
    { path: "/dashboard/administracao", element: <Administracao /> },
    { path: "/dashboard/psicologos", element: <Psicologos /> },
    { path: "/dashboard/psicologos/adicionar", element: <AdicionarPsicologo /> },
    { path: "/dashboard/psicologos/editar/:id", element: <EditarPsicologo /> },
    { path: "*", element: <h1>Página não encontrada.</h1> }
]);
