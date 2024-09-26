import { Express, Request, Response } from "express";
import ExtratoMensalUseCase from "../core/transacao/ExtratoMensalUseCase";

export default class ExtratoMensalController {
  constructor(
    private servidor: Express,
    private casoDeUso: ExtratoMensalUseCase,
    ...middleware: any[]
  ) {
    const extratoGerar = async (req: Request, res: Response) => {
      try {
        const extrato = await casoDeUso.executar({
          usuario: (req as any).usuario,
          ano: +req.params.ano,
          mes: +req.params.mes,
        });

        res.status(200).json(extrato);
      } catch (error) {
        res.status(400).send(error.message);
      }
    };

    servidor.get("/extrato/:ano/:mes", middleware, extratoGerar);
  }
}
