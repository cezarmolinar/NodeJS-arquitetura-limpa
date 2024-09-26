import { Express, Request, Response } from "express";
import SalvarTransacaoUseCase from "../core/transacao/SalvarTransacaoUseCase";

export default class SalvarTransacaoController {
  constructor(
    private servidor: Express,
    private casoDeUso: SalvarTransacaoUseCase,
    ...middleware: any[]
  ) {
    const transaction = async (req: Request, res: Response) => {
      try {
        const transacao = {
          descricao: req.body.descricao,
          valor: +req.body.valor,
          vencimento: new Date(req.body.vencimento),
          idUsuario: req.body.idUsuario,
        };

        await casoDeUso.executar({
          transacao: transacao,
          id: req.params.id,
          usuario: (req as any).usuario,
        });

        res.status(200).send();
      } catch (error) {
        res.status(400).send(error.message);
      }
    };

    servidor.post("/transacao", middleware, transaction);
    servidor.post("/transacao/:id", middleware, transaction);
  }
}
