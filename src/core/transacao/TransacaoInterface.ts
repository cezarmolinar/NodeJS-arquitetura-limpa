export default interface ITransacao {
  id?: string;
  descricao: string;
  valor: number;
  vencimento: Date;
  idUsuario: string;
}
