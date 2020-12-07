export class TradeEvent {
    constructor(
        private e: string,
        private E: number,
        private s: string,
        private t: number,
        private p: string,
        private q: string,
        private b: number,
        private a: number,
        private T: number,
        private m: boolean,
        private M: boolean
    ) { }

    get eventType() {
        return this.e;
    }

    get eventTime() {
        return this.E;
    }

    get symbol() {
        return this.s;
    }

    get tradeId() {
        return this.t;
    }

    get price() {
        return Number(this.p);
    }

    get quantity() {
        return this.q;
    }

    get buyerOrderId() {
        return this.b;
    }

    get sellerOrderId() {
        return this.a;
    }

    get tradeTime() {
        return this.T;
    }

    /**
     * Is the buyer the market maker?
     */
    get maker() {
        return this.m;
    }

    get ignored() {
        return this.M;
    }
}