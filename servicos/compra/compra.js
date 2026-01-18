import { supabase } from '/jl-servicos-contabeis/supabase.js'

/* =====================================================
   CATÁLOGO ÚNICO DE SERVIÇOS E PLANOS
===================================================== */

const catalogo = {

  /* ===== MEI ===== */
  'abertura-mei': {
    titulo: 'Abertura de MEI',
    valor: 'R$ 148,99',
    inclusos: [
      'Análise do perfil do empreendedor',
      'Cadastro no Portal do Empreendedor',
      'Definição correta do CNAE',
      'Emissão do CNPJ',
      'Orientações iniciais',
      'Suporte após a abertura'
    ],
    planos: true
  },

  'regularizacao-mei': {
    titulo: 'Regularização de MEI',
    valor: 'R$ 198,99',
    inclusos: [
      'Diagnóstico da situação',
      'Identificação de pendências',
      'Regularização de débitos',
      'Orientações fiscais',
      'Suporte completo'
    ],
    planos: true
  },

  'encerramento-mei': {
    titulo: 'Encerramento de MEI',
    valor: 'R$ 128,99',
    inclusos: [
      'Análise prévia',
      'Encerramento correto',
      'Verificação de pendências',
      'Orientações pós-baixa'
    ],
    planos: true
  },

  'emissao-das': {
    titulo: 'Emissão de DAS',
    valor: 'R$ 48,99',
    inclusos: [
      'Emissão da guia DAS',
      'Verificação de valores',
      'Orientação de pagamento'
    ],
    planos: true
  },

  'dasn': {
    titulo: 'Declaração Anual DASN-SIMEI',
    valor: 'R$ 98,99',
    inclusos: [
      'Conferência das informações',
      'Envio da declaração',
      'Comprovante de entrega'
    ],
    planos: true
  },

  /* ===== PESSOA FÍSICA ===== */
  'irpf': {
    titulo: 'Declaração de Imposto de Renda',
    valor: 'R$ 189,99',
    inclusos: [
      'Análise dos documentos',
      'Preenchimento correto',
      'Envio da declaração',
      'Orientações finais'
    ]
  },

  'cpf-regularizacao': {
    titulo: 'Regularização de CPF',
    valor: 'R$ 89,99',
    inclusos: [
      'Consulta da situação',
      'Regularização junto à Receita',
      'Orientações finais'
    ]
  },

  /* ===== CERTIDÕES ===== */
  'certidao-negativa': {
    titulo: 'Certidão Negativa',
    valor: 'R$ 79,99',
    inclusos: [
      'Consulta da situação',
      'Emissão da certidão',
      'Envio do documento'
    ]
  },

  'regularizacao-cadastral': {
    titulo: 'Regularização Cadastral',
    valor: 'R$ 149,99',
    inclusos: [
      'Diagnóstico cadastral',
      'Correção de dados',
      'Regularização completa'
    ]
  },

  /* ===== CERTIFICADO DIGITAL ===== */
  'certificado-a1': {
    titulo: 'Certificado Digital A1',
    valor: 'R$ 179,99',
    inclusos: [
      'Emissão do certificado',
      'Validade de 1 ano',
      'Suporte para instalação'
    ]
  },

  'certificado-a3': {
    titulo: 'Certificado Digital A3',
    valor: 'R$ 249,99',
    inclusos: [
      'Emissão do certificado',
      'Validade conforme mídia',
      'Orientações de uso'
    ]
  },

  /* ===== SERVIÇOS CONTÁBEIS ===== */
  'consultoria-contabil': {
    titulo: 'Consultoria Contábil',
    valor: 'R$ 249,99',
    inclusos: [
      'Análise da situação contábil',
      'Orientação especializada',
      'Relatório com recomendações'
    ]
  },

  'planejamento-tributario': {
    titulo: 'Planejamento Tributário',
    valor: 'R$ 399,99',
    inclusos: [
      'Análise tributária',
      'Identificação de economia fiscal',
      'Plano de ação personalizado'
    ]
  },

  /* ===== OUTROS ===== */
  'planilha-financeira': {
    titulo: 'Planilha Financeira Pessoal',
    valor: 'R$ 59,99',
    inclusos: [
      'Planilha personalizada',
      'Controle de receitas e despesas',
      'Orientação de uso'
    ]
  }
}

/* =====================================================
   PARAMS
===================================================== */

const params = new URLSearchParams(window.location.search)
const servicoKey = params.get('servico')

if (!servicoKey || !catalogo[servicoKey]) {
  alert('Serviço inválido.')
  throw new Error('Serviço inválido')
}

const servico = catalogo[servicoKey]

/* =====================================================
   RENDER
===================================================== */

document.getElementById('breadcrumb-servico').textContent = servico.titulo
document.getElementById('titulo-servico').textContent = servico.titulo
document.getElementById('valor-plano').textContent = servico.valor

const lista = document.getElementById('lista-inclusos')
lista.innerHTML = ''
servico.inclusos.forEach(item => {
  const li = document.createElement('li')
  li.textContent = item
  lista.appendChild(li)
})

/* ===== AVISO PLANOS (MEI) ===== */
if (servico.planos) {
  const aviso = document.getElementById('aviso-economia')
  aviso.innerHTML = `
    🔥 Este serviço já está incluso nos planos mensais de MEI.<br><br>
    <a href="/jl-servicos-contabeis/servicos/mei/#planos" class="btn-ver-planos">
      Ver planos MEI
    </a>
  `
  aviso.style.display = 'block'
}

/* =====================================================
   FORMULÁRIO
===================================================== */

const form = document.getElementById('form-pedido')
const btnEnviar = document.getElementById('btn-enviar')

const campos = {
  nome: form.nome,
  email: form.email,
  cpf: form.cpf,
  whatsapp: form.whatsapp,
  obs: form.obs
}

function validar() {
  btnEnviar.disabled = !(
    campos.nome.value &&
    campos.email.value &&
    campos.cpf.value &&
    campos.whatsapp.value
  )
}

Object.values(campos).forEach(c =>
  c.addEventListener('input', validar)
)

/* =====================================================
   ENVIO
===================================================== */

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  if (btnEnviar.disabled) return

  const pedido = {
    servico: servico.titulo,
    valor: servico.valor,
    nome: campos.nome.value.trim(),
    email: campos.email.value.trim(),
    cpf: campos.cpf.value.trim(),
    whatsapp: campos.whatsapp.value.trim(),
    obs: campos.obs.value.trim()
  }

  /* WHATSAPP */
  const msg = `
Novo pedido:

📌 ${pedido.servico}
💰 Valor: ${pedido.valor}

👤 ${pedido.nome}
📧 ${pedido.email}
📄 ${pedido.cpf}
📱 ${pedido.whatsapp}
📝 ${pedido.obs || 'Nenhuma'}
`.trim()

  window.open(
    `https://wa.me/5561920041427?text=${encodeURIComponent(msg)}`,
    '_blank'
  )

  /* SUPABASE */
  await supabase.from('pedidos').insert(pedido)
})

/* =====================================================
   MÁSCARAS
===================================================== */

campos.cpf.addEventListener('input', () => {
  let v = campos.cpf.value.replace(/\D/g, '').slice(0, 11)
  v = v.replace(/(\d{3})(\d)/, '$1.$2')
  v = v.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
  v = v.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
  campos.cpf.value = v
})

campos.whatsapp.addEventListener('input', () => {
  let v = campos.whatsapp.value.replace(/\D/g, '').slice(0, 11)
  v = v.replace(/^(\d{2})(\d)/, '($1) $2')
  v = v.replace(/(\d{5})(\d)/, '$1-$2')
  campos.whatsapp.value = v
})