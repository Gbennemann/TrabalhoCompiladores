# Analisador Léxico em JavaScript

Este projeto implementa um **analisador léxico** simples para análise de código-fonte em uma linguagem fictícia. Utilizando a biblioteca `moo` para a criação do analisador e a construção de uma tabela de transição, um autômato finito determinístico (AFD) e a análise de tokens, o sistema identifica os elementos da linguagem como identificadores, números, operadores, entre outros.

## Funcionalidades

- **Leitura e análise de código**: O sistema permite que o usuário insira um código linha por linha até digitar 'FIM'.
- **Geração de tabela de transição**: Apresenta como o analisador se move de estado para estado durante a leitura do código.
- **Exibição de AFD**: Mostra as transições possíveis de cada estado em um formato simples.
- **Tokenização do código**: Exibe todos os tokens encontrados no código, incluindo tipo, valor e linha.
- **Tabela de símbolos**: Exibe os símbolos identificados durante a análise léxica.
- **Relatório de erros**: Caso algum erro seja encontrado durante a análise, um relatório é gerado.

## 🧠 Tokens Reconhecidos

| Categoria       | Exemplos / Regex                     | Descrição                                     |
|----------------|--------------------------------------|-----------------------------------------------|
| Palavras-chave | `if`                                 | Condicional simples reconhecido diretamente   |
| Identificadores| `[a-zA-Z_][a-zA-Z0-9_]*`              | Variáveis como `x`, `valor`, `nome_id`        |
| Operadores     | `==`, `=`, `+`, `*`                   | Comparação, atribuição, soma, multiplicação   |
| Delimitadores  | `{`, `}`, `;`                         | Blocos e separação de instruções              |
| Constantes     | `\d+`                                 | Números inteiros como `10`, `42`, `0`         |
| Comentários    | _Não implementado_                    | O suporte a comentários ainda não existe      |


## Como usar

### 1. Instalar as dependências

Antes de rodar o projeto, você precisa instalar as dependências. Certifique-se de ter o [Node.js](https://nodejs.org/) instalado. Em seguida, crie um projeto com o comando abaixo:
```
npm init -y
```

Instale o pacote moo:
```
npm install moo
```

### 2. Executar o projeto
Após a instalação das dependências, execute o projeto utilizando o Node.js. No terminal, execute o comando:
```
node index.js
```
### 3. Digitar o código
Após rodar o programa, ele solicitará que você digite o código-fonte a ser analisado. Digite o código linha por linha. Quando terminar, digite FIM para finalizar a entrada.

Exemplo de entrada:
```
if x == 10 {
  x = x + 1;
}
else {
  y = y * 2;
}
```

### 4. Resultados
Após finalizar a entrada, o programa exibirá:

  Tabela de transição: Como o analisador transita entre os estados.

  Autômato Finito Determinístico (AFD): Quais estados são alcançados a partir de cada transição.

  Tokens encontrados: Os tokens identificados no código.

  Tabela de símbolos: Uma lista dos símbolos encontrados.

  Relatório de erros: Caso haja algum erro no código, ele será reportado.

### Estrutura do Código
O código está estruturado da seguinte maneira:

Definição do Lexer: Usando a biblioteca moo, o lexer é configurado com as expressões regulares que representam os tokens da linguagem.

Funções principais:

```
gerarTabelaDeTransicao(): Exibe a tabela de transição do autômato.

gerarAFD(): Exibe o autômato finito determinístico.

analisarCodigo(): Analisa o código fonte, gerando tokens, tabela de símbolos e relatórios de erros.

getInput(): Lê a entrada do código do usuário até que a palavra "FIM" seja digitada.
```

### Como funciona o Lexer
O lexer é configurado com expressões regulares para identificar os seguintes tipos de tokens:

```
IF: Palavra-chave "if".

IDENTIFIER: Identificadores (variáveis, funções, etc).

NUMBER: Números inteiros.

EQUAL: Operador de igualdade ==.

ASSIGN: Operador de atribuição =.

PLUS: Operador de adição +.

TIMES: Operador de multiplicação *.

LBRACE: Chave de abertura {.

RBRACE: Chave de fechamento }.

SEMICOLON: Ponto e vírgula ;.

WS: Espaços em branco (ignorados, mas usados para controlar as quebras de linha).
```

### Exemplo de Saída
Tabela de Transição
```
Tabela de Transição:
Estado: q0
  Leitura de 'i' -> Transição para: q1
  Leitura de 'x' -> Transição para: q2
  Leitura de ' ' -> Transição para: q3
Estado: q1
  Leitura de 'f' -> Transição para: q4
Estado: q2
  Leitura de ' ' -> Transição para: q5
Estado: q3
  Leitura de ' ' -> Transição para: q6
Estado: q4
  Leitura de ' ' -> Transição para: q7
Estado: q5
  Leitura de ' ' -> Transição para: q8
Estado: q6
  Leitura de '=' -> Transição para: q9
```
### Autômato Finito Determinístico (AFD)
```
Autômato Finito Determinístico (AFD):
Estado: q0
  Transições: q1, q2
Estado: q1
  Transições: q4
Estado: q2
  Transições: q5
Estado: q3
  Transições: q6
Estado: q4
  Transições: q7
Estado: q5
  Transições: q8
```
### Tokens encontrados
```
Tokens encontrados:
Tipo: IDENTIFIER, Valor: "if", Linha: 1
Tipo: IDENTIFIER, Valor: "x", Linha: 1
Tipo: ASSIGN, Valor: "=", Linha: 1
Tipo: NUMBER, Valor: "10", Linha: 1
Tipo: LBRACE, Valor: "{", Linha: 1
Tipo: IDENTIFIER, Valor: "x", Linha: 2
Tipo: ASSIGN, Valor: "=", Linha: 2
Tipo: IDENTIFIER, Valor: "x", Linha: 2
Tipo: PLUS, Valor: "+", Linha: 2
Tipo: NUMBER, Valor: "1", Linha: 2
Tipo: SEMICOLON, Valor: ";", Linha: 2
Tipo: RBRACE, Valor: "}", Linha: 2
```

### Tabela de Símbolos
```
Tabela de Símbolos:
[ 'if', 'x', '=', '10', '{', '1', '+', ';', '}', 'y' ]
```


