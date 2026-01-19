document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pedidoForm");
  const botao = document.getElementById("btnEnviar");

  const camposObrigatorios = [
    "nome",
    "whatsapp",
    "email",
    "cpf"
  ];

  /* ===============================
     🔹 CARREGAR SERVIÇO DO SUPABASE
     =============================== */
  async function carregarServico() {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("id");

    if (!slug) return;

    const { data, error } = await supabase
      .from("servicos")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Erro ao carregar serviço:", error);
      return;
    }

    document.getElementById("nomeServico").innerText = data.nome;
    document.getElementById("descricaoServico").innerText = data.descricao;
    document.getElementById("valorServico").innerText = `R$ ${data.valor}`;

    const ul = document.getElementById("inclusosServico");
    ul.innerHTML = "";

    data.inclusos.split("\n").forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      ul.appendChild(li);
    });
  }

  carregarServico();

  /* ===============================
     🔹 VALIDAÇÃO DO FORMULÁRIO
     =============================== */
  function validarFormulario() {
    const valido = camposObrigatorios.every(id => {
      const campo = document.getElementById(id);
      return campo && campo.value.trim() !== "";
    });

    botao.disabled = !valido;
  }

  camposObrigatorios.forEach(id => {
    document.getElementById(id).addEventListener("input", validarFormulario);
  });

  /* ===============================
     🔹 ENVIO PARA WHATSAPP
     =============================== */
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const whatsapp = document.getElementById("whatsapp").value;
    const email = document.getElementById("email").value;
    const cpf = document.getElementById("cpf").value;
    const observacoes = document.getElementById("observacoes").value;

    const servico = document.getElementById("nomeServico").innerText;
    const valor = document.getElementById("valorServico").innerText;

    const mensagem = `
Olá! Gostaria de contratar um serviço:

📌 *Serviço:* ${servico}
💰 *Valor:* ${valor}

👤 *Nome:* ${nome}
📱 *WhatsApp:* ${whatsapp}
📧 *Email:* ${email}
🪪 *CPF:* ${cpf}

📝 *Observações:*
${observacoes || "Nenhuma"}
    `.trim();

    const numero = "5561920041427";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
  });
});
