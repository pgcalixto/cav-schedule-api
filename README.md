# cav-schedule-api

CAV Schedule API: API para agendamento de visitas e gerenciamento de centros de
atendimento.

## Requerimentos

- [Node](https://nodejs.org/) 12+
- [MongoDB](https://www.mongodb.com/) 4.4
- [Docker](https://www.docker.com/) 19+ _(opcional)_

## Uso

Para execução da API, deve haver uma instância válida de MongoDB. As credenciais
devem estar em um arquivo `.env`. Para subir a API, basta executar:

```bash
npm run build
npm start
```

Para popular uma instância do banco com dados iniciais do diretório
`data/init/`, deve-se exportar a variável de ambiente `POPULATE_DB=true` e
executar:

```
npm run initDb
```

(Recomendado) O projeto já possui uma versão conteinerizada pronta para uso, com
o arquivo `.env.dev` carregado com valores iniciais. Essa versão persiste o
banco no diretório `data/db/`. Para usar essa solução, deve-se executar
`docker-compose up`:

```
# sobe as instâncias de Docker da aplicação
# --build opcional, caso deseje-se forçar o rebuild da imagem
docker-compose up --build

# realiza a limpeza de imagens, conexões e volumes
docker-compose down --volumes

# remove a persistência do banco
rm -rf ./data/db
```

## Autenticação

A API funciona com autenticação via JWT (JSON Web Tokens). Para realizar
chamadas para a API, deve-se realizar o login através do _endpoint_ `/login` e
reutilizar o token disponibilizado.

O login é feito com email e senha salvos no banco.

## Teste

### Testes unitários

[ A SER FEITO ]

### Testes de integração / Testes de API

Existem testes de API dos principais _endpoints_, que podem ser executados com
`npm run test:integration`, ou em sua versão conteinerizada (recomendado):
`npm run test:integration:docker`.

TODO:

- [x] Licença de código aberto
- [x] Validação de parâmetros da requisição HTTP (Joi)
- [x] Solução dockerizada em Docker Compose
- [x] Autenticação na API (jwt)
- [x] Configurar linter
- [x] Integração contínua (GitHub actions)
- [ ] Documentação no README
- [ ] Documentação da API (Swagger)
- [ ] Testes unitários
- [x] Testes de API (car, cav, schedule)
- [ ] Testes de API (auth, user)
- [ ] Reforçar testes de API existentes (forçar parâmetros inválidos, _corner
      cases_)
- [ ] Gerar dados aleatórios para testes de API (faker.js)
- [ ] Estabelecer uma métrica mínima obrigatória de cobertura
