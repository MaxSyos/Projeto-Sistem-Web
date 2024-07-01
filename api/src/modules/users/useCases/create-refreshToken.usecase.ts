import { inject, injectable } from 'tsyringe';
import { prismaClient } from '../../../database/prismaClient';
import { GenerateTokenProvier } from '../../../provider/generate-token.provider';
import { IRefreshTokenRepository } from '../repositories/IRefreshToken.repository';
import { ICreateRefreshTokenDTO } from '../dtos/ICreate-RefreshToken.dto';
import dayjs from 'dayjs';
import { GenerateRefreshToken } from '../../../provider/generate-refreshToken';

@injectable()
class CreateRefreshTokenUseCase {
  constructor(
    @inject('RefreshTokenRepository')
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async execute({ expiresIn, userId }: ICreateRefreshTokenDTO) {
    const refresToken = await this.refreshTokenRepository.findById(userId);

    if (!refresToken) {
      throw new Error('Refresh Token Invalid');
    }

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refresToken.expiresIn),
    );

    const generateTokenProvider = new GenerateTokenProvier();
    const token = await generateTokenProvider.execute(refresToken.userId);

    if (refreshTokenExpired) {
      await this.refreshTokenRepository.deleteById(refresToken.userId);

      const generateRefreshTokenProvider = new GenerateRefreshToken();
      const newRefreshToken = await generateRefreshTokenProvider.execute(
        refresToken.userId,
      );
      return { token, refresToken: newRefreshToken };
    }

    /*     const generateRefreshToken = await this.refreshTokenRepository.create({
      userId,
      expiresIn,
    }); */

    return { token };
  }
}

export { CreateRefreshTokenUseCase };
