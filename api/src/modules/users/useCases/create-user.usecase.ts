import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../errors/AppError';
import { ICreateUsersDTO } from '../dtos/ICreate-users.dto';
import { IUsersRepository } from '../repositories/IUser.repository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password }: ICreateUsersDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists!');
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return user;
  }
}

export { CreateUserUseCase };
