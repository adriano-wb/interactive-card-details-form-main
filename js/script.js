window.onload = function() {
   // Variaveis campos de formulário
   const campoNome = document.querySelector("input[name='nomeCartao']");
   const campoNumero = document.querySelector("input[name='numeroCartao']");
   const mesValidade = document.querySelector("input[name='mesValidade']");
   const anoValidade = document.querySelector("input[name='anoValidade']");
   const codigoCvc = document.querySelector("input[name='codigoCvc']");
 
   // Variaveis de modelo do cartão
   const nomeImpresso = document.querySelector(".card-name-date__name");
   const numeroImpresso = document.querySelector(".front-model-card__number");
   const validadeImpressaMes = document.getElementById("campMes");
   const validadeImpressaAno = document.getElementById("campAno");
   const cvcImpresso = document.querySelector(".back-model-card__cvc");
   const botaoEnviarInfoCartao = document.getElementById("btnSubmit");
 
   // Variaveis das mensagens de erro
   const erroNome = document.getElementById("msgNome");
   const erroNumero = document.getElementById("msgNumero");
   const erroDates = document.getElementById("msgDates");
   const cvcMsgErr = document.getElementById("msgCvc");
 
   // Validação RegExp número do cartão
   const validNumeroCartao = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
 
   // Variavel thanks
   const thanksSecao = document.querySelector(".thank");
 
   // Variável container formulário
   const formSecao = document.querySelector(".card-form");
 
   /* Validação do campo de nome impresso no cartão */
   function validarCampoDeEntradaNome() {
     const nomeMaiusculo = campoNome.value.toUpperCase();
 
     if (campoNome.value) {
       campoNome.classList.remove("borda-error");
       campoNome.classList.remove("focus-error");
       campoNome.classList.add("focus-ok");
       erroNome.style.display = "none";
 
       // Adicionar o nome no modelo de cartão
       nomeImpresso.textContent = "";
       nomeImpresso.textContent += nomeMaiusculo;
 
       /* Não pode conter número */
       if (/[0-9]+/g.test(campoNome.value)) {
         campoNome.classList.add("borda-error");
         campoNome.classList.add("focus-error");
         campoNome.classList.remove("focus-ok");
         erroNome.style.display = "block";
         erroNome.textContent = "Seu primeiro nome deve ter apenas letras, não números.";
       }
 
       /* Não pode conter acentos e caracteres especiais */
       if (/[^a-zA-Z\s]/g.test(campoNome.value)) {
         campoNome.classList.add("borda-error");
         campoNome.classList.add("focus-error");
         campoNome.classList.remove("focus-ok");
         erroNome.style.display = "block";
         erroNome.textContent = " Por favor, não coloque sinais em seu nome!";
       }
     } else {
       campoNome.classList.remove("borda-error");
       campoNome.classList.remove("focus-error");
       campoNome.classList.add("focus-ok");
       nomeImpresso.textContent = "JANE APPLESSED";
       erroNome.style.display = "none";
     }
   }
 
   /* Validação dos números impressos no cartão */
   function validarCampoDeEntradaNumero(event) {
     const input = event.target.value.replace(/\D/g, "").substring(0, 16);
     const formattedInput = input.replace(/(\d{4})/g, "$1 ");
 
     if (campoNumero.value) {
       campoNumero.classList.remove("borda-error");
       campoNumero.classList.remove("focus-error");
       campoNumero.classList.add("focus-ok");
       erroNumero.style.display = "none";
       numeroImpresso.textContent = "";
       numeroImpresso.textContent += campoNumero.value;
 
       if (!validNumeroCartao.test(campoNumero.value)) {
         campoNumero.classList.add("borda-error");
         campoNumero.classList.add("focus-error");
         campoNumero.classList.remove("focus-ok");
         erroNumero.style.display = "block";
         erroNumero.textContent = " Digite um número válido!";
       }
     } else {
       campoNumero.classList.remove("borda-error");
       campoNumero.classList.remove("focus-error");
       campoNumero.classList.add("focus-ok");
       numeroImpresso.textContent = "0000 0000 0000 0000";
       erroNumero.style.display = "none";
     }
 
     event.target.value = formattedInput.trim();
   }
 
   /* Validar campo de entrada mês e ano */
   function mesValidadeSet() {
     if (mesValidade.value) {
       mesValidade.classList.remove("borda-error");
       mesValidade.classList.remove("focus-error");
       mesValidade.classList.add("focus-ok");
       erroDates.style.display = "none";
       validadeImpressaMes.textContent = "";
       validadeImpressaMes.textContent += mesValidade.value;
 
       if (/[^0-9]/g.test(mesValidade.value)) {
         mesValidade.classList.add("borda-error");
         mesValidade.classList.add("focus-error");
         mesValidade.classList.remove("focus-ok");
         erroDates.style.display = "block";
         erroDates.textContent = " Digite um número válido!";
       }
     }
 
     if (Number(mesValidade.value) < 10 && Number(mesValidade.value) > 0 && mesValidade.value.indexOf(0) === -1) {
       mesValidade.value = "0" + mesValidade.value;
       validadeImpressaMes.textContent = mesValidade.value;
     }
 
     if (mesValidade.value.length > 2) {
       if (mesValidade.value.indexOf(0) === -1) {
         mesValidade.value = mesValidade.value.replace(mesValidade.value.slice(mesValidade.value.length-1), "");
       }
       validadeImpressaMes.textContent = mesValidade.value;
 
       if (mesValidade.value.indexOf(0) > -1) {
         mesValidade.value = mesValidade.value.replace("0", "");
         validadeImpressaMes.textContent = mesValidade.value;
       }
     }
 
     if (!mesValidade.value) {
       validadeImpressaMes.textContent = "00";
     }
   }
 
   function anoValidadeSet() {
     if (anoValidade.value) {
       anoValidade.classList.remove("borda-error");
       anoValidade.classList.remove("focus-error");
       anoValidade.classList.add("focus-ok");
       validadeImpressaAno.textContent = "";
       validadeImpressaAno.textContent += anoValidade.value;
       erroDates.style.display = "none";
       
       if (/[^0-9]/g.test(anoValidade.value)) {
         anoValidade.classList.add("borda-error");
         anoValidade.classList.add("focus-error");
         anoValidade.classList.remove("focus-ok");
         erroDates.style.display = "block";
         erroDates.textContent = " Digite um número válido!";
       }
       if (mesValidade.value) {
         erroDates.style.display = "none";
       }
     }
 
     if (Number(anoValidade.value) < 99 && Number(anoValidade.value) > 0 && anoValidade.value.indexOf(0) === -1) {
       anoValidade.value = "0" + anoValidade.value;
       validadeImpressaAno.textContent = anoValidade.value;
     }
 
     if (anoValidade.value.length > 2) {
       if (anoValidade.value.indexOf(0) === -1) {
         anoValidade.value = anoValidade.value.replace(anoValidade.value.slice(anoValidade.value.length-1), "");
       }
       validadeImpressaAno.textContent = anoValidade.value;
 
       if (anoValidade.value.indexOf(0) > -1) {
         anoValidade.value = anoValidade.value.replace("0", "");
         validadeImpressaAno.textContent = anoValidade.value;
       }
     }
 
     if (!anoValidade.value) {
       validadeImpressaAno.textContent = "00";
     }
   }
 
   /* Validar CVV código de três digitos */
   function codigoCvcValidation() {
     if (codigoCvc.value) {
       codigoCvc.classList.remove("borda-error");
       codigoCvc.classList.remove("focus-error");
       codigoCvc.classList.add("focus-ok");
       cvcMsgErr.style.display = "none";
       cvcImpresso.textContent = "";
       cvcImpresso.textContent += codigoCvc.value;
 
       if (/[^0-9]/g.test(codigoCvc.value)) {
         codigoCvc.classList.add("borda-error");
         codigoCvc.classList.add("focus-error");
         codigoCvc.classList.remove("focus-ok");
         cvcMsgErr.style.display = "block";
         cvcMsgErr.textContent = " Digite um número válido!";
       }
     }

     if (!codigoCvc.value) {
      cvcImpresso.textContent = "000";
     }
   }
 
   /* Validação de formulário para liberação da conclusão */
   function botaoAcaoValidarFormulario() {
     if (!campoNome.value) {
       erroNome.style.display = "block";
       erroNome.textContent = " Preencha o campo requerido!";
       nomeImpresso.textContent = "JANE APPLESSED";
       campoNome.classList.remove("focus-ok");
       campoNome.classList.add("focus-error");
       campoNome.classList.add("borda-error");
     }
 
     if (!campoNumero.value) {
       erroNumero.style.display = "block";
       erroNumero.textContent = " Preencha o campo requerido!";
       numeroImpresso.textContent = "0000 0000 0000 0000";
       campoNumero.classList.remove("focus-ok");
       campoNumero.classList.add("focus-error");
       campoNumero.classList.add("borda-error");
     }
 
     if (!mesValidade.value && !anoValidade.value) {
       erroDates.style.display = "block";
       erroDates.textContent = " Preencha os campos!";
       validadeImpressaMes.textContent = "00";
       validadeImpressaAno.textContent = "00";
 
       mesValidade.classList.remove("focus-ok");
       mesValidade.classList.add("focus-error");
       mesValidade.classList.add("borda-error");
 
       anoValidade.classList.remove("focus-ok");
       anoValidade.classList.add("focus-error");
       anoValidade.classList.add("borda-error");
     }
 
     if (mesValidade.value && anoValidade.value) {
       erroDates.style.display = "none";
 
       mesValidade.classList.add("focus-ok");
       mesValidade.classList.remove("focus-error");
       mesValidade.classList.remove("borda-error");
 
       anoValidade.classList.add("focus-ok");
       anoValidade.classList.remove("focus-error");
       anoValidade.classList.remove("borda-error");
     }
 
     if (!mesValidade.value && anoValidade.value) {
       erroDates.style.display = "block";
       erroDates.textContent = " Preencha o campo do mês!";
       mesValidade.classList.remove("focus-ok");
       mesValidade.classList.add("focus-error");
       mesValidade.classList.add("borda-error");
       validadeImpressaMes.textContent = "00";
 
       anoValidade.classList.add("focus-ok");
       anoValidade.classList.remove("focus-error");
       anoValidade.classList.remove("borda-error");
     }
 
     if (!anoValidade.value && mesValidade.value) {
       erroDates.style.display = "block";
       erroDates.textContent = " Preencha o campo do ano!";
       anoValidade.classList.remove("focus-ok");
       anoValidade.classList.add("focus-error");
       anoValidade.classList.add("borda-error");
       validadeImpressaAno.textContent = "00";
 
       mesValidade.classList.add("focus-ok");
       mesValidade.classList.remove("focus-error");
       mesValidade.classList.remove("borda-error");
     }
 
     if (anoValidade.value && /[^0-9]/g.test(anoValidade.value)) {
       erroDates.style.display = "block";
       erroDates.textContent = " Preencha o campo corretamente!";
       anoValidade.classList.remove("focus-ok");
       anoValidade.classList.add("focus-error");
       anoValidade.classList.add("borda-error");
 
       mesValidade.classList.add("focus-ok");
       mesValidade.classList.remove("focus-error");
       mesValidade.classList.remove("borda-error");
 
       if (!mesValidade.value) {
         mesValidade.classList.remove("focus-ok");
         mesValidade.classList.add("focus-error");
         mesValidade.classList.add("borda-error");
       }
     }
 
     if (/[^0-9]/g.test(mesValidade.value) || Number(mesValidade.value) > 12) {
       erroDates.style.display = "block";
       erroDates.textContent = " Preencha o campo corretamente!";
       mesValidade.classList.remove("focus-ok");
       mesValidade.classList.add("focus-error");
       mesValidade.classList.add("borda-error");
 
       anoValidade.classList.add("focus-ok");
       anoValidade.classList.remove("focus-error");
       anoValidade.classList.remove("borda-error");
 
       if (!anoValidade.value) {
         anoValidade.classList.remove("focus-ok");
         anoValidade.classList.add("focus-error");
         anoValidade.classList.add("borda-error");
       }
     }
 
     if (/[^0-9]/g.test(anoValidade.value) && /[^0-9]/g.test(mesValidade.value)) {
       erroDates.style.display = "block";
       erroDates.textContent = " Preencha os campos corretamente!";
       mesValidade.classList.remove("focus-ok");
       mesValidade.classList.add("focus-error");
       mesValidade.classList.add("borda-error");
 
       anoValidade.classList.remove("focus-ok");
       anoValidade.classList.add("focus-error");
       anoValidade.classList.add("borda-error");
     }
 
     /* Validação código CVC */
     if (/[^0-9]/g.test(codigoCvc.value) || !codigoCvc.value) {
       cvcMsgErr.style.display = "block";
       cvcMsgErr.textContent = " Preencha o campo corretamente!";
       codigoCvc.classList.remove("focus-ok");
       codigoCvc.classList.add("focus-error");
       codigoCvc.classList.add("borda-error");
     } else {
       cvcMsgErr.style.display = "none";
       codigoCvc.classList.add("focus-ok");
       codigoCvc.classList.remove("focus-error");
       codigoCvc.classList.remove("borda-error");
     }
 
     if (!codigoCvc.value) {
       cvcMsgErr.textContent = " Preencha o campo requerido!";
       cvcImpresso.textContent = "000";
     }
 
     if (codigoCvc.value.length < 3) {
       codigoCvc.classList.add("borda-error");
       codigoCvc.classList.add("focus-error");
       codigoCvc.classList.remove("focus-ok");
       cvcMsgErr.style.display = "block";
       cvcMsgErr.textContent = " Preecha o campo requerido!";
     }
 
     /* Se todos passarem no teste, avança para o agradecimento */
     if (campoNome.value && /^[a-zA-Z\s]+$/.test(campoNome.value) &&
        campoNumero.value && validNumeroCartao.test(campoNumero.value) &&
        mesValidade.value && /[0-9]{2}/g.test(mesValidade.value) &&
        !Number(mesValidade.value > 12) && !Number(mesValidade.value < 1) &&
        anoValidade.value && /[0-9]{2}/g.test(anoValidade.value) &&
        mesValidade.value.length === 2 && anoValidade.value.length === 2 &&
        /[0-9]{3}/g.test(codigoCvc.value) && codigoCvc.value.length === 3) {
           formSecao.classList.add("animOpacity0");
           formSecao.addEventListener("animationend", () => {
             formSecao.style.display = "none";
             thanksSecao.style.display = "flex";
         })
     } 
     
     if (!campoNome.value || /^[a-zA-Z\s]+$/.test(campoNome.value)) {
       campoNome.focus();
     } else if(!campoNumero.value || !validNumeroCartao.test(campoNumero.value)) {
       campoNumero.focus();
     } else if (!mesValidade.value || /[^0-9]/g.test(mesValidade.value) || 
       Number(mesValidade.value > 12) || Number(mesValidade.value < 1)) {
       mesValidade.focus();
     } else if (!anoValidade.value || /[^0-9]/g.test(anoValidade.value)) {
       anoValidade.focus();
     } else if (!codigoCvc.value || /[^0-9]/g.test(codigoCvc.value) || codigoCvc.value < 3) {
       codigoCvc.focus();
     } else {
       /* Focar no campo de nome quando .... */
      if (
        !((campoNome.value || /^[a-zA-Z\s]+$/.test(campoNome.value)) &&
        (campoNumero.value || validNumeroCartao.test(campoNumero.value)) && 
        (mesValidade.value || /[0-9]/g.test(mesValidade.value)) &&
        (Number(mesValidade.value < 12) || Number(mesValidade.value > 1)) &&
        (anoValidade.value || /[0-9]/g.test(anoValidade.value)) &&
        (codigoCvc.value || /[0-9]/g.test(codigoCvc.value))) ||

        (!(campoNome.value || /^[a-zA-Z\s]+$/.test(campoNome.value)) &&
        (campoNumero.value || validNumeroCartao.test(campoNumero.value)) && 
        (mesValidade.value || /[0-9]/g.test(mesValidade.value)) &&
        (Number(mesValidade.value < 12) || Number(mesValidade.value > 1)) &&
        (anoValidade.value || /[0-9]/g.test(anoValidade.value)) &&
        !(codigoCvc.value || /[0-9]/g.test(codigoCvc.value))) ||

        (!(campoNome.value || /^[a-zA-Z\s]+$/.test(campoNome.value)) &&
        (campoNumero.value || validNumeroCartao.test(campoNumero.value)) && 
        (mesValidade.value || /[0-9]/g.test(mesValidade.value)) &&
        (Number(mesValidade.value < 12) || Number(mesValidade.value > 1)) &&
        !(anoValidade.value || /[0-9]/g.test(anoValidade.value)) &&
        !(codigoCvc.value || /[0-9]/g.test(codigoCvc.value))) || 

        (!(campoNome.value || /^[a-zA-Z\s]+$/.test(campoNome.value)) &&
        (campoNumero.value || validNumeroCartao.test(campoNumero.value)) && 
        !(mesValidade.value || /[0-9]/g.test(mesValidade.value)) &&
        !(Number(mesValidade.value < 12) || Number(mesValidade.value > 1)) &&
        !(anoValidade.value || /[0-9]/g.test(anoValidade.value)) &&
        !(codigoCvc.value || /[0-9]/g.test(codigoCvc.value))) ||

        (!(campoNome.value || /^[a-zA-Z\s]+$/.test(campoNome.value)) &&
        !(campoNumero.value || validNumeroCartao.test(campoNumero.value)) && 
        (mesValidade.value || /[0-9]/g.test(mesValidade.value)) &&
        (Number(mesValidade.value < 12) || Number(mesValidade.value > 1)) &&
        (anoValidade.value || /[0-9]/g.test(anoValidade.value)) &&
        !(codigoCvc.value || /[0-9]/g.test(codigoCvc.value))) ||

        (!(campoNome.value || /^[a-zA-Z\s]+$/.test(campoNome.value)) &&
        (campoNumero.value || validNumeroCartao.test(campoNumero.value)) && 
        !(mesValidade.value || /[0-9]/g.test(mesValidade.value)) &&
        !(Number(mesValidade.value < 12) || Number(mesValidade.value > 1)) &&
        (anoValidade.value || /[0-9]/g.test(anoValidade.value)) &&
        !(codigoCvc.value || /[0-9]/g.test(codigoCvc.value))) ||

        (!(campoNome.value || /^[a-zA-Z\s]+$/.test(campoNome.value)) &&
        (campoNumero.value || validNumeroCartao.test(campoNumero.value)) && 
        !(mesValidade.value || /[0-9]/g.test(mesValidade.value)) &&
        (Number(mesValidade.value < 12) || Number(mesValidade.value > 1)) &&
        !(anoValidade.value || /[0-9]/g.test(anoValidade.value)) &&
        !(codigoCvc.value || /[0-9]/g.test(codigoCvc.value)))) {
          campoNome.focus();
      }

      /* Focar no campo de número quando... */
      if (
        ((campoNome.value || /^[a-zA-Z\s]+$/.test(campoNome.value)) &&
        !(campoNumero.value || validNumeroCartao.test(campoNumero.value)) && 
        !(mesValidade.value || /[0-9]/g.test(mesValidade.value)) &&
        !(Number(mesValidade.value < 12) || Number(mesValidade.value > 1)) &&
        !(anoValidade.value || /[0-9]/g.test(anoValidade.value)) &&
        !(codigoCvc.value || /[0-9]/g.test(codigoCvc.value))) ||

        ((campoNome.value || /^[a-zA-Z\s]+$/.test(campoNome.value)) &&
        !(campoNumero.value || validNumeroCartao.test(campoNumero.value)) && 
        (mesValidade.value || /[0-9]/g.test(mesValidade.value)) &&
        (Number(mesValidade.value < 12) || Number(mesValidade.value > 1)) &&
        (anoValidade.value || /[0-9]/g.test(anoValidade.value)) &&
        !(codigoCvc.value || /[0-9]/g.test(codigoCvc.value))) ||

        ((campoNome.value || /^[a-zA-Z\s]+$/.test(campoNome.value)) &&
        !(campoNumero.value || validNumeroCartao.test(campoNumero.value)) && 
        (mesValidade.value || /[0-9]/g.test(mesValidade.value)) &&
        (Number(mesValidade.value < 12) || Number(mesValidade.value > 1)) &&
        !(anoValidade.value || /[0-9]/g.test(anoValidade.value)) &&
        !(codigoCvc.value || /[0-9]/g.test(codigoCvc.value))) || 

        ((campoNome.value || /^[a-zA-Z\s]+$/.test(campoNome.value)) &&
        !(campoNumero.value || validNumeroCartao.test(campoNumero.value)) && 
        !(mesValidade.value || /[0-9]/g.test(mesValidade.value)) &&
        !(Number(mesValidade.value < 12) || Number(mesValidade.value > 1)) &&
        (anoValidade.value || /[0-9]/g.test(anoValidade.value)) &&
        !(codigoCvc.value || /[0-9]/g.test(codigoCvc.value))) ||

        ((campoNome.value || /^[a-zA-Z\s]+$/.test(campoNome.value)) &&
        !(campoNumero.value || validNumeroCartao.test(campoNumero.value)) && 
        !(mesValidade.value || /[0-9]/g.test(mesValidade.value)) &&
        !(Number(mesValidade.value < 12) || Number(mesValidade.value > 1)) &&
        (anoValidade.value || /[0-9]/g.test(anoValidade.value)) &&
        (codigoCvc.value || /[0-9]/g.test(codigoCvc.value)))) {
          campoNumero.focus();
      }


      if (
        ((campoNome.value || /^[a-zA-Z\s]+$/.test(campoNome.value)) &&
        (campoNumero.value || validNumeroCartao.test(campoNumero.value)) && 
        !(mesValidade.value || /[0-9]/g.test(mesValidade.value)) &&
        !(Number(mesValidade.value < 12) || Number(mesValidade.value > 1)) &&
        !(anoValidade.value || /[0-9]/g.test(anoValidade.value)) &&
        !(codigoCvc.value || /[0-9]/g.test(codigoCvc.value))) ||

        ((campoNome.value || /^[a-zA-Z\s]+$/.test(campoNome.value)) &&
        (campoNumero.value || validNumeroCartao.test(campoNumero.value)) && 
        !(mesValidade.value || /[0-9]/g.test(mesValidade.value)) &&
        !(Number(mesValidade.value < 12) || Number(mesValidade.value > 1)) &&
        (anoValidade.value || /[0-9]/g.test(anoValidade.value)) &&
        !(codigoCvc.value || /[0-9]/g.test(codigoCvc.value))) ||

        ((campoNome.value || /^[a-zA-Z\s]+$/.test(campoNome.value)) &&
        (campoNumero.value || validNumeroCartao.test(campoNumero.value)) && 
        !(mesValidade.value || /[0-9]/g.test(mesValidade.value)) &&
        !(Number(mesValidade.value < 12) || Number(mesValidade.value > 1)) &&
        !(anoValidade.value || /[0-9]/g.test(anoValidade.value)) &&
        (codigoCvc.value || /[0-9]/g.test(codigoCvc.value))) || 

        ((campoNome.value || /^[a-zA-Z\s]+$/.test(campoNome.value)) &&
        (campoNumero.value || validNumeroCartao.test(campoNumero.value)) && 
        !(mesValidade.value || /[0-9]/g.test(mesValidade.value)) &&
        !(Number(mesValidade.value < 12) || Number(mesValidade.value > 1)) &&
        (anoValidade.value || /[0-9]/g.test(anoValidade.value)) &&
        (codigoCvc.value || /[0-9]/g.test(codigoCvc.value)))) {
          mesValidade.focus();
      }

      if (
        ((campoNome.value || /^[a-zA-Z\s]+$/.test(campoNome.value)) &&
        (campoNumero.value || validNumeroCartao.test(campoNumero.value)) && 
        (mesValidade.value || /[0-9]/g.test(mesValidade.value)) &&
        (Number(mesValidade.value < 12) || Number(mesValidade.value > 1)) &&
        !(anoValidade.value || /[0-9]/g.test(anoValidade.value)) &&
        !(codigoCvc.value || /[0-9]/g.test(codigoCvc.value))) ||

        ((campoNome.value || /^[a-zA-Z\s]+$/.test(campoNome.value)) &&
        (campoNumero.value || validNumeroCartao.test(campoNumero.value)) && 
        (mesValidade.value || /[0-9]/g.test(mesValidade.value)) &&
        (Number(mesValidade.value < 12) || Number(mesValidade.value > 1)) &&
        !(anoValidade.value || /[0-9]/g.test(anoValidade.value)) &&
        (codigoCvc.value || /[0-9]/g.test(codigoCvc.value)))) {
          anoValidade.focus();
      }

      if (!((campoNome.value || /^[a-zA-Z\s]+$/.test(campoNome.value)) &&
          (campoNumero.value || validNumeroCartao.test(campoNumero.value)) && 
          (mesValidade.value || /[0-9]/g.test(mesValidade.value)) &&
          (Number(mesValidade.value < 12) || Number(mesValidade.value > 1)) &&
          (anoValidade.value || /[0-9]/g.test(anoValidade.value)) &&
          (codigoCvc.value || /[0-9]/g.test(codigoCvc.value))) || 

          ((campoNome.value || /^[a-zA-Z\s]+$/.test(campoNome.value)) &&
          (campoNumero.value || validNumeroCartao.test(campoNumero.value)) && 
          (mesValidade.value || /[0-9]/g.test(mesValidade.value)) &&
          (Number(mesValidade.value < 12) || Number(mesValidade.value > 1)) &&
          (anoValidade.value || /[0-9]/g.test(anoValidade.value)) &&
          !(codigoCvc.value || /[0-9]/g.test(codigoCvc.value)))) {
        codigoCvc.focus();
      }
     }
   }
 
   function imprimirNumeroCartaoCorretamente() {
     numeroImpresso.textContent = campoNumero.value;
     
     if (campoNumero.value) {
       campoNumero.classList.remove("borda-error");
       campoNumero.classList.remove("focus-error");
       campoNumero.classList.add("focus-ok");
       erroNumero.style.display = "none";
       
       codigoCvc.classList.remove("borda-error");
       codigoCvc.classList.remove("focus-error");
       codigoCvc.classList.add("focus-ok");
       cvcMsgErr.style.display = "none";
     }
   }
 
   botaoEnviarInfoCartao.addEventListener("click", botaoAcaoValidarFormulario);
   campoNome.addEventListener("input", validarCampoDeEntradaNome);
   campoNumero.addEventListener("input", validarCampoDeEntradaNumero);
   mesValidade.addEventListener("input", mesValidadeSet);
   anoValidade.addEventListener("input", anoValidadeSet);
   campoNome.addEventListener("change", imprimirNumeroCartaoCorretamente);
   campoNumero.addEventListener("change", imprimirNumeroCartaoCorretamente);
   mesValidade.addEventListener("change", imprimirNumeroCartaoCorretamente);
   anoValidade.addEventListener("change", imprimirNumeroCartaoCorretamente);
   codigoCvc.addEventListener("input", codigoCvcValidation);
 }
 
