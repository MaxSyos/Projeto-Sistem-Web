import { Prisma, prismaClient } from '../../../../database/prismaClient';
import { convertDateToTimestamp } from '../../../../utils/convert-data-format.util';
import {
  ICreateCobrancasDTO,
  IResultCreateManyCobrancasDTO,
} from '../../dtos/ICreate-cobrancas.dto';
import {
  ISearchCobrancasDTO,
  IResultSearchCobrancasDTO,
} from '../../dtos/ISearch-cobrancas.dto';
import { ICobrancasRepository } from '../ICobranca.repository';

class CobrancaRepository implements ICobrancasRepository {
  async createMany(
    cobrancas: ICreateCobrancasDTO[],
  ): Promise<IResultCreateManyCobrancasDTO> {
    const result = await prismaClient.cobranca.createMany({
      data: cobrancas,
    });
    return result;
  }

  async findMany(
    filtros: ISearchCobrancasDTO,
  ): Promise<IResultSearchCobrancasDTO[]> {
    const searchResult = await prismaClient.cobranca.findMany({
      where: {
        AND: [
          {
            dataCobranca: {
              gte: await convertDateToTimestamp(filtros.dataInicial), // "gte" means "greater than or equal to"
            },
          },
          {
            dataCobranca: {
              lte: await convertDateToTimestamp(filtros.dataFinal), // "lte" means "less than or equal to"
            },
          },
        ],
      },
    });

    /*
      Necessário devido ao erro de tipagem Prisma x Typescript:
      "Type 'number' is not assignable to type 'Decimal'"
    */
    const searchFormatted = [];
    searchResult.map(item => {
      searchFormatted.push({
        ...item,
        valor: new Prisma.Decimal(item.valor),
      });
    });

    return searchFormatted;
  }
}

export { CobrancaRepository };
