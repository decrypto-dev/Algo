export class RestApiEndpoint {
    static baseUrl = 'https://api.binance.com';

    // General Endpoints
    static TestConnectivity = RestApiEndpoint.baseUrl + '/api/v3/ping';
    static CheckServerTime = RestApiEndpoint.baseUrl + '/api/v3/time';
    static ExchangeInformation = RestApiEndpoint.baseUrl + '/api/v3/exchangeInfo';

    // Market Data Endpoints
    static OrderBook = RestApiEndpoint.baseUrl + '/api/v3/depth';
    static RecentTradeList = RestApiEndpoint.baseUrl + '/api/v3/trades';
    static OldTradeLookup = RestApiEndpoint.baseUrl + '/api/v3/historicalTrades';
    static AggregateTradesList = RestApiEndpoint.baseUrl + '/api/v3/aggTrades';
    static CandlestickData = RestApiEndpoint.baseUrl + '/api/v3/klines';
    static CurrentAveragePrice = RestApiEndpoint.baseUrl + '/api/v3/avgPrice';
    static _24hrTickerPriceChangeStatistics = RestApiEndpoint.baseUrl + '/api/v3/ticker/24hr';
    static SymbolPriceTicker = RestApiEndpoint.baseUrl + '/api/v3/ticker/price';
    static SymbolOrderBookTicker = RestApiEndpoint.baseUrl + '/api/v3/ticker/bookTicker';

    // Account Endpoints

}