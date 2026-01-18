import { supabase } from '/jl-servicos-contabeis/supabase.js'

// ================= SERVIÇOS =================
const servicos = {
  'abertura-mei': {
    titulo: 'Abertura de MEI',
    inclusos: [
      'Análise do perfil do empreendedor',
      'Cadastro no Portal do Empreendedor',
      'Definição correta da atividade (CNAE)',
      'Emissão do CNPJ',
      'Orientações iniciais',
      'Suporte após a abertura'
    ]
  },
  'regularizacao-mei': {
    titulo: 'Regularização de MEI',
    inclusos: [
      'Diagnóstico da situação',
      'Identificação de pendências',
      'Regularização de DAS',
      'Orientações fiscais',
      'Suporte completo'
    ]
  },
  'encerramento-mei': {
    titulo: 'Encerramento de MEI',
    inclusos: [
      'Análise antes da baixa',
      'Encerramento correto',
      'Verificação de pendências',
      'Orientações pós-baixa',
      'Suporte'
    ]
  },
  'emissao-das': {
    titulo: 'Emissão de DAS',
    inclusos: [
      'Emissão da guia DAS',
      'Orientações de vencimento',
      'Envio da guia',
      'Suporte'
    ]
  },
  'dasn': {
    titulo: 'Declaração Anual DASN-SIMEI',
    inclusos: [
      'Conferência de dados',
      'Envio da declaração',
      'Comprovante',
      'Orientações'
    ]
  },
  'parcelamento': {
    titulo: 'Parcelamento de Débitos',
    inclusos: [
      'Análise dos débitos',
      'Simulação de parcelamento',
      'Solicitação junto à Receita',
      'Orientações'
    ]
  },
  'alteracao-mei': {
    titulo: 'Alteração de Dados do MEI',
    inclusos: [
      'Alteração cadastral',
      'Atualização no portal',
      'Conferência final',
      'Orientações'
    ]
  }
}

// ================= SERVIÇO SELECIONADO =================
const params = new URLSearchParams(window.location.search)
const servicoURL = params.get('servico')

if (servicoURL && servicos[servicoURL]) {
  sessionStorage.setItem('servicoSelecionado', servicoURL)
}

const servicoKey = sessionStorage.getItem('servicoSelecionado')

if (!servicoKey || !servicos[servicoKey]) {
  alert('Serviço inválido ou não informado.')
  throw new Error('Serviço inválido')
}

const servico = servicos[servicoKey]

// ================= RENDER =================
document.getElementById('titulo-servico').textContent = servico.titulo
document.getElementById('servico').value = servicoKey

const lista = document.getElementById('lista-inclusos')
lista.innerHTML = ''
servico.inclusos.forEach(item => {
  const li = document.createElement('li')
  li.textContent = item
  lista.appendChild(li)
})

// ================= FORM =================
const form = document.getElementById('form-pedido')
const btnEnviar = document.getElementById('btn-enviar')

const nomeInput = document.querySelector('input[name="nome"]')
const emailInput = document.querySelector('input[name="email"]')
const cpfInput = document.getElementById('cpf')
const whatsappInput = document.getElementById('whatsapp')
const obsInput = document.querySelector('textarea[name="obs"]')

const camposObrigatorios = [nomeInput, emailInput, cpfInput, whatsappInput]

function validarFormulario() {
  const valido = camposObrigatorios.every(campo => campo.value.trim() !== '')
  btnEnviar.disabled = !valido
  btnEnviar.classList.toggle('ativo', valido)
}

camposObrigatorios.forEach(campo =>
  campo.addEventListener('input', validarFormulario)
)

form.addEventListener('submit', e => e.preventDefault())

// ================= ENVIO =================
btnEnviar.addEventListener('click', async () => {
  if (btnEnviar.disabled) return

  btnEnviar.textContent = 'Enviando...'
  btnEnviar.disabled = true

  const pedido = {
    servico: servicoKey,
    nome: nomeInput.value.trim(),
    email: emailInput.value.trim(),
    cpf: cpfInput.value.trim(),
    whatsapp: whatsappInput.value.trim(),
    obs: obsInput.value.trim()
  }

  const { error } = await supabase.from('pedidos').insert(pedido)

  if (error) {
    alert('Erro ao salvar o pedido.')
    btnEnviar.textContent = 'Enviar pedido'
    btnEnviar.disabled = false
    return
  }

  const mensagem = `
Novo pedido de serviço:

📌 Serviço: ${servico.titulo}
👤 Nome: ${pedido.nome}
📧 Email: ${pedido.email}
📄 CPF: ${pedido.cpf}
📱 WhatsApp: ${pedido.whatsapp}
📝 Observações: ${pedido.obs || 'Nenhuma'}
`.trim()

  window.location.href =
    `https://wa.me/5561920041427?text=${encodeURIComponent(mensagem)}`
})

// ================= MÁSCARAS =================

// CPF
cpfInput.addEventListener('input', () => {
  let v = cpfInput.value.replace(/\D/g, '').slice(0, 11)
  v = v.replace(/(\d{3})(\d)/, '$1.$2')
  v = v.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
  v = v.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
  cpfInput.value = v
})

// WhatsApp
whatsappInput.addEventListener('input', () => {
  let v = whatsappInput.value.replace(/\D/g, '').slice(0, 11)
  v = v.replace(/^(\d{2})(\d)/, '($1) $2')
  v = v.replace(/(\d{5})(\d)/, '$1-$2')
  whatsappInput.value = v
})
