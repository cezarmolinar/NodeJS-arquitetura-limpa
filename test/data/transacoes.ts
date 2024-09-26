import ITransacao from "../../src/core/transacao/TransacaoInterface";

const modelo = {
  descricao: "salario",
  valor: 100,
  vencimento: new Date("2024-02-02"),
  idUsuario: "dfe86d87-41ad-49a2-bdbb-75f0171277f8",
} as ITransacao;

export default {
  semId: modelo,
  completa: { ...modelo, id: "8835a483-1e60-4938-ac5c-ca6815349a73" },
  lista: [
    { ...modelo, valor: 5000, descricao: "Salário" },
    { ...modelo, valor: -450, descricao: "Luz" },
    { ...modelo, valor: -100, descricao: "Água" },
    { ...modelo, valor: -250, descricao: "Telefone" },
  ],
};
