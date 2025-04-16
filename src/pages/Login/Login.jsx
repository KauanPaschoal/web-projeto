import React, { useState } from "react";
import { Link } from "react-router-dom"; // Certifique-se de importar o Link corretamente
import logo from "../../assets/images/LogoTipo Branco 1.svg"; // Atualize o caminho para o logo
import { errorMessage, responseMessage } from "../../utils/alert.js";
// import { autenticateUser } from "../../utils/auth.js";
import "./style/login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!autenticateUser(email, password)) return;

    fetch("/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        senha: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao autenticar usuário");
        }
        return response.json();
      })
      .then((data) => {
        // Captura os dados retornados
        const { id, nome, email, token } = data;


        const toCapitalize = (str) => {
          return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        };
        const nomeFormatado = toCapitalize(nome);

        if (token) {
          // Armazena o token no localStorage
          localStorage.setItem("authToken", token);

          localStorage.setItem("nomeUsuario", nomeFormatado);

          responseMessage(`Bem vindo, ${nomeFormatado}!`);
          setTimeout(() => {
            window.location.href = "/dashboard"; // Alterar para a rota da dash
          }, 2300);
        } else {
          errorMessage("Usuário ou senha inválidos");
        }
      })
      .catch((error) => console.error("Erro ao autenticar usuário:", error));
  };

  return (
    <div className="background">
      <div className="card">
        <div className="login-container">
          <Link to="/" className="">
            Voltar
          </Link>
          <h1 className="text-2xl font-semibold">Que bom te ver de novo!</h1>
          <h2 className="text-1xl font-small">Entre para continuar</h2>
          <form
            id="loginForm"
            onSubmit={handleSubmit}
            noValidate
            className="w-4/5 space-y-8"
          >
            <div>
              <label htmlFor="email" className="block text-base font-small">
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
            <p className="">
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
        </div>
        <div className="cadastro-container bg-darkestBlueFy">
          <img src={logo} alt="Logo" className="logo-class" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
