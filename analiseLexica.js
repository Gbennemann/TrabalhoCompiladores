const moo = require('moo');

// Definindo o analisador léxico
const lexer = moo.compile({
  IF: /if/,
  IDENTIFIER: /[a-zA-Z_][a-zA-Z0-9_]*/,
  NUMBER: /\d+/,
  EQUAL: /==/,
  ASSIGN: /=/,
  PLUS: /\+/,
  TIMES: /\*/,
  LBRACE: /\{/,
  RBRACE: /\}/,
  SEMICOLON: /;/,
  WS: { match: /\s+/, lineBreaks: true },
});

// Função para gerar e exibir a tabela de transição
function gerarTabelaDeTransicao() {
  const transicoes = {
    'q0': { 'i': 'q1', 'x': 'q2', ' ': 'q3' }, // Estado inicial
    'q1': { 'f': 'q4' }, // "if" token
    'q2': { ' ': 'q5' }, // Identificador "x"
    'q3': { ' ': 'q6' }, // Transições com espaços
    'q4': { ' ': 'q7' }, // "if" finalizado
    'q5': { ' ': 'q8' }, // Transições após o identificador
    'q6': { '=': 'q9' }, // "=="
  };

  console.log("\nTabela de Transição:");
  for (let estado in transicoes) {
    console.log(`Estado: ${estado}`);
    for (let transicao in transicoes[estado]) {
      console.log(`  Leitura de '${transicao}' -> Transição para: ${transicoes[estado][transicao]}`);
    }
  }
}

// Função para gerar e exibir o AFD (Autômato Finito Determinístico)
function gerarAFD() {
  const AFD = {
    'q0': ['q1', 'q2'], // Estado inicial
    'q1': ['q4'], // Transição após 'i'
    'q2': ['q5'], // Transição após 'x'
    'q3': ['q6'], // Transições após espaço
    'q4': ['q7'], // "if" token completo
    'q5': ['q8'], // Transições após identificador
  };

  console.log("\nAutômato Finito Determinístico (AFD):");
  for (let estado in AFD) {
    console.log(`Estado: ${estado}`);
    console.log(`  Transições: ${AFD[estado].join(', ')}`);
  }
}

// Função para exibir os tokens encontrados durante a análise léxica
function exibirTokens(tokens) {
  console.log("\nTokens encontrados:");
  tokens.forEach(token => {
    console.log(`Tipo: ${token.type}, Valor: "${token.value}", Linha: ${token.line}`);
  });
}

// Função para exibir a tabela de símbolos
function exibirTabelaDeSimbolos(symbols) {
  console.log("\nTabela de Símbolos:");
  console.log(symbols);
}

// Função para exibir o relatório de erros
function exibirRelatorioDeErros(errors) {
  console.log("\nRelatório de Erros:");
  if (errors.length === 0) {
    console.log("Nenhum erro encontrado.");
  } else {
    errors.forEach(error => {
      console.log(`Erro na linha ${error.line}: ${error.message}`);
    });
  }
}

// Função para analisar o código fonte
function analisarCodigo(codigo) {
  const tokens = [];
  const erros = [];
  const symbols = new Set(); // Usando Set para armazenar os símbolos (sem repetição)

  let linha = 1;
  let lexema = '';

  for (let char of codigo) {
    // Processar o código linha por linha, com base nas expressões regulares definidas
    lexer.reset(char);
    const token = lexer.next();

    if (token) {
      tokens.push(token);
      symbols.add(token.value); // Adicionando à tabela de símbolos
    } else {
      erros.push({ line: linha, message: `Erro: Lexema inválido encontrado: ${char}` });
    }
    if (char === '\n') linha++;
  }

  exibirTokens(tokens);
  exibirTabelaDeSimbolos([...symbols]);
  exibirRelatorioDeErros(erros);
}

// Função para ler o código a ser analisado
function getInput() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  let codigoCompleto = ''; // Variável para acumular o código

  console.log("Digite o código a ser analisado (Digite 'FIM' para finalizar):");

  rl.on('line', (input) => {
    if (input === 'FIM') {
      rl.close();
      
      // Gerar e exibir a tabela de transição e o AFD
      gerarTabelaDeTransicao();
      gerarAFD();
      
      // Analisar o código
      analisarCodigo(codigoCompleto);
      return;
    }

    // Adiciona a linha do código à variável
    codigoCompleto += input + '\n';
  });
}

getInput();
