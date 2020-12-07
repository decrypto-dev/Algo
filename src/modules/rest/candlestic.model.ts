import * as moment from 'moment-jalaali';

export class Candlestic {
    public readonly _id: number;
    constructor(
        public readonly openTime: number,
        public readonly Open: string,
        public readonly high: string,
        public readonly low: string,
        public readonly close: string,
        public readonly volume: string,
        public readonly closeTime: number,
        public readonly quoteAssetVolume: string,
        public readonly numberOfTrades: number,
        public readonly takerBuyBaseAssetVolume: string,
        public readonly takerBuyQuoteAssetVolume: string,
        public readonly ignore: string
    ) {
        this._id = openTime;
    }

    get openTimeDate() {
        return moment.parseZone(this.openTime).format();
    }

    get closeTimeDate() {
        return moment.parseZone(this.closeTime).format();
    }
}