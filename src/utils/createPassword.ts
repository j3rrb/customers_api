import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export default async function createPassword(rawText: string, rounds = 10) {
  try {
    const salt = await bcrypt.genSalt(rounds);
    const hash = await bcrypt.hash(rawText, salt);

    return {
      salt,
      hash,
    };
  } catch (error) {
    throw new InternalServerErrorException(
      'Failed to create password! -> ' + error,
    );
  }
}
