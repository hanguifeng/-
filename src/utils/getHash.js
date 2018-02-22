import JsSha from 'jssha';

export const hashPassword = password => {
  const sha = new JsSha('SHA3-224', 'TEXT');
  sha.update(password);
  return sha.getHash('HEX');
};
