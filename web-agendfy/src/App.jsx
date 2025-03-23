import './App.css'

import LandingPage from './assets/pages/landingPage/LandingPage'
import Dashboard from './assets/pages/dashboard/Dashboard'
import Login from './assets/pages/Login/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Agendamentos from './assets/pages/dashboard/agendamentos/Agendamentos'
import Pacientes from './assets/pages/dashboard/pacientes/Pacientes'
import Administracao from './assets/pages/dashboard/administração/Administracao'

function App() {

  return (
    <>
      <div className="App">
        {/* <LandingPage></LandingPage> */}
        {/* <Dashboard></Dashboard> */}

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/agendamentos" element={<Agendamentos />} />
            <Route path="/dashboard/pacientes" element={<Pacientes />} />
            <Route path="/dashboard/administracao" element={<Administracao />} />
            <Route path="*" element={<h1>Página não encontrada.</h1>} />

          </Routes>
        </BrowserRouter>
      </div> 
    </>
  )
}

export default App
