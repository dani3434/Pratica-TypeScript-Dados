import countBy from "./countBy.js";
function filtrarValor(transacao) {
    return transacao.valor !== null;
}
export default class Estatisticas {
    transacoes;
    total;
    pagamentos;
    status;
    semana;
    melhorDia;
    constructor(transacoes) {
        this.transacoes = transacoes;
        this.total = this.setTotal();
        this.pagamentos = this.setPagamento();
        this.status = this.setStatus();
        this.semana = this.setSemana();
        this.melhorDia = this.setMelhorDia();
    }
    setTotal() {
        return this.transacoes.filter(filtrarValor).reduce((acc, item) => {
            return acc + item.valor;
        }, 0);
    }
    setPagamento() {
        return countBy(this.transacoes.map(({ pagamento }) => pagamento));
    }
    setStatus() {
        return countBy(this.transacoes.map(({ status }) => status));
    }
    setSemana() {
        const semana = {
            ["Domingo"]: 0,
            ["Segunda"]: 0,
            ["Terça"]: 0,
            ["Quarta"]: 0,
            ["Quinta"]: 0,
            ["Sexta"]: 0,
            ["Sabado"]: 0,
        };
        for (let i = 0; i < this.transacoes.length; i++) {
            const day = this.transacoes[i].data.getDay();
            if (day === 0)
                semana["Domingo"] += 1;
            if (day === 1)
                semana["Segunda"] += 1;
            if (day === 2)
                semana["Terça"] += 1;
            if (day === 3)
                semana["Quarta"] += 1;
            if (day === 4)
                semana["Quinta"] += 1;
            if (day === 5)
                semana["Sexta"] += 1;
            if (day === 6)
                semana["Sabado"] += 1;
        }
        return semana;
    }
    setMelhorDia() {
        return Object.entries(this.semana).sort((a, b) => {
            return b[1] - a[1];
        })[0];
    }
}
//# sourceMappingURL=Estatisticas.js.map