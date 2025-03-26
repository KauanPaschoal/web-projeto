import { errorMessage, responseMessage } from './utils/alert.js';
import { autenticateUser } from './utils/auth.js';


document.getElementById("loginForm").addEventListener("submit", (event) => {
event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!autenticateUser(email, password)) return;

  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((users) => {
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        responseMessage(`Bem vindo ao AgendFy`);
        setTimeout(() => {
          window.location.href = "teste.html";
        }, 2300);
      } else {
        errorMessage(`Usuário ou senha inválidos`);
      }
    })
    .catch((error) => console.error("Erro ao buscar usuários:", error));
}
)
