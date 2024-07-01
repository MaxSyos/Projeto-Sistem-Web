import { container } from 'tsyringe';

// Usuários
import { UserRepository } from '../../modules/users/repositories/implementations/user.repository';
import { IUsersRepository } from '../../modules/users/repositories/IUser.repository';

// Cobrancas
import { ICobrancasRepository } from '../../modules/cobrancas/repositories/ICobranca.repository';
import { CobrancaRepository } from '../../modules/cobrancas/repositories/implementations/cobranca.repository';

// RefreshToken
import { IRefreshTokenRepository } from '../../modules/users/repositories/IRefreshToken.repository';
import { RefreshTokenRepository } from '../../modules/users/repositories/implementations/refreshToken.repository';

container.registerSingleton<IUsersRepository>('UserRepository', UserRepository);

container.registerSingleton<ICobrancasRepository>(
  'CobrancaRepository',
  CobrancaRepository,
);

container.registerSingleton<IRefreshTokenRepository>(
  'RefreshTokenRepository',
  RefreshTokenRepository,
);
