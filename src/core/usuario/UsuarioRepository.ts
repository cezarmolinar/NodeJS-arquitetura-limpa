import IUsuario from "./UsuarioInterface";

export default interface IColecaoUsuario {
  inserir(usuario: IUsuario): Promise<void>;
  buscarPorEmail(email: string): Promise<IUsuario | null>;
}
