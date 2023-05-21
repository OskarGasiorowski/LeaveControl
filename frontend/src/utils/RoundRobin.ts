export class RoundRobin<T> {
    private index = 0;

    constructor(private readonly collection: T[]) {}

    next(): T {
        this.index = this.index === this.collection.length - 1 ? 0 : this.index + 1;
        return this.current();
    }

    current(): T {
        return this.collection[this.index];
    }
}
