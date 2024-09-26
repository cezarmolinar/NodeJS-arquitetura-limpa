import IColecaoUsuario from "../../../core/usuario/UsuarioRepository";
import IUsuario from "../../../core/usuario/UsuarioInterface";
import conexao from "./conexao";

export default class ColecaoUsuarioDB implements IColecaoUsuario {
  async buscarPorEmail(email: string): Promise<IUsuario | null> {
    const usuario = conexao.table("usuario").where("email", email).first();

    return usuario ?? null;
  }

  async inserir(usuario: IUsuario): Promise<void> {
    await conexao.table("usuario").insert(usuario);
  }
}
