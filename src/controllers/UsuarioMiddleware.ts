import { NextFunction, Request, Response } from "express";
import ColecaoUsuarioDB from "../adapters/db/knex/ColecaoUsuarioDB";
import ProvedorToken from "../core/usuario/ProvedorTokenInterface";
import IUsuario from "../core/usuario/UsuarioInterface";

export default function UsuarioMiddleware(
  colecao: ColecaoUsuarioDB,
  provedorToken: ProvedorToken
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const acessoNegado = () => {
      res.status(403).send("Token inválido");
    };

    try {
      const token = req.headers.authorization?.replace("Bearer ", "");
      if (!token) {
        acessoNegado();
        return;
      }

      const dataToken = provedorToken.validar(token) as IUsuario;
      const user = await colecao.buscarPorEmail(dataToken.email);

      if (!user) {
        acessoNegado();
        return;
      }

      (req as any).usuario = user;

      next();
    } catch (error) {
      acessoNegado();
    }
  };
}
