const API_GATEWAY = "your-api-gateway";

const montanteInicial = document.getElementById("montante-inicial");
const valorSalario = document.getElementById("valor-salario");
const saqueAniversario = document.getElementById("saque-aniversario");
const nroMeses = document.getElementById("numero-meses");
const fgtsTableContainer = document.getElementById("fgts-table-container");
const fgtsTableTbody = document.getElementById("fgts-table-tbody");
const fgtsSampleRow = document.getElementById("fgts-sample-row");
const loadingSpinner = document.getElementById("loading-spinner");

const toNumber = (str) => {
  const transformedStr = str.replace(/\./g, "").replace(",", ".");
  return parseFloat(transformedStr);
};

const toBrl = (num) =>
  num.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const toDate = (arr) => {
  const [year, month] = arr;
  return `${month.toString().padStart(2, "0")}/${year}`;
};

const activateLoading = (state) =>
  (loadingSpinner.style.display = state ? "block" : "none");

const buildFgtsTable = (valoresMensais) => {
  fgtsTableContainer.style.display = "block";
  fgtsTableTbody.innerHTML = "";

  valoresMensais.forEach(
    ({
      dataAtual,
      totalParcialInicio,
      totalParcialFim,
      incrementoMensal,
      jurosMensais,
      valorSaqueAniversario,
    }) => {
      const fgtsRow = fgtsSampleRow.cloneNode(true);

      fgtsRow.querySelector(".dataAtual").innerText = toDate(dataAtual);
      fgtsRow.querySelector(".totalParcialInicio").innerText =
        toBrl(totalParcialInicio);
      fgtsRow.querySelector(".totalParcialFim").innerText =
        toBrl(totalParcialFim);
      fgtsRow.querySelector(".incrementoMensal").innerText =
        toBrl(incrementoMensal);
      fgtsRow.querySelector(".jurosMensais").innerText = toBrl(jurosMensais);
      fgtsRow.querySelector(".valorSaqueAniversario").innerText = toBrl(
        valorSaqueAniversario
      );

      fgtsTableTbody.appendChild(fgtsRow);
    }
  );
};

const calculate = async (e) => {
  try {
    activateLoading(true);

    const data = {
      montanteInicial: toNumber(montanteInicial.value),
      valorSalario: toNumber(valorSalario.value),
      saqueAniversario: toNumber(saqueAniversario.value),
      nroMeses: toNumber(nroMeses.value),
    };

    const response = await (
      await fetch(API_GATEWAY, {
        method: "POST",
        body: JSON.stringify(data),
      })
    ).json();

    buildFgtsTable(response.valoresMensais);
  } catch (error) {
    alert(`An error has occurred ${error.message}`);
  } finally {
    activateLoading(false);
  }
};
