const moo = require('moo');
const chalk = require('chalk'); // Requer: npm install chalk

// Lexer com tokens da linguagem
const lexer = moo.compile({
  // Palavras-chave
  IF: /\bif\b/,
  ELSE: /\belse\b/,
  WHILE: /\bwhile\b/,
  RETURN: /\breturn\b/,
  FUNCTION: /\bfunction\b/,
  VAR: /\bvar\b/,
  CONST: /\bconst\b/,
  LET: /\blet\b/,

  // Literais
  NUMBER: /\b\d+(?:\.\d+)?\b/,
  STRING: /"(?:\\["\\]|[^\n"\\])*"/,

  // Identificadores
  IDENTIFIER: /[a-zA-Z_][a-zA-Z0-9_]*/,

  // Operadores
  EQ: /==/,
  ASSIGN: /=/,
  PLUS: /\+/,
  MINUS: /-/,
  TIMES: /\*/,
  DIV: /\//,
  MOD: /%/,
  LT: /</,
  GT: />/,

  // Delimitadores
  LBRACE: /\{/,
  RBRACE: /\}/,
  LPAREN: /\(/,
  RPAREN: /\)/,
  SEMICOLON: /;/,
  COMMA: /,/,

  // Comentários (agora bem tratados)
  COMMENT: { match: /\/\/.*/, lineBreaks: false },

  // Espaços em branco (ignorados)
  WS: { match: /\s+/, lineBreaks: true },
});

// Tabela de transição (simulada para ilustração)
function gerarTabelaDeTransicao() {
  const transicoes = {
    q0: { f: 'q1', v: 'q2', '/': 'q3', '=': 'q4', '"': 'q5', d: 'q6' },
    q1: { u: 'q7' },
    q2: { a: 'q8' },
    q3: { '/': 'q9' },
    q4: { '=': 'q10' },
    q5: { '"': 'q11' },
    q6: { '0-9': 'q6' },
  };

  console.log(chalk.blueBright.bold("\n📊 Tabela de Transição (simulada):"));
  for (const [estado, trans] of Object.entries(transicoes)) {
    console.log(chalk.yellow(`  Estado: ${estado}`));
    for (const [char, destino] of Object.entries(trans)) {
      console.log(`    '${char}' → ${chalk.green(destino)}`);
    }
  }
}

// AFD (Autômato Finito Determinístico)
function gerarAFD() {
  const AFD = {
    q0: ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'],
    q1: ['q7'],
    q2: ['q8'],
    q3: ['q9'],
    q4: ['q10'],
  };

  console.log(chalk.magentaBright.bold("\n🧠 AFD (Autômato Finito Determinístico):"));
  for (const estado in AFD) {
    console.log(`  ${chalk.yellow('Estado')}: ${estado} → ${chalk.green(AFD[estado].join(', '))}`);
  }
}

// Exibe tokens encontrados
function exibirTokens(tokens) {
  console.log(chalk.cyanBright.bold("\n📥 Tokens encontrados:"));
  tokens.forEach(t =>
    console.log(`${chalk.gray('•')} ${chalk.bold(t.type.padEnd(10))} | Valor: ${chalk.greenBright(`'${t.value}'`)} | Linha: ${chalk.yellow(t.line)}`)
  );
}

// Exibe tabela de símbolos
function exibirTabelaDeSimbolos(tokens) {
  const simbolos = tokens.filter(t => t.type === 'IDENTIFIER').map(t => t.value);
  const unicos = [...new Set(simbolos)];
  console.log(chalk.blueBright.bold("\n📌 Tabela de Símbolos:"));
  unicos.forEach(s => console.log(`${chalk.gray('-')} ${chalk.whiteBright(s)}`));
}

// Relatório de erros
function exibirRelatorioDeErros(erros) {
  console.log(chalk.redBright.bold("\n❗ Relatório de Erros:"));
  if (erros.length === 0) {
    console.log(chalk.green("  Nenhum erro encontrado."));
  } else {
    erros.forEach(e => {
      console.log(`  ${chalk.red('Erro')} na linha ${chalk.yellow(e.line)}: ${e.message}`);
    });
  }
}

// Lógica principal de análise
function analisarCodigo(codigo) {
  const tokens = [];
  const erros = [];
  lexer.reset(codigo);

  try {
    let token;
    while ((token = lexer.next())) {
      if (token.type !== 'WS' && token.type !== 'COMMENT') {
        tokens.push(token);
      }
    }
  } catch (e) {
    erros.push({ line: e.line || '?', message: e.message });
  }

  exibirTokens(tokens);
  exibirTabelaDeSimbolos(tokens);
  exibirRelatorioDeErros(erros);
}

// Leitura do código
function getInput() {
  const readline = require('readline');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  let codigoCompleto = '';
  console.log(chalk.bold("✍️  Digite o código a ser analisado (digite 'FIM' para encerrar):"));

  rl.on('line', (input) => {
    if (input.trim() === 'FIM') {
      rl.close();
      gerarTabelaDeTransicao();
      gerarAFD();
      analisarCodigo(codigoCompleto);
      return;
    }
    codigoCompleto += input + '\n';
  });
}

getInput();
