import "./App.css";

import LandingPage from "./pages/landingPage/LandingPage";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Agendamentos from "./pages/dashboard/agendamentos/Agendamentos";
import Pacientes from "./pages/dashboard/pacientes/Pacientes";

import EditarPaciente from "./pages/dashboard/pacientes/EditarPaciente/EditarPaciente";
import AdicionarPaciente from "./pages/dashboard/pacientes/AdicionarPaciente/AdicionarPaciente";
import Administracao from "./pages/dashboard/administração/Administracao";

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
            <Route path="/dashboard/pacientes" element={<Pacientes />} />
            <Route path="/dashboard/administracao" element={<Administracao />} />
            <Route path="/dashboard/pacientes/editar" element={<EditarPaciente />} />
            <Route path="/dashboard/pacientes/adicionar" element={<AdicionarPaciente />} />
            <Route path="*" element={<h1>Página não encontrada.</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
