import argon2, { argon2id } from 'argon2';


async function hashPassword(password:string):Promise<string> {
  const hash = await argon2.hash(password, {type:argon2id});
  return hash;
}

async function compareHash(passwordHash:string | any, passwordCredential:string):Promise<boolean> {
  const isMath = await argon2.verify(passwordHash, passwordCredential);
  return isMath;
}

export { hashPassword, compareHash }
