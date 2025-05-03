import crypto from 'crypto';

export const md5Hash = (text: string) => {
  return crypto.createHash('md5').update(text).digest('hex');
}

export const calculateAge = (birthDate: Date) => {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  return age;
}
