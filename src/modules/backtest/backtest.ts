import { Candlestic } from './../rest/candlestic.model';
import { Strategy } from '../strategy/strategy';
import { MongoClient } from 'mongodb';
import { Accountant } from '../accountatnt/accountant.class';
import cliProgress from 'cli-progress';
import * as moment from 'moment-jalaali';

export class BackTest<T extends Strategy<Candlestic[]>> {

    private progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    private accountant: Accountant;

    constructor(
        private strategy: T,
        private startTime: number,
        private endTime: number,
        private symbol: string,
        private timeFrame: string,
        private quoteAssetBudget: number,
        private transFee: number,
        private clientDB: MongoClient
    ) {
        this.accountant = new Accountant(0, quoteAssetBudget);
    }

    async start() {
        this.progressBar.start(this.endTime - this.startTime, 0);
        this.strategy.buyEvent.subscribe(event => this.buy(event[0], event[1]));
        this.strategy.sellEvent.subscribe(event => this.sell(event[0], event[1]));
        this.strategy.main();
        await this.dataSource(this.startTime);
    }

    private async dataSource(initTime: number) {
        if (this.endTime - initTime > 0) {
            try {
                const data = await this.clientDB.db('historical_candles').collection(this.symbol).find({ openTime: { $lte: initTime } }).sort({ openTime: -1 }).limit(this.strategy.config.neededHistory).sort({ openTime: 1 }).toArray() as Candlestic[];
                const nextInitTime = data[data.length - 1].closeTime + 1;
                console.log(nextInitTime);
                this.progressBar.update(initTime - this.startTime);
                this.strategy.data.next(data);
                this.dataSource(nextInitTime);
            } catch (error) {
                console.error(error);
            }
        } else {
            this.progressBar.stop();
            this.accountant.report();
            this.clientDB.close();
        }
    }


    private buy(time: number, price: number) {
        const qouteAssetBalance = this.accountant.qouteAssetAccount.getBalance();
        if (qouteAssetBalance > 0) {
            this.accountant.buy(time, 0, '', [{ price: price, quantity: (qouteAssetBalance / price), commission: (qouteAssetBalance / price) * this.transFee }]);
        }
    }


    private sell(time: number, price: number) {
        const baseAssetBalance = this.accountant.baseAssetAccount.getBalance();
        if (baseAssetBalance > 0) {
            this.accountant.sell(time, 0, '', [{ price: price, quantity: baseAssetBalance, commission: (baseAssetBalance * price) * this.transFee }]);
        }
    }
}