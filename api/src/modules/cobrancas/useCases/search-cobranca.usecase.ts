import { inject, injectable } from 'tsyringe';
import { ICobrancasRepository } from '../repositories/ICobranca.repository';
import { ISearchCobrancasDTO } from '../dtos/ISearch-cobrancas.dto';
import { convertTimestampToDate } from '../../../utils/convert-data-format.util';
import test from 'node:test';

@injectable()
class SearchCobrancaUseCase {
  constructor(
    @inject('CobrancaRepository')
    private cobrancasRepository: ICobrancasRepository,
  ) {}

  async execute(filtros: ISearchCobrancasDTO) {
    const search = await this.cobrancasRepository.findMany(filtros);

    const newSearch = await Promise.all(
      search.map(async item => ({
        ...item,
        dataCobranca: await convertTimestampToDate(item.dataCobranca),
      })),
    );

    return newSearch;
  }
}

export { SearchCobrancaUseCase };
