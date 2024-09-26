import IUsuario from "../../src/core/usuario/UsuarioInterface";
import IColecaoUsuario from "../../src/core/usuario/UsuarioRepository";

export default class UsuarioEmMemoria implements IColecaoUsuario {
  private static itens: IUsuario[] = [];

  async buscarPorEmail(email: string): Promise<IUsuario | null> {
    const usuario = UsuarioEmMemoria.itens.find((user) => user.email === email);

    return usuario ?? null;
  }

  async inserir(item: IUsuario): Promise<void> {
    UsuarioEmMemoria.itens.push(item);
  }
}
