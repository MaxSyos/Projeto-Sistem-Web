import 'dotenv';
import { sign } from 'jsonwebtoken';

class GenerateTokenProvier {
  async execute(userId: string) {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

    const token = sign({}, ACCESS_TOKEN_SECRET, {
      subject: userId,
      expiresIn: '2h',
    });
    return token;
  }
}

export { GenerateTokenProvier };
