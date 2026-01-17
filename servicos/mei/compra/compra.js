import { supabase } from '/jl-servicos-contabeis/supabase.js'

/* ===============================
   CONFIGURAÇÃO DOS SERVIÇOS
================================ */
const servicos = {
  'abertura-mei': {
    titulo: 'Abertura de MEI',
    inclusos: [
      'Análise do perfil do empreendedor',
      'Definição correta da atividade (CNAE)',
      'Cadastro no Portal do Empreendedor',
      'Emissão do CNPJ',
      'Orientações iniciais',
      'Suporte após a abertura'
    ]
  },
  'regularizacao-mei': {
    titulo: 'Regularização de MEI',
    inclusos: [
      'Diagnóstico completo da situação',
      'Identificação de pendências',
      'Regularização de débitos',
      'Orientações fiscais',
      'Suporte durante o processo'
    ]
  },
  'encerramento-mei': {
    titulo: 'Encerramento de MEI',
    inclusos: [
      'Análise prévia de pendências',
      'Baixa correta do MEI',
      'Orientações pós-encerramento',
      'Suporte final'
    ]
  },
  'emissao-das': {
    titulo: 'Emissão de DAS',
    inclusos: [
      'Emissão da guia DAS',
      'Orientação sobre vencimento',
      'Envio da guia para pagamento'
    ]
  },
  'dasn': {
    titulo: 'Declaração Anual DASN-SIMEI',
    inclusos: [
      'Conferência das informações',
      'Envio da declaração',
      'Comprovante de entrega',
      'Orientações finais'
    ]
  },
  'parcelamento': {
    titulo: 'Parcelamento de Débitos',
    inclusos: [
      'Análise dos débitos',
      'Simulação de parcelamento',
      'Solicitação junto à Receita',
      'Orientações completas'
    ]
  },
  'alteracao-mei': {
    titulo: 'Alteração de Dados do MEI',
    inclusos: [
      'Alteração cadastral solicitada',
      'Atualização no portal oficial',
      'Conferência final',
      'Orientações'
    ]
  }
}

/* ===============================
   CAPTURA DO SERVIÇO
================================ */
const params = new URLSearchParams(window.location.search)
const servicoKey = params.get('servico')
const servico = servicos[servicoKey]

if (!servico) {
  alert('Serviço inválido')
  throw new Error('Serviço inválido')
}

/* ===============================
   RENDERIZA CONTEÚDO
================================ */
document.getElementById('titulo-servico').textContent = servico.titulo

const lista = document.getElementById('lista-inclusos')
lista.innerHTML = ''
servico.inclusos.forEach(item => {
  const li = document.createElement('li')
  li.textContent = item
  lista.appendChild(li)
})

/* ===============================
   FORMULÁRIO
================================ */
const form = document.getElementById('form-pedido')
const btnEnviar = document.getElementById('btn-enviar')

const nome = document.getElementById('nome')
const email = document.getElementById('email')
const cpf = document.getElementById('cpf')
const whatsapp = document.getElementById('whatsapp')
const obs = document.getElementById('obs')

/* ===============================
   MÁSCARAS
================================ */
cpf.addEventListener('input', () => {
  cpf.value = cpf.value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
})

whatsapp.addEventListener('input', () => {
  whatsapp.value = whatsapp.value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
})

/* ===============================
   VALIDAÇÃO
================================ */
function validarFormulario() {
  const valido =
    nome.value.trim() &&
    email.value.trim() &&
    cpf.value.trim().length === 14 &&
    whatsapp.value.trim().length >= 14

  if (valido) {
    btnEnviar.classList.add('ativo')
    btnEnviar.disabled = false
  } else {
    btnEnviar.classList.remove('ativo')
    btnEnviar.disabled = true
  }
}

form.addEventListener('input', validarFormulario)

/* ===============================
   ENVIO
================================ */
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  btnEnviar.disabled = true

  const pedido = {
    servico: servico.titulo,
    servico_key: servicoKey,
    nome: nome.value,
    email: email.value,
    cpf: cpf.value,
    whatsapp: whatsapp.value,
    observacao: obs.value || null
  }

  /* ---- SALVA NO SUPABASE ---- */
  try {
    await supabase.from('pedidos').insert([pedido])
  } catch (err) {
    console.warn('Erro ao salvar no Supabase, seguindo para WhatsApp')
  }

  /* ---- WHATSAPP ---- */
  const mensagem = `
Olá, gostaria de contratar um serviço:

📌 Serviço: ${servico.titulo}
👤 Nome: ${pedido.nome}
📧 Email: ${pedido.email}
📄 CPF: ${pedido.cpf}
📱 WhatsApp: ${pedido.whatsapp}
📝 Observação: ${pedido.observacao || 'Não informada'}
`.trim()

  const url = `https://wa.me/61920041427?text=${encodeURIComponent(mensagem)}`
  window.open(url, '_blank')
})
