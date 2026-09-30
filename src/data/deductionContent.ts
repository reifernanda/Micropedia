import { DeductionMechanism, InteractiveCase, ChecklistItem, QuickFlashcard } from '../types';

export const DEDUCTION_MECHANISMS: DeductionMechanism[] = [
  {
    id: 'equivalente',
    title: 'Dedução por Antibiótico Equivalente',
    subtitle: 'Baseada em regras pré-definidas ou customizadas de comitês internacionais (CLSI, EUCAST / BrCAST)',
    badge: 'Regra Pré-Definida',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    concept:
      'Utiliza o teste de uma droga representativa de classe/família para predizer o perfil de sensibilidade de outros antibióticos equivalentes, sem necessidade de testá-los fisicamente no cartão.',
    howItWorks: [
      '1. Ativar na tela inicial do AES: "Activar a Dedução por Antibiótico Equivalente".',
      '2. Na Configuração Geral de TSA (VITEK 2 System), entrar no cartão de TSA específico (ex: AST-P637, AST-N408) e selecionar os antibióticos a deduzir.',
      '3. O AES verifica se existe uma regra de dedução compatível (ex: Regra 662 para Beta-lactâmicos em Enterococcus).',
      '4. Se o resultado da droga testada atender ao critério (ex: Ampicilina = Sensível), as drogas equivalentes são inseridas automaticamente no laudo.'
    ],
    requirements: [
      'Configuração ativada na tela geral do AES.',
      'Drogas marcadas em "Antibióticos a Deduzir" na Configuração Geral de TSA para aquele modelo de cartão.',
      'Existência de regra de dedução válida (do comitê ou criada por cópia no AES).'
    ],
    recommendationStatus: 'Recomendado',
    recommendationColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    practicalExample: {
      organism: 'Enterococcus faecalis',
      cardType: 'AST-P637',
      testedDrug: 'Ampicilina (AMP)',
      deducedDrugs: ['Amoxicilina', 'Ampicilina/Sulbactam'],
      justification:
        'Pela Regra 662 (EUCAST/BrCAST), Ampicilina sensível prediz sensibilidade para Amoxicilina, Ampicilina/Sulbactam e Piperacilina em Enterococcus.',
      committeeRef: 'EUCAST / BrCAST / CLSI M100'
    },
    advisorTip:
      'Ao criar novas regras para o cliente, NUNCA altere as regras originais do comitê. Sempre utilize a opção "Copiar uma regra existente" e faça os ajustes necessários na cópia.',
    dangerAlert:
      'O sistema NÃO aceita deduções arbitrárias sem respaldo de comitê. Se tentar deduzir drogas sem coerência biológica cadastrada na base de conhecimento, o AES ignorará o comando.'
  },
  {
    id: 'fenotipo',
    title: 'Dedução pelo Fenótipo',
    subtitle: 'Baseada na distribuição de MIC, gráfico fenotípico do AES e Concentrações Críticas',
    badge: 'Inteligência AES',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    concept:
      'O AES identifica o mecanismo ou fenótipo de resistência da cepa (ex: Selvagem, Penicilinase Adquirida, ESBL, Carbapenemase, AmpC) e, com base nisso, deduz o resultado terapêutico de drogas correlatas.',
    howItWorks: [
      '1. Ativar na tela principal do AES: "Activar a Dedução por Fenótipo".',
      '2. Selecionar as drogas a deduzir no cartão desejado em Configuração Geral de TSA.',
      '3. OBRIGATÓRIO: Cadastrar o ponto de corte (concentração crítica EUCAST/BrCAST/CLSI) da droga a ser deduzida no AES.',
      '4. Com o ponto de corte cadastrado, o AES insere a linha de corte no gráfico fenotípico e libera o resultado com base no fenótipo expertizado.'
    ],
    requirements: [
      'Opção "Activar a Dedução por Fenótipo" marcada no AES.',
      'Antibiótico selecionado em Configuração Geral de TSA.',
      'CRÍTICO: Ponto de corte (concentração crítica) obrigatoriamente cadastrado para a droga no AES.'
    ],
    recommendationStatus: 'Recomendado',
    recommendationColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    practicalExample: {
      organism: 'Escherichia coli',
      cardType: 'AST-N408',
      testedDrug: 'Perfil global de betalactâmicos e aminoglicosídeos',
      deducedDrugs: ['Imipenem', 'Tobramicina'],
      justification:
        'Com o fenótipo identificado e ponto de corte configurado no AES, o Imipenem e a Tobramicina foram deduzidos diretamente pelo fenótipo, mesmo sem uma regra condicional manual.',
      committeeRef: 'BrCAST 2026 / EUCAST Clinical Breakpoints'
    },
    advisorTip:
      'Se o cliente reclamar que marcou a droga no cartão e a dedução fenotípica não aconteceu, 99% das vezes o motivo é a falta de ponto de corte cadastrado no menu "Concentrações Críticas" do AES!',
    dangerAlert:
      'Uma regra condicional pode ANULAR a dedução por fenótipo! Se existir uma regra cadastrada para a mesma droga que não atenda às condições, o sistema não avança para o fenótipo.'
  },
  {
    id: 'sem_expertizacao',
    title: 'Dedução sem Expertização',
    subtitle: 'Enable Deduction without Expertise (Quando o organismo não está na base AES)',
    badge: 'Alto Risco',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    concept:
      'Tentativa do software de realizar deduções puramente mecânicas/equivalentes para microrganismos que NÃO possuem base de conhecimento validada no AES (status roxo).',
    howItWorks: [
      'O sistema aplica deduções simples mesmo quando o AES não foi capaz de expertizar ou validar a consistência biológica da espécie ou dos MICs.',
      'Opera como um conversor matemático cego, desconsiderando a expertise microbiológica.'
    ],
    requirements: [
      'Ativação explícita na tela do AES ("Activar Dedução sem Expertização").'
    ],
    recommendationStatus: 'Não Recomendado na Rotina',
    recommendationColor: 'bg-rose-100 text-rose-800 border-rose-300',
    practicalExample: {
      organism: 'Microrganismos atípicos ou sem suporte fenotípico no AES',
      cardType: 'Qualquer cartão com Status Roxo',
      testedDrug: 'Variação não contemplada na base biológica',
      deducedDrugs: ['Drogas deduzidas cegamente'],
      justification:
        'Não há supervisão das regras de coerência do AES. Aumenta drasticamente a probabilidade de falhas graves de laudo.',
      committeeRef: 'Alerta oficial bioMérieux / GCS'
    },
    advisorTip:
      'Oriente sempre o laboratório a manter esta caixa DESMARCADA. O valor do VITEK 2 está na segurança biológica do AES. A dedução sem expertização traz risco sanitário e de auditoria.',
    dangerAlert:
      'ATENÇÃO: A bioMérieux e o time de GCS desaconselham formalmente o uso de dedução sem expertização na rotina diagnóstica!'
  }
];

export const INTERACTIVE_CASES: InteractiveCase[] = [
  {
    id: 'caso-enterococcus',
    title: 'Caso 1: Enterococcus faecalis no Cartão AST-P637',
    organism: 'Enterococcus faecalis',
    card: 'AST-P637',
    context:
      'O laboratório testou um E. faecalis isolado de urocultura no cartão AST-P637. O médico solicitou saber a sensibilidade a Amoxicilina oral e Ciprofloxacino, que não estão no cartão.',
    testedAntimicrobials: [
      { name: 'Ampicilina', mic: '<= 2', interpretation: 'S' },
      { name: 'Levofloxacino', mic: '<= 1', interpretation: 'S' },
      { name: 'Vancomicina', mic: '<= 1', interpretation: 'S' },
      { name: 'Gentamicina Alta Concentração', mic: 'SYN-S', interpretation: 'S' }
    ],
    deductionGoal: ['Amoxicilina', 'Ampicilina/Sulbactam', 'Ciprofloxacino'],
    appliedMethod: 'Regra Equivalente',
    ruleNumber: 'Regra 662 (Betalactâmicos) + Regra Customizada 1242 (Quinolonas)',
    hasBreakpoints: true,
    outcome: {
      success: true,
      reportLines: [
        {
          antimicrobial: 'Amoxicilina',
          int: 'S',
          deductionReason: 'Deduzido por Ampicilina (Regra de Dedução nº 662 - EUCAST)'
        },
        {
          antimicrobial: 'Ampicilina/Sulbactam',
          int: 'S',
          deductionReason: 'Deduzido por Ampicilina (Regra de Dedução nº 662 - EUCAST)'
        },
        {
          antimicrobial: 'Ciprofloxacino',
          int: 'S',
          deductionReason: 'Deduzido por Levofloxacino (Regra Customizada nº 1242)'
        }
      ],
      explanation:
        'A Ampicilina sensível acionou a Regra 662 do EUCAST/BrCAST, deduzindo Amox e Ampi/Sulbactam com sucesso. Como Ciprofloxacino não constava na regra padrão, a assessora criou uma regra customizada por cópia ligando Levofloxacino sensível -> Ciprofloxacino sensível em E. faecalis.',
      advisorTakeaway:
        'Para quinolonas em Enterococcus, se a droga testada estiver sensível (ou resistente), a regra criada refletirá exatamente no laudo, desde que respeite o critério configurado (S ou R).'
    }
  },
  {
    id: 'caso-escherichia',
    title: 'Caso 2: Escherichia coli no Cartão AST-N408',
    organism: 'Escherichia coli',
    card: 'AST-N408',
    context:
      'O laboratório configurou várias drogas para deduzir no cartão Gram-negativo AST-N408. Ao reanalisar o laudo, Imipenem e Levofloxacino apareceram deduzidos, mas Tobramicina e Amoxicilina não entraram de primeira.',
    testedAntimicrobials: [
      { name: 'Norfloxacino', mic: '> 16', interpretation: 'R' },
      { name: 'Piperacilina/Tazobactam', mic: '<= 4', interpretation: 'S' },
      { name: 'Trimetoprima/Sulfametoxazol', mic: '> 320', interpretation: 'R' },
      { name: 'Levofloxacino', mic: '4', interpretation: 'I' }
    ],
    deductionGoal: ['Imipenem', 'Tobramicina', 'Amoxicilina'],
    appliedMethod: 'Dedução Fenotípica',
    hasBreakpoints: true,
    outcome: {
      success: true,
      reportLines: [
        {
          antimicrobial: 'Imipenem',
          int: 'S',
          deductionReason: 'Dedução pelo Fenótipo (Ponto de corte ativo no AES: <= 2 / > 4)'
        },
        {
          antimicrobial: 'Tobramicina',
          int: 'S',
          deductionReason: 'Dedução pelo Fenótipo (Cadastrado Ponto de Corte no AES: <= 2 / > 4)'
        }
      ],
      explanation:
        'O Imipenem entrou porque já havia ponto de corte cadastrado no AES e o fenótipo era compatível (Sensível / Selvagem para carbapenêmicos). A Tobramicina só apareceu depois que a assessora entrou em "Concentrações Críticas" no AES e cadastrou o ponto de corte do comitê. Já a tentativa de criar regra usando Amox/Clav para predizer Ampicilina falhou porque o BrCAST não valida essa premissa.',
      advisorTakeaway:
        'Dedução por fenótipo depende de ter Ponto de Corte ativo no AES. Sem ponto de corte, a droga não é expertizada no gráfico fenotípico!'
    }
  }
];

export const ADVISOR_CHECKLIST: ChecklistItem[] = [
  {
    id: 'chk-1',
    category: 'config',
    question: 'A opção geral de dedução está ativa na tela principal do AES?',
    explanation:
      'Ao abrir o AES, na tela inicial há caixas de seleção que vêm DESMARCADAS por padrão de fábrica.',
    action:
      'Marque "Activar a Dedução por Antibiótico Equivalente" e/ou "Activar a Dedução por Fenótipo".',
    screenTarget: 'AES > Menu Inicial > Tipos de Dedução'
  },
  {
    id: 'chk-2',
    category: 'config',
    question: 'O antibiótico foi selecionado na Configuração Geral de TSA para aquele cartão?',
    explanation:
      'O sistema precisa saber explicitamente para qual modelo de cartão (ex: AST-N408, AST-P637) você quer deduzir cada droga.',
    action:
      'Acesse Configuração Geral de TSA > Localize o cartão > Clique em Editar > Marque os antibióticos na lista inferior.',
    screenTarget: 'VITEK 2 System > Configuração Geral de TSA'
  },
  {
    id: 'chk-3',
    category: 'ponto_corte',
    question: 'Para dedução fenotípica: Existe ponto de corte cadastrado no AES para essa droga?',
    explanation:
      'A dedução por fenótipo precisa da concentração crítica (breakpoint) para traçar o corte no gráfico e correlacionar com a população bacteriana.',
    action:
      'Acesse AES > Concentrações Críticas > Verifique se a droga possui valores S / I / R preenchidos.',
    screenTarget: 'AES > Concentrações Críticas (EUCAST / BrCAST / CLSI)'
  },
  {
    id: 'chk-4',
    category: 'regra',
    question: 'A interpretação da droga testada atende aos requisitos da regra?',
    explanation:
      'Se uma regra diz "SE Levofloxacino = S ENTÃO Ciprofloxacino = S", mas o Levo deu R ou I, a regra não será disparada.',
    action:
      'Verifique se você precisa configurar a contraparte da regra (ex: SE Levo = R ENTÃO Cipro = R) ou se a regra contempla S, I, R.',
    screenTarget: 'AES > Regras de Dedução > Detalhes da Regra'
  },
  {
    id: 'chk-5',
    category: 'regra',
    question: 'Existe alguma regra customizada "conflitante" anulando a dedução por fenótipo?',
    explanation:
      'O motor do AES prioriza regras ativas. Se você criou uma regra que não se aplica, ela pode impedir o AES de usar a dedução por fenótipo.',
    action:
      'Inative ou revise regras customizadas que envolvam aquela mesma família ou droga.',
    screenTarget: 'AES > Regras de Dedução > Inativar regra'
  },
  {
    id: 'chk-6',
    category: 'comite',
    question: 'A dedução pretendida é respaldada pelo comitê adotado (BrCAST / EUCAST / CLSI)?',
    explanation:
      'O VITEK 2 possui inteligência embutida. Ele não aceita regras absurdas (ex: Ciprofloxacino deduzindo Amicacina, ou Amox/Clav deduzindo Ampicilina em Enterobacterales).',
    action:
      'Consulte a tabela oficial do comitê para verificar qual é a droga marcadora correta da classe.',
    screenTarget: 'Tabelas BrCAST / EUCAST de Testes e Agentes Substitutos'
  }
];

export const QUICK_FLASHCARDS: QuickFlashcard[] = [
  {
    id: 1,
    category: 'Fundamentos',
    tag: 'Conceito',
    front: 'O que é a Dedução de Antibióticos no VITEK® 2 e por que ela é um "luxo" para o laboratório?',
    back: 'É a capacidade de reportar a sensibilidade de antibióticos que não estavam presentes fisicamente no cartão de TSA, com base em drogas marcadoras testadas ou no fenótipo expertizado pelo AES. Reduz custos de cartões adicionais, agiliza a liberação e diminui ligações de médicos questionando a falta de drogas rotineiras.'
  },
  {
    id: 2,
    category: 'Configuração',
    tag: 'Boas Práticas',
    front: 'Por que NUNCA devemos editar diretamente uma regra padrão de dedução do comitê?',
    back: 'As regras padrão do comitê vêm validadas pela fábrica. A melhor prática ensinada é sempre COPIAR uma regra existente para criar uma nova customizada. Assim, preserva-se o padrão internacional original e evita-se corrupção da base de conhecimento.'
  },
  {
    id: 3,
    category: 'Fenótipo vs Regra',
    tag: 'Pegadinha Técnica',
    front: 'O que acontece se eu criar uma regra condicional errada para uma droga e tentar deduzir por fenótipo?',
    back: 'A regra tem precedência e pode ANULAR a dedução por fenótipo! Se a regra não for satisfeita, o AES não "cai" para o fenótipo se a regra estiver bloqueando a cadeia. Regra e Fenótipo são mecanismos paralelos que podem concorrer entre si.'
  },
  {
    id: 4,
    category: 'Pontos de Corte',
    tag: 'Requisito',
    front: 'Qual é o pré-requisito indispensável para que a Dedução por Fenótipo funcione no AES?',
    back: 'Ter o PONTO DE CORTE (Concentração Crítica / Breakpoint S/I/R do EUCAST/BrCAST/CLSI) devidamente cadastrado no AES para o antibiótico desejado. Sem ponto de corte, o AES não traça a linha no gráfico fenotípico e não deduz a droga.'
  },
  {
    id: 5,
    category: 'Segurança',
    tag: 'Alerta GCS',
    front: 'Por que a bioMérieux NÃO recomenda ativar "Dedução sem Expertização"?',
    back: 'Porque ela realiza deduções puramente mecânicas quando o microrganismo ou MIC não têm suporte biológico no AES (status roxo). Sem a validação biológica do AES, o risco de liberar um laudo com dedução falsa e consequências clínicas graves é inaceitável.'
  },
  {
    id: 6,
    category: 'Comitês',
    tag: 'BrCAST / EUCAST',
    front: 'Por que o VITEK não aceitou criar regra de Amoxicilina/Clavulanato deduzindo Ampicilina em Enterobacterales?',
    back: 'Porque segundo o BrCAST/EUCAST, a droga marcadora primária de sensibilidade para aminopenicilinas em Enterobacterales é a AMPICILINA, não o Clavulanato. O sistema possui consistência interna e barra premissas microbiologicamente invertidas.'
  }
];

export const STEP_BY_STEP_STEPS = [
  {
    step: 1,
    title: 'Habilitação Geral no AES',
    subtitle: 'Painel Principal do Advanced Expert System',
    description:
      'Por padrão de instalação, as deduções vêm desmarcadas. O primeiro passo do assessor é acessar o menu principal do AES e ativar os modos desejados.',
    actions: [
      'Marcar [✓] Activar a Dedução por Fenótipo',
      'Marcar [✓] Activar a Dedução por Antibiótico Equivalente',
      'Deixar [ ] Desmarcado: Dedução sem Expertização (Regra de segurança bioMérieux)'
    ],
    screenIcon: 'Sliders'
  },
  {
    step: 2,
    title: 'Mapeamento no Cartão de TSA',
    subtitle: 'VITEK® 2 System > Configuração Geral de TSA',
    description:
      'Defina exatamente quais antibióticos deverão ser calculados e exibidos para cada tipo de cartão em uso no laboratório.',
    actions: [
      'Selecione o modelo do cartão (ex: AST-P637 para Gram-positivos, AST-N408 para Gram-negativos).',
      'Clique em "Editar".',
      'Em "Antibióticos a Deduzir", selecione as moléculas desejadas (ex: Amoxicilina, Imipenem, Ciprofloxacino, Tobramicina).',
      'Grave as configurações.'
    ],
    screenIcon: 'CreditCard'
  },
  {
    step: 3,
    title: 'Parametrização de Regras (Se Necessário)',
    subtitle: 'AES > Regras de Dedução',
    description:
      'Se a molécula não for deduzida pelas regras pré-definidas do comitê (como a Regra 662 de Enterococcus), configure uma regra específica.',
    actions: [
      'NUNCA altere a regra padrão original.',
      'Selecione "Copiar uma regra existente" ou clique no botão "+ (Criar nova regra)".',
      'Defina: Família de antibióticos, Microrganismo (ex: Enterococcus), Droga testada (ex: Levofloxacino), Interpretação exigida (S, R ou S/R) e Droga deduzida (ex: Ciprofloxacino).'
    ],
    screenIcon: 'FileCode2'
  },
  {
    step: 4,
    title: 'Conferência de Concentrações Críticas',
    subtitle: 'AES > Concentrações Críticas (Pontos de Corte)',
    description:
      'Para que a dedução por fenótipo funcione, a droga deduzida precisa ter seu ponto de corte cadastrado no comitê ativo (ex: EUCAST/BrCAST).',
    actions: [
      'Localize o grupo do microrganismo e o antibiótico deduzido.',
      'Verifique se os limites S e R estão preenchidos.',
      'Se estiver em branco, insira os valores de acordo com a tabela do BrCAST/EUCAST vigente.'
    ],
    screenIcon: 'Target'
  },
  {
    step: 5,
    title: 'Reanálise e Validação do Laudo',
    subtitle: 'AES > Relatório de Detalhes do AES',
    description:
      'Após a configuração, reanalise um isolado no VITEK 2 e abra o Relatório de Detalhes do AES para conferir a justificativa técnica.',
    actions: [
      'Verifique se a droga aparece na coluna de antibióticos com o asterisco ou nota de dedução.',
      'No rodapé do relatório, confira a seção "Deduções de Antibióticos":',
      'Confirme se o motivo foi "Regra de Dedução nº XXX" ou "FENÓTIPO EXPERTIZADO".'
    ],
    screenIcon: 'CheckCircle2'
  }
];
