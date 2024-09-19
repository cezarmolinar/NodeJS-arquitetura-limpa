import Id from "../shared/Id";
import ColecaoUsuario from "./ColecaoUsuario";
import Usuario from "./Usuario";

export default class RegistrarUsuario {
  constructor(private bancoInjetado: ColecaoUsuario) {}

  executar(nome: string, email: string, senha: string) {
    const senhaCripto = senha.split("").reverse().join("");

    const usuario: Usuario = {
      id: Id.gerar(),
      nome,
      email,
      senha: senhaCripto,
    };

    this.bancoInjetado.inserir(usuario);

    return usuario;
  }
}
