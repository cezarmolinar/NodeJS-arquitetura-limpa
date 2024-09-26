import ICasoDeUso from "../shared/CasoDeUso";
import Id from "../shared/Id";
import IUsuario from "../usuario/UsuarioInterface";
import IColecaoTransacao from "./TransacaoRepository";
import ITransacao from "./TransacaoInterface";

export type Entrada = {
  transacao: ITransacao;
  id: string;
  usuario: IUsuario;
};

export default class SalvarTransacaoUseCase
  implements ICasoDeUso<Entrada, void>
{
  constructor(private readonly colecao: IColecaoTransacao) {}

  async executar(dto: Entrada): Promise<void> {
    if (dto.transacao.idUsuario !== dto.usuario.id) {
      throw new Error("Usuário não autorizado");
    }

    const transacao = {
      ...dto.transacao,
      id: dto.id ?? Id.gerar(),
    };

    dto.id
      ? await this.colecao.atualizar(transacao)
      : await this.colecao.inserir(transacao);
  }
}
