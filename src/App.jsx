import "./App.css";

import LandingPage from "./pages/landingPage/LandingPage";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
import Agendamentos from "./pages/dashboard/agendamentos/Agendamentos";
import CadastrarAgendamento from "./pages/dashboard/agendamentos/CadastrarAgendamento/CadastrarAgendamento";
import EditarAgendamento from "./pages/dashboard/agendamentos/EditarAgendamento/EditarAgendamento";

import Pacientes from "./pages/dashboard/pacientes/Pacientes";
import EditarPaciente from "./pages/dashboard/pacientes/EditarPaciente/EditarPaciente";
import AdicionarPaciente from "./pages/dashboard/pacientes/AdicionarPaciente/AdicionarPaciente";
import AdicionarPsicologo from "./pages/dashboard/psicologos/adicionarPsicologo/adicionarPsicologo";

import Administracao from "./pages/dashboard/administracao/Administracao";
import Psicologos from "./pages/dashboard/psicologos/psicologos";
import { routes } from "./routes";




function App() {
  return (
    <>
      <div className="App">
        <RouterProvider router={routes} />
      </div>
    </>
  );
}

export default App;
