# NestJS App - Guia de Uso e Configuração

Este projeto foi desenvolvido utilizando a arquitetura Hexagonal/Clean Architecture, priorizando facilidade de manutenção e independência de detalhes técnicos como frameworks e banco de dados. Optei por esta abordagem para garantir a escalabilidade e a modularidade da aplicação.

Agradeço pela oportunidade e pedimos desculpas caso algo esteja incompleto devido ao tempo limitado, causado por compromissos prévios.

---

## Pré-requisitos

Certifique-se de ter os seguintes itens instalados:

- [Node.js](https://nodejs.org) (recomendado: última versão LTS)
- [pnpm](https://pnpm.io/installation) (para gerenciamento de pacotes)
- [Docker](https://www.docker.com) e [Docker Compose](https://docs.docker.com/compose/) (para executar com containers, se necessário)

---

## Rodando o Projeto

### Modo Desenvolvimento

Para iniciar o servidor no modo de desenvolvimento, utilize o comando:

```bash
pnpm start:dev
```

O servidor estará disponível na porta configurada pela variável `API_PORT` (por padrão, 3000).

---

### Modo Build

Para executar a aplicação em modo de produção:

1. Compile a aplicação:

   ```bash
   pnpm build
   ```

2. Inicie o servidor:

   ```bash
   pnpm start:prod
   ```

O servidor estará disponível na porta configurada pela variável `API_PORT` (por padrão, 3000).

---

### Executando Testes Unitários

Os testes unitários podem ser executados com o comando:

```bash
pnpm test:unit
```

---

### Modo Docker Compose

Caso prefira utilizar Docker Compose:

1. Suba os containers:

   ```bash
   docker compose up -d
   ```

2. Acesse a aplicação em `http://localhost:{API_PORT}`.

Para parar os containers:

```bash
docker compose down
```

---

## Configuração de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```

DB_NAME=example
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=1234

API_PORT=3000
JWT_SECRET_KEY=12345
```

Para referência, consulte o arquivo `.env.example`.
