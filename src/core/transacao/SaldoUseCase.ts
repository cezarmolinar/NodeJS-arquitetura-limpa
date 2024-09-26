import ITransacao from "./TransacaoInterface";

export interface SaldoDTO {
  saldo: number;
  receitas: number;
  despesas: number;
}

export default class SaldoUseCase {
  constructor(private transacoes: ITransacao[]) {}

  private _totalizar(total: number, transacao: ITransacao) {
    return total + +transacao.valor;
  }

  get saldoFinal(): number {
    return this.transacoes.reduce(this._totalizar, 0);
  }

  get receitas(): number {
    return this.transacoes
      .filter((t) => t.valor > 0)
      .reduce(this._totalizar, 0);
  }

  get despesas(): number {
    return this.transacoes
      .filter((t) => t.valor < 0)
      .reduce(this._totalizar, 0);
  }

  get dto(): SaldoDTO {
    return {
      saldo: this.saldoFinal,
      receitas: this.receitas,
      despesas: this.despesas,
    };
  }
}
