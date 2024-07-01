import {
  ICreateCobrancasDTO,
  IResultCreateManyCobrancasDTO,
} from '../dtos/ICreate-cobrancas.dto';
import {
  IResultSearchCobrancasDTO,
  ISearchCobrancasDTO,
} from '../dtos/ISearch-cobrancas.dto';

interface ICobrancasRepository {
  createMany(
    cobrancas: ICreateCobrancasDTO[],
  ): Promise<IResultCreateManyCobrancasDTO>;
  findMany(filtros: ISearchCobrancasDTO): Promise<IResultSearchCobrancasDTO[]>;
}

export { ICobrancasRepository };
