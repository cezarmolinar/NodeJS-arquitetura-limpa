import transacoes from "../data/transacoes";
import Saldo from "../../src/core/transacao/Saldo";

const lista = [
  { ...transacoes.semId, valor: 5000 },
  { ...transacoes.semId, valor: -300 },
  { ...transacoes.semId, valor: -700 },
  { ...transacoes.semId, valor: -1500 },
];

test("Deve calcular SALDO das transações", () => {
  expect(new Saldo(lista).saldoFinal).toBe(2500);
});

test("Deve calcular total das receitas", () => {
  expect(new Saldo(lista).receitas).toBe(5000);
});

test("Deve calcular total das despesas", () => {
  expect(new Saldo(lista).despesas).toBe(-2500);
});
