import ITransacao from "./TransacaoInterface";

export default interface IColecaoTransacao {
  inserir(transacao: ITransacao): Promise<void>;
  atualizar(transacao: ITransacao): Promise<void>;

  buscarPorId(user: string, id: string): Promise<ITransacao | null>;
  buscarPorMes(user: string, ano: number, mes: number): Promise<ITransacao[]>;
}
