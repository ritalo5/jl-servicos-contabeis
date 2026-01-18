import { supabase } from '/jl-servicos-contabeis/supabase.js'

const catalogo = {

  // ===================== MEI =====================
  mei: {
    nome: 'MEI',
    url: '/jl-servicos-contabeis/servicos/mei/',
    planosAnchor: '#planos',

    servicos: {
      'abertura-mei': {
        titulo: 'Abertura de MEI',
        valor: 'R$ 148,99',
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
        valor: 'R$ 198,99',
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
        valor: 'R$ 128,99',
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
        valor: 'R$ 48,99',
        inclusos: [
          'Emissão da guia DAS',
          'Verificação de valores',
          'Orientações de pagamento',
          'Envio da guia',
          'Suporte'
        ]
      },
      'dasn': {
        titulo: 'Declaração Anual DASN-SIMEI',
        valor: 'R$ 98,99',
        inclusos: [
          'Conferência das informações',
          'Envio da declaração',
          'Regularização de pendências',
          'Comprovante de envio',
          'Orientações finais'
        ]
      },
      'parcelamento': {
        titulo: 'Parcelamento de Débitos',
        valor: 'R$ 178,99',
        inclusos: [
          'Análise dos débitos',
          'Simulação de parcelamento',
          'Solicitação junto à Receita',
          'Acompanhamento',
          'Orientações'
        ]
      },
      'alteracao-mei': {
        titulo: 'Alteração de Dados do MEI',
        valor: 'R$ 78,99',
        inclusos: [
          'Alteração de dados cadastrais',
          'Atualização no Portal do Empreendedor',
          'Conferência final',
          'Orientações',
          'Suporte'
        ]
      }
    },

    planos: {
      basico: {
        titulo: 'Plano MEI Básico',
        valor: 'R$ 99,00 / mês',
        inclusos: [
          '✔ Emissão mensal do DAS',
          '✔ Lembretes de vencimento',
          '✔ DASN-SIMEI (1x ao ano)',
          '✔ Acompanhamento básico',
          '✔ Suporte via WhatsApp',
          '✔ 10% de desconto em serviços avulsos'
        ]
      },
      premium: {
        titulo: 'Plano MEI Premium',
        valor: 'R$ 159,00 / mês',
        inclusos: [
          '✔ Todos os benefícios do plano básico',
          '✔ Regularização fiscal completa',
          '✔ Parcelamento de débitos',
          '✔ Emissão de certidões',
          '✔ Orientação personalizada',
          '✔ Relatório mensal de situação',
          '✔ Suporte prioritário',
          '✔ 20% de desconto em serviços avulsos'
        ]
      }
    }
  },

  // ===================== PESSOA FÍSICA =====================
  'pessoa-fisica': {
    nome: 'Pessoa Física',
    url: '/jl-servicos-contabeis/servicos/pessoa-fisica/',

    servicos: {
      irpf: {
        titulo: 'Declaração de Imposto de Renda (IRPF)',
        valor: 'R$ 189,90',
        inclusos: [
          'Análise de rendimentos e despesas',
          'Preenchimento completo da declaração',
          'Envio à Receita Federal',
          'Orientações para restituição ou pagamento',
          'Suporte pós-envio'
        ]
      },
      'ganho-capital': {
        titulo: 'Apuração de Ganho de Capital',
        valor: 'R$ 249,90',
        inclusos: [
          'Análise da operação',
          'Cálculo do imposto devido',
          'Preenchimento do GCAP',
          'Orientações para pagamento',
          'Suporte'
        ]
      },
      'regularizacao-cpf': {
        titulo: 'Regularização de CPF',
        valor: 'R$ 99,90',
        inclusos: [
          'Diagnóstico da situação do CPF',
          'Regularização junto à Receita Federal',
          'Orientações finais',
          'Suporte'
        ]
      }
    }
  },

  // ===================== CERTIDÕES =====================
  certidoes: {
    nome: 'Certidões e Regularizações',
    url: '/jl-servicos-contabeis/servicos/certidoes/',

    servicos: {
      'certidao-federal': {
        titulo: 'Certidão Negativa Federal',
        valor: 'R$ 79,90',
        inclusos: [
          'Emissão da certidão',
          'Verificação de pendências',
          'Orientações em caso de restrição',
          'Envio do documento'
        ]
      },
      'certidao-estadual': {
        titulo: 'Certidão Negativa Estadual',
        valor: 'R$ 69,90',
        inclusos: [
          'Consulta e emissão',
          'Orientações',
          'Envio da certidão'
        ]
      },
      'certidao-municipal': {
        titulo: 'Certidão Negativa Municipal',
        valor: 'R$ 69,90',
        inclusos: [
          'Emissão da certidão',
          'Orientações',
          'Envio do documento'
        ]
      }
    }
  },

  // ===================== CERTIFICADO DIGITAL =====================
  'certificado-digital': {
    nome: 'Certificado Digital',
    url: '/jl-servicos-contabeis/servicos/certificado-digital/',

    servicos: {
      'e-cpf': {
        titulo: 'Certificado Digital e-CPF',
        valor: 'R$ 169,90',
        inclusos: [
          'Orientação na escolha',
          'Agendamento',
          'Emissão do certificado',
          'Suporte'
        ]
      },
      'e-cnpj': {
        titulo: 'Certificado Digital e-CNPJ',
        valor: 'R$ 229,90',
        inclusos: [
          'Orientação completa',
          'Agendamento',
          'Emissão do certificado',
          'Suporte'
        ]
      }
    }
  },

  // ===================== SERVIÇOS CONTÁBEIS =====================
  'servicos-contabeis': {
    nome: 'Serviços Contábeis',
    url: '/jl-servicos-contabeis/servicos/servicos-contabeis/',

    servicos: {
      'consultoria': {
        titulo: 'Consultoria Contábil',
        valor: 'R$ 199,90',
        inclusos: [
          'Análise da situação contábil',
          'Orientações estratégicas',
          'Esclarecimento de dúvidas',
          'Relatório resumido'
        ]
      },
      'planejamento': {
        titulo: 'Planejamento Tributário',
        valor: 'R$ 349,90',
        inclusos: [
          'Análise do cenário fiscal',
          'Simulações',
          'Orientações para economia de impostos',
          'Relatório completo'
        ]
      }
    }
  },

  // ===================== OUTROS SERVIÇOS =====================
  'outros-servicos': {
    nome: 'Outros Serviços',
    url: '/jl-servicos-contabeis/servicos/outros-servicos/',

    servicos: {
      'planilha-financeira': {
        titulo: 'Planilha Financeira Básica',
        valor: 'R$ 79,90',
        inclusos: [
          'Planilha personalizada',
          'Controle de receitas e despesas',
          'Orientações de uso',
          'Suporte inicial'
        ]
      },
      'organizacao-financeira': {
        titulo: 'Organização Financeira Pessoal',
        valor: 'R$ 149,90',
        inclusos: [
          'Análise financeira',
          'Organização de gastos',
          'Orientações práticas',
          'Plano de controle'
        ]
      },
      'consultoria-pessoal': {
        titulo: 'Consultoria Financeira Pessoal',
        valor: 'R$ 199,90',
        inclusos: [
          'Análise completa',
          'Orientações personalizadas',
          'Planejamento financeiro',
          'Suporte'
        ]
      }
    }
  }
}

// ================= PARAMS =================
const params = new URLSearchParams(window.location.search)
const servicoKey = params.get('servico')
const planoKey = params.get('plano')

// ================= DETECTA CATEGORIA =================
let categoriaKey = params.get('categoria') || 'mei'
const categoria = catalogo[categoriaKey]

if (!categoria) {
  alert('Categoria inválida.')
  throw new Error('Categoria inválida')
}

// ================= CONTEXTO =================
let tituloFinal = ''
let listaItens = []
let tipoPedido = ''
let valorFinal = ''

if (planoKey && categoria.planos?.[planoKey]) {
  const plano = categoria.planos[planoKey]
  tituloFinal = plano.titulo
  listaItens = plano.inclusos
  tipoPedido = `Plano - ${plano.titulo}`
  valorFinal = plano.valor

} else if (servicoKey && categoria.servicos?.[servicoKey]) {
  const servico = categoria.servicos[servicoKey]
  tituloFinal = servico.titulo
  listaItens = servico.inclusos
  tipoPedido = `Serviço - ${servico.titulo}`
  valorFinal = servico.valor

} else {
  alert('Serviço ou plano inválido.')
  throw new Error('Parâmetros inválidos')
}

// ================= RENDER =================
document.getElementById('titulo-servico').textContent = tituloFinal
document.getElementById('breadcrumb-servico').textContent = tituloFinal

const lista = document.getElementById('lista-inclusos')
lista.innerHTML = ''
listaItens.forEach(item => {
  const li = document.createElement('li')
  li.textContent = item
  lista.appendChild(li)
})

const elValor = document.getElementById('valor-plano')
if (elValor) elValor.textContent = valorFinal

// ================= AVISO ECONOMIA (APENAS MEI) =================
if (categoriaKey === 'mei' && servicoKey && !planoKey) {
  const aviso = document.getElementById('aviso-economia')

  if (aviso) {
    aviso.innerHTML = `
      🔥 Este serviço já está incluso nos planos mensais.<br>
      Economize contratando um plano completo.
      <br><br>
      <a href="${categoria.url}${categoria.planosAnchor}" class="btn-ver-planos">
        Ver planos
      </a>
    `
    aviso.style.display = 'block'
  }
}

// ================= FORM =================
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
    campos.nome.value.trim() &&
    campos.email.value.trim() &&
    campos.cpf.value.trim() &&
    campos.whatsapp.value.trim()
  )
}

Object.values(campos).forEach(c =>
  c.addEventListener('input', validar)
)

// ================= ENVIO =================
btnEnviar.addEventListener('click', () => {
  if (btnEnviar.disabled) return

  const pedido = {
    categoria: categoriaKey,
    tipo: planoKey ? 'plano' : 'servico',
    item: tipoPedido,
    valor: valorFinal,
    nome: campos.nome.value.trim(),
    email: campos.email.value.trim(),
    cpf: campos.cpf.value.trim(),
    whatsapp: campos.whatsapp.value.trim(),
    obs: campos.obs.value.trim()
  }

  const msg = `
Novo pedido:

📌 ${pedido.item}
💰 Valor: ${pedido.valor}

👤 Nome: ${pedido.nome}
📧 Email: ${pedido.email}
📄 CPF: ${pedido.cpf}
📱 WhatsApp: ${pedido.whatsapp}
📝 Observações: ${pedido.obs || 'Nenhuma'}
`.trim()

  window.open(
    `https://wa.me/5561920041427?text=${encodeURIComponent(msg)}`,
    '_blank'
  )

  supabase.from('pedidos').insert(pedido)
})

// ================= MÁSCARAS =================
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