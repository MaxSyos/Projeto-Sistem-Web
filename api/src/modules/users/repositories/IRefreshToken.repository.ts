import { RefreshToken } from '@prisma/client';
import { ICreateRefreshTokenDTO } from '../dtos/ICreate-RefreshToken.dto';

interface IRefreshTokenRepository {
  create({ userId, expiresIn }: ICreateRefreshTokenDTO): Promise<RefreshToken>;
  findByUserId(userId: string): Promise<RefreshToken>;
  findById(id: string): Promise<RefreshToken>;
  deleteById(id: string): Promise<RefreshToken>;
}

export { IRefreshTokenRepository };
