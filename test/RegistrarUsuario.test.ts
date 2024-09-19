import UsuarioEmMemoria from "../src/exemplo/adaptadores/db/UsuarioEmMemoria";
import RegistrarUsuario from "../src/exemplo/app/usuario/RegistrarUsuario";
import ColecaoUsuarioDB from "../src/exemplo/adaptadores/db/knex/ColecaoUsuarioDB";

test.skip("Deve registrar um usuario", () => {
  const banco = new UsuarioEmMemoria();

  const casoDeUso = new RegistrarUsuario(banco);

  const usuario = casoDeUso.executar("joao", "joao@teste.com", "123456");
  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("joao");
  expect(usuario.senha).toBe("654321");
});

test("Deve registrar um usuario no banco real", () => {
  const banco = new ColecaoUsuarioDB();

  const casoDeUso = new RegistrarUsuario(banco);

  const usuario = casoDeUso.executar("joao", "joao@teste.com", "123456");

  expect(usuario).toHaveProperty("id");
  expect(usuario.nome).toBe("joao");
  expect(usuario.senha).toBe("654321");
});
