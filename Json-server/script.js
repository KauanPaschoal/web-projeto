function errorMessage(mensagem) {
  Swal.fire({
    position: "top-end",
    icon: "error",
    title: mensagem,
    showConfirmButton: false,
    timer: 2300,
    backdrop: false,
  });
}

function responseMessage(mensagem) {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: mensagem,
    showConfirmButton: false,
    timer: 2300,
    backdrop: false,
  });
}

function autenticateUser(email, password) {
  if (email === "" || password === "") {
    errorMessage(`Você não pode ter campos vazios!`);
    return false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errorMessage(`Email inválido!`);
    return false;
  }

  if (password.length < 8 || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errorMessage(
      `A senha precisa ter ao menos 8 caracteres e 1 caractere especial`
    );
    return false;
  }

  return true;
}

function login(event) {
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

document.getElementById("loginForm").addEventListener("submit", (event) => {
  login(event);
});
