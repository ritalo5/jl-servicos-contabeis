import { supabase } from '/jl-servicos-contabeis/supabase.js'

// ================= CATÁLOGO DE SERVIÇOS =================
const catalogo = {

  // ================= MEI =================
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
          'Regularização de pendências',
          'Orientações fiscais',
          'Suporte completo'
        ]
      },
      'encerramento-mei': {
        titulo: 'Encerramento de MEI',
        valor: 'R$ 128,99',
        inclusos: [
          'Encerramento correto',
          'Verificação de pendências',
          'Orientações pós-baixa'
        ]
      },
      'emissao-das': {
        titulo: 'Emissão de DAS',
        valor: 'R$ 48,99',
        inclusos: [
          'Emissão da guia',
          'Conferência de valores',
          'Orientações de pagamento'
        ]
      },
      'dasn': {
        titulo: 'Declaração Anual DASN-SIMEI',
        valor: 'R$ 98,99',
        inclusos: [
          'Conferência dos dados',
          'Envio da declaração',
          'Comprovante'
        ]
      },
      'parcelamento': {
        titulo: 'Parcelamento de Débitos',
        valor: 'R$ 178,99',
        inclusos: [
          'Análise dos débitos',
          'Solicitação do parcelamento',
          'Acompanhamento'
        ]
      },
      'alteracao-mei': {
        titulo: 'Alteração de Dados do MEI',
        valor: 'R$ 78,99',
        inclusos: [
          'Atualização cadastral',
          'Conferência final'
        ]
      }
    },

    planos: {
      basico: {
        titulo: 'Plano MEI Básico',
        valor: 'R$ 99,00 / mês',
        inclusos: [
          '✔ Emissão mensal do DAS',
          '✔ DASN-SIMEI anual',
          '✔ Lembretes de vencimento',
          '✔ Suporte via WhatsApp',
          '✔ 10% de desconto em serviços'
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
          '✔ Suporte prioritário',
          '✔ 20% de desconto em serviços'
        ]
      }
    }
  },

  // ================= PESSOA FÍSICA =================
  'pessoa-fisica': {
    nome: 'Pessoa Física',
    url: '/jl-servicos-contabeis/servicos/pessoa-fisica/',

    servicos: {
      irpf: {
        titulo: 'Declaração de Imposto de Renda',
        valor: 'R$ 189,99',
        inclusos: [
          'Análise da documentação',
          'Preenchimento correto',
          'Envio à Receita Federal',
          'Suporte pós-envio'
        ]
      },
      'cpf-regularizacao': {
        titulo: 'Regularização de CPF',
        valor: 'R$ 79,99',
        inclusos: [
          'Diagnóstico da pendência',
          'Regularização junto à Receita',
          'Orientações finais'
        ]
      },
      'orientacao-fiscal-pf': {
        titulo: 'Orientação Fiscal Pessoa Física',
        valor: 'R$ 119,99',
        inclusos: [
          'Esclarecimento de dúvidas',
          'Planejamento fiscal básico',
          'Orientações personalizadas'
        ]
      }
    }
  },

  // ================= CERTIDÕES =================
  certidoes: {
    nome: 'Certidões',
    url: '/jl-servicos-contabeis/servicos/certidoes/',

    servicos: {
      'certidao-negativa': {
        titulo: 'Certidão Negativa',
        valor: 'R$ 69,99',
        inclusos: [
          'Emissão da certidão',
          'Conferência de pendências',
          'Envio do documento'
        ]
      },
      'regularizacao-cadastral': {
        titulo: 'Regularização Cadastral',
        valor: 'R$ 129,99',
        inclusos: [
          'Correção de dados',
          'Atualização cadastral',
          'Orientações'
        ]
      }
    }
  },

  // ================= CERTIFICADO DIGITAL =================
  'certificado-digital': {
    nome: 'Certificado Digital',
    url: '/jl-servicos-contabeis/servicos/certificado-digital/',

    servicos: {
      'certificado-a1': {
        titulo: 'Certificado Digital A1',
        valor: 'R$ 179,99',
        inclusos: [
          'Emissão do certificado',
          'Validade de 1 ano',
          'Suporte na instalação'
        ]
      },
      'certificado-a3': {
        titulo: 'Certificado Digital A3',
        valor: 'R$ 249,99',
        inclusos: [
          'Emissão do certificado',
          'Token ou cartão',
          'Suporte técnico'
        ]
      }
    }
  },

  // ================= SERVIÇOS CONTÁBEIS =================
  contabeis: {
    nome: 'Serviços Contábeis',
    url: '/jl-servicos-contabeis/servicos/contabeis/',

    servicos: {
      'consultoria-contabil': {
        titulo: 'Consultoria Contábil',
        valor: 'R$ 199,99',
        inclusos: [
          'Análise da situação',
          'Orientação especializada',
          'Relatório resumido'
        ]
      },
      'planejamento-tributario': {
        titulo: 'Planejamento Tributário',
        valor: 'R$ 299,99',
        inclusos: [
          'Análise tributária',
          'Estratégias de economia',
          'Orientações práticas'
        ]
      },
      balanco: {
        titulo: 'Elaboração de Balanço',
        valor: 'R$ 349,99',
        inclusos: [
          'Levantamento de dados',
          'Elaboração do balanço',
          'Entrega do relatório'
        ]
      }
    }
  },

  // ================= OUTROS SERVIÇOS =================
  outros: {
    nome: 'Outros Serviços',
    url: '/jl-servicos-contabeis/servicos/outros/',

    servicos: {
      'planilha-financeira': {
        titulo: 'Planilha Financeira Pessoal',
        valor: 'R$ 59,99',
        inclusos: [
          'Planilha personalizada',
          'Controle de receitas e despesas',
          'Orientações de uso'
        ]
      },
      'organizacao-documentos': {
        titulo: 'Organização de Documentos',
        valor: 'R$ 89,99',
        inclusos: [
          'Organização básica',
          'Classificação de documentos',
          'Entrega digital'
        ]
      },
      'orientacao-financeira': {
        titulo: 'Orientação Financeira Básica',
        valor: 'R$ 109,99',
        inclusos: [
          'Análise da situação',
          'Orientações práticas',
          'Dicas de controle financeiro'
        ]
      }
    }
  }
}

// ================= PARAMS =================
const params = new URLSearchParams(window.location.search)
const categoriaKey = params.get('categoria')
const servicoKey = params.get('servico')
const planoKey = params.get('plano')

// ================= VALIDAÇÃO =================
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

// ================= BREADCRUMB =================
document.getElementById('breadcrumb-categoria').textContent = categoria.nome
document.getElementById('breadcrumb-categoria').href = categoria.url
document.getElementById('breadcrumb-servico').textContent = tituloFinal
document.getElementById('titulo-servico').textContent = tituloFinal

// ================= RENDER =================
const lista = document.getElementById('lista-inclusos')
lista.innerHTML = ''
listaItens.forEach(item => {
  const li = document.createElement('li')
  li.textContent = item
  lista.appendChild(li)
})

const elValor = document.getElementById('valor-plano')
if (elValor) elValor.textContent = valorFinal

// ================= AVISO ECONOMIA (MEI) =================
if (categoriaKey === 'mei' && servicoKey && !planoKey) {
  const aviso = document.getElementById('aviso-economia')
  aviso.innerHTML = `
    🔥 Este serviço já está incluso nos planos MEI.<br><br>
    <a href="${categoria.url}${categoria.planosAnchor}">Ver planos</a>
  `
  aviso.style.display = 'block'
}