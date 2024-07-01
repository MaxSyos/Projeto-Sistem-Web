import { compare } from 'bcrypt';
import 'dotenv';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../errors/AppError';
import { IUsersRepository } from '../repositories/IUser.repository';
import { GenerateRefreshToken } from '../../../provider/generate-refreshToken';
import { GenerateTokenProvier } from '../../../provider/generate-token.provider';
import { prismaClient } from '../../../database/prismaClient';

interface IUserResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,
  ) { }
  async execute(email: string, password: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password is incorrect!', 404);
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new AppError('Email or password is incorrect!', 404);
    }

    const generateTokenProvider = new GenerateTokenProvier();
    const token = await generateTokenProvider.execute(user.id);

    // await prismaClient.refreshToken.deleteMany({
    //   where: {
    //     userId: user.id,
    //   },
    // });

    // const generateRefreshToken = new GenerateRefreshToken();
    // const refreshToken = await generateRefreshToken.execute(user.id);

    const TokenResponse: IUserResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
    console.log('token_response', TokenResponse);
    return { TokenResponse };
  }
}

export { AuthenticateUserUseCase };
