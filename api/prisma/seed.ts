import { hash } from 'bcrypt';
import { prismaClient } from '../src/database/prismaClient';
import { randomUUID } from 'node:crypto';

async function main() {
  const passwordHash = await hash('admin', 8);

  // const user = {
  //   name: 'admin',
  //   email: 'admin@example.com',
  //   password: passwordHash,
  //   idProfile: '123adfs',
  // };

  // await prismaClient.user.create({
  //   data: {
  //     name: user.name,
  //     email: user.email,
  //     password: user.password,
  //     idProfile: user.idProfile,
  //   },
  // });

  // Inserindo os módulos
  await prismaClient.perfilModulo.createMany({
    data: [
      {
        id: '761fe04c-c88e-4c95-b0cf-0e80c1dfcc7f',
        nome: 'Administrativo',
        descricao: 'Módulo Administrativo',
      },
      {
        id: '3a0a2e31-a78b-49bf-8100-604c9ef534bc',
        nome: 'Cadastros',
        descricao: 'Módulo de Cadastros',
      },
      {
        id: '80740112-821e-44a2-bf70-0551a28590a8',
        nome: 'Movimentações Caixa/Banco',
        descricao: 'Módulo de Movimentações',
      },
    ],
  });

  // Inserindo as funcionalidades
  await prismaClient.perfilFuncionalidade.createMany({
    data: [
      {
        id: '4310c179-6d7f-4975-b490-5646da798a8a',
        nome: 'Gestão de Usuário',
        descricao: 'Gestão de Usuário',
        moduloId: '761fe04c-c88e-4c95-b0cf-0e80c1dfcc7f',
      },
      {
        id: '833165f3-74ab-4944-bd98-6978de2c1568',
        nome: 'Gestão do Perfil de Acesso',
        descricao: 'Gestão do Perfil de Acesso',
        moduloId: '761fe04c-c88e-4c95-b0cf-0e80c1dfcc7f',
      },
      {
        id: '478e75a3-6b45-4c92-a87d-62b703f2cc1e',
        nome: 'Cadastro de Conta Caixa/Banco',
        descricao: 'Cadastro de Conta Caixa/Banco',
        moduloId: '3a0a2e31-a78b-49bf-8100-604c9ef534bc',
      },
      {
        id: '9c7228d6-3250-4ed0-9659-a91db06134ea',
        nome: 'Cadastro de Cliente',
        descricao: 'Cadastro de Cliente',
        moduloId: '3a0a2e31-a78b-49bf-8100-604c9ef534bc',
      },
      {
        id: 'bdf5ec9c-3eb3-46de-91c7-d4ab7bae79a6',
        nome: 'Cadastro de Fornecedor',
        descricao: 'Cadastro de Fornecedor',
        moduloId: '3a0a2e31-a78b-49bf-8100-604c9ef534bc',
      },
      {
        id: '32b05fb7-33c6-47e1-866a-b77089c18da9',
        nome: 'Cadastro de Tipo de Movimentação',
        descricao: 'Cadastro de Tipo de Movimentação',
        moduloId: '3a0a2e31-a78b-49bf-8100-604c9ef534bc',
      },
      {
        id: 'e5f71c53-6d62-4cce-9262-809b44933f2e',
        nome: 'Cadastro de Histórico Padrão',
        descricao: 'Cadastro de Histórico Padrão',
        moduloId: '3a0a2e31-a78b-49bf-8100-604c9ef534bc',
      },
    ],
  });

  // Inserindo os Perfis
  await prismaClient.perfil.createMany({
    data: [
      {
        id: 'b026acfe-67f1-42e4-890d-119fb96abe24',
        nome: 'Administrador',
        descricao: 'Administrador do Sistema',
        ativo: true,
      },
      {
        id: '6afaed05-3e12-4d20-be89-bd3fb1871438',
        nome: 'Gestor Bancos/Caixa',
        descricao: 'Gestor Bancos/Caixa',
        ativo: true,
      },
      {
        id: 'fe748073-2338-476c-85d7-529d8f4891fe',
        nome: 'Gestor Contas Pagar',
        descricao: 'Gestor Contas Pagar',
        ativo: true,
      },
      {
        id: '7d21d3f6-cee4-44d4-9727-26c4658166ad',
        nome: 'Gestor Contas Receber',
        descricao: 'Gestor Contas Receber',
        ativo: true,
      },
      {
        id: '14c6fc72-7c25-4b3f-a9ac-e8a564ff8882',
        nome: 'Somente Consulta',
        descricao: 'Somente Consulta',
        ativo: true,
      },
    ],
  });
}

main();
