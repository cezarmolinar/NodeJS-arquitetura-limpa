import dotenv from "dotenv";
dotenv.config();

import express from "express";
import BcryptAdapter from "./adapters/auth/BcryptAdapter";
import ColecaoUsuarioDB from "./adapters/db/knex/ColecaoUsuarioDB";
import RegistrarUsuarioUseCase from "./core/usuario/RegistrarUsuarioUseCase";
import RegistrarUsuarioController from "./controllers/RegistrarUsuarioController";
import LoginUsuarioUseCase from "./core/usuario/LoginUsuarioUseCase";
import LoginUsuarioController from "./controllers/LoginUsuarioController";
import JwtAdapter from "./adapters/auth/JwtAdapter";
import SalvarTransacaoUseCase from "./core/transacao/SalvarTransacaoUseCase";
import SalvarTransacaoController from "./controllers/SalvarTransacaoController";
import UsuarioMiddleware from "./controllers/UsuarioMiddleware";
import ColecaoTransacaoDB from "./adapters/db/knex/ColecaoTransacaoDB";
import ExtratoMensalController from "./controllers/ExtratoMensalController";
import ExtratoMensalUseCase from "./core/transacao/ExtratoMensalUseCase";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORTA, () => {
  console.log("Server is running on port", process.env.PORTA);
});

const provedorToken = new JwtAdapter(process.env.JWT_SECRET!);
const provedorCripto = new BcryptAdapter();
const colecaoUsuario = new ColecaoUsuarioDB();

const registrarUsuario = new RegistrarUsuarioUseCase(
  colecaoUsuario,
  provedorCripto
);
const loginUsuario = new LoginUsuarioUseCase(
  colecaoUsuario,
  provedorCripto,
  provedorToken
);

new RegistrarUsuarioController(app, registrarUsuario);
new LoginUsuarioController(app, loginUsuario);

//---------------------------------
// ROTAS AUTENTICADAS
const usuarioMiddleware = UsuarioMiddleware(colecaoUsuario, provedorToken);

const colecaoTransacao = new ColecaoTransacaoDB();

const salvarTransacao = new SalvarTransacaoUseCase(colecaoTransacao);
new SalvarTransacaoController(app, salvarTransacao, usuarioMiddleware);

const extrato = new ExtratoMensalUseCase(colecaoTransacao);
new ExtratoMensalController(app, extrato, usuarioMiddleware);
