import { inject, injectable } from 'tsyringe';
import { ICobrancasRepository } from '../repositories/ICobranca.repository';
import {
  IResultSearchCobrancasDTO,
  ISearchCobrancasDTO,
} from '../dtos/ISearch-cobrancas.dto';
import ejs from 'ejs';
import { response } from 'express';
import path from 'path';
import { AppError } from '../../../errors/AppError';

@injectable()
class CreateCobrancaRelatorioUseCase {
  constructor(
    @inject('CobrancaRepository')
    private cobrancasRepository: ICobrancasRepository,
  ) {}

  async execute(
    caminhoArquivo: string,
    dados: IResultSearchCobrancasDTO[],
  ): Promise<any> {
    let createdReport: any;
    try {
      await ejs.renderFile(caminhoArquivo, { dados }, (err, html) => {
        if (err) {
          throw new AppError('Erro no Ejs ao processar relatório!', 404);
        }

        if (html) {
          createdReport = html;
        }
      });
      return createdReport;
    } catch (err) {
      throw new AppError('Erro generico ao processar relatório!', 404);
    }
  }
}

export { CreateCobrancaRelatorioUseCase };
