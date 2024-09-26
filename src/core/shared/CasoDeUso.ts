export default interface ICasoDeUso<IN, OUT> {
  executar(dto: IN): Promise<OUT>;
}
