import { BinanceRest } from './../rest/rest.module';
import moment from 'moment-jalaali';
import { MongoClient } from 'mongodb';
import cliProgress from 'cli-progress';



export class Grabber {

    private initTime: number;
    private progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

    constructor(private readonly startTime: number, private readonly endTime: number, private dbConnection: MongoClient) {
        this.initTime = startTime;
        this.progress.start(this.endTime - this.initTime, 0);
    }

    async CandlestickData() {
        try {
            const a = new BinanceRest();
            const data = await a.CandlestickData('btcusdt', '1m', this.initTime, this.endTime, 1000).toPromise();

            // await this.dbConnection.db('historical_candles').collection('btcusdt').insertMany(data);

            this.initTime = moment(data[data.length - 1].openTime).add(1, 'ms').valueOf();
            this.progress.update(this.initTime - this.startTime);

            if (moment(this.endTime).diff(moment(this.initTime), 'minute') > 0) {
                await this.CandlestickData();
            } else {
                this.progress.stop();
            }

        } catch (error) {
            console.error(error);
        }

    }

}

