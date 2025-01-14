import { User } from '@prisma/client';
import { ICreateUsersDTO } from '../dtos/ICreate-users.dto';

interface IUsersRepository {
  create({ name, email, password }: ICreateUsersDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}

export { IUsersRepository };
