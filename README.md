# Teste de Software - API REST utilizando NodeJS

## requisitos

### 01 . Gerenciar mensagens do usuário

#### Requesito Funcional

- deve permitir registrar, buscar, alterar mensagens publicadas pelo usuario

##### Requisito Técnico

- Modelo Mensagem:

| campo    | tipo           | obrigatório | descrição                 |
| -------- | -------------- | ----------- | ------------------------- |
| id       | UUID           | PK          | identificador da mensagem |
| usuario  | string(8, 20)  | sim         | nome do usuário           |
| conteudo | string(1, 150) | sim         | conteúdo da mensagem      |
| gostei   | integer        | não         | contador de gostei        |

## ramos/branchs do projeto

- **aula_02**: estrutura inicial do projeto e testes unitários
- **aula_03**: testes integrados na camada do repositório
- **aula_04**: testes unitários e integrados na camada de apresentação
- **aula_05**: testes de sistema e comportamento
- **aula_06**: aplicando integração contínua e boas práticas
