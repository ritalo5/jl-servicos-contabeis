const services = {
  "abertura-mei": {
    title: "Abertura de MEI",
    description: "Formalizamos seu MEI de forma rápida e segura.",
    includes: [
      "Cadastro completo no Portal do Empreendedor",
      "Orientação sobre atividades permitidas",
      "Emissão do CNPJ",
      "Suporte durante o processo"
    ]
  },
  "regularizacao-mei": {
    title: "Regularização de MEI",
    description: "Colocamos seu MEI em dia com a Receita.",
    includes: [
      "Análise de pendências",
      "Regularização fiscal",
      "Orientação personalizada"
    ]
  },
  "dasn": {
    title: "Declaração Anual (DASN-SIMEI)",
    description: "Envio correto da sua declaração anual obrigatória.",
    includes: [
      "Apuração de faturamento",
      "Envio da DASN",
      "Comprovante de entrega"
    ]
  }
};

const params = new URLSearchParams(window.location.search);
const servico = params.get("servico");

if (services[servico]) {
  document.getElementById("service-title").textContent = services[servico].title;
  document.getElementById("service-description").textContent = services[servico].description;

  const list = document.getElementById("service-includes");
  services[servico].includes.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

document.getElementById("compraForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const mensagem = `
Serviço: ${document.getElementById("service-title").textContent}
Nome: ${formData.get("nome")}
WhatsApp: ${formData.get("whatsapp")}
Email: ${formData.get("email")}
Mensagem: ${formData.get("mensagem")}
`;

  const url = "https://wa.me/5500000000000?text=" + encodeURIComponent(mensagem);
  window.open(url, "_blank");
});
