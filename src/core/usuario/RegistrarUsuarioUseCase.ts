import CasoDeUso from "../shared/CasoDeUso";
import Id from "../shared/Id";
import IColecaoUsuario from "./UsuarioRepository";
import IProvedorCriptografia from "./ProvedorCriptoInterface";
import IUsuario from "./UsuarioInterface";

export type Entrada = {
  nome: string;
  email: string;
  senha: string;
};

export default class RegistrarUsuarioUseCase
  implements CasoDeUso<Entrada, IUsuario>
{
  constructor(
    private colecao: IColecaoUsuario,
    private provedorCripto: IProvedorCriptografia
  ) {}

  async executar(dto: Entrada): Promise<IUsuario> {
    const senhaCripto = this.provedorCripto.criptografar(dto.senha);

    const userExistente = await this.colecao.buscarPorEmail(dto.email);

    if (userExistente) throw new Error("Usuário já existe.");

    const usuario: IUsuario = {
      id: Id.gerar(),
      nome: dto.nome,
      email: dto.email,
      senha: senhaCripto,
    };

    this.colecao.inserir(usuario);

    return usuario;
  }
}
