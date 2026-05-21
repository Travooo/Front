// Funções puras e testáveis para cálculo da simulação.
export const calcularEnergiaAnual = (kmMensal, consumoKwh100, valorKwh) => ((kmMensal * 12 * consumoKwh100) / 100) * valorKwh;
export const calcularGasolinaAnual = (kmMensal, consumoKmL, precoGasolina) => ((kmMensal * 12) / consumoKmL) * precoGasolina;
export const calcularIPVA = (valorVeiculo, aliquota) => valorVeiculo * aliquota;
export const calcularManutencaoAnual = (itens) => itens.reduce((acc, item) => acc + Number(item || 0), 0);
export const calcularSeguroAnual = (valorSeguro) => Number(valorSeguro || 0);
export const calcularCustoTotalAnual = ({ energiaOuGasolina, ipva, seguro, manutencao }) => energiaOuGasolina + ipva + seguro + manutencao;
export const calcularEconomiaAnual = (custoCombustao, custoEletrico) => custoCombustao - custoEletrico;
export const calcularPayback = (diferencaInvestimento, economiaAnual) => {
  if (diferencaInvestimento <= 0) return 0;
  if (economiaAnual <= 0) return Number.POSITIVE_INFINITY;
  return diferencaInvestimento / economiaAnual;
};
