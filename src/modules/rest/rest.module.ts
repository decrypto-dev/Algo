import axios from 'axios';
import { Candlestic } from './candlestic.model';
import { RestApiEndpoint } from './api-endpoints';
import { from, throwError } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
export class BinanceRest {

    constructor() { }

    /**
     * Test connectivity to the Rest API.
     */
    testConnectivity() {
        return from(axios.get(RestApiEndpoint.TestConnectivity)).pipe(
            map(
                res => res.data
            ),
            // catchError(err => throwError(err.response))
        );
    }

    /**
     * Test connectivity to the Rest API and get the current server time.
     */
    CheckServerTime() {
        return from(axios.get(RestApiEndpoint.CheckServerTime)).pipe(
            map(
                res => res.data
            ),
            catchError(err => throwError(err.response))
        );
    }

    /**
     * Current exchange trading rules and symbol information
     */
    ExchangeInformation() {
        return from(axios.get(RestApiEndpoint.ExchangeInformation)).pipe(
            map(
                res => res.data
            ),
            catchError(err => throwError(err.response))
        );
    }

    OrderBook(symbol: string, limit?: number) {
        return from(axios.get(RestApiEndpoint.OrderBook, { params: { symbol: symbol.toUpperCase(), limit: limit } })).pipe(
            map(
                res => res.data
            ),
            catchError(err => throwError(err.response))
        );
    }

    /**
     * Get recent trades (up to last 500).
     * @param symbol 
     * @param limit  500 to 1000
     */
    RecentTradesList(symbol: string, limit?: number) {
        return from(axios.get(RestApiEndpoint.RecentTradeList, { params: { symbol: symbol.toUpperCase(), limit: limit } })).pipe(
            map(
                res => res.data
            ),
            catchError(err => throwError(err.response))
        );
    }

    /**
     * Get older trades.
     * @param symbol 
     * @param limit Default 500; max 1000.
     * @param fromId TradeId to fetch from. Default gets most recent trades.
     */
    OldTradeLookup(symbol: string, limit?: number, fromId?: number) {
        return from(axios.get(RestApiEndpoint.OldTradeLookup, { params: { symbol: symbol.toUpperCase(), limit: limit } })).pipe(
            map(
                res => res.data
            ),
            catchError(err => throwError(err.response))
        );
    }

    /**
     * Get compressed, aggregate trades. Trades that fill at the time, from the same order, with the same price will have the quantity aggregated.
     * @param symbol 
     * @param limit Default 500; max 1000.
     * @param fromId ID to get aggregate trades from INCLUSIVE.
     * @param startTime Timestamp in ms to get aggregate trades from INCLUSIVE.
     * @param endTime Timestamp in ms to get aggregate trades until INCLUSIVE.
     */
    AggregateTradesList(symbol: string, limit?: number, fromId?: number, startTime?: number, endTime?: number) {
        return from(axios.get(RestApiEndpoint.AggregateTradesList, { params: { symbol: symbol.toUpperCase(), limit: limit } })).pipe(
            map(
                res => res.data
            ),
            catchError(err => throwError(err.response))
        );
    }

    /**
     * Kline/candlestick bars for a symbol. Klines are uniquely identified by their open time.
     * @param symbol 
     * @param limit Default 500; max 1000.
     * @param interval 
     * @param startTime 
     * @param endTime 
     */
    CandlestickData(symbol: string, interval: string, startTime?: number, endTime?: number, limit?: number) {
        return from(axios.get(RestApiEndpoint.CandlestickData, { params: { symbol: symbol.toUpperCase(), interval: interval, startTime: startTime, endTime: endTime, limit: limit } })).pipe(
            delay(1500),
            map(
                res => (res.data as Array<any[]>)
                    .map(candle => new Candlestic(candle[0], candle[1], candle[2], candle[3], candle[4], candle[5], candle[6], candle[7], candle[8], candle[9], candle[10], candle[11]))
            ),
            // catchError(err => throwError(err.response))
        );
    }


    /**
     * Current average price for a symbol.
     * @param symbol 
     */
    CurrentAveragePrice(symbol: string) {
        return from(axios.get(RestApiEndpoint.CurrentAveragePrice, { params: { symbol: symbol.toUpperCase() } })).pipe(
            map(
                res => res.data
            ),
            catchError(err => throwError(err.response))
        );
    }

    getData() {
        return from(axios.get(RestApiEndpoint.AggregateTradesList, { params: { symbol: 'BTCUSDT', startTime: 1558778750000, endTime: 1558782350000 } })).pipe(
            map(
                res => res.data
            ),
            catchError(err => throwError(err.response))
        );
    }
}