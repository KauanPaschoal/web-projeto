import { errorMessage, responseMessage } from './alert.js';


export function autenticateUser(email, password) {
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