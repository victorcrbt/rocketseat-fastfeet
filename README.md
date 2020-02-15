Projeto criado com o intuito de receber a certificação do bootcamp GoStack da [Rocketseat](https://github.com/rocketseat).

A aplicação possui algumas diferenças do proposto no desafio:

- A principal diferença é que tanto o backend, como frontend e mobile, serão desenvolvidos utilizando TypeScript. Isso principalmente porque estou estudando TypeScript no momento e quero colocar em pratica o que estou estudando.

- Provavelmente o backend irá possuir testes automatizados. Ainda incerto se o frontend irá possuir, talvez em algumas funcionalidades especificas.

## Instalação dos pacotes

A partir da pasta raiz, execute o comando `yarn install` ou `npm run install` (não executar somente `yarn`, pois o que citei é um script). A biblioteca **concurrently** será disparada e irá fazer a instalação de todos os pacotes do server, client e mobile automaticamente.

Se preferir, pode entrar em cada pasta manualmente e executar a instalação dos pacotes com o gerenciador de pacote que preferir.

> É recomendado utilizar o Yarn para fazer a instalação dos pacotes.

## Instruções de execução

O projeto pode ser executado em cada pasta individualmente, entrando nas mesmas e digitando os seguintes comandos:

**Server**
`yarn dev` ou `npm run dev`

**Client**
`yarn start` ou `npm run start`

**Mobile**
`yarn start` ou `npm run start`

Adicionalmente, se preferir, a partir da pasta raiz, execute o comando `yarn start` ou `npm run start`. A biblioteca **concurrently** será disparada e irá executar o server, o client e o mobile simultaneamente.
