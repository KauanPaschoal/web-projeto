import Swal from "sweetalert2";

export function errorMessage(mensagem) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: mensagem,
      showConfirmButton: false,
      timer: 2300,
      backdrop: false,
    });
  }
  
export function responseMessage(mensagem) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: mensagem,
      showConfirmButton: false,
      timer: 2300,
      backdrop: false,
    });
  }