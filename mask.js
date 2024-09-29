(() => {
  const montanteInicial = document.getElementById("montante-inicial");
  const valorSalario = document.getElementById("valor-salario");
  const nroMeses = document.getElementById("numero-meses");

  const imaskDouble = {
    mask: "num",
    blocks: {
      num: {
        mask: Number,
        thousandsSeparator: ".",
        min: 0,
        padFractionalZeros: true,
      },
    },
  };

  const imaskInteger = {
    mask: "num",
    blocks: {
      num: {
        mask: Number,
        thousandsSeparator: ".",
        min: 0,
        max: 420,
        scale: 0,
      },
    },
  };

  IMask(montanteInicial, imaskDouble);
  IMask(valorSalario, imaskDouble);
  IMask(nroMeses, imaskInteger);
})();
