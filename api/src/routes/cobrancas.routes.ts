import { Router } from 'express';
import multer from 'multer';
import CreateCobrancaController from '../modules/cobrancas/useCases/cobrancasControllers/create-cobranca.controller';
import SearchCobrancaController from '../modules/cobrancas/useCases/cobrancasControllers/search-cobranca.controller';
import { CreateCobrancaRelatorioController } from '../modules/cobrancas/useCases/cobrancasControllers/create-cobranca-relatorio.controller';
import { ensureAuthenticated } from '../shared/middleware/ensureAuthenticated';

const cobrancasRoutes = Router();
const createCobrancas = new CreateCobrancaController();
const searchCobrancas = new SearchCobrancaController();
const createCobrancasRelatorio = new CreateCobrancaRelatorioController();

cobrancasRoutes.post(
  '/',
  /* ensureAuthenticated,*/
  multer().any(),
  createCobrancas.handle,
);

cobrancasRoutes.post(
  '/listagem-cobrancas',
  /* ensureAuthenticated,*/
  searchCobrancas.handle,
);

cobrancasRoutes.post(
  '/relatorio-cobrancas-a-debitar',
  ensureAuthenticated,
  createCobrancasRelatorio.handle,
);

export { cobrancasRoutes };
