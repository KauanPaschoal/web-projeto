import "./App.css";

import LandingPage from "./pages/landingPage/LandingPage";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Agendamentos from "./pages/dashboard/agendamentos/Agendamentos";
import CadastrarAgendamento from "./pages/dashboard/agendamentos/CadastrarAgendamento/CadastrarAgendamento";
import EditarAgendamento from "./pages/dashboard/agendamentos/EditarAgendamento/EditarAgendamento";

import Pacientes from "./pages/dashboard/pacientes/Pacientes";
import EditarPaciente from "./pages/dashboard/pacientes/EditarPaciente/EditarPaciente";
import AdicionarPaciente from "./pages/dashboard/pacientes/AdicionarPaciente/AdicionarPaciente";
import AdicionarPsicologo from "./pages/dashboard/adicionarPsicologo/adicionarPsicologo";

import Administracao from "./pages/dashboard/administracao/Administracao";


function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/agendamentos" element={<Agendamentos />} />
            <Route path="/dashboard/agendamentos/cadastrar/:id" element={<CadastrarAgendamento/>} />
            <Route path="/dashboard/agendamentos/editar" element={<EditarAgendamento />} />
            <Route path="/dashboard/pacientes" element={<Pacientes />} />
            <Route path="/dashboard/administracao" element={<Administracao />} />
            <Route path="/dashboard/pacientes/editar/:id" element={<EditarPaciente />} />
            <Route path="/dashboard/pacientes/adicionar" element={<AdicionarPaciente />} />
            <Route path="/dashboard/adicionarPsicologo" element={<AdicionarPsicologo />} />
            <Route path="*" element={<h1>Página não encontrada.</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
