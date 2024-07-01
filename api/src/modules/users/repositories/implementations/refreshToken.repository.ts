import { RefreshToken } from '@prisma/client';
import { prismaClient } from '../../../../database/prismaClient';
import { IRefreshTokenRepository } from '../IRefreshToken.repository';
import { ICreateRefreshTokenDTO } from '../../dtos/ICreate-RefreshToken.dto';

class RefreshTokenRepository implements IRefreshTokenRepository {
  async create({
    expiresIn,
    userId,
  }: ICreateRefreshTokenDTO): Promise<RefreshToken> {
    const refreshToken = await prismaClient.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });
    return refreshToken;
  }

  async findByUserId(UserId: string): Promise<RefreshToken> {
    const refreshToken = await prismaClient.refreshToken.findUnique({
      where: {
        userId: UserId,
      },
    });

    return refreshToken as RefreshToken;
  }

  async findById(id: string): Promise<RefreshToken> {
    const refreshToken = await prismaClient.refreshToken.findFirst({
      where: {
        id,
      },
    });

    return refreshToken as RefreshToken;
  }

  async deleteById(userId: string): Promise<RefreshToken> {
    const refreshToken = await prismaClient.refreshToken.deleteMany({
      where: {
        userId,
      },
    });

    return refreshToken as unknown as RefreshToken;
  }
}

export { RefreshTokenRepository };
