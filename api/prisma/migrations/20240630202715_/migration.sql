-- CreateTable
CREATE TABLE "perfil" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "dataCriacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" TIMESTAMP(3),

    CONSTRAINT "perfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "refreshToken" TEXT,
    "perfilId" TEXT,
    "dataCriacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" TIMESTAMP(3),

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfil_modulo" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "dataCriacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" TIMESTAMP(3),

    CONSTRAINT "perfil_modulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfil_funcionalidade" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "moduloId" TEXT NOT NULL,
    "dataCriacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" TIMESTAMP(3),

    CONSTRAINT "perfil_funcionalidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfil_permissao" (
    "id" TEXT NOT NULL,
    "perfilId" TEXT,
    "perfilFuncionalidadeId" TEXT,
    "inserir" BOOLEAN NOT NULL DEFAULT false,
    "consultar" BOOLEAN NOT NULL DEFAULT false,
    "alterar" BOOLEAN NOT NULL DEFAULT false,
    "excluir" BOOLEAN NOT NULL DEFAULT false,
    "dataCriacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dataAtualizacao" TIMESTAMP(3),

    CONSTRAINT "perfil_permissao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_perfilId_fkey" FOREIGN KEY ("perfilId") REFERENCES "perfil"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfil_funcionalidade" ADD CONSTRAINT "perfil_funcionalidade_moduloId_fkey" FOREIGN KEY ("moduloId") REFERENCES "perfil_modulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfil_permissao" ADD CONSTRAINT "perfil_permissao_perfilId_fkey" FOREIGN KEY ("perfilId") REFERENCES "perfil"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfil_permissao" ADD CONSTRAINT "perfil_permissao_perfilFuncionalidadeId_fkey" FOREIGN KEY ("perfilFuncionalidadeId") REFERENCES "perfil_funcionalidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
