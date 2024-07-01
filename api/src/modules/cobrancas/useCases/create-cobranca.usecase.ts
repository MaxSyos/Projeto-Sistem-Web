import { inject, injectable } from 'tsyringe';
import { ICobrancasRepository } from '../repositories/ICobranca.repository';
import { ICreateCobrancasDTO } from '../dtos/ICreate-cobrancas.dto';

@injectable()
class CreateCobrancaUseCase {
  constructor(
    @inject('CobrancaRepository')
    private cobrancasRepository: ICobrancasRepository,
  ) {}

  async execute(cobrancas: ICreateCobrancasDTO[]) {
    const result = await this.cobrancasRepository.createMany(cobrancas);
    return result;
  }
}

export { CreateCobrancaUseCase };
