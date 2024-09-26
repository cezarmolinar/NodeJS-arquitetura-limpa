import axios from "axios";
import { getAuthorizationHeader } from "../util/aut";
import transacoes from "../data/transacoes";

const baseUrl = process.env.API_URL;

test("Deve logar com email e senhas corretos", async () => {
  const headers = await getAuthorizationHeader();

  const resp = await axios.post(`${baseUrl}/transacao`, {}, headers);
  expect(resp.status).toBe(200);
});

test("Deve registrar uma transação", async () => {
  try {
    const headers = await getAuthorizationHeader();

    const resp = await axios.post(
      `${baseUrl}/transacao`,
      transacoes.semId,
      headers
    );

    expect(resp.status).toBe(200);
  } catch (error: any) {
    console.log(error.response);
  }
});

test("Deve alterar uma transação - por Id", async () => {
  try {
    const headers = await getAuthorizationHeader();

    const resp = await axios.post(
      `${baseUrl}/transacao/8835a483-1e60-4938-ac5c-ca6815349a73`,
      transacoes.completa,
      headers
    );

    expect(resp.status).toBe(200);
  } catch (error: any) {
    console.log(error.response.data);
  }
});

test("Deve popular com uma lista de transações", async () => {
  try {
    const headers = await getAuthorizationHeader();

    const resposas = transacoes.lista.map(async (transacao) => {
      const resp = await axios.post(`${baseUrl}/transacao`, transacao, headers);
      // console.log(resp.status);
      return resp.status;
    });

    const listaDeStatus = await Promise.all(resposas);

    expect(listaDeStatus.every((s) => s === 200)).toBe(true);
  } catch (error: any) {
    console.log(error.response);
  }
});

test("Deve retornar o Extrato Mensal + saldo", async () => {
  try {
    const headers = await getAuthorizationHeader();

    const resp = await axios.get(`${baseUrl}/extrato/2024/1`, headers);
    console.log(resp.data);

    expect(resp.status).toBe(200);
    expect(resp.data).toHaveProperty("transacoes");
    expect(resp.data).toHaveProperty("saldo");
  } catch (error: any) {
    console.log(error.response);
  }
});
