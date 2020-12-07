import { Strategy } from "./strategy";
import { Candlestic } from "../rest/candlestic.model";
import { TimeFrame } from "../time-frame.enum";

export class CandleStrategy extends Strategy<Candlestic[]> {

    config = {
        timeFrame: TimeFrame._1m,
        neededHistory: 7,
    }

    constructor() {
        super();
    }

    main() {
        this.data.subscribe(d => {
            const sma5_1 = this.SMA(d.slice(-5));
            const sma55_1 = this.SMA(d.slice(-7));
            if (sma5_1 && sma55_1) {
                if (sma5_1 > sma55_1) {
                    this.buy(d[d.length - 1].closeTime, +d[d.length - 1].close);
                }
                if (sma5_1 < sma55_1) {
                    this.sell(d[d.length - 1].closeTime, +d[d.length - 1].close);
                }
            }
        },
            err => console.error(err))
    }


    SMA(candles: Candlestic[]) {
        return (candles.reduce((total, candle) => { return total + parseFloat(candle.close); }, 0) / candles.length)
    }

}