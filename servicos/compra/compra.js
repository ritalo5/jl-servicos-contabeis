document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pedidoForm");
  const botao = document.getElementById("btnEnviar");

  const camposObrigatorios = ["nome", "whatsapp", "email", "cpf"];
  const BASE_URL = "/jl-servicos-contabeis";

  /* =================================================
     🔹 DADOS MOCK (PADRÃO COM SLUG)
     ================================================= */
  const servicosMock = {
    mei: {
      basico: {
        titulo: "Plano MEI — Básico",
        descricao: "Plano básico para manter seu MEI regularizado mensalmente.",
        inclusos: [
          "Emissão mensal do DAS",
          "Lembretes de vencimento",
          "DASN-SIMEI (1x ao ano)",
          "Suporte via WhatsApp"
        ],
        valor: "R$ 99,99",
        categoriaLabel: "MEI"
      },
      premium: {
        titulo: "Plano MEI — Premium",
        descricao: "Plano completo com acompanhamento e regularização total do MEI.",
        inclusos: [
          "Todos os benefícios do plano básico",
          "Regularização fiscal",
          "Parcelamento de débitos",
          "Emissão de certidões",
          "Suporte prioritário"
        ],
        valor: "R$ 159,99",
        categoriaLabel: "MEI"
      }
    },

    "certidoes-regularizacoes": {
      "certidao-negativa": {
        titulo: "Certidão Negativa de Débitos",
        descricao: "Emissão de certidão negativa.",
        inclusos: ["Consulta de pendências", "Emissão da certidão"],
        valor: "R$ 79,99",
        categoriaLabel: "Certidões e Regularizações"
      }
    }
  };

  servicosMock["certidoes"] = servicosMock["certidoes-regularizacoes"];
  servicosMock["outros-servicos"] = servicosMock.outros;

  /* ===============================
     🔹 PARÂMETROS DA URL
     =============================== */
  const params = new URLSearchParams(window.location.search);
  const categoria = params.get("categoria");
  const slug =
    params.get("servico") ||
    params.get("plano") ||
    params.get("slug");

  const dados = servicosMock[categoria]?.[slug];

  /* ===============================
     🔹 TRATAMENTO DE ERRO (SEM QUEBRAR SCRIPT)
     =============================== */
  if (!dados) {
    const nomeEl = document.getElementById("nomeServico");
    const descEl = document.getElementById("descricaoServico");

    if (nomeEl) nomeEl.innerText = "Serviço não encontrado";
    if (descEl)
      descEl.innerText =
        "O serviço selecionado não existe ou foi removido.";

    return;
  }

  /* ===============================
     🔹 POPULA DADOS DO SERVIÇO
     =============================== */
  document.getElementById("nomeServico").innerText = dados.titulo;
  document.getElementById("descricaoServico").innerText = dados.descricao;
  document.getElementById("valorServico").innerText = dados.valor;

  const lista = document.getElementById("inclusosServico");
  if (lista && dados.inclusos) {
    lista.innerHTML = "";
    dados.inclusos.forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      lista.appendChild(li);
    });
  }

  /* ===============================
     🔹 BREADCRUMB
     =============================== */
  const breadcrumb = document.getElementById("breadcrumb");
  if (breadcrumb) {
    breadcrumb.innerHTML = `
      <a href="${BASE_URL}/">Início</a>
      <span>›</span>
      <a href="${BASE_URL}/">Serviços</a>
      <span>›</span>
      <a href="${BASE_URL}/servicos/${categoria}/">
        ${dados.categoriaLabel}
      </a>
      <span>›</span>
      <strong>${dados.titulo}</strong>
    `;
  }

  /* ===============================
     🔹 VALIDAÇÃO
     =============================== */
  function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

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
    if (campo) campo.addEventListener("input", validarFormulario);
  });

  /* ===============================
     🔹 MÁSCARA WHATSAPP (BACKSPACE FUNCIONA)
     =============================== */
  const inputWhatsapp = document.getElementById("whatsapp");
  if (inputWhatsapp) {
    let apagando = false;

    inputWhatsapp.addEventListener("keydown", e => {
      apagando = e.key === "Backspace";
    });

    inputWhatsapp.addEventListener("input", () => {
      if (apagando) return;

      let v = inputWhatsapp.value.replace(/\D/g, "").slice(0, 11);
      if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
      if (v.length > 7) v = `${v.slice(0, 9)}-${v.slice(9)}`;
      inputWhatsapp.value = v;
    });
  }

  /* ===============================
     🔹 MÁSCARA CPF
     =============================== */
  const inputCpf = document.getElementById("cpf");
  if (inputCpf) {
    inputCpf.addEventListener("input", () => {
      let v = inputCpf.value.replace(/\D/g, "").slice(0, 11);
      if (v.length > 3) v = `${v.slice(0, 3)}.${v.slice(3)}`;
      if (v.length > 7) v = `${v.slice(0, 7)}.${v.slice(7)}`;
      if (v.length > 11) v = `${v.slice(0, 11)}-${v.slice(11)}`;
      inputCpf.value = v;
    });
  }

  /* ===============================
     🔹 ENVIO DO PEDIDO (WHATSAPP)
     =============================== */
  let envioEmAndamento = false;

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (envioEmAndamento) return;

    envioEmAndamento = true;
    const textoOriginal = botao.innerHTML;

    botao.disabled = true;
    botao.innerHTML = `<span class="spinner"></span> Enviando...`;

    const mensagem = `
📌 *Novo Pedido de Serviço*

🛎️ *Serviço:* ${dados.titulo}
📂 *Categoria:* ${dados.categoriaLabel}
💰 *Valor:* ${dados.valor}
    `.trim();

    window.open(
      `https://wa.me/5561920041427?text=${encodeURIComponent(mensagem)}`,
      "_blank"
    );

    setTimeout(() => {
      botao.innerHTML = textoOriginal;
      botao.disabled = false;
      envioEmAndamento = false;
    }, 600);
  });
});

