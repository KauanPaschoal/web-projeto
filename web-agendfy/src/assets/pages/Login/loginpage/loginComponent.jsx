import React, { useState } from "react";
import { Link } from "react-router-dom";
import { autenticateUser } from "./auth.js"; // Importa a função de autenticação
import { responseMessage } from "./alert.js"; // Importa a função de sucesso
import Swal from "sweetalert2";

import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica se os dados são válidos antes de prosseguir
    if (!autenticateUser(email, password)) return;

    // Simula um login bem-sucedido
    responseMessage("Login realizado com sucesso!");
  };

  return (
    <div className="background">
      <div className="card">
        <div className="login-container flex flex-col items-center w-1/2 p-12">
          <Link
            to="/"
            className="text-lightBlueFy text-lg font-semibold text-left"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-semibold">Que bom te ver de novo!</h1>
          <h2 className="text-2xl font-medium">Entre para continuar</h2>
          <form
            id="loginForm"
            onSubmit={handleSubmit}
            noValidate
            className="w-4/5 space-y-8"
          >
            <div>
              <label htmlFor="email" className="block text-base font-medium">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email_input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border-b-2 border-lightGrayFy"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-base font-medium">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="senha_input"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 border-b-2 border-lightGrayFy"
              />
            </div>
            <p className="text-sm text-gray-600">
              É necessário no mínimo 8 letras, 1 letra maiúscula e 1 número.
            </p>
            <Link
              to="/esqueci-senha"
              className="text-darkBlueFy font-semibold text-right block"
            >
              Esqueceu a senha?
            </Link>
            <button
              type="submit"
              className="bg-lightBlueFy text-white text-lg font-semibold py-2 px-8 border-2 border-darkestBlueFy hover:bg-darkBlueFy transition ease-in-out duration-200"
            >
              Entrar
            </button>
          </form>
          <span className="text-lg text-gray-600">Ou entre com:</span>
          <button className="bg-transparent text-darkestBlueFy text-lg font-semibold py-2 px-8 border-2 border-darkestBlueFy hover:bg-darkBlueFy hover:text-white transition ease-in-out duration-200">
            Google
          </button>
        </div>
        <div className="cadastro-container flex flex-col items-center w-1/2 p-12 bg-darkestBlueFy text-white space-y-4">
          <h1 className="text-3xl font-semibold">Não tem uma conta?</h1>
          <h3 className="text-xl">Inicie o Cadastro</h3>
          <Link
            to="/cadastro"
            className="bg-transparent text-white text-lg font-semibold py-2 px-8 border-2 border-white hover:bg-white hover:text-darkBlueFy transition ease-in-out duration-200"
          >
            Cadastrar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
