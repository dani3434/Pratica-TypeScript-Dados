import moedaParaNumero from "./moedaParaNumero.js";
import stringToDate from "./stringToDate.js";
export default function normalizarTransacao(transacao) {
    return {
        nome: transacao.Nome,
        id: transacao.ID,
        email: transacao.Email,
        data: stringToDate(transacao.Data),
        status: transacao.Status,
        moeda: transacao["Valor (R$)"],
        valor: moedaParaNumero(transacao["Valor (R$)"]),
        pagamento: transacao["Forma de Pagamento"],
        novo: Boolean(transacao["Cliente Novo"]),
    };
}
//# sourceMappingURL=normalizarTransacao.js.map