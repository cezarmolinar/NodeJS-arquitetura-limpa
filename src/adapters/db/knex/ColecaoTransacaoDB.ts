import IColecaoTransacao from "../../../core/transacao/TransacaoRepository";
import Transacao from "../../../core/transacao/TransacaoInterface";
import ITransacao from "../../../core/transacao/TransacaoInterface";
import conexao from "./conexao";

export default class ColecaoTransacaoDB implements IColecaoTransacao {
  inserir(transacao: ITransacao): Promise<void> {
    return conexao.table("transacoes").insert(this._praTabela(transacao));
  }

  atualizar(transacao: ITransacao): Promise<void> {
    return conexao
      .table("transacoes")
      .where("id", transacao.id)
      .update(this._praTabela(transacao));
  }

  async buscarPorId(user: string, id: string): Promise<ITransacao | null> {
    const transacoes = await conexao
      .table("transacoes")
      .where({ id: id, usuario_id: user });

    if (transacoes.length === 0) return null;

    return this._daTabela(transacoes[0]);
  }

  async buscarPorMes(
    user: string,
    ano: number,
    mes: number
  ): Promise<ITransacao[]> {
    const transacoes = await conexao
      .table("transacoes")
      .where("usuario_id", user)
      .whereRaw("extract(year from vencimento) = ?", ano)
      .whereRaw("extract(month from vencimento) = ?", mes);
    return transacoes.map(this._daTabela);
  }

  private _praTabela(transacao: Transacao): any {
    return {
      id: transacao.id,
      descricao: transacao.descricao,
      valor: transacao.valor,
      vencimento: transacao.vencimento.toISOString(),
      usuario_id: transacao.idUsuario,
    };
  }

  private _daTabela(transacao: any): Transacao {
    return {
      ...transacao,
      idUsuario: transacao.usuario_id,
    };
  }
}
