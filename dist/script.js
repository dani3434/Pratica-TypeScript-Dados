import Estatisticas from "./Estatisticas.js";
import fetchData from "./fetchData.js";
import normalizarTransacao from "./normalizarTransacao.js";
fetchData("https://api.origamid.dev/json/transacoes.json");
async function handleData() {
    const data = await fetchData("https://api.origamid.dev/json/transacoes.json?");
    if (!data)
        return;
    const transacoes = data.map(normalizarTransacao);
    preencherTabela(transacoes);
    preencherEstatisticas(transacoes);
}
function preencherLista(lista, containerID) {
    const containerElement = document.getElementById(containerID);
    if (containerElement) {
        Object.keys(lista).forEach((key) => {
            containerElement.innerHTML += `<p>${key}: ${lista[key]}</p>`;
        });
    }
}
function preencherEstatisticas(transacoes) {
    const data = new Estatisticas(transacoes);
    preencherLista(data.pagamentos, "pagamento");
    preencherLista(data.status, "status");
    const totalElement = document.querySelector("#total span");
    if (totalElement) {
        totalElement.innerText = data.total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }
    const diaElement = document.querySelector("#dia span");
    if (diaElement) {
        diaElement.innerText = data.melhorDia[0];
    }
}
function preencherTabela(transacao) {
    const tabela = document.querySelector("#transacoes tbody");
    if (!tabela)
        return console.log("Erro é aqui");
    transacao.forEach((item) => {
        tabela.innerHTML += `
     <tr>
       <td>${item.nome}</td>
       <td>${item.email}</td>
       <td>R$ ${item.moeda}</td>
       <td>${item.pagamento}</td>
       <td>${item.status}</td>
     </tr>
    `;
    });
}
handleData();
//# sourceMappingURL=script.js.map