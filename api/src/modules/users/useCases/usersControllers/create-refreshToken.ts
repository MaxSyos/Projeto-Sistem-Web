import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from '../create-user.usecase';
import { CreateRefreshTokenUseCase } from '../create-refreshToken.usecase';

export class CreateRefreshTokenController {
  async handle(request: Request, response: Response) {
    const { refreshToken } = request.body;

    const createRefreshTokenUseCase = container.resolve(
      CreateRefreshTokenUseCase,
    );
    const token = await createRefreshTokenUseCase.execute(refreshToken);

    return response.status(201).json(token);
  }
}
