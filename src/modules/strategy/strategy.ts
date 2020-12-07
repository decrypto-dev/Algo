import { Subject } from "rxjs";
import { TimeFrame } from "../time-frame.enum";

export abstract class Strategy<T> {

    readonly buyEvent = new Subject<[number, number]>();
    readonly sellEvent = new Subject<[number, number]>();
    readonly data = new Subject<T>();

    abstract config: {
        timeFrame: TimeFrame,
        neededHistory: number
    }

    abstract main(): void;

    constructor() { }


    protected buy(time: number, price: number) {
        this.buyEvent.next([time, price]);
    }

    protected sell(time: number, price: number) {
        this.sellEvent.next([time, price]);
    }

}