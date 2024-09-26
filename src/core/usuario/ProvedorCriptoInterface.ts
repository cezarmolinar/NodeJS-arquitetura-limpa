export default interface IProvedorCriptografia {
  criptografar(senha: string): string;
  comparar(senha: string, senhaCriptografada: string): boolean;
}
