import { TAccount } from './t-account.class';
import moment from 'moment-jalaali';
import Table from 'cli-table3';

export interface Transaction {
    price: number,
    quantity: number,
    commission: number,
}

/**
 * Responsible for maintaining asset accounts and submitting profit and loss reports
 */
export class Accountant {

    baseAssetAccount: TAccount;
    qouteAssetAccount: TAccount;
    /**
     * Responsible for maintaining asset accounts and submitting profit and loss reports.
     * In `BTC/USDT` market, `BTC` is the **Base Asset** and `USDT` is the **Qoute Asset**.
     * @param baseAssetInit _Initial Budget_ of the Base Asset.
     * @param quoteAssetInit _Initial Budget_ of the Qoute Asset.
     */
    constructor(
        private baseAssetInit: number,
        private quoteAssetInit: number,
    ) {
        this.baseAssetAccount = new TAccount(baseAssetInit);
        this.qouteAssetAccount = new TAccount(quoteAssetInit);
    }


    /**
     * Insert Base Asset _Purchase_ into account.
     * @param date date of the transaction (millisecond timestamp)
     * @param baseAssetPrice the price of each one base asset
     */
    buy(date: number, orderId: number, clientOrderId: string, transactions: Transaction[]) {
        for (const transaction of transactions) {
            // UPDATE BALANCE ACCOUNT
            this.qouteAssetAccount.addCredit(transaction.price * transaction.quantity);
            this.baseAssetAccount.addDebit(transaction.quantity - transaction.commission);
        }
    }

    /**
     * Insert Base Asset _Sale_ into account.
     * @param date date of the transaction (millisecond timestamp)
     * @param baseAssetPrice the price of each one base asset
     */
    sell(date: number, orderId: number, clientOrderId: string, transactions: Transaction[]) {
        for (const transaction of transactions) {
            // UPDATE BALANCE ACCOUNT
            this.baseAssetAccount.addCredit(transaction.quantity);
            this.qouteAssetAccount.addDebit((transaction.price * transaction.quantity) - transaction.commission);
        }
    }

    /**
     * 
     */
    report() {

    }


}