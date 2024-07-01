# ANALISADOR DIGITAL - Sistema de Gestão Empresarial

## Sobre

O Projeto tem o objetivo de gerenciar fluxos internos.

## Arquitetura

O desenho da arquitetura proposta pode ser visualizado [aqui.]

## Backend

Na pasta api está o backend do projeto. Este utiliza Node.js, Express, TypeORM, para criação dos endpoints, mapeamento objeto relacional.

### Configuração do backend

```
cd api
cp .env.example .env
```

Verificar conteúdo do .env criado para o ambiente de desenvolvimento

## Frontend

Na pasta web está o frontend do projeto. Este utiliza React.js e Next.js (SSR).

### Configuração do frontend

```
cd web
cp .env.example .env
```

Verificar conteúdo do .env criado para o ambiente de desenvolvimento

## Ambiente de Desenvolvimento

Para o desenvolvimento local, foi criado um arquivo docker-compose para iniciar todos os serviços necessários para o projeto.

### Requisitos

Será necessário ter instalado o docker e docker compose na máquina.

[Docker](https://docs.docker.com/get-docker/)

[Docker Compose](https://docs.docker.com/compose/install/standalone/)

### Build da aplicação

Na pasta raiz do projeto, executar:
docker-compose up -d --build (\*\*realiza o build dos containers)

Iniciar Prisma no container:
npx prisma generate (**Inicialização do prisma)
npx prisma migrate dev (**roda as migrations)
npx prisma db seed (executar as seeds do projeto)

### Backup banco de dados aplicação (container postgres)

Realizar Backup:
docker exec -t [ID_CONTAINER] pg_dumpall -c -U postgres > [BACKUP_NOME].sql

Realizar Restore:
cat dump.sql | docker exec -i [BACKUP_NOME] psql -U postgres
