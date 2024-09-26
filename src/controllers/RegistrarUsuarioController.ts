import RegistrarUsuarioUseCase from "../core/usuario/RegistrarUsuarioUseCase";
import { Express } from "express";

export default class RegistrarUsuarioController {
  constructor(
    private servidor: Express,
    private registrarUsuario: RegistrarUsuarioUseCase
  ) {
    servidor.post("/registrar", async (req, res) => {
      try {
        await registrarUsuario.executar({
          nome: req.body.nome,
          email: req.body.email,
          senha: req.body.senha,
        });

        res.status(201).send();
      } catch (error: any) {
        res.status(400).send(error.message);
      }
    });
  }
}
