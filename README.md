# cav-schedule-api

[![Actions Status](https://github.com/pgcalixto/cav-schedule-api/workflows/Integration/badge.svg)](https://github.com/pgcalixto/cav-schedule-api/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=pgcalixto_cav-schedule-api&metric=alert_status)](https://sonarcloud.io/dashboard?id=pgcalixto_cav-schedule-api)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=pgcalixto_cav-schedule-api&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=pgcalixto_cav-schedule-api)

CAV Schedule API: API para agendamento de visitas e gerenciamento de centros de
atendimento.

[Documentação da API](https://pgcalixto.github.io/cav-schedule-api/)

## Requerimentos

- [Node](https://nodejs.org/) 12+
- [MongoDB](https://www.mongodb.com/) 4.4 _(opcional)_
- [Docker](https://www.docker.com/) 19+ _(opcional)_

## Guia rápido

Para rodar a versão conteinerizada da aplicação, populando o banco com dados com
valores iniciais, basta executar:

```bash
docker-compose up
docker-compose down
npm run test:integration:docker
```

Isso abre as portas 5000 para o servidor e 27017 para o banco de dados.

Todos os _endpoints_ (exceto `/login` e `/logout`) necessitam de um token válido
passando no header `x-access-token`. Para obter o token, deve-se acessar a
`/login` passando email e senha. Nesse ambiente conteinerizado para
desenvolvimento, já existe um usuário e senha pré-configurados para isso.

```
{ "email": "fake@test.com", "password": "fakepasswd123" }
```

Na documentação estão listados quais endpoints existem e como realizar as
operações desejadas:

- https://pgcalixto.github.io/cav-schedule-api/

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

```bash
npm run initDb
```

(Recomendado) O projeto já possui uma versão conteinerizada pronta para uso, com
o arquivo `.env.dev` carregado com valores iniciais. Essa versão persiste o
banco no diretório `data/db/`. Para usar essa solução, deve-se executar
`docker-compose up`:

```bash
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

Existem testes unitários de 2 serviços, `carService` e `cavService`, que podem
ser executados com `npm test`.

### Testes de integração / Testes de API

Existem testes de API dos principais _endpoints_, que podem ser executados com
`npm run test:integration`, ou em sua versão conteinerizada (recomendado):
`npm run test:integration:docker`.

## TODO

- [x] Licença de código aberto
- [x] Validação de parâmetros da requisição HTTP (Joi)
- [x] Solução dockerizada em Docker Compose
- [x] Autenticação na API (jwt)
- [x] Configurar linter
- [x] Integração contínua (GitHub actions)
- [x] Documentação no README
- [x] Documentação da API (Swagger)
- [x] Testes unitários
- [ ] Testes unitários de mais serviços (user, schedule)
- [x] Testes de API (car, cav, schedule)
- [ ] Testes de API (auth, user)
- [ ] Reforçar testes de API existentes (forçar parâmetros inválidos, _corner
      cases_)
- [x] Gerar dados aleatórios para testes unitários (faker.js)
- [ ] Gerar dados aleatórios para testes de API (faker.js)
- [x] Configurar análise estática de código
- [ ] Estabelecer uma métrica mínima obrigatória de cobertura
- [ ] Salvar de forma segura a senha de usuário no banco (hash + salt?)
- [ ] Hospedar um servidor _mock_ para fácil visualização (Heroku? Swagger?)
- [x] Adicionar _badges_
