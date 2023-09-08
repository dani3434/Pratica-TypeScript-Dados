import moedaParaNumero from "./moedaParaNumero.js";
import stringToDate from "./stringToDate.js";

declare global {
  type TransacaoPagamento = "Cartão de Crédito" | "Boleto";
  type TransacaoStatus =
    | "Recusada pela operadora de cartão"
    | "Paga"
    | "Aguardando pagamento"
    | "Estornada";

  interface TransacaoApi {
    Nome: string;
    ID: number;
    Email: string;
    Status: TransacaoStatus;
    ["Valor (R$)"]: string;
    ["Cliente Novo"]: number;
    ["Forma de Pagamento"]: TransacaoPagamento;
    Data: string;
  }

  interface Transacao {
    nome: string;
    id: number;
    email: string;
    data: Date;
    status: TransacaoStatus;
    moeda: string;
    valor: number | null;
    pagamento: TransacaoPagamento;
    novo: Boolean;
  }
}

export default function normalizarTransacao(
  transacao: TransacaoApi
): Transacao {
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
