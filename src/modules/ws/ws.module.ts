import WebSocket from 'ws';
import { TradeEvent } from './events/trade.model';
import { TimeFrame } from './../time-frame.enum';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type BinanceWSEvent = 'aggTrade' | 'trade' | 'kline' | '24hrMiniTicker' | '24hrTicker' | 'depthUpdate';

export class BinanceWS {
    private baseUrl = 'wss://stream.binance.com:9443/ws/';

    constructor(private symbol: string) { }

    private _setupWebSocket(eventType: BinanceWSEvent): Observable<any>
    private _setupWebSocket(eventType: 'kline', interval: TimeFrame): Observable<any>;
    private _setupWebSocket(eventType: BinanceWSEvent, interval?: TimeFrame): Observable<any> {

        return new Observable(subscriber => {

            let path;

            if (interval) {
                path = this.baseUrl + this.symbol.toLowerCase() + '@' + eventType + '_' + interval;
            } else {
                path = this.baseUrl + this.symbol.toLowerCase() + '@' + eventType;
            }

            const ws = new WebSocket(path);
            ws.on('message', (message: any) => {

                try {
                    subscriber.next(JSON.parse(message));
                } catch (e) {
                    event = message;
                }
            });

            ws.on('error', (error) => {
                subscriber.error(error);
                throw new Error('Error On connection to binance WS: ' + error.message);
            });

        })


    }

    /**
     * Pushes raw trade information, with each trade having a unique buyer and seller. Returns the websocket
     * @param eventHandler 
     */
    onTrade() {
        return this._setupWebSocket('trade').pipe(map((res: any) => {
            // { e: string, E: number, s: string, t: number, p: string, q: string, b: number, a: number, T: number, m: boolean, M: boolean }
            return new TradeEvent(res.e, res.E, res.s, res.t, res.p, res.q, res.b, res.a, res.T, res.m, res.M);
        }));
    }


    onCandlestic(interval: TimeFrame) {
        return this._setupWebSocket('kline', interval).pipe(map((res: any) => {
            // { e: string, E: number, s: string, t: number, p: string, q: string, b: number, a: number, T: number, m: boolean, M: boolean }
            return console.log(res);
        }));
    }

}