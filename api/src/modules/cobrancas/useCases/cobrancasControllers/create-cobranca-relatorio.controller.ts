import { Request, Response } from 'express';
import {
  ResponserSucesso,
  ResponserErro,
} from '../../../../utils/response.util';
import { container } from 'tsyringe';

import path from 'path';
import ejs from 'ejs';
import { SearchCobrancaUseCase } from '../search-cobranca.usecase';
import { CreateCobrancaRelatorioUseCase } from '../create-cobranca-relatorio.usecase';

class CreateCobrancaRelatorioController {
  public handle = async (request: Request, response: Response) => {
    const { dataInicial, dataFinal } = request.body;

    if (!dataInicial || !dataFinal) {
      response
        .status(400)
        .send(
          ResponserErro.sendErro(
            400,
            'Os parâmetros "dataInicial" e "dataFinal" são obrigatórios!',
          ),
        );
    }

    const searchCobrancaUseCase = container.resolve(SearchCobrancaUseCase);
    const resultSearchData = await searchCobrancaUseCase.execute({
      dataInicial,
      dataFinal,
    });

    // leitura do ejs
    const filePath = path.join(__dirname, '../../', './templates/printPDF.ejs');

    try {
      const createCobrancaRelatorioUseCase = container.resolve(
        CreateCobrancaRelatorioUseCase,
      );
      const createdReport = await createCobrancaRelatorioUseCase.execute(
        filePath,
        resultSearchData,
      );

      return response.status(201).send(createdReport);
    } catch (err) {
      return response.send('Erro na leitura do arquivo');
    }
  };
}

export { CreateCobrancaRelatorioController };
