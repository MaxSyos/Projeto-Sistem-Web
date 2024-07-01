import { Usuario } from '@prisma/client';
import { prismaClient } from '../../../../database/prismaClient';
import { AppError } from '../../../../errors/AppError';
import { ICreateUsersDTO } from '../../dtos/ICreate-users.dto';
import { IUsersRepository } from '../IUser.repository';

class UserRepository implements IUsersRepository {
  async create({ nome, email, password }: ICreateUsersDTO): Promise<Usuario> {
    const user = await prismaClient.usuario.create({
      data: {
        nome,
        email,
        password,
      },
    });
    return user;
  }

  async findByEmail(email: string): Promise<Usuario> {
    const user = await prismaClient.usuario.findFirst({
      where: {
        email,
      },
    });

    return user as Usuario;
  }

  async findById(id: string): Promise<Usuario> {
    const user = await prismaClient.usuario.findUnique({
      where: {
        id,
      },
    });

    return user as Usuario;
  }
}

export { UserRepository };
