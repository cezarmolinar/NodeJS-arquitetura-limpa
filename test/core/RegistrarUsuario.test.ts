import UsuarioEmMemoria from "../fake/UsuarioEmMemoria";
import RegistrarUsuario from "../../src/core/usuario/RegistrarUsuario";
import BcryptAdapter from "../../src/adapters/auth/BcryptAdapter";
import usuarios from "../data/usuarios";
import ColecaoUsuarioDB from "../../src/adapters/db/knex/ColecaoUsuarioDB";

test("Deve lançar erro ao registrar um usuario já existente", async () => {
  const colecao = new UsuarioEmMemoria();
  const provedorCripto = new BcryptAdapter();

  const casoDeUso = await new RegistrarUsuario(colecao, provedorCripto);

  await casoDeUso.executar({
    nome: usuarios.completo.nome,
    email: usuarios.completo.email,
    senha: usuarios.completo.senha!,
  });
  const exec = async () =>
    await casoDeUso.executar({
      nome: usuarios.completo.nome,
      email: usuarios.completo.email,
      senha: usuarios.completo.senha!,
    });

  await expect(exec).rejects.toThrowError("Usuário já existe");
});

test("Deve registrar um usuario no banco real", async () => {
  const colecao = new ColecaoUsuarioDB();
  const provedorCripto = new BcryptAdapter();

  const casoDeUso = await new RegistrarUsuario(colecao, provedorCripto);

  const usuario = await casoDeUso.executar({
    nome: usuarios.completo.nome,
    email: usuarios.completo.email,
    senha: usuarios.completo.senha!,
  });

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("joao3");
});
