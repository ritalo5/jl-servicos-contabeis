document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pedidoForm");
  const botao = document.getElementById("btnEnviar");

  const camposObrigatorios = ["nome", "whatsapp", "email", "cpf"];

  /* ===============================
     🔹 DADOS MOCK (TEMPORÁRIOS)
     =============================== */
  const servicosMock = {
    mei: {
      titulo: "Serviços para MEI",
      descricao:
        "Serviço completo para abertura, regularização e manutenção do MEI.",
      inclusos: [
        "Abertura ou regularização do MEI",
        "Emissão de DAS",
        "Orientações contábeis",
      ],
      valor: "R$ 99,90",
    },
    certificado: {
      titulo: "Certificado Digital",
      descricao: "Renovação ou emissão de certificado digital.",
      inclusos: ["Emissão do certificado", "Suporte completo"],
      valor: "R$ 150,00",
    },
  };

  /* ===============================
     🔹 IDENTIFICAR SERVIÇO NA URL
     =============================== */
  const params = new URLSearchParams(window.location.search);
  const tipo = params.get("servico") || "mei";
  const dados = servicosMock[tipo];

  if (!dados) {
    alert("Serviço não encontrado.");
    return;
  }

  /* ===============================
     🔹 PREENCHER PÁGINA
     =============================== */
  document.getElementById("nomeServico").innerText = dados.titulo;
  document.getElementById("descricaoServico").innerText = dados.descricao;
  document.getElementById("valorServico").innerText = dados.valor;

  const ul = document.getElementById("inclusosServico");
  ul.innerHTML = "";
  dados.inclusos.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    ul.appendChild(li);
  });

  /* ===============================
     🔹 MÁSCARA WHATSAPP
     =============================== */
  const whatsappInput = document.getElementById("whatsapp");
  whatsappInput.addEventListener("input", () => {
    let v = whatsappInput.value.replace(/\D/g, "").slice(0, 11);
    if (v.length >= 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    if (v.length >= 10) v = `${v.slice(0, 10)}-${v.slice(10)}`;
    whatsappInput.value = v;
    validarFormulario();
  });

  /* ===============================
     🔹 MÁSCARA CPF
     =============================== */
  const cpfInput = document.getElementById("cpf");
  cpfInput.addEventListener("input", () => {
    let v = cpfInput.value.replace(/\D/g, "").slice(0, 11);
    if (v.length >= 3) v = `${v.slice(0, 3)}.${v.slice(3)}`;
    if (v.length >= 7) v = `${v.slice(0, 7)}.${v.slice(7)}`;
    if (v.length >= 11) v = `${v.slice(0, 11)}-${v.slice(11)}`;
    cpfInput.value = v;
    validarFormulario();
  });

  /* ===============================
     🔹 VALIDAÇÃO EMAIL
     =============================== */
  const emailInput = document.getElementById("email");
  function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  emailInput.addEventListener("input", validarFormulario);

  /* ===============================
     🔹 VALIDAÇÃO GERAL
     =============================== */
  function validarFormulario() {
    const valido = camposObrigatorios.every(id => {
      const campo = document.getElementById(id);
      if (!campo || campo.value.trim() === "") return false;
      if (id === "email" && !emailValido(campo.value)) return false;
      return true;
    });

    botao.disabled = !valido;
  }

  camposObrigatorios.forEach(id => {
    const campo = document.getElementById(id);
    campo.addEventListener("input", validarFormulario);
  });

  /* ===============================
     🔹 ENVIO PARA WHATSAPP
     =============================== */
  form.addEventListener("submit", e => {
    e.preventDefault();

    botao.disabled = true;
    botao.innerHTML = `<span class="loading"></span> Enviando...`;

    const nome = document.getElementById("nome").value;
    const whatsapp = document.getElementById("whatsapp").value;
    const email = document.getElementById("email").value;
    const cpf = document.getElementById("cpf").value;
    const observacoes = document.getElementById("observacoes").value;

    const mensagem = `
Olá! Gostaria de contratar um serviço:

📌 *Serviço:* ${dados.titulo}
💰 *Valor:* ${dados.valor}

👤 *Nome:* ${nome}
📱 *WhatsApp:* ${whatsapp}
📧 *Email:* ${email}
🪪 *CPF:* ${cpf}

📝 *Observações:*
${observacoes || "Nenhuma"}
    `.trim();

    const numero = "5561920041427";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    setTimeout(() => {
      window.open(url, "_blank");
      botao.innerHTML = "Enviar Pedido";
      botao.disabled = false;
    }, 800);
  });
});

