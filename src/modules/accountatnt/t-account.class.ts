export class TAccount {

    private debits: number[] = [];
    private credits: number[] = [];

    constructor(private initialValue: number) {
        this.addDebit(initialValue);
    }

    addDebit(amount: number) {
        this.debits.push(amount);
    }

    addCredit(amount: number) {
        this.credits.push(amount);
    }

    private arraySum(arr: number[]) {
        return arr.reduce((total, num) => total + num, 0);
    }

    getBalance() {
        return this.arraySum(this.debits) - this.arraySum(this.credits);
    }


}