import Swal from "sweetalert2";
import "../App.css";
import Cleave from "cleave.js";

export function errorMessage(mensagem, size = "small") {
  Swal.fire({
    position: "top-end",
    icon: "error",
    title: mensagem,
    showConfirmButton: false,
    timer: 2300,
    backdrop: false,
    customClass: {
      popup: `swal-${size}`,
    },
  });
}

export function responseMessage(mensagem, size = "small") {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: mensagem,
    showConfirmButton: false,
    timer: 2300,
    backdrop: false,
    customClass: {
      popup: `swal-${size}`,
    },
  });
}

export function popupMessage() {
  Swal.fire({
    title: '<span style="color: #1B66A4;">VALORES:</span>',
    html: `
      <label for="semana" style="display: block; text-align: left; margin-top: 10px; color: #000000;">Semanal:</label>
      <input id="semana" class="swal2-input" placeholder="R$ 0,00">
      <label for="mensal" style="display: block; text-align: left; margin-top: 10px; color: #000000;">Mensal:</label>
      <input id="mensal" class="swal2-input" placeholder="R$ 0,00">
    `,
    background: "#FFFFFF", // TrueWhiteFy
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
    cancelButtonColor: "#F5F5F5", // WhiteFy
    customClass: {
      popup: "swal-medium",
      confirmButton: "btn_primario",
      cancelButton: "btn_secundario",
    },
    didOpen: () => {
      new Cleave("#semana", {
        numeral: true,
        numeralThousandsGroupStyle: "thousand",
        prefix: "R$ ",
        noImmediatePrefix: false,
        rawValueTrimPrefix: true,
        numeralDecimalMark: ",",
        delimiter: ".",
      });

      new Cleave("#mensal", {
        numeral: true,
        numeralThousandsGroupStyle: "thousand",
        prefix: "R$ ",
        noImmediatePrefix: false,
        rawValueTrimPrefix: true,
        numeralDecimalMark: ",",
        delimiter: ".",
      });
    },
    preConfirm: () => {
      const semana = document.getElementById("semana").value;
      const mensal = document.getElementById("mensal").value;

      if (!semana || !mensal) {
        Swal.showValidationMessage("Preencha os dois campos");
        return false;
      }

      return { semana, mensal };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      console.log("Valor semanal:", result.value.semana);
      console.log("Valor mensal:", result.value.mensal);
    }
  });
}

export function confirmCancelEdit(titulo, message, size) {
  return Swal.fire({
    title: titulo,
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sim, cancelar",
    cancelButtonText: "Continuar editando",
    cancelButtonColor: "#1B66A4",
    confirmButtonColor: "#d33",
    customClass: {
      popup: "swal-small",
      // confirmButton: "",
      // cancelButton: "",
    },
    backdrop: false,
  });
}
