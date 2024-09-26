import CasoDeUso from "../shared/CasoDeUso";
import IColecaoUsuario from "./UsuarioRepository";
import ProvedorCriptografia from "./ProvedorCriptoInterface";
import ProvedorToken from "./ProvedorTokenInterface";
import IUsuario from "./UsuarioInterface";

export type Entrada = {
  email: string;
  senha: string;
};

export type Saida = {
  usuario: IUsuario;
  token: string;
};

export default class LoginUsuarioUseCase implements CasoDeUso<Entrada, Saida> {
  constructor(
    private colecao: IColecaoUsuario,
    private provedorCripto: ProvedorCriptografia,
    private provedorToken: ProvedorToken
  ) {}

  async executar(dto: Entrada): Promise<Saida> {
    const usuarioExistente = await this.colecao.buscarPorEmail(dto.email);

    if (!usuarioExistente) throw new Error("Login inválido.");

    const mesmaSenha = this.provedorCripto.comparar(
      dto.senha,
      usuarioExistente.senha!
    );

    if (!mesmaSenha) throw new Error("Login inválido.");

    const token = this.provedorToken.gerar({
      id: usuarioExistente.id,
      nome: usuarioExistente.nome,
      email: usuarioExistente.email,
    });

    return { usuario: { ...usuarioExistente, senha: undefined }, token };
  }
}
