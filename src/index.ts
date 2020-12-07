import { BinanceWS } from './modules/ws/ws.module';
import moment from 'moment-jalaali';
import { Grabber } from './modules/data-grabber/data-grabber';
import { MongoClient } from 'mongodb';

import { BackTest } from './modules/backtest/backtest';
import { CandleStrategy } from './modules/strategy/candle-strategy';
import { TimeFrame } from './modules/time-frame.enum';


async function main() {

    const client = new MongoClient('mongodb://localhost:27017/binance', { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();

        const globalStartTime = moment('2020-01-01T00:00:00-07:00').valueOf(); // 2020-01-01T00:00:00-07:00
        // 1590683520000
        const globalEndTime = moment('2020-01-10T23:59:59-07:00').valueOf(); // 2020-06-17T23:59:59-07:00

        // DATA GRABBER

        // const grabber = new Grabber(1590683520000, globalEndTime, client);
        // await grabber.CandlestickData();


        // BACK TESTER
        const strategy = new CandleStrategy();
        const backtest = new BackTest(strategy, globalStartTime, globalEndTime, 'btcusdt', '', 1000, 0.001, client);
        backtest.start();

        // new BinanceWS('btcusdt').onCandlestic(CandleStickInterval._1m).subscribe();

    } catch (error) {
        console.error(error);
    } finally {
        // await client.close();
    }
}

main().catch(console.error);





// const wsApi = new BinanceWS('btcusdt');
// wsApi.onTrade().subscribe(res => console.log(res));



// grabData(globalIndex);
// 'Asia/Tehran'
// a.CheckServerTime().subscribe(res => console.log(moment(res.serverTime).utcOffset('+04:30').format('jYYYY-jMM-jDD HH:mm')))
