import axios from "axios";
import IUsuario from "../../src/core/usuario/Usuario";
import usuarios from "../data/usuarios";

const baseUrl = process.env.API_URL;

test("Deve registrar um novo usuario se não existir", async () => {
  try {
    const resp = await axios.post(`${baseUrl}/registrar`, usuarios.semId);

    expect(resp.status).toBe(201);
  } catch (error: any) {
    expect(error.response.status).toBe(400);
    expect(error.response.data).toBe("Usuário já existe.");
  }
});

test("Deve logar com email e senhas corretos", async () => {
  const resp = await axios.post(`${baseUrl}/login`, usuarios.semId);
  expect(resp.status).toBe(200);
  expect(resp.data.usuario.nome).toBe(usuarios.semId.nome);
  expect(resp.data.usuario.email).toBe(usuarios.semId.email);
  expect(resp.data).toHaveProperty("token");
  console.log(resp.data.token);
});
