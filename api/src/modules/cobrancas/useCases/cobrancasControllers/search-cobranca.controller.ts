import { Request, Response } from 'express';
import {
  ResponserSucesso,
  ResponserErro,
} from '../../../../utils/response.util';
import { container } from 'tsyringe';
import { SearchCobrancaUseCase } from '../search-cobranca.usecase';

class SearchCobrancaController {
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

    if (resultSearchData.length > 0) {
      response.status(200).send(ResponserSucesso.send(resultSearchData));
    } else {
      response
        .status(404)
        .send(
          ResponserErro.sendErro(
            404,
            'Nenhum registro encontrado com os critérios de busca utilizado!',
          ),
        );
    }
    return;
  };
}

export default SearchCobrancaController;
