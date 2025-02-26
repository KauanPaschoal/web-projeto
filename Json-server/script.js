function errorMessage(mensagem) {
  Swal.fire({
    position: "top-end",
    icon: "error",
    title: mensagem,
    showConfirmButton: false,
    timer: 2300,
  });
}

function responseMessage(mensagem) {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: mensagem,
    showConfirmButton: false,
    timer: 2300,
  });
}

function autenticateUser(email, password) {
  if (email === "" || password === "") {
    mensagem = `Você não pode ter campos vazios!`;
    errorMessage(mensagem);
    return;
  } else if (email.indexOf("@") == -1 || !email.endsWith(".com")) {
    mensagem = `Email precisa ter @ e terminar com .com`;
    errorMessage(mensagem);
    return;
  } else if (password.length <= 8 && password.indexOf("@", "#")) {
    mensagem = `A senha tem que ter ao menos 8 caracteres e 1 caracter especial`;
    errorMessage(mensagem);
    return;
  }
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  let mensagem = "";

  autenticateUser(email, password);

  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((users) => {
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        mensagem = `Bem vindo ao AgendFy`;
        responseMessage(mensagem);
      } else {
        mensagem = `Usuário ou senha inválidos`;
        errorMessage(mensagem);
      }
    })
    .catch((error) => console.error("Erro ao buscar usuários:", error));
}
