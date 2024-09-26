import { Express } from "express";
import LoginUsuarioUseCase from "../core/usuario/LoginUsuarioUseCase";

export default class LoginUsuarioController {
  constructor(
    private servidor: Express,
    private casoDeUso: LoginUsuarioUseCase
  ) {
    servidor.post("/login", async (req, res) => {
      try {
        const resposta = await casoDeUso.executar({
          email: req.body.email,
          senha: req.body.senha,
        });

        res.status(200).json(resposta);
      } catch (error: any) {
        res.status(403).send(error.message);
      }
    });
  }
}
