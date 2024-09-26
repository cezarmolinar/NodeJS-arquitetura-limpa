import CasoDeUso from "../shared/CasoDeUso";
import IUsuario from "../usuario/UsuarioInterface";
import IColecaoTransacao from "./TransacaoRepository";
import SaldoUseCase, { SaldoDTO } from "./SaldoUseCase";
import ITransacao from "./TransacaoInterface";

export type Entrada = {
  usuario: IUsuario;
  ano: number;
  mes: number;
};

export type Saida = {
  transacoes: ITransacao[];
  saldo: SaldoDTO;
};

export default class ExtratoMensalUseCase implements CasoDeUso<Entrada, Saida> {
  constructor(private colecao: IColecaoTransacao) {}

  async executar(dto: Entrada): Promise<Saida> {
    const transacoes = await this.colecao.buscarPorMes(
      dto.usuario.id,
      dto.ano,
      dto.mes
    );

    return { transacoes, saldo: new SaldoUseCase(transacoes).dto };
  }
}
