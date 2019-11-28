import { sha256 } from 'async-sha256';

import { passwordHashingPostfix } from './constants';

export async function encryptPassword(password: string): Promise<string> {
  return await sha256(password + passwordHashingPostfix);
}
