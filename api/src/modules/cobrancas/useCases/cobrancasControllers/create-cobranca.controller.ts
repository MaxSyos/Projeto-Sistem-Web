import { Request, Response, response } from 'express';
import { container } from 'tsyringe';
import CsvUtils from '../../../../utils/csv.util';
import { CreateCobrancaUseCase } from '../create-cobranca.usecase';
import {
  ResponserSucesso,
  ResponserErro,
} from '../../../../utils/response.util';

class CreateCobrancaController {
  public handle = async (request: Request, response: Response) => {
    const arquivoNaoProcessado = request.files[0];
    const arrayCobrancas = await CsvUtils(arquivoNaoProcessado);

    const createCobrancaUseCase = container.resolve(CreateCobrancaUseCase);
    const resultPersistData = await createCobrancaUseCase.execute(
      arrayCobrancas,
    );

    if (resultPersistData.count > 0) {
      response.status(201).send(ResponserSucesso.send(resultPersistData.count));
    } else {
      response.send(ResponserErro.sendErro(400, 'Invalid data!'));
    }
  };
}

export default CreateCobrancaController;
